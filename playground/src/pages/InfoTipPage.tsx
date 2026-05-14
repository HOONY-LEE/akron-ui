import React from "react";
import { InfoTip } from "@sunghoon_lee/akron-ui";

export const InfoTipPage: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    <section>
      <h2>기본 사용</h2>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <InfoTip content="이 필드는 사용자의 표시 이름입니다." />
        <InfoTip content="비밀번호는 8자 이상이어야 합니다." icon="help" />
        <InfoTip content="이 작업은 되돌릴 수 없습니다!" icon="alert" />
      </div>
    </section>

    <section>
      <h2>라벨 포함</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <InfoTip label="사용자 이름" content="다른 사용자에게 표시되는 이름입니다." />
        <InfoTip label="이메일 주소" content="계정 복구 및 알림에 사용됩니다." icon="help" />
        <InfoTip label="삭제 주의" content="삭제된 데이터는 복구할 수 없습니다." icon="alert" />
      </div>
    </section>

    <section>
      <h2>아이콘 크기</h2>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <InfoTip content="작은 아이콘" iconSize={12} label="12px" />
        <InfoTip content="기본 아이콘" iconSize={16} label="16px" />
        <InfoTip content="큰 아이콘" iconSize={20} label="20px" />
      </div>
    </section>

    <section>
      <h2>폼 필드와 함께</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
        <InfoTip label="프로젝트 이름" content="영문, 숫자, 하이픈만 사용 가능합니다." />
        <input
          type="text"
          placeholder="프로젝트 이름"
          style={{
            padding: "8px 12px",
            border: "1px solid var(--akron-border)",
            borderRadius: "var(--akron-radius-md)",
            fontSize: 14,
          }}
        />
      </div>
    </section>
  </div>
);
