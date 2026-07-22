import { motion } from "framer-motion";
import { invitationData } from "../data/invitation";
import { GapuraSilhouette } from "./GapuraSilhouette";

export function Closing() {
  const { brideNickname, groomNickname } = invitationData;

  return (
    <section className="section section--dark section--textured closing">
      <div className="closing-gapura">
        <GapuraSilhouette />
      </div>

      <div className="closing-content">
        <motion.p
          className="section-body"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian, kami
          mengucapkan terima kasih yang sebesar-besarnya.
        </motion.p>
        <p
          style={{
            marginTop: 20,
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "var(--color-cream-soft)",
          }}
        >
          Hormat kami,
        </p>
        <h2 className="closing-names">
          {brideNickname} &amp; {groomNickname}
        </h2>

        <p className="closing-credit">Dibuat dengan ❤</p>
      </div>
    </section>
  );
}
