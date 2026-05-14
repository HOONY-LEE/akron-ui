import React, { useState } from "react";
import { NumberStepper } from "@sunghoon_lee/akron-ui";

export const NumberStepperPage: React.FC = () => {
  const [qty, setQty] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h2>기본 사용 (비제어)</h2>
        <NumberStepper defaultValue={5} min={0} max={20} />
      </section>

      <section>
        <h2>제어 모드</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <NumberStepper value={qty} onChange={setQty} min={1} max={99} />
          <span>수량: {qty}개</span>
        </div>
      </section>

      <section>
        <h2>크기</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, fontWeight: 600 }}>{s}</span>
              <NumberStepper defaultValue={0} size={s} min={-10} max={10} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Step 설정</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NumberStepper defaultValue={0} step={5} min={0} max={100} />
            <span>step=5</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NumberStepper defaultValue={0} step={10} min={0} max={100} />
            <span>step=10</span>
          </div>
        </div>
      </section>

      <section>
        <h2>비활성화</h2>
        <NumberStepper defaultValue={3} disabled />
      </section>
    </div>
  );
};
