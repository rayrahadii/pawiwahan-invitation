import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { invitationData } from "../data/invitation";

export function Gallery() {
  const { gallery } = invitationData;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <section id="galeri" className="section section--ivory">
      <span className="section-eyebrow">Galeri</span>
      <h2 className="section-title" style={{ marginBottom: 28 }}>
        Momen Kami
      </h2>

      <div className="gallery-grid">
        {gallery.map((image, i) => (
          <motion.button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            aria-label={`Lihat ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.img
              key={gallery[activeIndex].id}
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="lightbox-close"
              onClick={close}
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Berikutnya"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
