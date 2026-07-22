import { useScrollSpy } from "../hooks/useScrollSpy";

const SECTIONS: { id: string; label: string }[] = [
  { id: "beranda", label: "Beranda" },
  { id: "mempelai", label: "Mempelai" },
  { id: "acara", label: "Acara" },
  { id: "kisah", label: "Kisah Cinta" },
  { id: "galeri", label: "Galeri" },
  { id: "rsvp", label: "RSVP" },
  { id: "kado", label: "Kado" },
  { id: "ucapan", label: "Ucapan" },
];

export function DotNav() {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));

  return (
    <nav className="dot-nav" aria-label="Navigasi bagian undangan">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className="dot-nav-item"
          data-active={activeId === section.id}
          aria-label={section.label}
          title={section.label}
          onClick={() =>
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
          }
        />
      ))}
    </nav>
  );
}
