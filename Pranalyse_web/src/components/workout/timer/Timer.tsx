"use client";

import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import useTimer from "@/src/hooks/useTimer";

export default function Timer() {
  const { seconds, start, pause } = useTimer();

  return (
    <>
      <TimerDisplay seconds={seconds} />
      <TimerControls onStart={start} onPause={pause} />
    </>
  );
}