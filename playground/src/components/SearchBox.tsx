import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { pages, type PageMeta } from "../pagesConfig";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results: PageMeta[] = query.trim()
    ? pages.filter(
        (p) =>
          p.label.toLowerCase().includes(query.toLowerCase()) ||
          p.path.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const selectResult = useCallback(
    (page: PageMeta) => {
      navigate(`/${page.path}`);
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    },
    [navigate],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectResult(results[activeIndex]);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          background: "var(--ark-color-bg-subtle)",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          ...(open ? { borderColor: "var(--ark-color-primary-500)", boxShadow: "0 0 0 2px var(--ark-color-primary-100)" } : {}),
        }}
      >
        <Search size={14} style={{ color: "var(--ark-color-text-disabled)", flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="검색..."
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 13,
            color: "var(--ark-color-text)",
            width: 160,
            fontFamily: "inherit",
          }}
        />
        <kbd
          style={{
            fontSize: 11,
            color: "var(--ark-color-text-disabled)",
            border: "1px solid var(--ark-color-border)",
            borderRadius: 4,
            padding: "1px 5px",
            lineHeight: "18px",
            fontFamily: "inherit",
            flexShrink: 0,
          }}
        >
          Ctrl K
        </kbd>
      </div>

      {open && query.trim() && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            width: 320,
            maxHeight: 360,
            overflowY: "auto",
            background: "var(--ark-color-bg)",
            border: "1px solid var(--ark-color-border)",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 100,
            padding: 4,
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: "20px 16px",
                textAlign: "center",
                fontSize: 13,
                color: "var(--ark-color-text-disabled)",
              }}
            >
              검색 결과가 없습니다.
            </div>
          ) : (
            results.map((page, i) => (
              <button
                key={page.path}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectResult(page);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 12px",
                  border: "none",
                  borderRadius: 6,
                  background: i === activeIndex ? "var(--ark-color-bg-muted)" : "transparent",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                  transition: "background-color 0.1s ease",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ark-color-text)" }}>
                  {page.label}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--ark-color-text-disabled)",
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  {page.category}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
