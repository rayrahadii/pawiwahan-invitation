import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Gift as GiftIcon } from "lucide-react";
import { invitationData } from "../data/invitation";
import { CarvedCorners } from "./CarvedCorners";

export function Gift() {
  const { bankAccounts, giftRegistryUrl } = invitationData;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard API might be unavailable — the number is still visible to copy by hand.
    }
  };

  return (
    <section id="kado" className="section section--ivory section--textured">
      <span className="section-eyebrow">Tanda Kasih</span>
      <h2 className="section-title" style={{ marginBottom: 12 }}>
        Kirim Kado
      </h2>
      <p className="section-body" style={{ textAlign: "center", marginBottom: 32 }}>
        Doa restu Anda adalah karunia yang sangat berarti bagi kami. Namun jika ingin
        memberi tanda kasih, Anda dapat menggunakan salah satu rekening berikut.
      </p>

      {bankAccounts.map((account, i) => (
        <motion.div
          className="bank-card carved-frame"
          key={account.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <CarvedCorners />
          <div className="bank-card-info">
            <div className="bank-card-bank">{account.bankName}</div>
            <div className="bank-card-name">{account.accountName}</div>
            <div className="bank-card-number">{account.accountNumber}</div>
          </div>
          <button
            type="button"
            className="copy-btn"
            data-copied={copiedId === account.id}
            onClick={() => handleCopy(account.id, account.accountNumber)}
          >
            {copiedId === account.id ? <Check size={13} /> : <Copy size={13} />}
            {copiedId === account.id ? "Tersalin" : "Salin"}
          </button>
        </motion.div>
      ))}

      {giftRegistryUrl && (
        <a
          className="btn btn-outline btn-block"
          href={giftRegistryUrl}
          target="_blank"
          rel="noreferrer noopener"
          style={{ marginTop: 8 }}
        >
          <GiftIcon size={14} /> Lihat Daftar Kado
        </a>
      )}
    </section>
  );
}
