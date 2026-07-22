import { useMemo } from "react";

/**
 * Floating golden dust particles — purely decorative.
 * Uses CSS keyframe animation so it's lightweight (no canvas / requestAnimationFrame).
 * Each particle gets randomised size, position, speed, and delay so the
 * field looks organic rather than patterned.
 */

interface Particle {
  id: number;
  size: number;
  x: number;       // start % from left
  delay: number;   // animation-delay in s
  duration: number; // animation-duration in s
  opacity: number;
  drift: number;   // horizontal sway amount in px
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      size: 2 + Math.random() * 3,          // 2–5 px
      x: Math.random() * 100,                // 0–100%
      delay: Math.random() * 8,              // stagger up to 8s
      duration: 8 + Math.random() * 10,      // 8–18s cycle
      opacity: 0.25 + Math.random() * 0.45,  // 0.25–0.70
      drift: -30 + Math.random() * 60,       // -30 to +30 px horizontal sway
    });
  }
  return particles;
}

export function CoverParticles({ count = 25 }: { count?: number }) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="cover-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="cover-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            // pass drift as a CSS custom property used in the keyframe
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
