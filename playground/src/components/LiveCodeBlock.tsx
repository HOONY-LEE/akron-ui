import { useState, useEffect, useCallback, useRef } from "react";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { themes } from "prism-react-renderer";
import { Check, Copy, RotateCcw, Play } from "lucide-react";

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
  /** 코드 블록 헤더에 표시할 파일명 */
  filename?: string;
  /**
   * fullWidth=true: 프리뷰 영역이 전체 너비를 사용.
   * 레이아웃 컴포넌트(MasonryGrid, Stack 등) 데모에 사용.
   */
  fullWidth?: boolean;
}

export function LiveCodeBlock({
  code,
  scope = {},
  language = "tsx",
  noInline = false,
  editorOnly = false,
  filename,
  fullWidth = false,
}: LiveCodeBlockProps) {
  const isDark = useIsDark();
  const [copied, setCopied] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Run state: preview only updates on Run
  const [runCode, setRunCode] = useState(code.trim());
  const [runKey, setRunKey] = useState(0);

  // Editor state: key to force re-mount on reset
  const [editorKey, setEditorKey] = useState(0);
  const currentCodeRef = useRef(code.trim());

  // When code prop changes externally (parent state change)
  const prevCodeRef = useRef(code.trim());
  useEffect(() => {
    if (code.trim() !== prevCodeRef.current) {
      prevCodeRef.current = code.trim();
      currentCodeRef.current = code.trim();
      setRunCode(code.trim());
      setRunKey((k) => k + 1);
      setEditorKey((k) => k + 1);
      setIsDirty(false);
    }
  }, [code]);

  const handleRun = useCallback(() => {
    setRunCode(currentCodeRef.current);
    setRunKey((k) => k + 1);
    setIsDirty(false);
  }, []);

  const handleReset = useCallback(() => {
    currentCodeRef.current = code.trim();
    setRunCode(code.trim());
    setRunKey((k) => k + 1);
    setEditorKey((k) => k + 1);
    setIsDirty(false);
  }, [code]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(currentCodeRef.current);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const theme = isDark ? themes.vsDark : themes.github;
  const transformCode = noInline ? undefined : (c: string) => `<>${c}</>`;

  return (
    <div>
      {/* ── Preview (editorOnly일 때 숨김) ── */}
      {!editorOnly && (
        <LiveProvider
          key={`preview-${runKey}`}
          code={runCode}
          scope={{ useState, ...scope }}
          language={language}
          noInline={noInline}
          transformCode={transformCode}
        >
          <div className={`live-preview${fullWidth ? " live-preview--full" : ""}`}>
            <LivePreview />
          </div>
          <LiveError className="live-error" />
        </LiveProvider>
      )}

      {/* ── Editor ── */}
      <div className={`live-editor-wrap${editorOnly ? " editor-only" : ""}`}>
        <div className="code-toolbar">
          <span className="code-filename">{filename || "Example.tsx"}</span>
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
            {!editorOnly && (
              <button
                className={`code-run-btn${isDirty ? " dirty" : ""}`}
                onClick={handleRun}
                aria-label="실행"
                title="실행 (코드 적용)"
              >
                <Play size={12} />
                <span>Run</span>
              </button>
            )}
          </div>
        </div>
        <LiveProvider
          key={`editor-${editorKey}`}
          code={currentCodeRef.current}
          scope={{ useState, ...scope }}
          language={language}
          theme={theme}
          noInline={noInline}
        >
          <LiveEditor
            onChange={(val) => {
              currentCodeRef.current = val;
              if (!isDirty) setIsDirty(true);
            }}
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              fontSize: 13,
              lineHeight: 1.7,
            }}
          />
        </LiveProvider>
      </div>
    </div>
  );
}
