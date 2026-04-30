import { FaPlay, FaPause, FaVolumeUp, FaMusic } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb"; 

type ButtonType = "start" | "pause" | "voice" | "music" | "language"; 

type ControlButtonsProps = {
  type: ButtonType;
  onClick?: () => void;
};

export default function ControlButtons({ type, onClick }: ControlButtonsProps) {
  const config = {
    start: {
      icon: <FaPlay />,
      text: "Start",
      color: "bg-green-500 hover:bg-green-600",
    },
    pause: {
      icon: <FaPause />,
      text: "Pause",
      color: "bg-red-500 hover:bg-red-600",
    },
    voice: {
      icon: <FaVolumeUp />,
      text: "Voice",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    music: {
      icon: <FaMusic />,
      text: "Music",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    language: {
      icon: <TbLanguage />,
      text: "Language",
      color: "bg-yellow-600 hover:bg-yellow-700", // ✅ dark yellow
    },
  };

  const btn = config[type];

  return (
    <button
      onClick={onClick}
      className={`${btn.color} flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold shadow-md transition-transform hover:scale-105`}
    >
      {btn.icon}
      {btn.text}
    </button>
  );
}