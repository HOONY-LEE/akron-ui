import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from "lucide-react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

type AddToast = (toast: Omit<ToastData, "id">) => void;

const ToastContext = createContext<AddToast | null>(null);

export function useToast(): AddToast {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const defaultDuration: Record<ToastType, number> = {
  success: 3000,
  info: 3000,
  warning: 4000,
  error: 5000,
};

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle2 size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
};

let counter = 0;

/* ── Single Toast ── */
function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastData;
  onRemove: (id: string) => void;
}) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 200);
  }, [onRemove, toast.id]);

  useEffect(() => {
    const ms = toast.duration ?? defaultDuration[toast.type];
    timerRef.current = setTimeout(dismiss, ms);
    return () => clearTimeout(timerRef.current);
  }, [dismiss, toast.duration, toast.type]);

  return (
    <div
      className={[
        styles.toast,
        styles[toast.type],
        exiting ? styles.exiting : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="alert"
    >
      <span className={styles.icon}>{icons[toast.type]}</span>
      <div className={styles.body}>
        <div className={styles.title}>{toast.title}</div>
        {toast.message && (
          <div className={styles.message}>{toast.message}</div>
        )}
      </div>
      <button
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ── Provider ── */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast: AddToast = useCallback((t) => {
    setToasts((prev) => [...prev, { ...t, id: String(++counter) }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className={styles.container}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
