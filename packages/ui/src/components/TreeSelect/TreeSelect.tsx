import React, { forwardRef, useState, useCallback, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, Check, X, Search } from "lucide-react";
import styles from "./TreeSelect.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreeSelectNode {
  /** 고유 ID */
  id: string;
  /** 표시 레이블 */
  label: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 자식 노드 */
  children?: TreeSelectNode[];
  /** 비활성화 */
  disabled?: boolean;
}

export interface TreeSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 트리 노드 목록 */
  nodes: TreeSelectNode[];
  /** 선택된 값 (제어) */
  value?: string | null;
  /** 기본 선택 값 (비제어) */
  defaultValue?: string | null;
  /** 변경 핸들러 */
  onChange?: (nodeId: string | null, node: TreeSelectNode | null) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 검색 활성화 */
  searchable?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
  /** 선택 해제 허용 */
  clearable?: boolean;
  /** 기본 확장 노드 ID */
  defaultExpandedIds?: string[];
  /** 전체 확장 */
  expandAll?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findNode(nodes: TreeSelectNode[], id: string): TreeSelectNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function getAllIds(nodes: TreeSelectNode[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    ids.push(node.id);
    if (node.children) ids.push(...getAllIds(node.children));
  }
  return ids;
}

function filterNodes(
  nodes: TreeSelectNode[],
  query: string
): TreeSelectNode[] {
  const lower = query.toLowerCase();
  return nodes.reduce<TreeSelectNode[]>((acc, node) => {
    const childMatch = node.children ? filterNodes(node.children, query) : [];
    if (node.label.toLowerCase().includes(lower) || childMatch.length > 0) {
      acc.push({
        ...node,
        children: childMatch.length > 0 ? childMatch : node.children,
      });
    }
    return acc;
  }, []);
}

// ─── TreeNode Renderer ────────────────────────────────────────────────────────

interface TreeNodeItemProps {
  node: TreeSelectNode;
  selectedId: string | null;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (node: TreeSelectNode) => void;
  depth: number;
}

function TreeNodeItem({
  node,
  selectedId,
  expandedIds,
  onToggle,
  onSelect,
  depth,
}: TreeNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <div className={styles.nodeGroup}>
      <button
        type="button"
        className={`${styles.nodeItem} ${isSelected ? styles.selected : ""} ${
          node.disabled ? styles.disabled : ""
        }`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => {
          if (node.disabled) return;
          if (hasChildren) onToggle(node.id);
          onSelect(node);
        }}
        disabled={node.disabled}
      >
        <span className={styles.expandIcon}>
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span style={{ width: 14 }} />
          )}
        </span>
        {node.icon && <span className={styles.nodeIcon}>{node.icon}</span>}
        <span className={styles.nodeLabel}>{node.label}</span>
        {isSelected && (
          <Check size={14} className={styles.checkIcon} />
        )}
      </button>
      {hasChildren && isExpanded && (
        <div className={styles.childGroup}>
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TreeSelect = forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      nodes,
      value: valueProp,
      defaultValue = null,
      onChange,
      placeholder = "선택하세요",
      size = "md",
      disabled = false,
      error = false,
      errorMessage,
      searchable = false,
      searchPlaceholder = "검색...",
      clearable = false,
      defaultExpandedIds = [],
      expandAll = false,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
    const selectedId = isControlled ? (valueProp ?? null) : internalValue;

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
      () => new Set(expandAll ? getAllIds(nodes) : defaultExpandedIds)
    );

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
          setSearch("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggle = useCallback((id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }, []);

    const handleSelect = useCallback(
      (node: TreeSelectNode) => {
        if (node.disabled) return;
        if (!isControlled) setInternalValue(node.id);
        onChange?.(node.id, node);
        setOpen(false);
        setSearch("");
      },
      [isControlled, onChange]
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isControlled) setInternalValue(null);
        onChange?.(null, null);
      },
      [isControlled, onChange]
    );

    const selectedNode = selectedId ? findNode(nodes, selectedId) : null;
    const displayNodes = search ? filterNodes(nodes, search) : nodes;

    return (
      <div
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={`${styles.wrapper} ${styles[size]} ${disabled ? styles.disabled : ""} ${
          error ? styles.error : ""
        } ${className ?? ""}`}
        {...rest}
      >
        <button
          type="button"
          className={`${styles.trigger} ${open ? styles.open : ""}`}
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
        >
          <span className={styles.triggerLabel}>
            {selectedNode ? (
              <span className={styles.selectedLabel}>
                {selectedNode.icon && (
                  <span className={styles.selectedIcon}>{selectedNode.icon}</span>
                )}
                {selectedNode.label}
              </span>
            ) : (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </span>
          {clearable && selectedNode && !disabled && (
            <span className={styles.clearBtn} onClick={handleClear} role="button" tabIndex={-1}>
              <X size={14} />
            </span>
          )}
          <ChevronDown size={16} className={`${styles.chevron} ${open ? styles.rotated : ""}`} />
        </button>

        {open && (
          <div className={styles.dropdown}>
            {searchable && (
              <div className={styles.searchBox}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div className={styles.treeList}>
              {displayNodes.length === 0 ? (
                <div className={styles.empty}>결과 없음</div>
              ) : (
                displayNodes.map((node) => (
                  <TreeNodeItem
                    key={node.id}
                    node={node}
                    selectedId={selectedId}
                    expandedIds={expandedIds}
                    onToggle={handleToggle}
                    onSelect={handleSelect}
                    depth={0}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
      </div>
    );
  }
);

TreeSelect.displayName = "TreeSelect";
