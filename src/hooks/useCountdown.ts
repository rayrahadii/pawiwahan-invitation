import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function diffToParts(diffMs: number): CountdownParts {
  const isPast = diffMs <= 0;
  const clamped = Math.max(diffMs, 0);

  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast };
}

/** Ticks every second and returns days/hours/minutes/seconds remaining until `targetIso`. */
export function useCountdown(targetIso: string): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() =>
    diffToParts(new Date(targetIso).getTime() - Date.now())
  );

  useEffect(() => {
    const target = new Date(targetIso).getTime();

    const tick = () => setParts(diffToParts(target - Date.now()));
    tick();

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  return parts;
}
