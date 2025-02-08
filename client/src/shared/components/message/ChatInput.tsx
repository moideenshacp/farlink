import { Image, Paperclip, Send, Smile } from "lucide-react";
import React, { useState } from "react";
import { ChatInputProps } from "../../../interface/Imessage";
import socket from "../../../utils/socket";


  
  const ChatInput: React.FC<ChatInputProps> = ({selectedChat ,onSendMessage }) => {
    const [message, setMessage] = useState('');
  
    const handleSend = () => {
        if (message.trim()) {
          const newMessage = {
            chatId: selectedChat?.id,
            sender: "self",
            text: message,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };
      
          socket.emit("sendMessage", newMessage);
          onSendMessage(newMessage.text);
          setMessage('');
        }
      };
    
    return (
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-gray-50 rounded-lg px-4 py-2 outline-none text-sm"
            placeholder="Type a message..."
          />
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <button 
            onClick={handleSend}
            className="bg-[#1677ff] p-2 rounded-full hover:bg-blue-600"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    );
  };

  export default ChatInput