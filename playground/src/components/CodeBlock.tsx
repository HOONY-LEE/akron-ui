import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const code = children.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <button
        className="code-copy-btn"
        onClick={handleCopy}
        aria-label="코드 복사"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        <span>{copied ? "복사됨" : "복사"}</span>
      </button>
      <Highlight theme={themes.vsDark} code={code} language={language}>
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
