import { useEffect, useState } from "react";

export function useAuthAnimation() {
  const [showCard, setShowCard] = useState(false); // show card
  const [opened, setOpened] = useState(false); // book opening state
  const [closing, setClosing] = useState(false); // book closing state

  // Trigger opening after 2s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
      setOpened(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return { showCard, opened, closing, setClosing };
}