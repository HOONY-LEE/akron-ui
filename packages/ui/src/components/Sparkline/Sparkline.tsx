import { forwardRef, useMemo, useId } from "react";
import styles from "./Sparkline.module.css";

export type SparklineVariant = "line" | "area" | "bar";

export interface SparklineProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "data"> {
  /** Array of numeric values to plot */
  data: number[];
  /** Chart variant */
  variant?: SparklineVariant;
  /** Stroke / fill color */
  color?: string;
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Stroke width for line / area */
  strokeWidth?: number;
  /** Show dots on data points (line / area only) */
  showDots?: boolean;
  /** Area fill opacity */
  fillOpacity?: number;
  /** Interpolation type */
  curveType?: "linear" | "monotone";
  /** Enable draw-in animation */
  animate?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                   */
/* ------------------------------------------------------------------ */

interface Point {
  x: number;
  y: number;
}

const PADDING = 4;

function scalePoints(
  data: number[],
  width: number,
  height: number,
  strokeWidth: number
): Point[] {
  if (data.length === 0) return [];
  const pad = PADDING + strokeWidth / 2;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;
  const xStep = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0;

  return data.map((v, i) => ({
    x: pad + i * xStep,
    y: pad + (1 - (v - minVal) / range) * (height - pad * 2),
  }));
}

/* Catmull-Rom → cubic Bezier conversion for monotone curves */
function catmullRomToBezier(points: Point[]): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M${points[0].x},${points[0].y}L${points[1].x},${points[1].y}`;
  }

  const n = points.length;
  const parts: string[] = [`M${points[0].x},${points[0].y}`];
  const tension = 0.5;

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];

    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 3;
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 3;
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 3;
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 3;

    parts.push(`C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`);
  }

  return parts.join("");
}

function linearPath(points: Point[]): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join("");
}

function buildPath(points: Point[], curveType: "linear" | "monotone"): string {
  return curveType === "monotone"
    ? catmullRomToBezier(points)
    : linearPath(points);
}

function buildAreaPath(
  linePath: string,
  points: Point[],
  height: number,
  strokeWidth: number
): string {
  if (points.length === 0) return "";
  const pad = PADDING + strokeWidth / 2;
  const bottom = height - pad;
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath}L${last.x},${bottom}L${first.x},${bottom}Z`;
}

/* Approximate path length for stroke-dashoffset animation */
function approxPathLength(points: Point[]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return Math.ceil(len);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const Sparkline = forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      variant = "line",
      color = "var(--ark-color-primary-500)",
      width = 120,
      height = 32,
      strokeWidth = 2,
      showDots = false,
      fillOpacity = 0.1,
      curveType = "monotone",
      animate = true,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const uid = useId();
    const points = useMemo(
      () => scalePoints(data, width, height, strokeWidth),
      [data, width, height, strokeWidth]
    );

    const pathD = useMemo(
      () => buildPath(points, curveType),
      [points, curveType]
    );

    const areaD = useMemo(
      () => buildAreaPath(pathD, points, height, strokeWidth),
      [pathD, points, height, strokeWidth]
    );

    const dashLength = useMemo(() => approxPathLength(points), [points]);

    if (data.length === 0) {
      return (
        <svg
          ref={ref}
          role="img"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className={[styles.root, className].filter(Boolean).join(" ")}
          style={style}
          {...rest}
        />
      );
    }

    /* ── Bar variant ── */
    if (variant === "bar") {
      const pad = PADDING;
      const minVal = Math.min(...data);
      const maxVal = Math.max(...data);
      const range = maxVal - minVal || 1;
      const gap = 2;
      const barWidth = Math.max(
        1,
        (width - pad * 2 - gap * (data.length - 1)) / data.length
      );
      const bottom = height - pad;

      return (
        <svg
          ref={ref}
          role="img"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className={[styles.root, className].filter(Boolean).join(" ")}
          style={style}
          {...rest}
        >
          {data.map((v, i) => {
            const barH = Math.max(1, ((v - minVal) / range) * (height - pad * 2));
            return (
              <rect
                key={`${uid}-bar-${i}`}
                className={[styles.bar, animate ? styles.barAnimated : ""]
                  .filter(Boolean)
                  .join(" ")}
                x={pad + i * (barWidth + gap)}
                y={bottom - barH}
                width={barWidth}
                height={barH}
                fill={color}
                style={animate ? { animationDelay: `${i * 30}ms` } : undefined}
              />
            );
          })}
        </svg>
      );
    }

    /* ── Line / Area variant ── */
    return (
      <svg
        ref={ref}
        role="img"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={[styles.root, className].filter(Boolean).join(" ")}
        style={
          {
            ...style,
            "--ark-sparkline-dash-length": dashLength,
          } as React.CSSProperties
        }
        {...rest}
      >
        {/* Area fill */}
        {variant === "area" && (
          <path
            d={areaD}
            fill={color}
            fillOpacity={fillOpacity}
            className={[styles.area, animate ? styles.areaAnimated : ""]
              .filter(Boolean)
              .join(" ")}
          />
        )}

        {/* Stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={[styles.path, animate ? styles.pathAnimated : ""]
            .filter(Boolean)
            .join(" ")}
          strokeDasharray={animate ? dashLength : undefined}
          strokeDashoffset={animate ? 0 : undefined}
        />

        {/* Dots */}
        {showDots &&
          points.map((p, i) => (
            <circle
              key={`${uid}-dot-${i}`}
              className={styles.dot}
              cx={p.x}
              cy={p.y}
              r={strokeWidth}
              fill={color}
            />
          ))}
      </svg>
    );
  }
);

Sparkline.displayName = "Sparkline";
