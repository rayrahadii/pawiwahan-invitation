interface GapuraSilhouetteProps {
  className?: string;
}

type Point = [number, number];

function buildTowerPath({
  baseLeft,
  baseRight,
  groundY,
  tierCount,
  tierHeight,
  eaveOvershoot,
  innerInset,
}: {
  baseLeft: number;
  baseRight: number;
  groundY: number;
  tierCount: number;
  tierHeight: number;
  eaveOvershoot: number;
  innerInset: number;
}) {
  const outer: Point[] = [];
  const inner: Point[] = [];
  let outerX = baseLeft;
  let innerX = baseRight;
  let y = groundY;

  outer.push([outerX, y]);
  inner.push([innerX, y]);

  for (let i = 0; i < tierCount; i++) {
    y -= tierHeight;
    outer.push([outerX, y]);
    inner.push([innerX, y]);
    outerX -= eaveOvershoot;
    innerX -= innerInset;
    outer.push([outerX, y]);
    inner.push([innerX, y]);
  }

  const tipY = y - tierHeight * 1.6;
  const tipX = (outerX + innerX) / 2;

  let d = `M ${outer[0][0]} ${outer[0][1]} `;
  for (const [x, py] of outer.slice(1)) d += `L ${x} ${py} `;
  d += `L ${tipX} ${tipY} `;
  for (const [x, py] of [...inner].reverse()) d += `L ${x} ${py} `;
  d += "Z";

  // also return the tier-line y positions so we can draw thin joint lines
  const tierYs: number[] = [];
  let ty = groundY;
  for (let i = 0; i < tierCount; i++) {
    ty -= tierHeight;
    tierYs.push(ty);
  }

  return { d, tierYs, outerXStart: baseLeft, innerXStart: baseRight };
}

/**
 * A stylised silhouette of a Balinese split gate (candi bentar) — two
 * mirrored tiered towers with a gap between them. Rendered as fine gold
 * linework rather than a flat fill so it reads as "carved" rather than a
 * solid graphic block, and stays subtle enough to sit behind text.
 */
export function GapuraSilhouette({ className }: GapuraSilhouetteProps) {
  const groundY = 620;
  const tower = buildTowerPath({
    baseLeft: 15,
    baseRight: 165,
    groundY,
    tierCount: 9,
    tierHeight: 42,
    eaveOvershoot: 13,
    innerInset: 9,
  });

  const stars = [
    [60, 60], [140, 110], [340, 50], [420, 100], [240, 40], [90, 160], [390, 170],
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 480 620"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <line x1="0" y1={groundY} x2="480" y2={groundY} stroke="#C9A227" strokeOpacity="0.25" strokeWidth="1" />

      {stars.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.4} fill="#E8C468" opacity={0.4} />
      ))}

      {/* left tower */}
      <path d={tower.d} fill="#171512" stroke="#C9A227" strokeOpacity="0.55" strokeWidth="1" />
      {tower.tierYs.map((ty) => (
        <line
          key={ty}
          x1={tower.outerXStart - 60}
          y1={ty}
          x2={tower.innerXStart + 5}
          y2={ty}
          stroke="#C9A227"
          strokeOpacity="0.12"
          strokeWidth="0.6"
        />
      ))}

      {/* right tower — mirrored */}
      <g transform="translate(480,0) scale(-1,1)">
        <path d={tower.d} fill="#171512" stroke="#C9A227" strokeOpacity="0.55" strokeWidth="1" />
        {tower.tierYs.map((ty) => (
          <line
            key={ty}
            x1={tower.outerXStart - 60}
            y1={ty}
            x2={tower.innerXStart + 5}
            y2={ty}
            stroke="#C9A227"
            strokeOpacity="0.12"
            strokeWidth="0.6"
          />
        ))}
      </g>
    </svg>
  );
}
