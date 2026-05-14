import React, { forwardRef, useMemo } from "react";
import styles from "./QRCode.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QRCodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "data"> {
  /** 인코딩할 데이터 */
  data: string;
  /** QR 크기 (px) */
  size?: number;
  /** 전경 색 */
  fgColor?: string;
  /** 배경 색 */
  bgColor?: string;
  /** 하단 라벨 */
  label?: string;
}

// ─── QR 생성 ──────────────────────────────────────────────────────────────────

/** 간단한 QR-like 패턴 생성기 (데모용, 실제 QR 인코딩 아님) */
function generateMatrix(data: string, moduleCount: number): boolean[][] {
  const matrix: boolean[][] = Array.from({ length: moduleCount }, () =>
    Array(moduleCount).fill(false)
  );

  // 포지션 패턴 (7×7)
  const drawFinder = (r: number, c: number) => {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const isOuter = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const isInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        matrix[r + dr][c + dc] = isOuter || isInner;
      }
    }
  };
  drawFinder(0, 0);
  drawFinder(0, moduleCount - 7);
  drawFinder(moduleCount - 7, 0);

  // 타이밍 패턴
  for (let i = 8; i < moduleCount - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // 데이터 기반 의사 랜덤 채움
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (matrix[r][c]) continue;
      // 포지션 패턴 영역 + 구분 영역 건너뛰기
      if (r < 9 && c < 9) continue;
      if (r < 9 && c >= moduleCount - 8) continue;
      if (r >= moduleCount - 8 && c < 9) continue;
      hash = ((hash << 5) - hash + r * moduleCount + c) | 0;
      matrix[r][c] = (hash & 1) === 1;
    }
  }

  return matrix;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      data,
      size = 128,
      fgColor = "var(--akron-text)",
      bgColor = "var(--akron-bg)",
      label,
      className,
      ...rest
    },
    ref
  ) => {
    const moduleCount = 25;
    const matrix = useMemo(() => generateMatrix(data, moduleCount), [data]);
    const cellSize = size / moduleCount;

    return (
      <div ref={ref} className={`${styles.wrapper} ${className ?? ""}`} {...rest}>
        <svg
          className={styles.svg}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`QR code: ${data}`}
        >
          <rect width={size} height={size} fill={bgColor} />
          {matrix.map((row, r) =>
            row.map(
              (cell, c) =>
                cell && (
                  <rect
                    key={`${r}-${c}`}
                    x={c * cellSize}
                    y={r * cellSize}
                    width={cellSize}
                    height={cellSize}
                    fill={fgColor}
                  />
                )
            )
          )}
        </svg>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  }
);

QRCode.displayName = "QRCode";
