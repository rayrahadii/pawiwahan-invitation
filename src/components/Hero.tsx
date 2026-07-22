import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { invitationData } from "../data/invitation";
import { GapuraSilhouette } from "./GapuraSilhouette";

export function Hero() {
  const { brideNickname, groomNickname, weddingDateLabel } = invitationData;

  return (
    <section id="beranda" className="section section--dark section--textured hero">
      <div className="hero-gapura">
        <GapuraSilhouette />
      </div>

      <div className="hero-content">
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Wedding Of
        </motion.span>

        <motion.h1
          className="hero-names"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {brideNickname} &amp; {groomNickname}
        </motion.h1>

        <motion.p
          className="hero-date-pill"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {weddingDateLabel}
        </motion.p>
      </div>

      <motion.div
        className="hero-scroll-cue"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={16} />
        <span>Gulir ke bawah</span>
      </motion.div>
    </section>
  );
}
