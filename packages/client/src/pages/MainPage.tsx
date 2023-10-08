import React, { useState } from "react";
import OptionsBar from "./OptionsBar.tsx";
import "../index.css";
import TypingText from "../assets/TypingText";
import leftAvatar from "./left-avatar.jpg";
import rightAvatar from "./right-avatar.jpg";
import { RouterInput, trpc } from "../utils/trpc";
import { Router } from "@trpc/server";

export function MainPage() {
  const leftAvatarUrl = leftAvatar; // Left and right side Avatar URLS can be adjusted here
  const rightAvatarUrl = rightAvatar;

  const [messages, setMessages] = useState<
    { text: string; isRight: boolean; avatarUrl: string }[]
  >([]);
  const [topic, setTopic] = useState<string>("");
  const [submittedTopic, setSubmittedTopic] = useState<string>("");
  const [selectedRoleFor, setSelectedRoleFor] = useState<string>("Debater");
  const [selectedRoleAgainst, setSelectedRoleAgainst] =
    useState<string>("Debater");
  const [messageCount, setMessageCount] = useState<number>(2);

  const [debateArgs, setDebateArgs] = useState<
    RouterInput["generateDebateStream"] | null
  >(null);
  trpc.generateDebateStream.useSubscription(
    debateArgs != null ? debateArgs : (null as any),
    {
      enabled: debateArgs != null,
      onData: (message) => {
        setMessages((messages) => {
          return [
            ...messages,
            {
              text: message.message,
              isRight: message.side == "for",
              avatarUrl: message.side == "for" ? rightAvatarUrl : leftAvatarUrl,
            },
          ];
        });
      },
    }
  );
  const randomPlaceholder = trpc.randTopic.useQuery().data;

  const handleSend = async (topic: string) => {
    setMessages([]);
    setDebateArgs({
      role1: selectedRoleFor,
      role2: selectedRoleAgainst,
      messageCount: messageCount as number,
      topic: topic,
      startingSide: "for",
    });
  };
  const handleSubmit = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (submittedTopic) {
      handleSend(submittedTopic.trim());
      setTopic(submittedTopic.trim());
      setSubmittedTopic("");
    }
  };
  return (
    <>
      <div className="mx-auto lg:w-7/12 lg:min-w-[900px] mb-24 p-4">
        <OptionsBar
          selectedRoleAgainst={selectedRoleAgainst}
          setSelectedRoleAgainst={setSelectedRoleAgainst}
          selectedRoleFor={selectedRoleFor}
          setSelectedRoleFor={setSelectedRoleFor}
          messageCount={messageCount}
          setMessageCount={setMessageCount}
        />
        <div className="border h-[65vh] overflow-y-auto dark:border-gray-500 rounded-lg p-4 shadow-md grow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isRight ? "justify-end" : "justify-start"
              } py-1`}
            >
              {!msg.isRight && ( // Placing left side avatars before chat bubbles, and right side avatars after chat bubbles
                <img
                  src={leftAvatarUrl}
                  alt="Profile Picture"
                  className="w-8 h-8 rounded-full mr-2" // Adjust 'mr-2' as required for margin purposes
                />
              )}
              <div
                className={`${
                  msg.isRight
                    ? "bg-blue-100 dark:bg-blue-950 dark:text-white"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                } p-2 rounded-lg inline-block max-w-2xl`}
              >
                <TypingText text={msg.text} speed={5} />{" "}
                {/* Speed can be adjusted to be faster/slower if needed - lower number is faster*/}
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
        <p className="dark:text-white my-2 text-center">
          {topic && (
            <span className="font-bold" id="TopicSpan">
              Topic:
            </span>
          )}{" "}
          {topic}
        </p>
        {/* <div className="mt-4">
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
        </div> */}
        {/* input for testing purposes */}
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="fixed shadow-lg lg:w-1/2 h-24 w-11/12 m-2 p-2 space-x-2 justify-center rounded-md bottom-0 bg-sky-100/75 dark:bg-gray-800/75 flex"
        >
          <textarea
            placeholder={
              randomPlaceholder ? randomPlaceholder : "Enter Topic Here..."
            }
            onChange={(e) => setSubmittedTopic(e.target.value)}
            value={submittedTopic}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) handleSubmit(e);
            }}
            className="resize-none max-w-screen-lg flex-grow box-border bg-transparent dark:text-white"
          ></textarea>
          <div className="flex flex-col">
            <button
              name="Submit"
              type="submit"
              className="ml-auto self-end bg-blue-950 text-white rounded-lg"
            >
              Go!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
