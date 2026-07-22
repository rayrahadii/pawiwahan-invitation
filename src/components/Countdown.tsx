import { useCountdown } from "../hooks/useCountdown";

interface CountdownProps {
  targetIso: string;
}

const UNITS: { key: keyof ReturnType<typeof useCountdown>; label: string }[] = [
  { key: "days", label: "Hari" },
  { key: "hours", label: "Jam" },
  { key: "minutes", label: "Menit" },
  { key: "seconds", label: "Detik" },
];

export function Countdown({ targetIso }: CountdownProps) {
  const parts = useCountdown(targetIso);

  if (parts.isPast) {
    return (
      <p className="countdown-label" style={{ textAlign: "center", marginBottom: 40 }}>
        Hari bahagia telah tiba 🎉
      </p>
    );
  }

  return (
    <div className="countdown">
      {UNITS.map(({ key, label }) => (
        <div className="countdown-unit" key={key}>
          <span className="countdown-number">
            {String(parts[key]).padStart(2, "0")}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
