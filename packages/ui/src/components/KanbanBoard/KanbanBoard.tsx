import React, { forwardRef, useState, useCallback } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import styles from "./KanbanBoard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  /** 라벨 태그 */
  labels?: KanbanLabel[];
  /** 커스텀 footer 콘텐츠 */
  footer?: React.ReactNode;
}

export interface KanbanLabel {
  text: string;
  color?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  /** 컬럼 헤더 색상 바 */
  color?: string;
}

export interface KanbanBoardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 컬럼 목록 */
  columns: KanbanColumn[];
  /** 카드 이동 콜백 */
  onChange?: (columns: KanbanColumn[]) => void;
  /** 카드 클릭 콜백 */
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  /** 카드 추가 버튼 클릭 */
  onAddCard?: (columnId: string) => void;
  /** 컬럼 최소 너비 */
  columnMinWidth?: number;
  /** 카드 추가 버튼 표시 여부 */
  showAddButton?: boolean;
}

// ─── Default label colors ─────────────────────────────────────────────────────

const DEFAULT_LABEL_COLORS: Record<string, string> = {
  bug: "var(--ark-color-error-500)",
  feature: "var(--ark-color-primary-500)",
  urgent: "var(--ark-color-warning-500)",
  done: "var(--ark-color-success-500)",
};

function getLabelColor(label: KanbanLabel): string {
  if (label.color) return label.color;
  const key = label.text.toLowerCase();
  return DEFAULT_LABEL_COLORS[key] || "var(--ark-color-gray-400)";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      onChange,
      onCardClick,
      onAddCard,
      columnMinWidth = 280,
      showAddButton = true,
      className,
      ...rest
    },
    ref
  ) => {
    const [dragState, setDragState] = useState<{
      cardId: string;
      fromColumnId: string;
    } | null>(null);
    const [overColumn, setOverColumn] = useState<string | null>(null);

    // ── Drag handlers ──
    const handleDragStart = useCallback(
      (e: React.DragEvent, cardId: string, columnId: string) => {
        setDragState({ cardId, fromColumnId: columnId });
        e.dataTransfer.effectAllowed = "move";
      },
      []
    );

    const handleColumnDragOver = useCallback(
      (e: React.DragEvent, columnId: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setOverColumn(columnId);
      },
      []
    );

    const handleColumnDrop = useCallback(
      (e: React.DragEvent, toColumnId: string) => {
        e.preventDefault();
        if (!dragState) return;

        const { cardId, fromColumnId } = dragState;
        if (fromColumnId === toColumnId) {
          setDragState(null);
          setOverColumn(null);
          return;
        }

        const next = columns.map((col) => ({ ...col, cards: [...col.cards] }));
        const fromCol = next.find((c) => c.id === fromColumnId);
        const toCol = next.find((c) => c.id === toColumnId);
        if (!fromCol || !toCol) return;

        const cardIndex = fromCol.cards.findIndex((c) => c.id === cardId);
        if (cardIndex < 0) return;

        const [card] = fromCol.cards.splice(cardIndex, 1);
        toCol.cards.push(card);

        onChange?.(next);
        setDragState(null);
        setOverColumn(null);
      },
      [dragState, columns, onChange]
    );

    const handleDragEnd = useCallback(() => {
      setDragState(null);
      setOverColumn(null);
    }, []);

    const rootCls = [styles.root, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        {columns.map((column) => {
          const isOver = overColumn === column.id && dragState?.fromColumnId !== column.id;

          return (
            <div
              key={column.id}
              className={[styles.column, isOver && styles.columnOver]
                .filter(Boolean)
                .join(" ")}
              style={{ minWidth: columnMinWidth }}
              onDragOver={(e) => handleColumnDragOver(e, column.id)}
              onDrop={(e) => handleColumnDrop(e, column.id)}
              onDragLeave={() => setOverColumn(null)}
            >
              {/* Column header */}
              <div className={styles.columnHeader}>
                {column.color && (
                  <span
                    className={styles.colorBar}
                    style={{ background: column.color }}
                  />
                )}
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <span className={styles.cardCount}>{column.cards.length}</span>
              </div>

              {/* Cards */}
              <div className={styles.cardList}>
                {column.cards.map((card) => {
                  const isDragging =
                    dragState?.cardId === card.id;

                  return (
                    <div
                      key={card.id}
                      className={[styles.card, isDragging && styles.cardDragging]
                        .filter(Boolean)
                        .join(" ")}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, card.id, column.id)
                      }
                      onDragEnd={handleDragEnd}
                      onClick={() => onCardClick?.(card, column.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onCardClick?.(card, column.id);
                        }
                      }}
                    >
                      {/* Labels */}
                      {card.labels && card.labels.length > 0 && (
                        <div className={styles.labels}>
                          {card.labels.map((label, i) => (
                            <span
                              key={i}
                              className={styles.label}
                              style={{ background: getLabelColor(label) }}
                            >
                              {label.text}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className={styles.cardTitle}>{card.title}</p>

                      {card.description && (
                        <p className={styles.cardDescription}>
                          {card.description}
                        </p>
                      )}

                      {card.footer && (
                        <div className={styles.cardFooter}>{card.footer}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add button */}
              {showAddButton && onAddCard && (
                <button
                  className={styles.addButton}
                  onClick={() => onAddCard(column.id)}
                  type="button"
                >
                  <Plus size={16} />
                  <span>카드 추가</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

KanbanBoard.displayName = "KanbanBoard";
