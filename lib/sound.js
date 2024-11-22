export function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1; // Slightly slower speed for clarity
  utterance.pitch = 0.9;
  utterance.volume = 0.2;
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}
