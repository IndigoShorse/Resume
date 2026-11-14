import { useEffect, useState } from "react";

function isoToDisplay(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso ?? "").trim());
  if (!m) return "";
  return `${m[3]}.${m[2]}.${m[1]}`;
}

function displayToIso(display: string): string | null {
  const digits = display.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  const iso = `${year}-${month}-${day}`;
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  if (d.getUTCFullYear() !== Number(year) || d.getUTCMonth() + 1 !== Number(month) || d.getUTCDate() !== Number(day)) {
    return null;
  }
  return iso;
}

function formatMask(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

type Props = {
  value: string;
  onChange: (iso: string) => void;
  max?: string;
  className?: string;
  id?: string;
  "aria-invalid"?: boolean;
};

/** Дата рождения ДД.ММ.ГГГГ — можно вводить с клавиатуры (Safari/iOS). Значение наружу — ISO YYYY-MM-DD. */
export function BirthDateInput({ value, onChange, max, className, id, "aria-invalid": ariaInvalid }: Props) {
  const [display, setDisplay] = useState(() => isoToDisplay(value));

  useEffect(() => {
    setDisplay(isoToDisplay(value));
  }, [value]);

  const commit = (masked: string) => {
    if (!masked) {
      onChange("");
      return;
    }
    if (masked.length < 10) return;
    const iso = displayToIso(masked);
    if (!iso) {
      setDisplay(isoToDisplay(value));
      return;
    }
    if (max && iso > max) {
      setDisplay(isoToDisplay(value));
      return;
    }
    onChange(iso);
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="bday"
      placeholder="ДД.ММ.ГГГГ"
      aria-invalid={ariaInvalid}
      value={display}
      onChange={(e) => {
        const masked = formatMask(e.target.value);
        setDisplay(masked);
        if (masked.length === 10) commit(masked);
        else if (!masked) onChange("");
      }}
      onBlur={() => commit(display)}
      className={className}
    />
  );
}

export function getAdultMaxBirthDateIso(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}


