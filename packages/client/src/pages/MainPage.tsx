import { useState } from "react";
import { trpc } from "../utils/trpc";
import '../index.css';
import TypingText from '../assets/TypingText';
import leftAvatar from './left-avatar.jpg';
import rightAvatar from './right-avatar.jpg';

export function MainPage() {
  const leftAvatarUrl = leftAvatar; // Left and right side Avatar URLS can be adjusted here
  const rightAvatarUrl = rightAvatar; 

  const [messages, setMessages] = useState<{ text: string; isRight: boolean; avatarUrl: string }[]>([]);
  const [message, setMessage] = useState<string>('');
  const hello = trpc.greeting.useQuery();

  const handleSend = () => {
    if (message.trim() !== '') {
      const newMessage = { 
        text: message, 
        isRight: messages.length % 2 === 0,
        avatarUrl: messages.length % 2 === 0 ? rightAvatarUrl : leftAvatarUrl, }; // Checking whether message is sent by right or left bot
      setMessages([...messages, newMessage]);
      setMessage('');
    }
};
  return (
    <>
    <div className="container mx-auto p-4">
      <div className="border rounded-lg p-4 shadow-md chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isRight ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isRight && ( // Placing left side avatars before chat bubbles, and right side avatars after chat bubbles
              <img
                src={leftAvatarUrl}
                alt="Profile Picture"
                className="w-8 h-8 rounded-full mr-2" // Adjust 'mr-2' as required for margin purposes
              />
            )}
            <div className={`${msg.isRight ? 'text-right' : 'text-left'}`}>

              <div className={`${msg.isRight ? 'bg-blue-100' : 'bg-gray-100'} p-2 rounded-lg inline-block`} style={{ maxWidth: '50%' }}>
                <TypingText text={msg.text} speed={35} /> {/* Speed can be adjusted to be faster/slower if needed - lower number is faster*/}
              </div>
            </div>
            {msg.isRight && (
                <img
                  src={rightAvatarUrl}
                  alt="Profile Picture"
                  className="w-8 h-8 rounded-full ml-2" // Adjust 'ml-2' as required for margin purposes
                />
              )}
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
    <body>
        <div id="footer">
          <button>Publish</button>
          <textarea
            name="Enter Topic"
            placeholder="Enter Topic Here...."
          ></textarea>
        </div>
      </body>

      <p>{hello.data}</p>

    </>
  );
}
