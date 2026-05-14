import React, { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import styles from "./AudioPlayer.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AudioPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 오디오 소스 URL */
  src: string;
  /** 트랙 제목 */
  title?: string;
  /** 아티스트 */
  artist?: string;
  /** 커버 이미지 URL */
  coverUrl?: string;
  /** 자동 재생 */
  autoPlay?: boolean;
  /** 반복 재생 */
  loop?: boolean;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 이전 트랙 핸들러 */
  onPrev?: () => void;
  /** 다음 트랙 핸들러 */
  onNext?: () => void;
  /** 재생 완료 핸들러 */
  onEnded?: () => void;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AudioPlayer = forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
      src,
      title,
      artist,
      coverUrl,
      autoPlay = false,
      loop = false,
      size = "md",
      onPrev,
      onNext,
      onEnded,
      className,
      ...rest
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const onTimeUpdate = () => setCurrentTime(audio.currentTime);
      const onLoadedMeta = () => setDuration(audio.duration);
      const onEnd = () => {
        setPlaying(false);
        onEnded?.();
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoadedMeta);
      audio.addEventListener("ended", onEnd);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoadedMeta);
        audio.removeEventListener("ended", onEnd);
      };
    }, [onEnded]);

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = muted ? 0 : volume;
      }
    }, [volume, muted]);

    const togglePlay = useCallback(() => {
      const audio = audioRef.current;
      if (!audio) return;
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }, [playing]);

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const time = Number(e.target.value);
      if (audioRef.current) {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      }
    }, []);

    const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const vol = Number(e.target.value);
      setVolume(vol);
      setMuted(false);
    }, []);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        <audio ref={audioRef} src={src} autoPlay={autoPlay} loop={loop} preload="metadata" />

        {coverUrl && (
          <div className={styles.cover}>
            <img src={coverUrl} alt={title || "cover"} className={styles.coverImg} />
          </div>
        )}

        <div className={styles.main}>
          {(title || artist) && (
            <div className={styles.info}>
              {title && <span className={styles.title}>{title}</span>}
              {artist && <span className={styles.artist}>{artist}</span>}
            </div>
          )}

          <div className={styles.progressRow}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <div className={styles.progressTrack}>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className={styles.progressSlider}
                style={{ "--progress": `${progress}%` } as React.CSSProperties}
              />
            </div>
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>

          <div className={styles.controls}>
            <div className={styles.mainControls}>
              {onPrev && (
                <button type="button" className={styles.controlBtn} onClick={onPrev}>
                  <SkipBack size={size === "sm" ? 14 : 18} />
                </button>
              )}
              <button type="button" className={styles.playBtn} onClick={togglePlay}>
                {playing ? (
                  <Pause size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
                ) : (
                  <Play size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
                )}
              </button>
              {onNext && (
                <button type="button" className={styles.controlBtn} onClick={onNext}>
                  <SkipForward size={size === "sm" ? 14 : 18} />
                </button>
              )}
            </div>

            <div className={styles.volumeControl}>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => setMuted(!muted)}
              >
                {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={handleVolume}
                className={styles.volumeSlider}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
