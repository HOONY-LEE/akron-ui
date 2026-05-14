import React, { forwardRef, useCallback, useRef, useState } from "react";
import { Pin, X, GripVertical } from "lucide-react";
import styles from "./PinBoard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PinColor = "yellow" | "green" | "blue" | "pink" | "purple" | "orange";

export interface PinItem {
  id: string;
  content: string;
  color?: PinColor;
  x: number;
  y: number;
  width?: number;
  height?: number;
  pinned?: boolean;
  author?: string;
}

export interface PinBoardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Array of pin items to render on the board */
  items: PinItem[];
  /** Called when items change (after drag repositioning) */
  onChange?: (items: PinItem[]) => void;
  /** Called when an item is clicked */
  onItemClick?: (item: PinItem) => void;
  /** Called when an item's delete button is clicked */
  onItemDelete?: (id: string) => void;
  /** If true, items cannot be dragged or deleted */
  readOnly?: boolean;
  /** Minimum height of the board in px */
  minHeight?: number;
  /** Show dot grid background */
  showGrid?: boolean;
  /** Grid dot spacing in px */
  gridSize?: number;
  /** Snap item positions to nearest grid point */
  snapToGrid?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const COLOR_CLASS: Record<PinColor, string> = {
  yellow: styles.yellow,
  green: styles.green,
  blue: styles.blue,
  pink: styles.pink,
  purple: styles.purple,
  orange: styles.orange,
};

function snapValue(value: number, grid: number): number {
  return Math.round(value / grid) * grid;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PinBoard = forwardRef<HTMLDivElement, PinBoardProps>(
  (
    {
      items,
      onChange,
      onItemClick,
      onItemDelete,
      readOnly = false,
      minHeight = 500,
      showGrid = true,
      gridSize = 20,
      snapToGrid = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [topZId, setTopZId] = useState<string | null>(null);
    const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const boardRef = useRef<HTMLDivElement | null>(null);

    // Compute board height based on item positions
    const computedHeight = items.reduce((max, item) => {
      const bottom = item.y + (item.height ?? 150) + 20;
      return Math.max(max, bottom);
    }, minHeight);

    // ── Mouse drag handlers ──────────────────────────────────────────────────

    const handleMouseDown = useCallback(
      (e: React.MouseEvent, item: PinItem) => {
        if (readOnly || item.pinned) return;
        e.preventDefault();

        const board = boardRef.current;
        if (!board) return;

        const boardRect = board.getBoundingClientRect();
        dragOffset.current = {
          x: e.clientX - boardRect.left - item.x,
          y: e.clientY - boardRect.top - item.y,
        };

        setDraggingId(item.id);
        setTopZId(item.id);

        const handleMouseMove = (me: MouseEvent) => {
          const rect = board.getBoundingClientRect();
          let newX = me.clientX - rect.left - dragOffset.current.x;
          let newY = me.clientY - rect.top - dragOffset.current.y;

          // Clamp to board bounds
          const w = item.width ?? 200;
          const h = item.height ?? 150;
          newX = Math.max(0, Math.min(newX, rect.width - w));
          newY = Math.max(0, newY);

          if (snapToGrid) {
            newX = snapValue(newX, gridSize);
            newY = snapValue(newY, gridSize);
          }

          const updated = items.map((it) =>
            it.id === item.id ? { ...it, x: newX, y: newY } : it,
          );
          onChange?.(updated);
        };

        const handleMouseUp = () => {
          setDraggingId(null);
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [items, onChange, readOnly, snapToGrid, gridSize],
    );

    // ── Render ───────────────────────────────────────────────────────────────

    const rootCls = [
      styles.root,
      showGrid ? styles.grid : "",
      readOnly ? styles.readOnly : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={(node) => {
          boardRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={rootCls}
        style={{
          minHeight: `${minHeight}px`,
          height: `${computedHeight}px`,
          "--ark-pinboard-grid-size": `${gridSize}px`,
          "--ark-pinboard-min-height": `${minHeight}px`,
          ...style,
        } as React.CSSProperties}
        {...rest}
      >
        {items.map((item, index) => {
          const colorCls = COLOR_CLASS[item.color ?? "yellow"];
          const isDragging = draggingId === item.id;
          const isTop = topZId === item.id;

          const itemCls = [
            styles.item,
            colorCls,
            isDragging ? styles.dragging : "",
            item.pinned ? styles.pinned : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={item.id}
              className={itemCls}
              tabIndex={0}
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.width ?? 200}px`,
                height: `${item.height ?? 150}px`,
                zIndex: isTop ? 100 : index + 1,
              }}
              onClick={() => onItemClick?.(item)}
            >
              {/* Header with grip & delete */}
              <div className={styles.itemHeader}>
                {!readOnly && !item.pinned && (
                  <span
                    className={styles.grip}
                    onMouseDown={(e) => handleMouseDown(e, item)}
                  >
                    <GripVertical size={14} />
                  </span>
                )}

                {!readOnly && onItemDelete && (
                  <button
                    className={styles.deleteBtn}
                    type="button"
                    aria-label="Delete note"
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemDelete(item.id);
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Pin icon for pinned items */}
              {item.pinned && (
                <span className={styles.pinIcon} aria-label="Pinned">
                  <Pin size={14} />
                </span>
              )}

              {/* Content */}
              <div className={styles.itemContent}>{item.content}</div>

              {/* Author */}
              {item.author && (
                <div className={styles.itemAuthor}>{item.author}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

PinBoard.displayName = "PinBoard";
