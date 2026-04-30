import { useCallback, useRef } from "react";

export const useNativeVoice = () => {
  // Use a ref to store the current utterance to prevent garbage collection
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    try {
      if (!text) return;

      // 1. If we are already saying this exact text, don't restart it
      if (window.speechSynthesis.speaking && currentUtteranceRef.current?.text === text) {
        return;
      }

      // 2. Cancel any current speech
      window.speechSynthesis.cancel();

      // 3. Create the new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtteranceRef.current = utterance;

      // 4. Set up voices
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang === "en-IN") || voices[0];
      console.log(preferredVoice)
      if (preferredVoice) utterance.voice = preferredVoice;

      // 5. Error handling
      utterance.onerror = (event) => {
        // Ignore "canceled" errors in console as they are intentional 
        // when we call .cancel() to start a new sentence.
        if (event.error !== 'canceled') {
          console.error("SpeechSynthesisUtterance error:", event.error);
        }
      };

      console.log(utterance)

      // 6. Speak
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log(error)
    }
  }, []);

  return { speak };
};