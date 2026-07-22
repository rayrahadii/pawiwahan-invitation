import { motion } from "framer-motion";
import { MapPin, CalendarPlus } from "lucide-react";
import { invitationData } from "../data/invitation";
import { Countdown } from "./Countdown";
import { CarvedCorners } from "./CarvedCorners";
import type { WeddingEvent } from "../types";

function googleCalendarUrl(event: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} — ${invitationData.brideNickname} & ${invitationData.groomNickname}`,
    details: `${event.venueName}, ${event.venueAddress}`,
    location: event.venueAddress,
    dates: `${event.isoDate}/${event.isoDateEnd}`,
  });
  return `https://www.google.com/calendar/event?${params.toString()}`;
}

function EventCard({ event, delay }: { event: WeddingEvent; delay: number }) {
  return (
    <motion.div
      className="event-card carved-frame"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
    >
      <CarvedCorners />
      <h3 className="event-card-title">{event.title}</h3>
      <p className="event-card-row">{event.dateLabel}</p>
      <p className="event-card-row">{event.timeLabel}</p>
      <p className="event-card-venue">{event.venueName}</p>
      <p className="event-card-address">{event.venueAddress}</p>
      <div className="event-card-actions">
        <a
          className="btn btn-outline"
          href={event.mapsUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          <MapPin size={14} /> Lihat Peta
        </a>
        <a
          className="btn btn-outline"
          href={googleCalendarUrl(event)}
          target="_blank"
          rel="noreferrer noopener"
        >
          <CalendarPlus size={14} /> Simpan Tanggal
        </a>
      </div>
    </motion.div>
  );
}

export function EventDetails() {
  const { events, targetDate } = invitationData;

  return (
    <section id="acara" className="section section--dark section--textured">
      <span className="section-eyebrow">Save The Date</span>
      <h2 className="section-title" style={{ marginBottom: 28 }}>
        Menghitung Hari
      </h2>

      <Countdown targetIso={targetDate} />

      {events.map((event, i) => (
        <EventCard key={event.id} event={event} delay={i * 0.15} />
      ))}
    </section>
  );
}
