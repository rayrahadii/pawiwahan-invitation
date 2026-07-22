import { motion } from "framer-motion";

interface BalineseOrnamentProps {
  flipped?: boolean;
}

/**
 * A stylised "patra" scrollwork ornament with a lotus medallion at its
 * center — the recurring signature motif that stands in for Balinese
 * temple woodcarving throughout the invitation. Drawn in with pathLength
 * once it scrolls into view, echoing how a carver's line would appear.
 */
export function BalineseOrnament({ flipped }: BalineseOrnamentProps) {
  const stroke = "#C9A227";

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.12, duration: 0.9, ease: "easeInOut" },
        opacity: { delay: i * 0.12, duration: 0.3 },
      },
    }),
  };

  return (
    <div className={`ornament-divider${flipped ? " ornament-divider--flip" : ""}`}>
      <motion.svg
        viewBox="0 0 160 50"
        fill="none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        {/* left scrollwork tendril curling into a spiral */}
        <motion.path
          d="M78 25 C 58 14, 38 14, 24 25"
          stroke={stroke}
          strokeWidth="1.1"
          strokeLinecap="round"
          custom={0}
          variants={draw}
        />
        <motion.path
          d="M24 25 C 19 20, 13 21, 14 27 C 15 32, 21 32, 24 27"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          custom={0.3}
          variants={draw}
        />
        <motion.path
          d="M60 17 C 55 20, 52 24, 52 27"
          stroke={stroke}
          strokeWidth="0.8"
          strokeLinecap="round"
          custom={0.4}
          variants={draw}
        />

        {/* right scrollwork tendril (mirrored) */}
        <motion.path
          d="M82 25 C 102 14, 122 14, 136 25"
          stroke={stroke}
          strokeWidth="1.1"
          strokeLinecap="round"
          custom={0}
          variants={draw}
        />
        <motion.path
          d="M136 25 C 141 20, 147 21, 146 27 C 145 32, 139 32, 136 27"
          stroke={stroke}
          strokeWidth="1"
          strokeLinecap="round"
          custom={0.3}
          variants={draw}
        />
        <motion.path
          d="M100 17 C 105 20, 108 24, 108 27"
          stroke={stroke}
          strokeWidth="0.8"
          strokeLinecap="round"
          custom={0.4}
          variants={draw}
        />

        {/* central lotus medallion */}
        <motion.path
          d="M80 12 L88 25 L80 38 L72 25 Z"
          stroke={stroke}
          strokeWidth="1"
          custom={0.5}
          variants={draw}
        />
        <motion.circle cx="80" cy="25" r="4.5" stroke={stroke} strokeWidth="1" custom={0.65} variants={draw} />
      </motion.svg>
    </div>
  );
}
