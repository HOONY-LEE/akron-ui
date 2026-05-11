import { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
}

function useIsDark() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark"
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const isDark = useIsDark();

  const code = children.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const theme = isDark ? themes.vsDark : themes.github;

  return (
    <div className="code-block">
      <button
        className="code-copy-btn"
        onClick={handleCopy}
        aria-label={copied ? "복사됨" : "코드 복사"}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <Highlight theme={theme} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
