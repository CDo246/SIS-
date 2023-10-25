import React, { useState, useEffect, useRef } from "react";
import OptionsBar from "./OptionsBar.tsx";
import "../index.css";
import TypingText from "../assets/TypingText";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { RouterInput, trpc } from "../utils/trpc";

export function MainPage() {
  const roleAvatars: { [key: string]: string } | undefined =
    trpc.roleAvatars.useQuery().data;

  const bottom = useRef<null | HTMLDivElement>(null);
  const topicArea = useRef<null | HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<
    { text: string; isRight: boolean; avatarUrl: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<string>("");
  const [submittedTopic, setSubmittedTopic] = useState<string>("");
  const [selectedRoleFor, setSelectedRoleFor] = useState<string>("Debater");
  const [selectedRoleAgainst, setSelectedRoleAgainst] =
    useState<string>("Debater");
  const [roleFor, setRoleFor] = useState<string>("Debater");
  const [roleAgainst, setRoleAgainst] = useState<string>("Debater");
  const [rightAvatarUrl, setRightAvatarUrl] = useState<string>(
    "/images/default.jpg",
  );
  const [leftAvatarUrl, setLeftAvatarUrl] = useState<string>(
    "/images/default.jpg",
  );
  const [messageCount, setMessageCount] = useState<number>(2);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [warningVisible, setWarningVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<number>(0); // 0: not loading, 1: loading debate, 2: waiting for text to display

  const roles: string[] | undefined = trpc.roles.useQuery().data;
  const getRandomPlaceholder = trpc.randTopic.useQuery().data;
  const randomPlaceholder: string | undefined = getRandomPlaceholder;

  useEffect(() => {
    if (roleAvatars) {
      setLeftAvatarUrl(
        !roles?.includes(roleAgainst)
          ? "/images/default.jpg"
          : `/images/${roleAvatars[roleAgainst]}`,
      );
      setRightAvatarUrl(
        !roles?.includes(roleFor)
          ? "/images/default.jpg"
          : `/images/${roleAvatars[roleFor]}`,
      );
    }
  }, [roleAgainst, roleFor, roleAvatars, roles]);

  const [debateArgs, setDebateArgs] = useState<
    RouterInput["generateDebateStream"] | null
  >(null);
  trpc.generateDebateStream.useSubscription(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  useEffect(() => {
    // when the MainPage component is rendered, prevent the screen from scrolling
    document.getElementById("root")!.className = "flex flex-col h-screen";
    return () => {
      document.getElementById("root")!.className = "";
    };
  }, []);

  useEffect(() => {
    // scroll to bottom while message is displaying
    const scrollInterval = setInterval(() => {
      if (isLoading == 2)
        bottom.current?.scrollIntoView({ behavior: "smooth" }), 25;
    });
    if (isLoading == 1) {
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      clearInterval(scrollInterval);
    };
  });
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
      setIsOpen(false);
      setIsLoading(1);
      handleSend(submittedTopic.trim());
      setTopic(submittedTopic.trim());
      setSubmittedTopic("");
      setRoleFor(selectedRoleFor);
      setRoleAgainst(selectedRoleAgainst);
      setWarningVisible(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow p-4">
          {/* <TestDebate></TestDebate> */}
          <OptionsBar
            roles={roles}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
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
            {messages.map(
              (msg, index) =>
                currentCount >= index && ( // next message must wait for previous ones to finish
                  <div
                    key={index}
                    className={`flex ${
                      msg.isRight ? "justify-end" : "justify-start"
                    } py-1`}
                  >
                    {/* Placing left side avatars before chat bubbles, and right
                    side avatars after chat bubbles */}
                    <div className={`${msg.isRight && "order-last"} min-w-fit`}>
                      <br></br>
                      <img
                        src={msg.isRight ? rightAvatarUrl : leftAvatarUrl}
                        alt="Profile Picture"
                        title={msg.isRight ? roleFor : roleAgainst}
                        className={`${
                          msg.isRight ? "ml-2" : "mr-2"
                        } w-8 lg:w-10 h-8 lg:h-10 rounded-full`} // Adjust 'ml-2' and 'mr-2' as required for margin purposes
                      />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`${
                          msg.isRight && "text-end"
                        } mx-2 text-[#9ca3af]`}
                      >
                        {msg.isRight
                          ? roleFor + " (For)"
                          : roleAgainst + " (Against)"}
                      </span>
                      <div
                        className={`${
                          msg.isRight
                            ? "bg-blue-100 dark:bg-blue-950 dark:text-white"
                            : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                        } p-2 rounded-lg inline-block max-w-2xl min-h-10`}
                      >
                        <TypingText
                          text={msg.text}
                          speed={5}
                          messageCount={messageCount}
                          setCurrentCount={setCurrentCount}
                          messageIndex={index}
                          setIsLoading={setIsLoading}
                        />{" "}
                        {/* Speed can be adjusted to be faster/slower if needed - lower number is faster*/}
                      </div>
                    </div>
                  </div>
                ),
            )}
            {isLoading == 1 && (
              // Loading text bubbles
              <div
                className={`flex ${
                  currentCount % 2 == 0 ? "justify-end" : "justify-start"
                } py-1`}
              >
                {
                  // Placing left side avatars before chat bubbles, and right side avatars after chat bubbles
                  <div
                    className={`${
                      currentCount % 2 == 0 && "order-last"
                    } min-w-fit`}
                  >
                    <br></br>
                    <img
                      src={
                        currentCount % 2 == 0 ? rightAvatarUrl : leftAvatarUrl
                      }
                      alt="Profile Picture"
                      title={currentCount % 2 == 0 ? roleFor : roleAgainst}
                      className={`${
                        currentCount % 2 == 0 ? "ml-2" : "mr-2"
                      } w-8 lg:w-10 h-8 lg:h-10 rounded-full`} // Adjust 'ml-2' and 'mr-2' as required for margin purposes
                    />
                  </div>
                }
                <div
                  className={`${
                    currentCount % 2 == 0 && "items-end"
                  } flex flex-col`}
                >
                  <span
                    className={`${
                      currentCount % 2 == 0 && "text-end"
                    } mx-2 text-[#9ca3af]`}
                  >
                    {currentCount % 2 == 0
                      ? roleFor + " (For)"
                      : roleAgainst + " (Against)"}
                  </span>
                  <div
                    className={`${
                      currentCount % 2 == 0
                        ? "bg-blue-100 dark:bg-blue-950 dark:text-white"
                        : "bg-gray-100 dark:bg-gray-800 dark:text-white"
                    } p-2 rounded-lg inline-block max-w-[48px] max-h-10`}
                  >
                    <EllipsisHorizontalIcon className="h-8 text-center mx-auto motion-safe:animate-pulse" />{" "}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottom}></div>
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
        <p className="dark:text-white pb-4 text-center fixed bottom-24 max-w-[900px] max-h-[64px] overflow-y-auto mx-auto inset-x-0">
          {topic ? (
            <span className="font-bold" id="TopicSpan">
              Topic:&nbsp;
            </span>
          ) : (
            <span>
              <span className="font-bold" id="TopicSpan">
                Enter topic below:
              </span>
              <span className="text-[#9ca3af]">
                {" "}
                (Tab to autofill with example)
              </span>
            </span>
          )}
          {topic}
        </p>
        <div className="flex justify-center h-24 mt-2">
          <form
            onSubmit={handleSubmit}
            className="absolute shadow-lg lg:w-1/2 h-24 w-11/12 m-2 p-2 space-x-2 justify-center rounded-lg bottom-0 dark:bg-gray-800 flex z-50"
          >
            <textarea
              ref={topicArea}
              placeholder={
                randomPlaceholder ? randomPlaceholder : "Enter topic here..."
              }
              disabled={isLoading != 0}
              maxLength={128}
              onChange={(e) => setSubmittedTopic(e.target.value)}
              value={submittedTopic}
              onKeyDown={(e) => {
                if (e.key == "Enter" && !e.shiftKey) handleSubmit(e);
                addEventListener("keydown", (event) => {
                  if (
                    event.key === "Tab" &&
                    !e.shiftKey &&
                    !submittedTopic &&
                    randomPlaceholder
                  ) {
                    e.preventDefault();
                    const placeholder =
                      topicArea.current?.getAttribute("placeholder");
                    placeholder && setSubmittedTopic(placeholder);
                  }
                });
              }}
              className="resize-none max-w-screen-lg flex-grow box-border bg-transparent dark:text-white"
            ></textarea>
            <div className="flex flex-col">
              <button
                name="Submit"
                type="submit"
                disabled={isLoading != 0}
                className={
                  "bg-sky-700 ml-auto self-end h-full text-white rounded-lg"
                }
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
