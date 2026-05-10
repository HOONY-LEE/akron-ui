import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { pages, categories } from "../pagesConfig";

interface SidebarProps {
  currentPath: string;
  darkMode: boolean;
  onToggleDark: () => void;
}

export function Sidebar({ currentPath, darkMode, onToggleDark }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/overview" className="sidebar-logo">
          <span className="logo-icon">A</span>
          <span className="logo-text">Akron UI</span>
        </Link>
        <button className="theme-toggle" onClick={onToggleDark} aria-label="Toggle theme">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        {categories.map((category) => {
          const items = pages.filter((p) => p.category === category);
          return (
            <div key={category} className="nav-section">
              <div className="nav-section-title">{category}</div>
              <ul className="nav-list">
                {items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={`/${item.path}`}
                      className={`nav-item ${item.path === currentPath ? "active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      <style>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--docs-sidebar-width);
          height: 100vh;
          background-color: var(--docs-bg);
          border-right: 1px solid var(--docs-border);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          z-index: 10;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--docs-border);
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
        }
        .logo-icon {
          width: 28px;
          height: 28px;
          background: var(--docs-accent);
          color: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }
        .logo-text {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .theme-toggle {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--docs-border);
          border-radius: 8px;
          background: var(--docs-bg);
          color: var(--docs-text-secondary);
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .theme-toggle:hover {
          background-color: var(--docs-sidebar-hover);
        }
        .sidebar-nav {
          padding: 16px 12px;
          flex: 1;
        }
        .nav-section {
          margin-bottom: 24px;
        }
        .nav-section-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--docs-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0 8px;
          margin-bottom: 6px;
        }
        .nav-list {
          list-style: none;
        }
        .nav-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 7px 12px;
          font-size: 14px;
          color: var(--docs-text-secondary);
          text-decoration: none;
          border: none;
          background: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.12s ease, color 0.12s ease;
          font-weight: 400;
        }
        .nav-item:hover {
          background-color: var(--docs-sidebar-hover);
          color: var(--docs-text);
        }
        .nav-item.active {
          background-color: var(--docs-sidebar-active-bg);
          color: var(--docs-text);
          font-weight: 600;
        }
      `}</style>
    </aside>
  );
}
