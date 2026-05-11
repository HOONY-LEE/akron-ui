import { useState, useEffect, useCallback } from "react";
import { LiveProvider, LiveEditor, LivePreview, LiveError } from "react-live";
import { themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

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
}

export function LiveCodeBlock({
  code,
  scope = {},
  language = "tsx",
}: LiveCodeBlockProps) {
  const isDark = useIsDark();
  const [copied, setCopied] = useState(false);
  const [currentCode, setCurrentCode] = useState(code.trim());

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentCode]);

  const theme = isDark ? themes.vsDark : themes.github;

  return (
    <LiveProvider
      code={code.trim()}
      scope={scope}
      language={language}
      theme={theme}
      /* 여러 JSX 요소를 fragment로 감싸기 */
      transformCode={(c) => `<>${c}</>`}
    >
      {/* ── Preview ── */}
      <div className="live-preview">
        <LivePreview />
      </div>

      {/* ── Editable Editor ── */}
      <div className="live-editor-wrap">
        <button
          className="code-copy-btn"
          onClick={handleCopy}
          aria-label={copied ? "복사됨" : "코드 복사"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <LiveEditor
          onChange={(val) => setCurrentCode(val)}
          style={{
            fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        />
      </div>

      {/* ── Error ── */}
      <LiveError className="live-error" />
    </LiveProvider>
  );
}
