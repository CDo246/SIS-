import React, { useState, useEffect } from "react";
// Inputs
// text: Desired text to display
// speed: Speed of text being displayed (in miliseconds per character)
function TypingText(props: {
  text: string;
  speed: number;
  messageCount: number;
  setCurrentCount: React.Dispatch<React.SetStateAction<number>>;
  messageIndex: number;
  setIsLoading: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    props.setIsLoading(2);
    const typingInterval = setInterval(() => {
      if (currentIndex < props.text.length) {
        setDisplayedText(props.text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
        props.setCurrentCount(props.messageIndex + 1);
        if (props.messageIndex + 1 == 2 * props.messageCount)
          // check if final message
          props.setIsLoading(0);
        else props.setIsLoading(1);
      }
    }, props.speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, props.text, props.speed]);

  return <span>{displayedText}</span>;
}

export default TypingText;
