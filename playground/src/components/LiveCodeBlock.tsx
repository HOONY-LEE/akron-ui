import { useState, useEffect, useCallback, useRef } from "react";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { themes } from "prism-react-renderer";
import { Check, Copy, RotateCcw } from "lucide-react";

/* ── dark mode hook (shared) ── */
function useIsDark() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark",
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ── props ── */
interface LiveCodeBlockProps {
  /** JSX code string to render & edit */
  code: string;
  /** Extra scope — components/hooks the code needs */
  scope?: Record<string, unknown>;
  /** Language for highlighting (default tsx) */
  language?: string;
  /**
   * noInline=true: code must end with render(<Component />).
   * Use this when the code needs React hooks (useState, etc).
   */
  noInline?: boolean;
  /**
   * editorOnly=true: 에디터만 표시, 라이브 프리뷰 없음.
   * 코드 예제를 보여주되 렌더링이 필요 없을 때 사용.
   */
  editorOnly?: boolean;
}

export function LiveCodeBlock({
  code,
  scope = {},
  language = "tsx",
  noInline = false,
  editorOnly = false,
}: LiveCodeBlockProps) {
  const isDark = useIsDark();
  const [copied, setCopied] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // code prop이 외부에서 바뀌면(부모 상태 변경) 에디터를 리셋
  const prevCodeRef = useRef(code.trim());
  useEffect(() => {
    if (code.trim() !== prevCodeRef.current) {
      prevCodeRef.current = code.trim();
      setResetKey((k) => k + 1);
    }
  }, [code]);

  // 현재 편집 중인 코드 (복사용)
  const currentCodeRef = useRef(code.trim());

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(currentCodeRef.current);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleReset = useCallback(() => {
    prevCodeRef.current = code.trim();
    currentCodeRef.current = code.trim();
    setResetKey((k) => k + 1);
  }, [code]);

  const theme = isDark ? themes.vsDark : themes.github;

  return (
    <LiveProvider
      key={resetKey}
      code={code.trim()}
      scope={{ useState, ...scope }}
      language={language}
      theme={theme}
      noInline={noInline}
      transformCode={noInline ? undefined : (c) => `<>${c}</>`}
    >
      {/* ── Preview (editorOnly일 때 숨김) ── */}
      {!editorOnly && (
        <div className="live-preview">
          <LivePreview />
        </div>
      )}

      {/* ── Editable Editor ── */}
      <div className={`live-editor-wrap${editorOnly ? " editor-only" : ""}`}>
        <div className="code-action-btns">
          <button
            className="code-reset-btn"
            onClick={handleReset}
            aria-label="코드 초기화"
            title="초기화"
          >
            <RotateCcw size={14} />
          </button>
          <button
            className="code-copy-btn"
            onClick={handleCopy}
            aria-label={copied ? "복사됨" : "코드 복사"}
            title={copied ? "복사됨" : "복사"}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <LiveEditor
          onChange={(val) => { currentCodeRef.current = val; }}
          style={{
            fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        />
      </div>

      {/* ── Error ── */}
      {!editorOnly && <LiveError className="live-error" />}
    </LiveProvider>
  );
}
