import React, { forwardRef } from "react";
import { User, ChevronDown, ChevronRight } from "lucide-react";
import styles from "./OrgChart.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrgNode {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  children?: OrgNode[];
  /** 확장된 상태 (기본 true) */
  expanded?: boolean;
}

export type OrgChartDirection = "vertical" | "horizontal";

export interface OrgChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 루트 노드 */
  data: OrgNode;
  /** 방향 */
  direction?: OrgChartDirection;
  /** 노드 클릭 콜백 */
  onNodeClick?: (node: OrgNode) => void;
  /** 커스텀 노드 렌더 */
  renderNode?: (node: OrgNode) => React.ReactNode;
  /** 아바타 표시 여부 */
  showAvatar?: boolean;
}

// ─── TreeNode sub-component ───────────────────────────────────────────────────

interface TreeNodeProps {
  node: OrgNode;
  direction: OrgChartDirection;
  onNodeClick?: (node: OrgNode) => void;
  renderNode?: (node: OrgNode) => React.ReactNode;
  showAvatar: boolean;
}

function TreeNode({
  node,
  direction,
  onNodeClick,
  renderNode,
  showAvatar,
}: TreeNodeProps) {
  const [expanded, setExpanded] = React.useState(node.expanded !== false);
  const hasChildren = node.children && node.children.length > 0;
  const isVertical = direction === "vertical";

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  return (
    <li className={styles.treeNode}>
      {/* Node card */}
      <div
        className={styles.nodeCard}
        onClick={() => onNodeClick?.(node)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onNodeClick?.(node);
          }
        }}
      >
        {renderNode ? (
          renderNode(node)
        ) : (
          <>
            {showAvatar && (
              <div className={styles.avatar}>
                {node.avatar ? (
                  <img src={node.avatar} alt={node.name} className={styles.avatarImg} />
                ) : (
                  <User size={18} />
                )}
              </div>
            )}
            <div className={styles.nodeInfo}>
              <span className={styles.nodeName}>{node.name}</span>
              {node.title && (
                <span className={styles.nodeTitle}>{node.title}</span>
              )}
            </div>
          </>
        )}

        {hasChildren && (
          <button
            className={styles.toggleBtn}
            onClick={handleToggle}
            type="button"
            aria-label={expanded ? "접기" : "펼치기"}
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <ul
          className={[
            styles.childrenList,
            isVertical ? styles.childrenVertical : styles.childrenHorizontal,
          ].join(" ")}
        >
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              direction={direction}
              onNodeClick={onNodeClick}
              renderNode={renderNode}
              showAvatar={showAvatar}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export const OrgChart = forwardRef<HTMLDivElement, OrgChartProps>(
  (
    {
      data,
      direction = "vertical",
      onNodeClick,
      renderNode,
      showAvatar = true,
      className,
      ...rest
    },
    ref
  ) => {
    const rootCls = [
      styles.root,
      direction === "horizontal" ? styles.horizontal : styles.vertical,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        <ul className={styles.rootList}>
          <TreeNode
            node={data}
            direction={direction}
            onNodeClick={onNodeClick}
            renderNode={renderNode}
            showAvatar={showAvatar}
          />
        </ul>
      </div>
    );
  }
);

OrgChart.displayName = "OrgChart";
