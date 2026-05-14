import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./VirtualList.module.css";

export interface VirtualListProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items: T[];
  itemHeight: number;
  height: number | string;
  width?: number | string;
  overscan?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  emptyMessage?: string;
  getItemKey?: (item: T, index: number) => string | number;
}

function VirtualListInner<T>(
  props: VirtualListProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    items,
    itemHeight,
    height,
    width = "100%",
    overscan = 5,
    renderItem,
    onEndReached,
    endReachedThreshold = 200,
    emptyMessage = "항목이 없습니다.",
    getItemKey,
    className,
    style,
    ...rest
  } = props;

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const endReachedFiredRef = useRef(false);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setContainerHeight(container.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const newScrollTop = container.scrollTop;
      setScrollTop(newScrollTop);

      if (onEndReached) {
        const totalHeight = items.length * itemHeight;
        const distanceFromBottom =
          totalHeight - (newScrollTop + container.clientHeight);

        if (distanceFromBottom <= endReachedThreshold) {
          if (!endReachedFiredRef.current) {
            endReachedFiredRef.current = true;
            onEndReached();
          }
        } else {
          endReachedFiredRef.current = false;
        }
      }
    });
  }, [items.length, itemHeight, onEndReached, endReachedThreshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const endIndex = Math.min(
    items.length,
    Math.floor(scrollTop / itemHeight) + visibleCount + overscan
  );

  const containerStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    width: typeof width === "number" ? `${width}px` : width,
    ...style,
  };

  if (items.length === 0) {
    return (
      <div
        ref={setRefs}
        className={`${styles.root}${className ? ` ${className}` : ""}`}
        style={containerStyle}
        {...rest}
      >
        <div className={styles.empty}>{emptyMessage}</div>
      </div>
    );
  }

  const visibleItems: React.ReactNode[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    const item = items[i];
    const key = getItemKey ? getItemKey(item, i) : i;
    visibleItems.push(
      <div
        key={key}
        className={styles.item}
        style={{
          top: i * itemHeight,
          height: itemHeight,
        }}
      >
        {renderItem(item, i)}
      </div>
    );
  }

  return (
    <div
      ref={setRefs}
      className={`${styles.root}${className ? ` ${className}` : ""}`}
      style={containerStyle}
      {...rest}
    >
      <div className={styles.inner} style={{ height: totalHeight }}>
        {visibleItems}
      </div>
    </div>
  );
}

export const VirtualList = React.forwardRef(VirtualListInner) as <T>(
  props: VirtualListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement | null;
