import React, { useState, useEffect } from "react";
import OptionsBar from "./OptionsBar.tsx";
import "../index.css";
import TypingText from "../assets/TypingText";
import leftAvatar from "./left-avatar.jpg";
import rightAvatar from "./right-avatar.jpg";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
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
  const [warningVisible, setWarningVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

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
    },
  );
  const randomPlaceholder = trpc.randTopic.useQuery().data;

  useEffect(() => {
    document.getElementById("root")!.className = "flex flex-col h-screen";
    return () => {
      document.getElementById("root")!.className = "";
    };
  }, []);
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
      | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (submittedTopic) {
      setIsLoading(true);
      setIsEmpty(true);
      handleSend(submittedTopic.trim());
      setTopic(submittedTopic.trim());
      setSubmittedTopic("");
      setWarningVisible(false);
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow p-4">
          {/* <TestDebate></TestDebate> */}
          <OptionsBar
            selectedRoleAgainst={selectedRoleAgainst}
            setSelectedRoleAgainst={setSelectedRoleAgainst}
            selectedRoleFor={selectedRoleFor}
            setSelectedRoleFor={setSelectedRoleFor}
            messageCount={messageCount}
            setMessageCount={setMessageCount}
            warningVisible={warningVisible}
            setWarningVisible={setWarningVisible}
          />
          <div className="border overflow-y-auto dark:border-gray-500 rounded-lg p-4 shadow-md grow fixed lg:w-7/12 mx-auto lg:min-w-[900px] w-full max-h-full top-20 bottom-40 inset-x-0">
            {isLoading && isEmpty && (
              <div>
                <br></br>
                <ArrowPathIcon className="dark:text-sky-100 text-sky-700 w-9 mx-auto motion-safe:animate-spin"></ArrowPathIcon>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isRight ? "justify-end" : "justify-start"
                } py-1`}
              >
                {!msg.isRight && ( // Placing left side avatars before chat bubbles, and right side avatars after chat bubbles
                  <div className="min-w-fit">
                    <br></br>
                    <img
                      src={leftAvatarUrl}
                      alt="Profile Picture"
                      className="w-8 h-8 rounded-full mr-2" // Adjust 'mr-2' as required for margin purposes
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <span
                    className={`${
                      msg.isRight && "text-end"
                    } mx-2 text-[#9ca3af]`}
                  >
                    {msg.isRight ? selectedRoleFor : selectedRoleAgainst}
                  </span>
                  <div
                    className={`${
                      msg.isRight
                        ? "bg-blue-100 dark:bg-blue-950 dark:text-white"
                        : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                    } p-2 rounded-lg inline-block max-w-2xl`}
                  >
                    <TypingText
                      text={msg.text}
                      speed={5}
                      messageCount={messageCount}
                      messageIndex={index}
                      setIsLoading={setIsLoading}
                      setIsEmpty={setIsEmpty}
                    />{" "}
                    {/* Speed can be adjusted to be faster/slower if needed - lower number is faster*/}
                  </div>
                </div>
                {msg.isRight && (
                  <div className="min-w-fit">
                    <br></br>
                    <img
                      src={rightAvatarUrl}
                      alt="Profile Picture"
                      className="w-8 h-8 rounded-full ml-2" // Adjust 'ml-2' as required for margin purposes
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
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
        <p className="dark:text-white pb-4 text-center fixed bottom-24 mx-auto inset-x-0">
          {topic ? (
            <span className="font-bold" id="TopicSpan">
              Topic:&nbsp;
            </span>
          ) : (
            <br></br>
          )}
          {topic}
        </p>
        <div className="flex justify-center h-24 mt-2">
          <form
            onSubmit={handleSubmit}
            className="absolute shadow-lg lg:w-1/2 h-24 w-11/12 m-2 p-2 space-x-2 justify-center rounded-md bottom-0 dark:bg-gray-800 flex"
          >
            <textarea
              placeholder={
                randomPlaceholder ? randomPlaceholder : "Enter Topic Here..."
              }
              disabled={isLoading}
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
                disabled={isLoading}
                className={"bg-sky-700 ml-auto self-end text-white rounded-lg"}
              >
                Go!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
