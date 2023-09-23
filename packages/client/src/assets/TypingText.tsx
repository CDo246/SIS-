import React, { useState, useEffect } from "react";
// Inputs
// text: Desired text to display
// speed: Speed of text being displayed (in miliseconds per character)
function TypingText({ text, speed }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, text, speed]);

  return <span>{displayedText}</span>;
}

export default TypingText;
