import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import styles from "./Stack.module.css";

type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  gap?: number;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
}

const alignMap: Record<Align, string> = {
  start: "alignStart",
  center: "alignCenter",
  end: "alignEnd",
  stretch: "alignStretch",
};

const justifyMap: Record<Justify, string> = {
  start: "justifyStart",
  center: "justifyCenter",
  end: "justifyEnd",
  between: "justifyBetween",
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "vertical",
      gap = 0,
      align,
      justify,
      wrap = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const cls = [
      styles.stack,
      styles[direction],
      wrap ? styles.wrap : "",
      align ? styles[alignMap[align]] : "",
      justify ? styles[justifyMap[justify]] : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const gapStyle = gap > 0 ? ({ gap: `${gap}px`, ...style } as CSSProperties) : style;

    return (
      <div ref={ref} className={cls} style={gapStyle} {...rest}>
        {children}
      </div>
    );
  },
);

Stack.displayName = "Stack";
