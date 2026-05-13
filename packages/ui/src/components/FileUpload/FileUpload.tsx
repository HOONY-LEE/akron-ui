import { forwardRef, useRef, useState, useCallback } from "react";
import { UploadCloud, X, File, Image, FileText } from "lucide-react";
import styles from "./FileUpload.module.css";

export interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 허용 파일 유형 (예: "image/*", ".pdf,.docx") */
  accept?: string;
  /** 다중 파일 허용 */
  multiple?: boolean;
  /** 최대 파일 크기 (bytes) */
  maxSize?: number;
  /** 파일 변경 핸들러 */
  onChange?: (files: File[]) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 파일 목록 표시 */
  showList?: boolean;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(file: File) {
  if (file.type.startsWith("image/")) return <Image size={16} />;
  if (file.type === "application/pdf") return <FileText size={16} />;
  return <File size={16} />;
}

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize,
      onChange,
      disabled = false,
      showList = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [dragging, setDragging] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const processFiles = useCallback(
      (incoming: FileList | null) => {
        if (!incoming) return;
        const newErrors: string[] = [];
        const validFiles: File[] = [];

        Array.from(incoming).forEach((file) => {
          if (maxSize && file.size > maxSize) {
            newErrors.push(`"${file.name}" 파일이 너무 큽니다 (최대 ${formatBytes(maxSize)})`);
            return;
          }
          validFiles.push(file);
        });

        setErrors(newErrors);

        if (validFiles.length === 0) return;

        const uploaded: UploadedFile[] = validFiles.map((file) => ({
          file,
          id: Math.random().toString(36).slice(2),
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        }));

        setFiles((prev) => (multiple ? [...prev, ...uploaded] : uploaded));
        onChange?.(multiple ? [...files.map((f) => f.file), ...validFiles] : validFiles);
      },
      [maxSize, multiple, files, onChange],
    );

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      processFiles(e.dataTransfer.files);
    };

    const handleRemove = (id: string) => {
      setFiles((prev) => {
        const next = prev.filter((f) => f.id !== id);
        onChange?.(next.map((f) => f.file));
        return next;
      });
    };

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Drop zone */}
        <div
          className={[
            styles.dropZone,
            dragging ? styles.dragging : "",
            disabled ? styles.disabled : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="파일 업로드 영역"
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              inputRef.current?.click();
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className={styles.hiddenInput}
            onChange={(e) => processFiles(e.target.files)}
            aria-hidden="true"
            tabIndex={-1}
          />
          <UploadCloud size={32} className={styles.uploadIcon} />
          <p className={styles.primaryText}>
            {dragging ? "파일을 놓으세요" : "클릭하거나 파일을 드래그하여 업로드"}
          </p>
          <p className={styles.secondaryText}>
            {accept && `허용 형식: ${accept} • `}
            {maxSize ? `최대 ${formatBytes(maxSize)}` : "파일 크기 제한 없음"}
          </p>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((err, i) => (
              <p key={i} className={styles.error}>{err}</p>
            ))}
          </div>
        )}

        {/* File list */}
        {showList && files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((uf) => (
              <li key={uf.id} className={styles.fileItem}>
                {uf.preview ? (
                  <img src={uf.preview} alt={uf.file.name} className={styles.preview} />
                ) : (
                  <span className={styles.fileIcon}>{getFileIcon(uf.file)}</span>
                )}
                <div className={styles.fileInfo}>
                  <span className={styles.fileName}>{uf.file.name}</span>
                  <span className={styles.fileSize}>{formatBytes(uf.file.size)}</span>
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemove(uf.id)}
                  aria-label={`${uf.file.name} 제거`}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
