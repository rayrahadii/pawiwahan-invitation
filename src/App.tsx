import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { Cover } from "./components/Cover";
import { Hero } from "./components/Hero";
import { Quote } from "./components/Quote";
import { Couple } from "./components/Couple";
import { EventDetails } from "./components/EventDetails";
import { LoveStory } from "./components/LoveStory";
import { Gallery } from "./components/Gallery";
import { RSVP } from "./components/RSVP";
import { Gift } from "./components/Gift";
import { Wishes } from "./components/Wishes";
import { Closing } from "./components/Closing";
import { MusicToggle } from "./components/MusicToggle";
import { DotNav } from "./components/DotNav";

function useGuestName(): string {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    // Mendukung tautan seperti ?to=Nama+Tamu atau ?kepada=Nama+Tamu
    const raw = params.get("to") ?? params.get("kepada");
    return raw?.trim() || "Tamu Undangan";
  }, []);
}

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const guestName = useGuestName();

  useLenis(isOpened);

  // Block background scrolling while the cover "gate" is showing.
  useEffect(() => {
    document.body.style.overflow = isOpened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  return (
    <div className="app-backdrop">
      <div className="invitation-shell">
        <AnimatePresence>
          {!isOpened && <Cover guestName={guestName} onOpen={() => setIsOpened(true)} />}
        </AnimatePresence>

        <Hero isOpened={isOpened} />
        <Quote />
        <Couple />
        <EventDetails />
        <LoveStory />
        <Gallery />
        <RSVP />
        <Gift />
        <Wishes />
        <Closing />

        {isOpened && (
          <>
            <DotNav />
            <MusicToggle autoStart={isOpened} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
