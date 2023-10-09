import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
// Inputs
// text: Desired text to display
// speed: Speed of text being displayed (in miliseconds per character)
function TypingText(props: {
  text: string;
  speed: number;
  messageCount: number;
  messageIndex: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    props.setMessageLoading(false);
    const typingInterval = setInterval(() => {
      if (currentIndex < props.text.length) {
        setDisplayedText(props.text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
        if (props.messageIndex + 1 == 2 * props.messageCount)
          props.setIsLoading(false);
        else props.setMessageLoading(true);
      }
    }, props.speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, props.text, props.speed]);

  return <span>{displayedText}</span>;
}

export default TypingText;
