import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Attendance = "hadir" | "tidak_hadir" | "ragu";

const OPTIONS: { value: Attendance; label: string }[] = [
  { value: "hadir", label: "Hadir" },
  { value: "ragu", label: "Ragu-ragu" },
  { value: "tidak_hadir", label: "Tidak Hadir" },
];

const CONFIRM_COPY: Record<Attendance, string> = {
  hadir:
    "Terima kasih banyak atas konfirmasinya. Kami sangat senang dan menantikan kehadiranmu di hari bahagia kami.",
  ragu:
    "Terima kasih sudah memberi kabar. Semoga kamu tetap bisa menyempatkan hadir di hari bahagia kami.",
  tidak_hadir:
    "Terima kasih atas konfirmasinya. Doa dan restumu dari jauh sudah sangat berarti bagi kami.",
};

/** RSVP is stored locally in the visitor's own browser (localStorage). For a
 * real event you'll want to swap `saveRsvp` for a call to your own backend
 * or a service like Google Sheets / Firebase so responses aren't lost. */
function saveRsvp(entry: { name: string; attendance: Attendance; guestCount: number }) {
  try {
    const raw = localStorage.getItem("rsvp:list");
    const list = raw ? JSON.parse(raw) : [];
    list.push({ ...entry, createdAt: new Date().toISOString() });
    localStorage.setItem("rsvp:list", JSON.stringify(list));
  } catch {
    // localStorage might be unavailable (private mode) — fail silently, UI still confirms.
  }
}

export function RSVP() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) return;
    saveRsvp({ name: name.trim(), attendance, guestCount });
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="section section--dark">
      <span className="section-eyebrow">RSVP</span>
      <h2 className="section-title" style={{ marginBottom: 28 }}>
        Konfirmasi Kehadiran
      </h2>

      <AnimatePresence mode="wait">
        {submitted && attendance ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center" }}
          >
            <CheckCircle2 size={34} color="#B8965A" style={{ marginBottom: 14 }} />
            <p className="section-body">{CONFIRM_COPY[attendance]}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="form-field">
              <label className="form-label" htmlFor="rsvp-name">
                Nama
              </label>
              <input
                id="rsvp-name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Konfirmasi Kehadiran</label>
              <div className="attendance-options">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className="attendance-option"
                    aria-pressed={attendance === opt.value}
                    onClick={() => setAttendance(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {attendance === "hadir" && (
              <div className="form-field">
                <label className="form-label" htmlFor="rsvp-count">
                  Jumlah Tamu
                </label>
                <input
                  id="rsvp-count"
                  type="number"
                  min={1}
                  max={6}
                  className="form-input"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block">
              Kirim Konfirmasi
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
