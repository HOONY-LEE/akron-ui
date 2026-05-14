import React, { forwardRef, useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";
import styles from "./Stopwatch.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StopwatchLap {
  /** 랩 번호 */
  number: number;
  /** 랩 시간 (ms) */
  lapTime: number;
  /** 총 경과 시간 (ms) */
  totalTime: number;
}

export interface StopwatchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 랩 기능 활성화 */
  showLaps?: boolean;
  /** 시간 변경 핸들러 */
  onChange?: (elapsed: number) => void;
  /** 랩 추가 핸들러 */
  onLap?: (lap: StopwatchLap) => void;
  /** 리셋 핸들러 */
  onReset?: () => void;
  /** 자동 시작 */
  autoStart?: boolean;
}

function formatTime(ms: number): { minutes: string; seconds: string; centiseconds: string } {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const centiseconds = Math.floor((ms % 1000) / 10)
    .toString()
    .padStart(2, "0");
  return { minutes, seconds, centiseconds };
}

function formatLapTime(ms: number): string {
  const { minutes, seconds, centiseconds } = formatTime(ms);
  return `${minutes}:${seconds}.${centiseconds}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Stopwatch = forwardRef<HTMLDivElement, StopwatchProps>(
  (
    {
      size = "md",
      showLaps = true,
      onChange,
      onLap,
      onReset,
      autoStart = false,
      className,
      ...rest
    },
    ref
  ) => {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(autoStart);
    const [laps, setLaps] = useState<StopwatchLap[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);
    const elapsedRef = useRef<number>(0);

    const stop = useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      elapsedRef.current = elapsed;
    }, [elapsed]);

    const start = useCallback(() => {
      startTimeRef.current = Date.now() - elapsedRef.current;
      intervalRef.current = setInterval(() => {
        const now = Date.now() - startTimeRef.current;
        setElapsed(now);
        onChange?.(now);
      }, 10);
    }, [onChange]);

    const toggleRunning = useCallback(() => {
      if (running) {
        stop();
      } else {
        start();
      }
      setRunning(!running);
    }, [running, start, stop]);

    const handleReset = useCallback(() => {
      stop();
      setElapsed(0);
      setRunning(false);
      setLaps([]);
      elapsedRef.current = 0;
      onReset?.();
    }, [stop, onReset]);

    const handleLap = useCallback(() => {
      const prevTotal = laps.length > 0 ? laps[0].totalTime : 0;
      const lap: StopwatchLap = {
        number: laps.length + 1,
        lapTime: elapsed - prevTotal,
        totalTime: elapsed,
      };
      setLaps((prev) => [lap, ...prev]);
      onLap?.(lap);
    }, [elapsed, laps, onLap]);

    useEffect(() => {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);

    useEffect(() => {
      if (autoStart && !intervalRef.current) {
        start();
      }
    }, [autoStart, start]);

    const { minutes, seconds, centiseconds } = formatTime(elapsed);

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.display}>
          <span className={styles.digit}>{minutes}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.digit}>{seconds}</span>
          <span className={styles.separator}>.</span>
          <span className={`${styles.digit} ${styles.centi}`}>{centiseconds}</span>
        </div>

        <div className={styles.controls}>
          {showLaps && (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={running ? handleLap : handleReset}
              disabled={!running && elapsed === 0}
              title={running ? "랩" : "리셋"}
            >
              {running ? <Flag size={16} /> : <RotateCcw size={16} />}
              <span>{running ? "랩" : "리셋"}</span>
            </button>
          )}

          <button
            type="button"
            className={`${styles.playBtn} ${running ? styles.pauseBtn : ""}`}
            onClick={toggleRunning}
          >
            {running ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {!showLaps && (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleReset}
              disabled={elapsed === 0}
              title="리셋"
            >
              <RotateCcw size={16} />
              <span>리셋</span>
            </button>
          )}
        </div>

        {showLaps && laps.length > 0 && (
          <div className={styles.laps}>
            <div className={styles.lapHeader}>
              <span>랩</span>
              <span>랩 타임</span>
              <span>전체</span>
            </div>
            {laps.map((lap) => (
              <div key={lap.number} className={styles.lapRow}>
                <span className={styles.lapNum}>{lap.number}</span>
                <span className={styles.lapTime}>{formatLapTime(lap.lapTime)}</span>
                <span className={styles.lapTotal}>{formatLapTime(lap.totalTime)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Stopwatch.displayName = "Stopwatch";
