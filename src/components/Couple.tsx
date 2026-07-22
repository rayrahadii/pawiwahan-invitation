import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { invitationData } from "../data/invitation";
import { CarvedCorners } from "./CarvedCorners";

function ProfileCard({
  fullName,
  parents,
  instagram,
  delay,
}: {
  fullName: string;
  parents: string;
  instagram: string;
  delay: number;
}) {
  return (
    <motion.div
      className="couple-card carved-frame"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay }}
    >
      <CarvedCorners />
      <div className="couple-portrait">
        {/* Ganti dengan foto asli: /public/images/bride.jpg atau groom.jpg */}
        <img src="/images/portrait-placeholder.jpg" alt={fullName} loading="lazy" />
      </div>
      <h3 className="couple-name">{fullName}</h3>
      <p className="couple-parents">{parents}</p>
      <a
        className="couple-instagram"
        href={instagram}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Instagram size={13} /> Instagram
      </a>
    </motion.div>
  );
}

export function Couple() {
  const {
    brideFullName,
    groomFullName,
    brideParents,
    groomParents,
    brideInstagram,
    groomInstagram,
  } = invitationData;

  return (
    <section id="mempelai" className="section section--ivory">
      <span className="section-eyebrow">Mempelai</span>
      <h2 className="section-title">Kami Yang Berbahagia</h2>

      <ProfileCard
        fullName={brideFullName}
        parents={brideParents}
        instagram={brideInstagram}
        delay={0}
      />

      <div style={{ textAlign: "center" }}>
        <span className="couple-ampersand">&amp;</span>
      </div>

      <ProfileCard
        fullName={groomFullName}
        parents={groomParents}
        instagram={groomInstagram}
        delay={0.15}
      />
    </section>
  );
}
