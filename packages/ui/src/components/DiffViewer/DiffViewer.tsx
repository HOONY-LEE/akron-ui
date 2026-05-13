import React, { forwardRef, useMemo } from "react";
import styles from "./DiffViewer.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DiffLineType = "added" | "removed" | "unchanged" | "header";

export interface DiffLine {
  type: DiffLineType;
  content: string;
  /** 이전 파일 줄 번호 */
  oldLineNumber?: number;
  /** 새 파일 줄 번호 */
  newLineNumber?: number;
}

export interface DiffFile {
  /** 이전 파일 이름 */
  oldFileName?: string;
  /** 새 파일 이름 */
  newFileName?: string;
  /** diff 줄 목록 */
  lines: DiffLine[];
}

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** diff 파일 목록 */
  files: DiffFile[];
  /** 최대 높이 */
  maxHeight?: number | string;
  /** 줄 번호 표시 */
  showLineNumbers?: boolean;
  /** unified diff 문자열 직접 파싱 (files 대신 사용) */
  unifiedDiff?: string;
  /** 폰트 크기 */
  fontSize?: "xs" | "sm" | "md";
}

// ─── Parser ───────────────────────────────────────────────────────────────────

function parseUnifiedDiff(diffText: string): DiffFile[] {
  const files: DiffFile[] = [];
  let currentFile: DiffFile | null = null;
  let oldLine = 0;
  let newLine = 0;

  for (const raw of diffText.split("\n")) {
    if (raw.startsWith("--- ")) {
      if (currentFile) files.push(currentFile);
      currentFile = {
        oldFileName: raw.slice(4).trim().replace(/^a\//, ""),
        lines: [],
      };
    } else if (raw.startsWith("+++ ") && currentFile) {
      currentFile.newFileName = raw.slice(4).trim().replace(/^b\//, "");
    } else if (raw.startsWith("@@ ")) {
      // Parse hunk header: @@ -old,count +new,count @@
      const match = raw.match(/@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if (match) {
        oldLine = parseInt(match[1], 10);
        newLine = parseInt(match[2], 10);
      }
      currentFile?.lines.push({ type: "header", content: raw });
    } else if (raw.startsWith("+") && currentFile) {
      currentFile.lines.push({ type: "added", content: raw.slice(1), newLineNumber: newLine++ });
    } else if (raw.startsWith("-") && currentFile) {
      currentFile.lines.push({ type: "removed", content: raw.slice(1), oldLineNumber: oldLine++ });
    } else if (currentFile && (raw.startsWith(" ") || raw === "")) {
      currentFile.lines.push({ type: "unchanged", content: raw.slice(1), oldLineNumber: oldLine++, newLineNumber: newLine++ });
    }
  }

  if (currentFile) files.push(currentFile);
  return files;
}

// ─── DiffViewer ───────────────────────────────────────────────────────────────

export const DiffViewer = forwardRef<HTMLDivElement, DiffViewerProps>(
  (
    {
      files: filesProp,
      maxHeight = 480,
      showLineNumbers = true,
      unifiedDiff,
      fontSize = "sm",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const files = useMemo(() => {
      if (unifiedDiff) return parseUnifiedDiff(unifiedDiff);
      return filesProp;
    }, [unifiedDiff, filesProp]);

    const maxHeightValue = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

    const classes = [styles.root, styles[`font-${fontSize}`], className].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{ "--diff-max-height": maxHeightValue, ...style } as React.CSSProperties}
        {...props}
      >
        {files.map((file, fi) => (
          <div key={fi} className={styles.file}>
            {/* File header */}
            <div className={styles.fileHeader}>
              <span className={styles.fileName}>
                {file.oldFileName && file.newFileName && file.oldFileName !== file.newFileName
                  ? `${file.oldFileName} → ${file.newFileName}`
                  : (file.newFileName ?? file.oldFileName ?? "unknown")}
              </span>
              <span className={styles.fileStats}>
                <span className={styles.added}>
                  +{file.lines.filter(l => l.type === "added").length}
                </span>
                <span className={styles.removed}>
                  -{file.lines.filter(l => l.type === "removed").length}
                </span>
              </span>
            </div>

            {/* Lines */}
            <div className={styles.lines}>
              {file.lines.map((line, li) => (
                <div
                  key={li}
                  className={[styles.line, styles[`line-${line.type}`]].join(" ")}
                >
                  {showLineNumbers && line.type !== "header" && (
                    <>
                      <span className={styles.lineNum}>
                        {line.type !== "added" ? (line.oldLineNumber ?? "") : ""}
                      </span>
                      <span className={styles.lineNum}>
                        {line.type !== "removed" ? (line.newLineNumber ?? "") : ""}
                      </span>
                    </>
                  )}
                  <span className={styles.gutter}>
                    {line.type === "added" ? "+" : line.type === "removed" ? "−" : line.type === "header" ? "" : " "}
                  </span>
                  <span className={styles.content}>{line.content}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

DiffViewer.displayName = "DiffViewer";
