import { motion } from "framer-motion";
import { invitationData } from "../data/invitation";
import { CoverParticles } from "./CoverParticles";

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export function Cover({ guestName, onOpen }: CoverProps) {
  const { brideNickname, groomNickname, weddingDateLabel } = invitationData;

  return (
    <motion.div
      className="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
    >
      {/* Portrait background photo with dark overlay */}
      <div className="cover-bg">
        <img src="/images/cover-bg.jpg" alt="" className="cover-bg-img" />
        <div className="cover-bg-overlay" />
      </div>

      {/* Floating golden particles */}
      <CoverParticles count={25} />

      <div className="cover-content">
        <motion.span
          className="cover-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Undangan Pernikahan
        </motion.span>

        <motion.h1
          className="cover-names"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {brideNickname} &amp; {groomNickname}
        </motion.h1>

        <motion.p
          className="cover-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {weddingDateLabel}
        </motion.p>

        <motion.div
          className="cover-guest-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className="cover-guest-label">Kepada Yth.</span>
          <span className="cover-guest-name">{guestName}</span>
        </motion.div>

        <motion.button
          type="button"
          className="btn btn-primary"
          onClick={onOpen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          Buka Undangan
        </motion.button>
      </div>
    </motion.div>
  );
}
