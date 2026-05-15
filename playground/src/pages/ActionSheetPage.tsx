import { useState } from "react";
import { ActionSheet } from "@sunghoon_lee/akron-ui";
import type { ActionSheetAction } from "@sunghoon_lee/akron-ui";
import {
  Share2,
  Copy,
  Download,
  Trash2,
  Edit3,
  Flag,
  EyeOff,
  Camera,
  Image,
  FolderOpen,
} from "lucide-react";

const basicActions: ActionSheetAction[] = [
  {
    key: "share",
    label: "공유하기",
    icon: <Share2 size={20} />,
    onClick: () => alert("공유"),
  },
  {
    key: "copy",
    label: "복사하기",
    icon: <Copy size={20} />,
    onClick: () => alert("복사"),
  },
  {
    key: "download",
    label: "다운로드",
    icon: <Download size={20} />,
    onClick: () => alert("다운로드"),
  },
];

const destructiveActions: ActionSheetAction[] = [
  {
    key: "edit",
    label: "수정",
    icon: <Edit3 size={20} />,
    onClick: () => alert("수정"),
  },
  {
    key: "hide",
    label: "숨기기",
    icon: <EyeOff size={20} />,
    onClick: () => alert("숨기기"),
  },
  {
    key: "report",
    label: "신고하기",
    icon: <Flag size={20} />,
    destructive: true,
    onClick: () => alert("신고"),
  },
  {
    key: "delete",
    label: "삭제",
    icon: <Trash2 size={20} />,
    destructive: true,
    onClick: () => alert("삭제"),
  },
];

const photoActions: ActionSheetAction[] = [
  {
    key: "camera",
    label: "카메라",
    icon: <Camera size={20} />,
    onClick: () => alert("카메라"),
  },
  {
    key: "gallery",
    label: "앨범에서 선택",
    icon: <Image size={20} />,
    onClick: () => alert("앨범"),
  },
  {
    key: "file",
    label: "파일에서 선택",
    icon: <FolderOpen size={20} />,
    onClick: () => alert("파일"),
  },
];

export function ActionSheetPage() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>ActionSheet</h2>
      <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32 }}>
        iOS 스타일 하단 액션 시트. 사용자에게 선택지를 제공합니다.
      </p>

      {/* 기본 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>기본 사용</h3>
        <button
          type="button"
          onClick={() => setOpen1(true)}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "var(--ark-color-primary-500)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ActionSheet 열기
        </button>
        <ActionSheet
          open={open1}
          onClose={() => setOpen1(false)}
          actions={basicActions}
        />
      </section>

      {/* 제목 + 설명 + 파괴적 액션 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>제목 & 파괴적 액션</h3>
        <button
          type="button"
          onClick={() => setOpen2(true)}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid var(--ark-color-border)",
            background: "var(--ark-color-bg)",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          게시물 관리
        </button>
        <ActionSheet
          open={open2}
          onClose={() => setOpen2(false)}
          title="게시물 관리"
          description="이 게시물에 대해 수행할 작업을 선택하세요."
          actions={destructiveActions}
        />
      </section>

      {/* 사진 선택 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>사진 업로드</h3>
        <button
          type="button"
          onClick={() => setOpen3(true)}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid var(--ark-color-border)",
            background: "var(--ark-color-bg)",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          프로필 사진 변경
        </button>
        <ActionSheet
          open={open3}
          onClose={() => setOpen3(false)}
          title="프로필 사진"
          actions={photoActions}
          cancelLabel="닫기"
        />
      </section>

      {/* Props */}
      <section>
        <h3 style={{ marginBottom: 12 }}>Props</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--ark-color-border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "8px 12px" }}>Prop</th>
              <th style={{ padding: "8px 12px" }}>타입</th>
              <th style={{ padding: "8px 12px" }}>기본값</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["open", "boolean", "필수"],
              ["onClose", "() => void", "필수"],
              ["actions", "ActionSheetAction[]", "필수"],
              ["title", "ReactNode", "-"],
              ["description", "ReactNode", "-"],
              ["cancelLabel", 'string | false', '"취소"'],
              ["closeOnOverlay", "boolean", "true"],
            ].map(([prop, type, def]) => (
              <tr
                key={prop}
                style={{
                  borderBottom: "1px solid var(--ark-color-border)",
                }}
              >
                <td style={{ padding: "8px 12px", fontWeight: 600 }}>
                  {prop}
                </td>
                <td
                  style={{
                    padding: "8px 12px",
                    fontFamily: "monospace",
                    fontSize: 13,
                  }}
                >
                  {type}
                </td>
                <td style={{ padding: "8px 12px" }}>{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
