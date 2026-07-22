import { motion } from "framer-motion";
import { invitationData } from "../data/invitation";
import { BalineseOrnament } from "./BalineseOrnament";

export function LoveStory() {
  return (
    <section id="kisah" className="section section--ivory">
      <span className="section-eyebrow">Perjalanan Kami</span>
      <h2 className="section-title" style={{ marginBottom: 28 }}>
        Kisah Cinta
      </h2>

      <div className="timeline">
        {invitationData.loveStory.map((moment, i) => (
          <motion.div
            className="timeline-item"
            key={moment.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <span className="timeline-dot" />
            <span className="timeline-year">{moment.year}</span>
            <h3 className="timeline-title">{moment.title}</h3>
            <p className="timeline-description">{moment.description}</p>
          </motion.div>
        ))}
      </div>

      <BalineseOrnament flipped />
    </section>
  );
}
