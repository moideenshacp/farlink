import { Image, Paperclip, Send, Smile } from "lucide-react";
import React, { useState, useRef } from "react";
import { ChatInputProps } from "../../../interface/Imessage";
import socket from "../../../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { uploadFileToCloudinary } from "../../../api/employeeApi"; // adjust if needed
import { FaSpinner } from "react-icons/fa";

const ChatInput: React.FC<ChatInputProps> = ({ selectedChat }) => {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        chatId: selectedChat?.id,
        sender: user?._id,
        content: message,
        time: new Date().toISOString(),
      };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const imageUrl = await uploadFileToCloudinary(file, setIsUploading);
      if (imageUrl) {
        const newMessage = {
          chatId: selectedChat?.id,
          sender: user?._id,
          content: imageUrl,
          time: new Date().toISOString(),
        };
        socket.emit("sendMessage", newMessage);
      } else {
        setUploadError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={handleImageButtonClick}
        >
          <Image className="w-5 h-5 text-gray-500" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-50 rounded-lg px-4 py-2 outline-none text-sm"
          placeholder="Type a message..."
        />
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Smile className="w-5 h-5 text-gray-500" />
        </button>
        <button
          onClick={handleSend}
          className="bg-[#1677ff] p-2 rounded-full hover:bg-blue-600"
          disabled={isUploading}
        >
          {isUploading ? (
            <FaSpinner className="text-blue-500 animate-spin text-3xl" />
          ) : (
            <Send className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
      {uploadError && (
        <div className="text-red-500 text-xs mt-2">
          {uploadError}{" "}
          <button
            onClick={handleImageButtonClick}
            className="underline ml-2 text-blue-600"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
