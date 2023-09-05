import { useState } from "react";
import { trpc } from "../utils/trpc";
import '../index.css';
import TypingText from '../assets/TypingText';

export function MainPage() {
  const [messages, setMessages] = useState<{ text: string; isRight: boolean }[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim() !== '') {
      //console.log('message:', message); // debug message text
      const newMessage = { text: message, isRight: messages.length % 2 === 0 }; // Checking whether message is sent by right or left bot
      //console.log('newmessage:', newMessage); // debug new message text
      setMessages([...messages, newMessage]);
      setMessage('');
    }
};
  return (
    <div className="container mx-auto p-4">
      <div className="border rounded-lg p-4 shadow-md chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.isRight ? 'right-message' : 'left-message'
            }`}
            >
              <TypingText text={msg.text} speed={50} /> {/* Speed can be adjusted to be faster/slower if needed */}
              </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 rounded-lg border"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
