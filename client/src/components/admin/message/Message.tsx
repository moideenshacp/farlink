/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Send, MoreVertical, Search, Paperclip, Image, Smile, Users } from 'lucide-react';

// Chat List Component
const ChatList = () => {
    const chats = [
      {
        id: 1,
        name: "Sarah Johnson",
        lastMessage: "Sure, I'll send the files soon",
        time: "10:30 AM",
        unread: 3,
        image: "/api/placeholder/40/40",
        isOnline: true,
        isGroup: false
      },
      {
        id: 2,
        name: "Project Team Alpha",
        lastMessage: "Meeting scheduled for tomorrow",
        time: "9:45 AM",
        unread: 0,
        image: "/api/placeholder/40/40",
        isOnline: false,
        isGroup: true,
        members: 5
      }
    ];
  
    return (
      <div className="w-80 border-r bg-white h-screen flex flex-col fixed ">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              className="bg-transparent outline-none flex-1 text-sm"
              placeholder="Search chats..."
            />
          </div>
        </div>
        <div className="overflow-y-auto scrollbar-none flex-1">
          {chats.map(chat => (
            <div key={chat.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b">
              <div className="relative">
                <img src={chat.image} alt={chat.name} className="w-10 h-10 rounded-full" />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                {chat.isGroup && (
                  <div className="absolute bottom-0 right-0 bg-[#1677ff] rounded-full w-4 h-4 flex items-center justify-center">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-[#232360]">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="bg-[#1677ff] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

// Chat Header Component
const ChatHeader:React.FC<any> = ({ chat }) => {
  return (
    <div className="flex items-center  justify-between p-3 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={chat.image} alt={chat.name} className="w-10 h-10 rounded-full" />
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-[#232360]">{chat.name}</h3>
          {chat.isGroup ? (
            <p className="text-sm text-gray-500">{chat.members} members</p>
          ) : (
            <p className="text-sm text-gray-500">{chat.isOnline ? 'Online' : 'Offline'}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">

        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-[#1677ff]" />
        </button>
      </div>
    </div>
  );
};

// Chat Messages Component
const ChatMessages = () => {
  const messages = [
    {
      id: 1,
      text: "Hey, how's the project going?",
      time: "10:30 AM",
      sender: "other",
      senderName: "Sarah Johnson",
      senderImage: "/api/placeholder/32/32"
    },
    {
      id: 2,
      text: "It's going well! I've completed the initial designs.",
      time: "10:32 AM",
      sender: "self"
    },
    {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      },
      {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      },
      {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      },
      {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      },
      {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      },
      {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      },    {
        id: 2,
        text: "It's going well! I've completed the initial designs.",
        time: "10:32 AM",
        sender: "self"
      }

    
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-none bg-gray-50">
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          {message.sender === 'other' && (
            <img src={message.senderImage} alt={message.senderName} className="w-8 h-8 rounded-full mr-2" />
          )}
          <div
            className={`max-w-[70%] ${
              message.sender === 'self'
                ? 'bg-[#1677ff] text-white rounded-l-lg rounded-br-lg'
                : 'bg-white text-[#232360] rounded-r-lg rounded-bl-lg'
            } p-3 shadow-sm`}
          >
            {message.sender === 'other' && (
              <p className="text-xs text-[#1677ff] mb-1">{message.senderName}</p>
            )}
            <p className="text-sm">{message.text}</p>
            <p className="text-xs text-right mt-1 opacity-70">{message.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Chat Input Component
const ChatInput = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="p-4 border-t  bg-white">
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
          className="flex-1 bg-gray-50 rounded-lg px-4 py-2 outline-none text-sm"
          placeholder="Type a message..."
        />
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Smile className="w-5 h-5 text-gray-500" />
        </button>
        <button className="bg-[#1677ff] p-2 rounded-full hover:bg-blue-600">
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

// Main Chat Container
const ChatContainer = () => {
    const currentChat = {
      name: "Sarah Johnson",
      image: "/api/placeholder/40/40",
      isOnline: true,
      isGroup: false,
      members: 0
    };
  
    return (
      <div className="flex h-screen bg-white">
        <ChatList />
        <div className="flex-1 flex flex-col ml-80">
          <div className="sticky z-10">
            <ChatHeader chat={currentChat} />
          </div>
          <div className="flex-1 scrollbar-none overflow-y-auto">
            <ChatMessages />
          </div>
          <div className="sticky bottom-0 bg-white">
            <ChatInput />
          </div>
        </div>
      </div>
    );
  };

export default ChatContainer;