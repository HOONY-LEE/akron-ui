import React, { forwardRef, useState, useCallback } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import styles from "./TreeView.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreeNode {
  /** 고유 식별자 */
  id: string;
  /** 표시 레이블 */
  label: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 자식 노드 */
  children?: TreeNode[];
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 데이터 */
  data?: unknown;
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** 트리 노드 목록 */
  nodes: TreeNode[];
  /** 선택된 노드 ID */
  selectedId?: string | null;
  /** 선택 핸들러 */
  onSelect?: (node: TreeNode) => void;
  /** 확장된 노드 ID 목록 (제어) */
  expandedIds?: string[];
  /** 확장/축소 변경 핸들러 */
  onExpandChange?: (ids: string[]) => void;
  /** 기본 확장 노드 ID 목록 (비제어) */
  defaultExpandedIds?: string[];
  /** 모든 노드 기본 확장 */
  defaultExpanded?: boolean;
  /** 아이콘 표시 */
  showIcons?: boolean;
  /** 연결선 표시 */
  showLines?: boolean;
  /** 크기 */
  size?: "sm" | "md";
}

// ─── TreeNodeItem ─────────────────────────────────────────────────────────────

interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  selectedId: string | null | undefined;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (node: TreeNode) => void;
  showIcons: boolean;
  showLines: boolean;
  size: "sm" | "md";
  isLast: boolean;
}

function TreeNodeItem({
  node,
  depth,
  selectedId,
  expandedIds,
  onToggleExpand,
  onSelect,
  showIcons,
  showLines,
  size,
  isLast,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    if (node.disabled) return;
    if (hasChildren) onToggleExpand(node.id);
    onSelect(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (node.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
    if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
      e.preventDefault();
      onToggleExpand(node.id);
    }
    if (e.key === "ArrowLeft" && isExpanded) {
      e.preventDefault();
      onToggleExpand(node.id);
    }
  };

  return (
    <li
      className={styles.nodeItem}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-disabled={node.disabled}
    >
      {/* Node row */}
      <div
        className={[
          styles.nodeRow,
          styles[size],
          isSelected ? styles.selected : "",
          node.disabled ? styles.nodeDisabled : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={node.disabled ? -1 : 0}
      >
        {/* Lines */}
        {showLines && depth > 0 && (
          <span
            className={[styles.line, isLast ? styles.lineLast : ""]
              .filter(Boolean)
              .join(" ")}
          />
        )}

        {/* Expand toggle */}
        <span className={styles.expandIcon}>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span className={styles.expandPlaceholder} />
          )}
        </span>

        {/* Node icon */}
        {showIcons && node.icon && (
          <span className={styles.nodeIcon}>{node.icon}</span>
        )}

        {/* Label */}
        <span className={styles.nodeLabel}>{node.label}</span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <ul className={styles.childList} role="group">
          {node.children!.map((child, i) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              showIcons={showIcons}
              showLines={showLines}
              size={size}
              isLast={i === node.children!.length - 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAllIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  function walk(ns: TreeNode[]) {
    for (const n of ns) {
      if (n.children && n.children.length > 0) {
        ids.push(n.id);
        walk(n.children);
      }
    }
  }
  walk(nodes);
  return ids;
}

// ─── TreeView ─────────────────────────────────────────────────────────────────

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      nodes,
      selectedId,
      onSelect,
      expandedIds: expandedIdsProp,
      onExpandChange,
      defaultExpandedIds,
      defaultExpanded = false,
      showIcons = true,
      showLines = false,
      size = "md",
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = expandedIdsProp !== undefined;
    const [internalExpandedIds, setInternalExpandedIds] = useState<Set<string>>(
      () => new Set(defaultExpanded ? getAllIds(nodes) : (defaultExpandedIds ?? [])),
    );

    const expandedIds: Set<string> = isControlled
      ? new Set(expandedIdsProp)
      : internalExpandedIds;

    const handleToggleExpand = useCallback(
      (id: string) => {
        const next = new Set(expandedIds);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        if (!isControlled) setInternalExpandedIds(next);
        onExpandChange?.(Array.from(next));
      },
      [expandedIds, isControlled, onExpandChange],
    );

    const handleSelect = useCallback(
      (node: TreeNode) => {
        onSelect?.(node);
      },
      [onSelect],
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <ul className={styles.rootList} role="tree">
          {nodes.map((node, i) => (
            <TreeNodeItem
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggleExpand={handleToggleExpand}
              onSelect={handleSelect}
              showIcons={showIcons}
              showLines={showLines}
              size={size}
              isLast={i === nodes.length - 1}
            />
          ))}
        </ul>
      </div>
    );
  },
);

TreeView.displayName = "TreeView";
