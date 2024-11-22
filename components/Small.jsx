"use client";

import React, { useState, useCallback, useRef } from "react";
import { scenarioData } from "../data/scenarioData";
import { Progress } from "@/components/ui/progress";
import { speak } from "@/lib/sound";
import { useKeyboardEvents } from "./hooks/useKeyboardEvents";

export default function SmallTalkPractice() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [dialogIdx, setDialogIdx] = useState(0);
  const [currentPart, setCurrentPart] = useState(0);
  const [typingState, setTypingState] = useState({
    currentIndex: 0,
    isCorrect: true,
  });
  const [isTypingMode, setIsTypingMode] = useState(false);

  const inputRef = useRef(null);
  const keyPressAudio = useRef(new Audio("/sounds/key-press.mp3"));
  const keyErrorAudio = useRef(new Audio("/sounds/key-error.mp3"));
  const successAudio = useRef(new Audio("/sounds/success.mp3"));

  const currentScenario = scenarioData.scenarios[sceneIdx];
  const currentDialogue = currentScenario.dialogues[dialogIdx];
  const currentSentence = currentDialogue[currentPart];

  const speakSentence = useCallback(speak, []);

  useKeyboardEvents({
    isTypingMode,
    setIsTypingMode,
    inputRef,
    speakSentence,
    currentSentence: currentDialogue.english,
  });

  const handleTyping = (event) => {
    const input = event.target.value;
    const targetText = currentDialogue.english;

    let newTypingState = { ...typingState };

    if (input.length > typingState.currentIndex) {
      // User typed a new character
      if (input[input.length - 1] === targetText[typingState.currentIndex]) {
        newTypingState.currentIndex++;
        newTypingState.isCorrect = true;
        // Play correct keystroke sound
        keyPressAudio.current.currentTime = 0;
        keyPressAudio.current.play();
      } else {
        newTypingState.isCorrect = false;
        // Play error keystroke sound
        keyErrorAudio.current.currentTime = 0;
        keyErrorAudio.current.play();
      }
    } else {
      // User deleted a character
      newTypingState.currentIndex = input.length;
      newTypingState.isCorrect = true;
      // Optionally play delete sound
      keyPressAudio.current.currentTime = 0;
      keyPressAudio.current.play();
    }

    setTypingState(newTypingState);

    if (newTypingState.currentIndex === targetText.length) {
      // Add a small delay before playing success sound
      setTimeout(() => {
        successAudio.current.currentTime = 0;
        successAudio.current.play();
      }, 400); // 0.2 seconds delay for success sound

      // Move to next dialogue after sound plays
      setTimeout(() => {
        nextDialogue();
      }, 1000); // Still keep 1 second total delay before next sentence
    }
  };

  const nextDialogue = () => {
    if (dialogIdx < currentScenario.dialogues.length - 1) {
      setDialogIdx(dialogIdx + 1);
    } else {
      setDialogIdx(0);
    }
    setTypingState({
      currentIndex: 0,
      isCorrect: true,
    });
    setTimeout(() => {
      speakSentence(
        currentScenario.dialogues[
          dialogIdx < currentScenario.dialogues.length - 1 ? dialogIdx + 1 : 0
        ].english
      );
    }, 100);
  };

  const renderTypingText = () => {
    return currentDialogue.english.split("").map((char, index) => {
      let color = "text-gray-300";
      if (index < typingState.currentIndex) {
        color = "text-green-500";
      } else if (index === typingState.currentIndex && !typingState.isCorrect) {
        color = "text-red-500";
      }
      return (
        <span key={index} className={color}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-[700px] relative">
      <div className={`${!isTypingMode ? "blur-sm pointer-events-none" : ""}`}>
        <div className="mt-4 text-3xl text-center">
          <p className="text-lg font-semibold">{currentDialogue.chinese}</p>
          <div className="mt-2">
            <p className="font-mono text-md">{renderTypingText()}</p>
          </div>
        </div>
        <div className="mt-4 text-3xl text-center">
          <p className="text-lg font-semibold">{currentDialogue.chinese}</p>
          <div className="mt-2">
            <p className="font-mono text-md">{renderTypingText()}</p>
          </div>
        </div>
        <input
          ref={inputRef}
          className="absolute opacity-0 pointer-events-auto"
          type="text"
          onChange={handleTyping}
          value={currentDialogue.english.slice(0, typingState.currentIndex)}
        />
        <Progress
          className="mt-2"
          value={
            (typingState.currentIndex / currentDialogue.english.length) * 100
          }
        />
      </div>

      {!isTypingMode && (
        <div className="flex fixed inset-0 justify-center items-center">
          <div className="text-2xl text-gray-400">按任意键开始</div>
        </div>
      )}
    </div>
  );
}
