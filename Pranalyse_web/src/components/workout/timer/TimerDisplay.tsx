type TimerDisplayProps = {
  seconds: number;
};

export default function TimerDisplay({ seconds }: TimerDisplayProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatted = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center">

      <h2 className="text-lg font-semibold text-black">
        Time
      </h2>

      <p className="text-3xl font-bold text-black tracking-widest">
        {formatted}
      </p>

    </div>
  );
}