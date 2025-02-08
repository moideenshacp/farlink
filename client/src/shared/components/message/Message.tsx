/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import ChatInput from "./ChatInput";
import { Chat, Message } from "../../../interface/Imessage";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import socket from "../../../utils/socket";
import EmptyChatScreen from "./EmptyChatScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { createChat } from "../../../api/chatApi";

const ChatContainer: React.FC = () => {
  const {user} = useSelector((state:RootState)=>state.user)
  console.log("creare chat sender id",user);
  
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

  ]);

  const [selectedTab, setSelectedTab] = useState<"individual" | "group">("individual");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  // When an employee is selected, transform the data to a User object and add/select the chat.
  const handleAddChat =async (employee: any) => {
    // Create a combined name from firstName and lastName
    const userName = `${employee.firstName} ${employee.lastName}`;
    // Check if a one-on-one chat with this employee already exists
    const existingChat = chats.find(
      (chat) => !chat.isGroup && chat.name === userName
    );
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      const newChatId =
        chats.length > 0 ? Math.max(...chats.map((chat) => chat.id ?? 0)) + 1 : 1;
      const newChat: Chat = {
        id: newChatId,
        name: userName,
        lastMessage: "",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unread: 0,
        image: employee.image,
        isOnline: false,
        isGroup: false,
        messages: [],
      };

      const chatDetails = {
        chatType:"private",
        participants:[employee._id,user?._id]

      }
      try {
        const res = await createChat(chatDetails)

        console.log(res.data,"create chatttttttt------------------------");
        
      } catch (error) {
        console.log(error);
        
      }
      setChats((prevChats) => [...prevChats, newChat]);
      setSelectedChat(newChat);
    }
  };

  const handleSendMessage = (messageText: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: selectedChat.messages.length + 1,
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "self",
    };

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
    });
  };

  useEffect(() => {
    if (selectedChat) {
      socket.emit("joinRoom", selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === newMessage.chatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        )
      );
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const tabItems = [
    {
      key: "individual",
      label: "Individual Chats",
      children: (
        <div className="flex lg:-mt-6 h-[calc(100vh-100px)]">
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat?.id || null}
            isGroup={false}
            onAddChat={handleAddChat} 
          />
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              <div className="sticky z-10">
                <ChatHeader chat={selectedChat} />
              </div>
              <div className="flex-1 scrollbar-none overflow-y-auto">
                <ChatMessages messages={selectedChat.messages} />
              </div>
              <div className="sticky bottom-0 bg-white">
                <ChatInput onSendMessage={handleSendMessage} selectedChat={selectedChat} />
              </div>
            </div>
          ) : (
            <EmptyChatScreen />
          )}
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
            selectedChatId={selectedChat?.id || null}
            isGroup={true}
          />
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              <div className="sticky z-10">
                <ChatHeader chat={selectedChat} />
              </div>
              <div className="flex-1 scrollbar-none overflow-y-auto">
                <ChatMessages messages={selectedChat.messages} />
              </div>
              <div className="sticky bottom-0 bg-white">
                <ChatInput onSendMessage={handleSendMessage} selectedChat={selectedChat} />
              </div>
            </div>
          ) : (
            <EmptyChatScreen />
          )}
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
          setSelectedChat(null);
        }}
      />
    </div>
  );
};

export default ChatContainer;
