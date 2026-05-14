import { forwardRef } from "react";
import {
  File,
  FileText,
  Image,
  Film,
  Music,
  FileCode,
  Table,
  Archive,
  Download,
  Trash2,
  Eye,
} from "lucide-react";
import styles from "./FilePreview.module.css";

export type FilePreviewSize = "sm" | "md" | "lg";
export type FilePreviewVariant = "card" | "list" | "compact";

export interface FilePreviewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** File name */
  name: string;
  /** File size in bytes */
  size?: number;
  /** MIME type or file extension */
  type?: string;
  /** Image URL for preview thumbnail */
  thumbnail?: string;
  /** Layout variant */
  variant?: FilePreviewVariant;
  /** Component size */
  fileSize?: FilePreviewSize;
  /** Download callback */
  onDownload?: () => void;
  /** Delete callback */
  onDelete?: () => void;
  /** Preview callback */
  onPreview?: () => void;
  /** Upload progress 0-100; undefined = complete */
  progress?: number;
  /** Error message */
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function getFileIcon(type?: string) {
  if (!type) return File;

  const lower = type.toLowerCase();

  if (lower.startsWith("image/") || /\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i.test(lower))
    return Image;
  if (lower === "application/pdf" || lower.endsWith(".pdf")) return FileText;
  if (lower.startsWith("video/") || /\.(mp4|mov|avi|mkv|webm)$/i.test(lower))
    return Film;
  if (lower.startsWith("audio/") || /\.(mp3|wav|ogg|flac|aac)$/i.test(lower))
    return Music;
  if (lower.startsWith("text/") || /\.(txt|md|html|css|js|ts|tsx|jsx|json|xml|yml|yaml)$/i.test(lower))
    return FileCode;
  if (
    lower.includes("spreadsheet") ||
    lower.includes("excel") ||
    /\.(xlsx?|csv|tsv)$/i.test(lower)
  )
    return Table;
  if (
    lower.includes("zip") ||
    lower.includes("compressed") ||
    lower.includes("archive") ||
    /\.(zip|rar|7z|tar|gz)$/i.test(lower)
  )
    return Archive;

  return File;
}

function isImageType(type?: string): boolean {
  if (!type) return false;
  const lower = type.toLowerCase();
  return (
    lower.startsWith("image/") ||
    /\.(png|jpe?g|gif|svg|webp|bmp|ico)$/i.test(lower)
  );
}

const ICON_SIZES: Record<FilePreviewSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export const FilePreview = forwardRef<HTMLDivElement, FilePreviewProps>(
  (
    {
      name,
      size,
      type,
      thumbnail,
      variant = "card",
      fileSize = "md",
      onDownload,
      onDelete,
      onPreview,
      progress,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    const IconComponent = getFileIcon(type);
    const iconPx = ICON_SIZES[fileSize];
    const showThumbnail = thumbnail && isImageType(type);
    const hasActions = onDownload || onDelete || onPreview;

    return (
      <div
        ref={ref}
        className={[
          styles.root,
          styles[variant],
          styles[fileSize],
          error ? styles.error : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Icon / Thumbnail area */}
        <div className={styles.iconArea}>
          {showThumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              className={styles.thumbnail}
              draggable={false}
            />
          ) : (
            <IconComponent size={iconPx} />
          )}
        </div>

        {/* File info */}
        <div className={styles.info}>
          <span className={styles.name} title={name}>
            {name}
          </span>
          {size != null && (
            <span className={styles.fileSize}>{formatBytes(size)}</span>
          )}
          {error && <span className={styles.errorText}>{error}</span>}
        </div>

        {/* Action buttons */}
        {hasActions && (
          <div className={styles.actions}>
            {onPreview && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={onPreview}
                aria-label="Preview"
              >
                <Eye size={fileSize === "sm" ? 14 : 16} />
              </button>
            )}
            {onDownload && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={onDownload}
                aria-label="Download"
              >
                <Download size={fileSize === "sm" ? 14 : 16} />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={onDelete}
                aria-label="Delete"
              >
                <Trash2 size={fileSize === "sm" ? 14 : 16} />
              </button>
            )}
          </div>
        )}

        {/* Upload progress bar */}
        {progress != null && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>
    );
  },
);

FilePreview.displayName = "FilePreview";
