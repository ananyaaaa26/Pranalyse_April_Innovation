import { useState, useCallback } from "react";

export const useGCPVoice = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback(async (text: string) => {
    if (!text) return;
    
    setIsPlaying(true);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const { audioContent } = await response.json();
      
      // Convert Base64 to Audio
      const audioBlob = new Blob(
        [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
        { type: "audio/mp3" }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl); // Clean up memory
      };
      
      await audio.play();
    } catch (error) {
      console.error("GCP TTS Error:", error);
      setIsPlaying(false);
    }
  }, []);

  return { speak, isPlaying };
};