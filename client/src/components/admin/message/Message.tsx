import React, { useState } from "react";
import { Tabs } from "antd";
import ChatInput from "./ChatInput";
import { Chat, Message } from "../../../interface/Imessage";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

// Main Chat Container
const ChatContainer: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      lastMessage: "Sure, I'll send the files soon",
      time: "10:30 AM",
      unread: 3,
      image: "/api/placeholder/40/40",
      isOnline: true,
      isGroup: false,
      messages: [
        {
          id: 1,
          text: "Hey, how's the project going?",
          time: "10:30 AM",
          sender: "other",
          senderName: "Sarah Johnson",
          senderImage: "/api/placeholder/32/32",
        },
        {
          id: 2,
          text: "It's going well! I've completed the initial designs.",
          time: "10:32 AM",
          sender: "self",
        },
      ],
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
      members: 5,
      messages: [
        {
          id: 1,
          text: "Team, we need to discuss the project timeline",
          time: "9:40 AM",
          sender: "other",
          senderName: "Project Manager",
          senderImage: "/api/placeholder/32/32",
        },
      ],
    },
    {
      id: 3,
      name: "John Doe",
      lastMessage: "Got it, thanks!",
      time: "11:15 AM",
      unread: 1,
      image: "/api/placeholder/40/40",
      isOnline: true,
      isGroup: false,
      messages: [
        {
          id: 1,
          text: "Can you review the documents?",
          time: "11:10 AM",
          sender: "other",
          senderName: "John Doe",
          senderImage: "/api/placeholder/32/32",
        },
      ],
    },
  ]);

  const [selectedTab, setSelectedTab] = useState<"individual" | "group">(
    "individual"
  );
  const [selectedChat, setSelectedChat] = useState<Chat>(
    chats.filter((chat) => !chat.isGroup)[0]
  );

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: selectedChat.messages.length + 1,
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "self",
    };

    // Update the messages for the selected chat
    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: messageText,
            time: newMessage.time,
          }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: messageText,
      time: newMessage.time,
    });
  };

  const tabItems = [
    {
      key: "individual",
      label: "Individual Chats",
      children: (
        <div className="flex h-[calc(100vh-100px)]">
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat.id}
            isGroup={false}
          />
          <div className="flex-1 flex flex-col">
            <div className="sticky z-10">
              <ChatHeader chat={selectedChat} />
            </div>
            <div className="flex-1 scrollbar-none overflow-y-auto">
              <ChatMessages messages={selectedChat.messages} />
            </div>
            <div className="sticky bottom-0 bg-white">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "group",
      label: "Group Chats",
      children: (
        <div className="flex h-[calc(100vh-100px)]">
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat.id}
            isGroup={true}
          />
          <div className="flex-1 flex flex-col">
            <div className="sticky z-10">
              <ChatHeader chat={selectedChat} />
            </div>
            <div className="flex-1 scrollbar-none overflow-y-auto">
              <ChatMessages messages={selectedChat.messages} />
            </div>
            <div className="sticky bottom-0 bg-white">
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <Tabs
        items={tabItems}
        activeKey={selectedTab}
        onChange={(key) => {
          setSelectedTab(key as "individual" | "group");
          // Reset selected chat when switching tabs
          const chatsByType = chats.filter((chat) =>
            key === "individual" ? !chat.isGroup : chat.isGroup
          );
          setSelectedChat(chatsByType[0]);
        }}
      />
    </div>
  );
};

export default ChatContainer;
