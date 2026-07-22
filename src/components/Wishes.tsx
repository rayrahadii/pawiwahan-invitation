import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Wish } from "../types";

const STORAGE_KEY = "wishes:list";

const SEED_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "Sahabat Kampus",
    attendance: "hadir",
    guestCount: 2,
    message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah ❤️",
    createdAt: "2026-06-01T10:00:00+07:00",
  },
  {
    id: "seed-2",
    name: "Tetangga Baik Hati",
    attendance: "hadir",
    guestCount: 1,
    message: "Kalian pantas bahagia. Selamat ya, semoga langgeng sampai kakek nenek!",
    createdAt: "2026-06-03T18:30:00+07:00",
  },
];

/** Reads/writes the guestbook to localStorage. Per-browser only — for a
 * shared guestbook across all visitors, connect this to a real backend. */
function loadWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : SEED_WISHES;
  } catch {
    return SEED_WISHES;
  }
}

function persistWishes(list: Wish[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore write failures (e.g. private browsing)
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

const ATTENDANCE_LABEL: Record<Wish["attendance"], string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak Hadir",
  ragu: "Ragu-ragu",
};

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setWishes(loadWishes());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      attendance: "hadir",
      guestCount: 1,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    persistWishes(updated);
    setName("");
    setMessage("");
  };

  return (
    <section id="ucapan" className="section section--ivory">
      <span className="section-eyebrow">Ucapan &amp; Doa</span>
      <h2 className="section-title" style={{ marginBottom: 28 }}>
        Kirim Ucapan
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="wish-name">
            Nama
          </label>
          <input
            id="wish-name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="wish-message">
            Ucapan &amp; Doa
          </label>
          <textarea
            id="wish-message"
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan dan doa terbaikmu..."
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Kirim Ucapan
        </button>
      </form>

      <div className="wish-list">
        {wishes.map((wish, i) => (
          <motion.div
            className="wish-card"
            key={wish.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.05 }}
          >
            <div className="wish-card-name">{wish.name}</div>
            <div className="wish-card-meta">
              <span>{formatDate(wish.createdAt)}</span>
              <span className={`wish-attendance-tag wish-attendance-tag--${wish.attendance}`}>
                {ATTENDANCE_LABEL[wish.attendance]}
              </span>
            </div>
            <p className="wish-card-message">{wish.message}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
