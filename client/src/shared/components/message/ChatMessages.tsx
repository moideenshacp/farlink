import React, { useEffect, useRef } from "react";
import { ChatMessagesProps } from "../../../interface/Imessage";

// A helper function to determine if a URL likely points to an image.
const isImageUrl = (url: string) => {
  return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(url);
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-none bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "self" ? "justify-end" : "justify-start"
          } mb-4`}
        >
          {message.sender === "other" && (
            <img
              src={message.senderImage}
              alt={message.senderName}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <div
            className={`max-w-[70%] ${
              message.sender === "self"
                ? "bg-green-400 text-white rounded-l-lg rounded-br-lg"
                : "bg-white text-[#232360] rounded-r-lg rounded-bl-lg"
            } p-2 shadow-sm`}
          >
            {message.sender === "other" && (
              <p className="text-xs text-[#1677ff] mb-1">
                {message.senderName}
              </p>
            )}
            {isImageUrl(message.text) ? (
              <img
                src={message.text}
                alt="sent image"
                className="rounded w-60 h-fit"
              />
            ) : (
              <p className="text-sm">{message.text}</p>
            )}
            <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
