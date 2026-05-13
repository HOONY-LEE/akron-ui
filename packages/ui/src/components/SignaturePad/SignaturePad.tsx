import React, { forwardRef, useRef, useState, useCallback, useEffect, useImperativeHandle } from "react";
import { Eraser, Undo2, Download } from "lucide-react";
import styles from "./SignaturePad.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SignaturePadRef {
  /** 캔버스 초기화 */
  clear: () => void;
  /** 빈 캔버스 여부 */
  isEmpty: () => boolean;
  /** PNG data URL 반환 */
  toDataURL: (type?: string, quality?: number) => string;
  /** 마지막 획 실행 취소 */
  undo: () => void;
}

export interface SignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 너비 */
  width?: number;
  /** 높이 */
  height?: number;
  /** 펜 색상 */
  penColor?: string;
  /** 펜 두께 */
  penWidth?: number;
  /** 배경색 */
  backgroundColor?: string;
  /** 변경 콜백 (빈 여부) */
  onChange?: (isEmpty: boolean) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 툴바 표시 */
  showToolbar?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  (
    {
      width = 400,
      height = 200,
      penColor,
      penWidth = 2,
      backgroundColor,
      onChange,
      disabled = false,
      placeholder = "여기에 서명하세요",
      showToolbar = true,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const [empty, setEmpty] = useState(true);
    const strokes = useRef<ImageData[]>([]);
    const currentStrokeStart = useRef<ImageData | null>(null);

    const getCtx = useCallback(() => {
      return canvasRef.current?.getContext("2d") ?? null;
    }, []);

    const clearCanvas = useCallback(() => {
      const ctx = getCtx();
      if (!ctx || !canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      strokes.current = [];
      setEmpty(true);
      onChange?.(true);
    }, [getCtx, backgroundColor, onChange]);

    const isCanvasEmpty = useCallback(() => {
      return empty;
    }, [empty]);

    const toDataURL = useCallback(
      (type = "image/png", quality = 1) => {
        return canvasRef.current?.toDataURL(type, quality) ?? "";
      },
      []
    );

    const undo = useCallback(() => {
      const ctx = getCtx();
      if (!ctx || !canvasRef.current) return;
      if (strokes.current.length === 0) return;

      strokes.current.pop();
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      if (strokes.current.length > 0) {
        ctx.putImageData(strokes.current[strokes.current.length - 1], 0, 0);
      }

      const isEmpty = strokes.current.length === 0;
      setEmpty(isEmpty);
      onChange?.(isEmpty);
    }, [getCtx, backgroundColor, onChange]);

    useImperativeHandle(ref, () => ({
      clear: clearCanvas,
      isEmpty: isCanvasEmpty,
      toDataURL,
      undo,
    }));

    // Init canvas
    useEffect(() => {
      const ctx = getCtx();
      if (!ctx || !canvasRef.current) return;
      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }, [getCtx, backgroundColor]);

    const getPos = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        if ("touches" in e) {
          const touch = e.touches[0];
          return {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
          };
        }
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      },
      []
    );

    const startDrawing = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;
        const ctx = getCtx();
        if (!ctx || !canvasRef.current) return;

        isDrawing.current = true;
        currentStrokeStart.current = ctx.getImageData(
          0, 0, canvasRef.current.width, canvasRef.current.height
        );

        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.strokeStyle = penColor || "var(--ark-color-text)";
        ctx.lineWidth = penWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      },
      [disabled, getCtx, getPos, penColor, penWidth]
    );

    const draw = useCallback(
      (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing.current || disabled) return;
        const ctx = getCtx();
        if (!ctx) return;

        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      },
      [disabled, getCtx, getPos]
    );

    const stopDrawing = useCallback(() => {
      if (!isDrawing.current) return;
      isDrawing.current = false;

      const ctx = getCtx();
      if (ctx && canvasRef.current) {
        ctx.closePath();
        const imgData = ctx.getImageData(
          0, 0, canvasRef.current.width, canvasRef.current.height
        );
        strokes.current.push(imgData);
        setEmpty(false);
        onChange?.(false);
      }
    }, [getCtx, onChange]);

    const handleDownload = useCallback(() => {
      const dataUrl = toDataURL();
      const link = document.createElement("a");
      link.download = "signature.png";
      link.href = dataUrl;
      link.click();
    }, [toDataURL]);

    const rootCls = [
      styles.root,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={rootCls} style={style} {...rest}>
        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={styles.canvas}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {empty && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>

        {showToolbar && (
          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.toolButton}
              onClick={undo}
              disabled={disabled || empty}
              title="실행 취소"
            >
              <Undo2 size={16} />
            </button>
            <button
              type="button"
              className={styles.toolButton}
              onClick={clearCanvas}
              disabled={disabled || empty}
              title="전체 지우기"
            >
              <Eraser size={16} />
            </button>
            <button
              type="button"
              className={styles.toolButton}
              onClick={handleDownload}
              disabled={disabled || empty}
              title="다운로드"
            >
              <Download size={16} />
            </button>
          </div>
        )}
      </div>
    );
  }
);

SignaturePad.displayName = "SignaturePad";
