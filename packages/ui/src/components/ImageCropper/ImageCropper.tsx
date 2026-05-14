import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import { ZoomIn, ZoomOut, RotateCw, FlipHorizontal } from "lucide-react";
import styles from "./ImageCropper.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CropShape = "rect" | "circle";

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageCropperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Image source URL */
  src: string;
  /** Width/height aspect ratio. undefined = free crop */
  aspectRatio?: number;
  /** Crop shape */
  shape?: CropShape;
  /** Minimum crop width in px */
  minWidth?: number;
  /** Minimum crop height in px */
  minHeight?: number;
  /** Called when crop area changes */
  onChange?: (cropArea: CropArea) => void;
  /** Called with cropped image data URL */
  onCrop?: (dataUrl: string) => void;
  /** Show zoom/rotate controls */
  showControls?: boolean;
  /** Show rule-of-thirds grid */
  showGrid?: boolean;
  /** Output quality 0-1 */
  quality?: number;
  /** Output image format */
  outputFormat?: "image/png" | "image/jpeg" | "image/webp";
}

export interface ImageCropperRef {
  crop: () => string | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

type HandleDirection =
  | "nw"
  | "n"
  | "ne"
  | "e"
  | "se"
  | "s"
  | "sw"
  | "w";

// ─── Component ───────────────────────────────────────────────────────────────

export const ImageCropper = forwardRef<ImageCropperRef, ImageCropperProps>(
  (
    {
      src,
      aspectRatio,
      shape = "rect",
      minWidth = 50,
      minHeight = 50,
      onChange,
      onCrop,
      showControls = true,
      showGrid = true,
      quality = 0.92,
      outputFormat = "image/png",
      className,
      ...rest
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Image natural dimensions
    const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
    // Displayed image rect within container
    const [imgRect, setImgRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

    // Crop area in container coordinates
    const [crop, setCrop] = useState<CropArea>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    // Zoom / rotation / flip
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [flipH, setFlipH] = useState(false);

    // Drag state
    const dragState = useRef<{
      type: "move" | HandleDirection;
      startX: number;
      startY: number;
      startCrop: CropArea;
    } | null>(null);

    // ── Compute displayed image rect ──
    const computeImgRect = useCallback(() => {
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img || !img.naturalWidth) return;

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;

      setImgNatural({ w: nw, h: nh });

      const scale = Math.min(cw / nw, ch / nh) * zoom;
      const dw = nw * scale;
      const dh = nh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      setImgRect({ x: dx, y: dy, w: dw, h: dh });
    }, [zoom]);

    // ── Initialize crop area centered ──
    const initCrop = useCallback(
      (rect: { x: number; y: number; w: number; h: number }) => {
        const size = Math.min(rect.w, rect.h) * 0.8;
        let cw = size;
        let ch = size;

        if (aspectRatio) {
          if (aspectRatio > 1) {
            ch = cw / aspectRatio;
          } else {
            cw = ch * aspectRatio;
          }
          // Clamp to image rect
          if (cw > rect.w * 0.9) {
            cw = rect.w * 0.9;
            ch = cw / aspectRatio;
          }
          if (ch > rect.h * 0.9) {
            ch = rect.h * 0.9;
            cw = ch * aspectRatio;
          }
        }

        const cx = rect.x + (rect.w - cw) / 2;
        const cy = rect.y + (rect.h - ch) / 2;

        const newCrop = {
          x: Math.round(cx),
          y: Math.round(cy),
          width: Math.round(cw),
          height: Math.round(ch),
        };
        setCrop(newCrop);
        onChange?.(newCrop);
      },
      [aspectRatio, onChange]
    );

    // ── Image load ──
    const handleImageLoad = useCallback(() => {
      computeImgRect();
    }, [computeImgRect]);

    useEffect(() => {
      computeImgRect();
    }, [zoom, computeImgRect]);

    // Init crop after imgRect is set
    const initialized = useRef(false);
    useEffect(() => {
      if (imgRect.w > 0 && imgRect.h > 0 && !initialized.current) {
        initialized.current = true;
        initCrop(imgRect);
      }
    }, [imgRect, initCrop]);

    // Reset on src change
    useEffect(() => {
      initialized.current = false;
      setZoom(1);
      setRotation(0);
      setFlipH(false);
    }, [src]);

    // ── Constrain crop within image bounds ──
    const constrainCrop = useCallback(
      (c: CropArea): CropArea => {
        let { x, y, width, height } = c;
        width = Math.max(width, minWidth);
        height = Math.max(height, minHeight);

        // Keep within image rect
        x = clamp(x, imgRect.x, imgRect.x + imgRect.w - width);
        y = clamp(y, imgRect.y, imgRect.y + imgRect.h - height);
        width = Math.min(width, imgRect.w);
        height = Math.min(height, imgRect.h);

        return { x, y, width, height };
      },
      [imgRect, minWidth, minHeight]
    );

    // ── Pointer handlers ──
    const handlePointerDown = useCallback(
      (
        e: React.PointerEvent,
        type: "move" | HandleDirection
      ) => {
        e.preventDefault();
        e.stopPropagation();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        dragState.current = {
          type,
          startX: e.clientX,
          startY: e.clientY,
          startCrop: { ...crop },
        };
      },
      [crop]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!dragState.current) return;
        e.preventDefault();

        const ds = dragState.current;
        const dx = e.clientX - ds.startX;
        const dy = e.clientY - ds.startY;
        const sc = ds.startCrop;
        let newCrop: CropArea;

        if (ds.type === "move") {
          newCrop = constrainCrop({
            x: sc.x + dx,
            y: sc.y + dy,
            width: sc.width,
            height: sc.height,
          });
        } else {
          let nx = sc.x;
          let ny = sc.y;
          let nw = sc.width;
          let nh = sc.height;

          // Handle resize based on direction
          const dir = ds.type;

          if (dir.includes("w")) {
            nw = sc.width - dx;
            nx = sc.x + dx;
          }
          if (dir.includes("e")) {
            nw = sc.width + dx;
          }
          if (dir.includes("n")) {
            nh = sc.height - dy;
            ny = sc.y + dy;
          }
          if (dir.includes("s")) {
            nh = sc.height + dy;
          }

          // Enforce min size
          if (nw < minWidth) {
            if (dir.includes("w")) {
              nx = sc.x + sc.width - minWidth;
            }
            nw = minWidth;
          }
          if (nh < minHeight) {
            if (dir.includes("n")) {
              ny = sc.y + sc.height - minHeight;
            }
            nh = minHeight;
          }

          // Enforce aspect ratio
          if (aspectRatio) {
            if (
              dir === "n" ||
              dir === "s"
            ) {
              nw = nh * aspectRatio;
              if (dir === "n") {
                // Keep center x stable
              }
            } else if (dir === "e" || dir === "w") {
              nh = nw / aspectRatio;
            } else {
              // Corner handles: adjust height based on width
              nh = nw / aspectRatio;
              if (nh < minHeight) {
                nh = minHeight;
                nw = nh * aspectRatio;
              }
            }
          }

          newCrop = constrainCrop({
            x: nx,
            y: ny,
            width: nw,
            height: nh,
          });
        }

        setCrop(newCrop);
        onChange?.(newCrop);
      },
      [constrainCrop, aspectRatio, minWidth, minHeight, onChange]
    );

    const handlePointerUp = useCallback(() => {
      dragState.current = null;
    }, []);

    // ── Crop function ──
    const doCrop = useCallback((): string | null => {
      const img = imgRef.current;
      if (!img || !imgRect.w || !imgRect.h) return null;

      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas");
      }
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Map crop area from container coords to natural image coords
      const scaleX = imgNatural.w / imgRect.w;
      const scaleY = imgNatural.h / imgRect.h;

      const srcX = (crop.x - imgRect.x) * scaleX;
      const srcY = (crop.y - imgRect.y) * scaleY;
      const srcW = crop.width * scaleX;
      const srcH = crop.height * scaleY;

      canvas.width = Math.round(srcW);
      canvas.height = Math.round(srcH);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      if (flipH) ctx.scale(-1, 1);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // If circle shape, clip to circle
      if (shape === "circle") {
        ctx.beginPath();
        ctx.ellipse(
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2,
          canvas.height / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.clip();
      }

      ctx.drawImage(
        img,
        srcX,
        srcY,
        srcW,
        srcH,
        0,
        0,
        canvas.width,
        canvas.height
      );
      ctx.restore();

      const dataUrl = canvas.toDataURL(outputFormat, quality);
      onCrop?.(dataUrl);
      return dataUrl;
    }, [
      crop,
      imgRect,
      imgNatural,
      rotation,
      flipH,
      shape,
      outputFormat,
      quality,
      onCrop,
    ]);

    // ── Expose crop() via ref ──
    useImperativeHandle(
      ref,
      () => ({
        crop: doCrop,
      }),
      [doCrop]
    );

    // ── Controls ──
    const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
    const handleRotate = () =>
      setRotation((r) => (r + 90) % 360);
    const handleFlip = () => setFlipH((f) => !f);
    const handleZoomSlider = (e: React.ChangeEvent<HTMLInputElement>) =>
      setZoom(parseFloat(e.target.value));

    // Build image transform
    const imageTransform = [
      `rotate(${rotation}deg)`,
      flipH ? "scaleX(-1)" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const handles: HandleDirection[] = [
      "nw",
      "n",
      "ne",
      "e",
      "se",
      "s",
      "sw",
      "w",
    ];
    const handleClassMap: Record<HandleDirection, string> = {
      nw: styles.handleNW,
      n: styles.handleN,
      ne: styles.handleNE,
      e: styles.handleE,
      se: styles.handleSE,
      s: styles.handleS,
      sw: styles.handleSW,
      w: styles.handleW,
    };

    return (
      <div
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <div
          ref={containerRef}
          className={styles.imageContainer}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <img
            ref={imgRef}
            src={src}
            alt=""
            className={styles.image}
            style={{
              transform: imageTransform || undefined,
              maxWidth: `${zoom * 100}%`,
              maxHeight: `${zoom * 100}%`,
            }}
            draggable={false}
            onLoad={handleImageLoad}
            crossOrigin="anonymous"
          />

          {/* Crop area */}
          {crop.width > 0 && crop.height > 0 && (
            <div
              className={[
                styles.cropArea,
                shape === "circle" ? styles.circle : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                left: crop.x,
                top: crop.y,
                width: crop.width,
                height: crop.height,
              }}
              onPointerDown={(e) => handlePointerDown(e, "move")}
            >
              {/* Grid lines */}
              {showGrid && (
                <div className={styles.grid}>
                  <div className={styles.gridLineH} />
                  <div className={styles.gridLineH} />
                  <div className={styles.gridLineV} />
                  <div className={styles.gridLineV} />
                </div>
              )}

              {/* Resize handles */}
              {handles.map((dir) => (
                <div
                  key={dir}
                  className={`${styles.handle} ${handleClassMap[dir]}`}
                  onPointerDown={(e) => handlePointerDown(e, dir)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        {showControls && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleZoomOut}
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>

            <input
              type="range"
              className={styles.zoomSlider}
              min={0.5}
              max={3}
              step={0.05}
              value={zoom}
              onChange={handleZoomSlider}
              aria-label="Zoom"
            />

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleZoomIn}
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleRotate}
              aria-label="Rotate 90°"
            >
              <RotateCw size={16} />
            </button>

            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleFlip}
              aria-label="Flip horizontal"
            >
              <FlipHorizontal size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

ImageCropper.displayName = "ImageCropper";
