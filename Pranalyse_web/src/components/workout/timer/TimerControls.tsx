import VoiceControl from "../controls/VoiceControl";
import ControlButtons from "../ui/ControlButtons";

type TimerControlsProps = {
  onStart: () => void;
  onPause: () => void;
  // setMute: any
  // mute: any
};

export default function TimerControls({ onStart, onPause}: TimerControlsProps) {
  return (
    <>
      <div className="flex gap-6">

        <ControlButtons type="start" onClick={onStart} />

        <ControlButtons type="pause" onClick={onPause} />

        <VoiceControl 
        // setMute={setMute} mute={mute}
        />

        <ControlButtons type="music" />

        <ControlButtons type="language" />

      </div>
    </>
  );
}