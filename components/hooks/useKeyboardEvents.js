import { useEffect } from "react";

export function useKeyboardEvents({
  isTypingMode,
  setIsTypingMode,
  inputRef,
  speakSentence,
  currentSentence,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isTypingMode) {
        setIsTypingMode(true);
        inputRef.current?.focus();
        speakSentence(currentSentence);
        e.preventDefault();
      }
    };

    const handleBlur = () => {
      setIsTypingMode(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isTypingMode, currentSentence, speakSentence, inputRef, setIsTypingMode]);

  return null;
}
