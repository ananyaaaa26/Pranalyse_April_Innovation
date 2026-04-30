"use client";

import { useEffect, useRef } from "react";
import {TreePoseDetector} from "@/src/components/workout/detect/yoga/TreePoseDetector"
import {DownwardDogPoseDetector} from "@/src/components/workout/detect/yoga/DownwardDogPoseDetector"
import {LordDancePoseDetector} from "@/src/components/workout/detect/yoga/LordDancePoseDetector"
import {TadasanaDetector} from "@/src/components/workout/detect/yoga/TadasanaDetector"
import {Warrior1PoseDetector} from "@/src/components/workout/detect/yoga/Warrior1PoseDetector"
import {Warrior2PoseDetector} from "@/src/components/workout/detect/yoga/Warrior2PoseDetector"
import {ShoulderAbductionDetector} from "@/src/components/workout/detect/physio/ShoulderAbductionDetector"
import {BalancedLungeDetector} from "@/src/components/workout/detect/physio/BalancedLungeDetector"
import {ProSquatDetector} from "@/src/components/workout/detect/physio/ProSquatDetector"
import {NeutralDetector} from "@/src/components/workout/detect/NeutralDetector"

interface CameraFeedProps {
  videoRef: any;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
  setTotalTime: any
  setSuggestions: any
  setRepCount: any
  setAccuracy: any
  selectedPose: any
  cameraInSmallBox: any
  onPoseUpdate: any
}

export default function CameraFeed({
  videoRef,
  width = "100%",
  height = "100%",
  className = "",
  onClick,
  setTotalTime,
  setSuggestions,
  setRepCount,
  setAccuracy,
  selectedPose,
  cameraInSmallBox= false,
  onPoseUpdate
}: CameraFeedProps) {
  
  const poseScreen: any= {
    "Downward Facing Dog (Adho Mukha Svanasana)": <DownwardDogPoseDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Tree Pose (Vrikshasana)": <TreePoseDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Mountain Pose (Tadasana)": <TadasanaDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Warrior I (Virabhadrasana I)": <Warrior1PoseDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Warrior II (Virabhadrasana II)": <Warrior2PoseDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Lord of the Dance Pose (Natarajasana)": <LordDancePoseDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Shoulder Abduction and Adduction": <ShoulderAbductionDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Squats":<ProSquatDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />,
    "Lunges":<BalancedLungeDetector
      setTotalTime={setTotalTime}
      setSuggestions={setSuggestions}
      setRepCount={setRepCount}
      setAccuracy={setAccuracy}
      cameraInSmallBox={cameraInSmallBox}
    />
  }

  return (
    <>
      {
        poseScreen[selectedPose?.title] || 
        <NeutralDetector
          cameraInSmallBox={cameraInSmallBox}
        />
      }
    </>
  );
}