function CornerGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 30"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M2 28 L2 12 Q2 2 12 2 L28 2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 18 Q8 18 8 12" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="12" cy="2" r="1.8" fill="currentColor" />
    </svg>
  );
}

/** Renders the four carved-corner flourishes; place inside any element with class "carved-frame". */
export function CarvedCorners() {
  return (
    <>
      <CornerGlyph className="carved-corner carved-corner--tl" />
      <CornerGlyph className="carved-corner carved-corner--tr" />
      <CornerGlyph className="carved-corner carved-corner--bl" />
      <CornerGlyph className="carved-corner carved-corner--br" />
    </>
  );
}
