import { forwardRef, useState, useCallback, useMemo } from "react";
import type { HTMLAttributes } from "react";
import styles from "./TimeSlotPicker.module.css";

export interface TimeSlot {
  time: string;
  available?: boolean;
  label?: string;
}

export type TimeSlotPickerSize = "sm" | "md";

export interface TimeSlotPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  slots?: TimeSlot[];
  startHour?: number;
  endHour?: number;
  interval?: number;
  value?: string[];
  defaultValue?: string[];
  onChange?: (selected: string[]) => void;
  multiple?: boolean;
  size?: TimeSlotPickerSize;
  columns?: number;
  disabledSlots?: string[];
  showDuration?: boolean;
}

function generateSlots(
  startHour: number,
  endHour: number,
  interval: number,
): TimeSlot[] {
  const result: TimeSlot[] = [];
  const startMin = startHour * 60;
  const endMin = endHour * 60;

  for (let m = startMin; m < endMin; m += interval) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    result.push({
      time: `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
      available: true,
    });
  }
  return result;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}분`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}시간 ${m}분` : `${h}시간`;
}

export const TimeSlotPicker = forwardRef<HTMLDivElement, TimeSlotPickerProps>(
  (
    {
      slots: slotsProp,
      startHour = 9,
      endHour = 18,
      interval = 30,
      value: valueProp,
      defaultValue,
      onChange,
      multiple = false,
      size = "md",
      columns = 4,
      disabledSlots,
      showDuration = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(
      defaultValue ?? [],
    );
    const selected = isControlled ? valueProp : internalValue;

    const resolvedSlots = useMemo(() => {
      if (slotsProp) return slotsProp;
      return generateSlots(startHour, endHour, interval);
    }, [slotsProp, startHour, endHour, interval]);

    const disabledSet = useMemo(
      () => new Set(disabledSlots ?? []),
      [disabledSlots],
    );

    const isDisabled = useCallback(
      (slot: TimeSlot) => slot.available === false || disabledSet.has(slot.time),
      [disabledSet],
    );

    /* Compute in-range set for range highlighting */
    const inRangeSet = useMemo(() => {
      if (!multiple || selected.length < 2) return new Set<string>();
      const mins = selected.map(timeToMinutes).sort((a, b) => a - b);
      const minVal = mins[0];
      const maxVal = mins[mins.length - 1];
      const set = new Set<string>();
      for (const slot of resolvedSlots) {
        const m = timeToMinutes(slot.time);
        if (m > minVal && m < maxVal && !isDisabled(slot)) {
          set.add(slot.time);
        }
      }
      return set;
    }, [multiple, selected, resolvedSlots, isDisabled]);

    const handleSelect = useCallback(
      (time: string) => {
        let next: string[];

        if (multiple) {
          if (selected.includes(time)) {
            next = selected.filter((t) => t !== time);
          } else if (selected.length === 0) {
            next = [time];
          } else if (selected.length === 1) {
            /* Second click: select the range */
            const startMin = timeToMinutes(selected[0]);
            const endMin = timeToMinutes(time);
            const lo = Math.min(startMin, endMin);
            const hi = Math.max(startMin, endMin);
            next = resolvedSlots
              .filter((s) => {
                const m = timeToMinutes(s.time);
                return m >= lo && m <= hi && !isDisabled(s);
              })
              .map((s) => s.time);
          } else {
            /* Reset: start a new range */
            next = [time];
          }
        } else {
          next = selected.includes(time) ? [] : [time];
        }

        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [multiple, selected, resolvedSlots, isDisabled, isControlled, onChange],
    );

    /* Duration computation */
    const durationText = useMemo(() => {
      if (!showDuration || selected.length < 2) return null;
      const mins = selected.map(timeToMinutes).sort((a, b) => a - b);
      const diff = mins[mins.length - 1] - mins[0] + interval;
      return formatDuration(diff);
    }, [showDuration, selected, interval]);

    const rootCls = [styles.root, className ?? ""].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={rootCls}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          ...style,
        }}
        role="group"
        aria-label="Time slot picker"
        {...rest}
      >
        {resolvedSlots.map((slot) => {
          const disabled = isDisabled(slot);
          const isSelected = selected.includes(slot.time);
          const isInRange = inRangeSet.has(slot.time);

          const slotCls = [
            styles.slot,
            styles[size],
            isSelected ? styles.selected : "",
            isInRange && !isSelected ? styles.inRange : "",
            disabled ? styles.disabled : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={slot.time}
              type="button"
              className={slotCls}
              disabled={disabled}
              aria-pressed={isSelected}
              aria-disabled={disabled || undefined}
              onClick={() => !disabled && handleSelect(slot.time)}
            >
              {slot.time}
              {slot.label && <span className={styles.slotLabel}>{slot.label}</span>}
            </button>
          );
        })}
        {durationText && (
          <div
            className={styles.duration}
            style={{ gridColumn: `1 / -1` }}
          >
            선택 시간: {durationText}
          </div>
        )}
      </div>
    );
  },
);

TimeSlotPicker.displayName = "TimeSlotPicker";
