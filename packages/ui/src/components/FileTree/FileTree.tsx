import React, { forwardRef, useState } from "react";
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  FileCode,
  FileImage,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import styles from "./FileTree.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FileTreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 뱃지/상태 (예: 'modified', 'new', 'deleted') */
  status?: "modified" | "added" | "deleted" | "renamed";
}

export type FileTreeSize = "sm" | "md";

export interface FileTreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** 파일 트리 노드 */
  nodes: FileTreeNode[];
  /** 초기 열린 폴더 id 집합 */
  defaultExpanded?: Set<string>;
  /** controlled 열린 폴더 id 집합 */
  expanded?: Set<string>;
  /** 폴더 열림/닫힘 변경 */
  onExpandChange?: (expanded: Set<string>) => void;
  /** 선택된 노드 id */
  selected?: string;
  /** 노드 클릭 */
  onSelect?: (node: FileTreeNode) => void;
  /** 크기 */
  size?: FileTreeSize;
  /** 들여쓰기 */
  indent?: number;
}

// ─── File icons by extension ──────────────────────────────────────────────────

function getFileIcon(name: string): React.ReactNode {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const iconSize = 14;
  if (["ts", "tsx", "js", "jsx", "mjs", "cjs", "vue", "svelte"].includes(ext))
    return <FileCode size={iconSize} className={styles.iconCode} />;
  if (["md", "mdx", "txt", "rst"].includes(ext))
    return <FileText size={iconSize} className={styles.iconText} />;
  if (["png", "jpg", "jpeg", "gif", "svg", "webp", "ico"].includes(ext))
    return <FileImage size={iconSize} className={styles.iconImage} />;
  return <File size={iconSize} className={styles.iconFile} />;
}

// ─── FileTreeNode (recursive) ─────────────────────────────────────────────────

interface NodeProps {
  node: FileTreeNode;
  depth: number;
  expandedSet: Set<string>;
  onToggle: (id: string) => void;
  selected: string | undefined;
  onSelect: (node: FileTreeNode) => void;
  indent: number;
}

const STATUS_LABEL: Record<NonNullable<FileTreeNode["status"]>, string> = {
  modified: "M",
  added:    "A",
  deleted:  "D",
  renamed:  "R",
};

function TreeNode({ node, depth, expandedSet, onToggle, selected, onSelect, indent }: NodeProps) {
  const isFolder = node.type === "folder";
  const isOpen = expandedSet.has(node.id);
  const isSelected = selected === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) onToggle(node.id);
    onSelect(node);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isFolder) onToggle(node.id);
      onSelect(node);
    }
    if (e.key === "ArrowRight" && isFolder && !isOpen) onToggle(node.id);
    if (e.key === "ArrowLeft" && isFolder && isOpen) onToggle(node.id);
  };

  let fileIcon: React.ReactNode;
  if (node.icon) {
    fileIcon = node.icon;
  } else if (isFolder) {
    fileIcon = isOpen
      ? <FolderOpen size={14} className={styles.iconFolderOpen} />
      : <Folder size={14} className={styles.iconFolder} />;
  } else {
    fileIcon = getFileIcon(node.name);
  }

  return (
    <div className={styles.nodeWrapper}>
      <div
        className={[
          styles.node,
          isSelected ? styles.nodeSelected : "",
          isFolder ? styles.nodeFolder : "",
        ].filter(Boolean).join(" ")}
        style={{ paddingLeft: depth * indent + 4 }}
        onClick={handleClick}
        onKeyDown={handleKey}
        tabIndex={0}
        role={isFolder ? "treeitem" : "treeitem"}
        aria-selected={isSelected}
        aria-expanded={isFolder ? isOpen : undefined}
      >
        {/* Chevron */}
        <span className={styles.chevron}>
          {isFolder
            ? isOpen
              ? <ChevronDown size={12} />
              : <ChevronRight size={12} />
            : <span style={{ width: 12, display: "inline-block" }} />}
        </span>

        {/* File/folder icon */}
        <span className={styles.icon}>{fileIcon}</span>

        {/* Name */}
        <span className={[styles.name, node.status === "deleted" ? styles.nameDeleted : ""].join(" ")}>
          {node.name}
        </span>

        {/* Status badge */}
        {node.status && (
          <span className={[styles.status, styles[`status-${node.status}`]].join(" ")}>
            {STATUS_LABEL[node.status]}
          </span>
        )}
      </div>

      {/* Children */}
      {isFolder && isOpen && node.children && node.children.length > 0 && (
        <div className={styles.children}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedSet={expandedSet}
              onToggle={onToggle}
              selected={selected}
              onSelect={onSelect}
              indent={indent}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── FileTree ─────────────────────────────────────────────────────────────────

export const FileTree = forwardRef<HTMLDivElement, FileTreeProps>(
  (
    {
      nodes,
      defaultExpanded,
      expanded: expandedProp,
      onExpandChange,
      selected: selectedProp,
      onSelect,
      size = "md",
      indent = 12,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = expandedProp !== undefined;
    const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
      () => defaultExpanded ?? new Set(),
    );
    const expandedSet = isControlled ? expandedProp! : internalExpanded;

    const [internalSelected, setInternalSelected] = useState<string | undefined>();
    const selected = selectedProp ?? internalSelected;

    const handleToggle = (id: string) => {
      const next = new Set(expandedSet);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (!isControlled) setInternalExpanded(next);
      onExpandChange?.(next);
    };

    const handleSelect = (node: FileTreeNode) => {
      if (selectedProp === undefined) setInternalSelected(node.id);
      onSelect?.(node);
    };

    const classes = [styles.root, styles[`size-${size}`], className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} role="tree" {...props}>
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            expandedSet={expandedSet}
            onToggle={handleToggle}
            selected={selected}
            onSelect={handleSelect}
            indent={indent}
          />
        ))}
      </div>
    );
  },
);

FileTree.displayName = "FileTree";
