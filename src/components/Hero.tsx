import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { invitationData } from "../data/invitation";
import { GapuraSilhouette } from "./GapuraSilhouette";

interface HeroProps {
  isOpened?: boolean;
}

export function Hero({ isOpened = false }: HeroProps) {
  const { brideNickname, groomNickname, weddingDateLabel } = invitationData;
  const ref = useRef<HTMLElement>(null);

  // Track scroll progress of the hero section relative to the viewport.
  // [start start] = section top hits viewport top → progress 0
  // [end start]   = section bottom hits viewport top → progress 1
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: Gapura moves slower — shifts down 30% as section scrolls away
  const gapuraY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades out slightly as user scrolls past
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="beranda" className="section section--dark section--textured hero">
      <AnimatePresence>
        {isOpened && (
          <motion.div
            className="hero-gapura"
            style={{ y: gapuraY }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          >
            <GapuraSilhouette />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="hero-content" style={{ opacity: contentOpacity }}>
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Wedding Of
        </motion.span>

        <motion.h1
          className="hero-names"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {brideNickname} &amp; {groomNickname}
        </motion.h1>

        <motion.p
          className="hero-date-pill"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {weddingDateLabel}
        </motion.p>
      </motion.div>

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
