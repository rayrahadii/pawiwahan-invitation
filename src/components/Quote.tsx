import { motion } from "framer-motion";
import { invitationData } from "../data/invitation";
import { BalineseOrnament } from "./BalineseOrnament";

export function Quote() {
  const { quote } = invitationData;

  return (
    <section className="section section--ivory">
      <BalineseOrnament />
      <motion.p
        className="quote-lead"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        &ldquo;{quote.lead}&rdquo;
      </motion.p>
      <motion.p
        className="section-body"
        style={{ textAlign: "center" }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {quote.body}
      </motion.p>
      {quote.source && <span className="quote-source">{quote.source}</span>}
    </section>
  );
}
