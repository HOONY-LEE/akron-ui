import {
  Star, Heart, Settings, Home, User, Bell, Search, Mail, Phone, Calendar,
  Check, X, ChevronRight, ChevronDown, ArrowRight, ArrowLeft, Plus, Minus,
  Edit2, Trash2, Copy, Share2, Download, Upload, RefreshCw, RotateCcw,
  Eye, EyeOff, Lock, Unlock, Info, AlertCircle, AlertTriangle, CheckCircle2,
  Sun, Moon, Laptop, Zap, Loader2,
} from "lucide-react";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const ICON_LIST = [
  { icon: Star, name: "Star" }, { icon: Heart, name: "Heart" },
  { icon: Settings, name: "Settings" }, { icon: Home, name: "Home" },
  { icon: User, name: "User" }, { icon: Bell, name: "Bell" },
  { icon: Search, name: "Search" }, { icon: Mail, name: "Mail" },
  { icon: Phone, name: "Phone" }, { icon: Calendar, name: "Calendar" },
  { icon: Check, name: "Check" }, { icon: X, name: "X" },
  { icon: ChevronRight, name: "ChevronRight" }, { icon: ChevronDown, name: "ChevronDown" },
  { icon: ArrowRight, name: "ArrowRight" }, { icon: ArrowLeft, name: "ArrowLeft" },
  { icon: Plus, name: "Plus" }, { icon: Minus, name: "Minus" },
  { icon: Edit2, name: "Edit2" }, { icon: Trash2, name: "Trash2" },
  { icon: Copy, name: "Copy" }, { icon: Share2, name: "Share2" },
  { icon: Download, name: "Download" }, { icon: Upload, name: "Upload" },
  { icon: RefreshCw, name: "RefreshCw" }, { icon: RotateCcw, name: "RotateCcw" },
  { icon: Eye, name: "Eye" }, { icon: EyeOff, name: "EyeOff" },
  { icon: Lock, name: "Lock" }, { icon: Unlock, name: "Unlock" },
  { icon: Info, name: "Info" }, { icon: AlertCircle, name: "AlertCircle" },
  { icon: AlertTriangle, name: "AlertTriangle" }, { icon: CheckCircle2, name: "CheckCircle2" },
  { icon: Sun, name: "Sun" }, { icon: Moon, name: "Moon" },
  { icon: Laptop, name: "Laptop" }, { icon: Zap, name: "Zap" },
  { icon: Loader2, name: "Loader2" },
];

export function IconPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Icon</h1>
        <p className="page-description">
          아이콘 시스템. Akron UI는 <strong>lucide-react</strong> 아이콘 라이브러리를 사용합니다.
          5,000개 이상의 아이콘을 지원하며, 크기·색상·굵기를 props로 제어할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">기본 사용법</h2>
        <LiveCodeBlock
          code={`import { Star, Heart, Settings } from "lucide-react";

<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Star size={24} />
  <Heart size={24} color="var(--ark-color-error-500)" />
  <Settings size={24} strokeWidth={1.5} />
</div>`}
          scope={{ Star, Heart, Settings }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Star size={12} />
  <Star size={16} />
  <Star size={20} />
  <Star size={24} />
  <Star size={32} />
  <Star size={48} />
</div>`}
          scope={{ Star }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Heart size={24} color="var(--ark-color-error-500)" />
  <CheckCircle2 size={24} color="var(--ark-color-success-500)" />
  <AlertTriangle size={24} color="var(--ark-color-warning-500)" />
  <Info size={24} color="var(--ark-color-info-500)" />
  <Star size={24} color="var(--ark-color-primary-500)" />
</div>`}
          scope={{ Heart, CheckCircle2, AlertTriangle, Info, Star }}
        />
      </section>

      <section className="docs-section" id="stroke">
        <h2 className="section-title">선 굵기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 20, alignItems: "center" }}>
  <Star size={28} strokeWidth={1} />
  <Star size={28} strokeWidth={1.5} />
  <Star size={28} strokeWidth={2} />
  <Star size={28} strokeWidth={2.5} />
  <Star size={28} strokeWidth={3} />
</div>`}
          scope={{ Star }}
        />
      </section>

      <section className="docs-section" id="with-text">
        <h2 className="section-title">텍스트와 함께</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
    <Settings size={16} />
    <span>설정</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--ark-color-success-500)" }}>
    <CheckCircle2 size={16} />
    <span>저장 완료</span>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--ark-color-error-500)" }}>
    <AlertCircle size={16} />
    <span>오류가 발생했습니다</span>
  </div>
</div>`}
          scope={{ Settings, CheckCircle2, AlertCircle }}
        />
      </section>

      <section className="docs-section" id="animation">
        <h2 className="section-title">애니메이션</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
  <span style={{ fontSize: 14, color: "var(--ark-color-text-secondary)" }}>로딩 중...</span>
</div>

<style>{\`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
\`}</style>`}
          scope={{ Loader2 }}
        />
      </section>

      <section className="docs-section" id="gallery">
        <h2 className="section-title">아이콘 목록 (일부)</h2>
        <p className="section-desc">
          전체 아이콘 목록은{" "}
          <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer">
            lucide.dev
          </a>{" "}
          에서 확인할 수 있습니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "var(--ark-spacing-3)",
            marginTop: "var(--ark-spacing-4)",
          }}
        >
          {ICON_LIST.map(({ icon: Icon, name }) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--ark-spacing-2)",
                padding: "var(--ark-spacing-3)",
                border: "1px solid var(--ark-color-border)",
                borderRadius: "var(--ark-radius-md)",
                fontSize: "11px",
                color: "var(--ark-color-text-secondary)",
                cursor: "default",
              }}
            >
              <Icon size={20} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section" id="install">
        <h2 className="section-title">설치</h2>
        <p className="section-desc">
          lucide-react는 <code className="inline-code">@sunghoon_lee/akron-ui</code>의 peer dependency입니다.
        </p>
        <div className="code-block">
          <code>npm install lucide-react</code>
        </div>
      </section>
    </>
  );
}
