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
import { createChat, fetchAllChats, fetchMessages } from "../../../api/chatApi";
import { fetchEmployeesByIds } from "../../../api/authApi";
import { IEmployee } from "../../../interface/IemployeeDetails";
import Notifications from "../Notification";

const ChatContainer: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [chats, setChats] = useState<Chat[]>([]);

  const [selectedTab, setSelectedTab] = useState<"individual" | "group">(
    "individual"
  );
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const handleSelectChat = async (chat: Chat) => {
    try {
      // setSelectedChat(chat);

      const res = await fetchMessages(chat.id);
      if (res.data?.result) {
        const formattedMessages = res.data.result.map((msg: any) => {
          return {
            id: msg._id,
            text: msg.content,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: msg.sender === user?._id ? "self" : "other",
            senderImage: chat.isGroup
              ? chat.participants?.find(
                  (p: { _id: string; name: string }) => p._id === msg.sender
                )?.image || "Unknown"
              : chat.image,
            senderName: chat.isGroup
              ? chat.participants?.find(
                  (p: { _id: string; firstName: string; lastName: string }) =>
                    p._id === msg.sender
                )
                ? `${
                    chat.participants.find((p) => p._id === msg.sender)
                      ?.firstName
                  } ${
                    chat.participants.find((p) => p._id === msg.sender)
                      ?.lastName
                  }`
                : "Unknown"
              : chat.name,
          };
        });

        setSelectedChat({
          ...chat,
          messages: formattedMessages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChats = async () => {
    try {
      const res = await fetchAllChats(user?._id);

      if (res.data?.result) {
        const chatData = res.data.result;
        const allParticipantIds = [
          ...new Set(chatData.flatMap((chat: any) => chat.participants)),
        ];

        const employeeRes = await fetchEmployeesByIds(allParticipantIds);
        if (employeeRes.data) {
          const employeeMap = new Map(
            employeeRes.data.employees.map((employee: any) => [
              employee._id,
              employee,
            ])
          );
          const chatsWithEmployeeData = chatData.map((chat: any) => ({
            ...chat,
            participants: chat.participants.map(
              (participantId: string) =>
                employeeMap.get(participantId) || { _id: participantId }
            ),
          }));

          const formattedChats = chatsWithEmployeeData.map((chat: any) => {
            const receiver = chat.participants.filter(
              (emp: any) => emp._id !== user?._id
            );
            chat.participants.filter((emp: any) => emp._id === user?._id);
            return {
              id: chat._id,
              name:
                chat.chatType === "group"
                  ? chat.groupName
                  : `${receiver[0].firstName} ${receiver[0].lastName}`,
              lastMessage: chat.lastMessage?.content || "",
              time: new Date(
                chat.lastMessage?.updatedAt || chat.updatedAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              unread: 0,
              image:
                chat.chatType === "group"
                  ? "/api/placeholder/group-icon.png"
                  : receiver[0].image || "/api/placeholder/40/40",
              isOnline:
                chat.chatType === "group"
                  ? false
                  : receiver[0].isActive || false,
              isGroup: chat.chatType === "group",
              messages: [],
              groupName: chat.groupName,
              participants: chat.participants,
              groupAdmin: chat.groupAdmin,
            };
          });
          formattedChats.sort((a: any, b: any) => {
            const timeA = new Date(a.time).getTime();
            const timeB = new Date(b.time).getTime();
            return timeB - timeA;
          });
          setChats(formattedChats);
          return formattedChats;
        }
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);
  const handleAddChat = async (employee: any) => {
    const updatedChats = await fetchAllChats(user?._id);
    const existingChat = updatedChats.data.result.find(
      (chat: any) =>
        chat.chatType === "private" &&
        chat.participants.includes(employee._id) &&
        chat.participants.includes(user?._id)
    );
    if (existingChat) {
      const updatedChats = await fetchChats();
      const newChat = updatedChats.filter(
        (chat: any) => chat.id == existingChat._id
      );
      await handleSelectChat(newChat[0]);
    } else {
      const chatDetails = {
        chatType: "private",
        participants: [employee._id, user?._id],
      };
      try {
        const res = await createChat(chatDetails);
        if (res) {
          const updatedChats = await fetchChats();
          const newChat = updatedChats.filter(
            (chat: any) => chat.id == res.data.result._id
          );
          if (newChat) {
            setSelectedChat(newChat[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGroupAdd = async (groupName: string, members: any) => {
    const membersId: any = [];
    members.map((emp: IEmployee) => {
      membersId.push(emp._id);
    });
    const chatDetails = {
      groupName: groupName,
      chatType: "group",
      participants: [...membersId, user?._id],
      groupAdmin: user?._id,
    };
    try {
      const res = await createChat(chatDetails);
      if (res) {
        const updatedChats = await fetchChats();
        const newChat = updatedChats.filter(
          (chat: any) => chat.id == res.data.result._id
        );
        if (newChat) {
          setSelectedChat(newChat[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    socket.emit("registerUser", user?._id);
  }, [user?._id]);

  useEffect(() => {
    if (selectedChat) {
      socket.emit("joinRoom", selectedChat.id);
    }
  }, [selectedChat, user?._id]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: any) => {
      fetchChats();
      const chat = chats.find((chat) => chat.id === newMessage.chatId);
      if (!chat) return;
      if (chat.messages.some((msg) => msg.id === newMessage.id)) return;

      const formattedMessage: Message = {
        id: newMessage.id || Date.now(),
        text: newMessage.content,
        time: new Date(newMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: newMessage.sender === user?._id ? "self" : "other",
        senderName: chat.isGroup
          ? chat.participants?.find(
              (p: { _id: string; firstName: string; lastName: string }) =>
                p._id === newMessage.sender
            )
            ? `${
                chat.participants.find((p) => p._id === newMessage.sender)
                  ?.firstName
              } ${
                chat.participants.find((p) => p._id === newMessage.sender)
                  ?.lastName
              }`
            : "Unknown"
          : chat.name,
        senderImage: chat.isGroup
          ? chat.participants?.find(
              (p: { _id: string; name: string }) => p._id === newMessage.sender
            )?.image || "Unknown"
          : chat.image,
      };
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === newMessage.chatId
            ? {
                ...chat,
                messages: [...chat.messages, formattedMessage],
                lastMessage: formattedMessage.text,
                time: formattedMessage.time,
              }
            : chat
        )
      );
      setSelectedChat((prevChat) =>
        prevChat && prevChat.id === newMessage.chatId
          ? {
              ...prevChat,
              messages: [...prevChat.messages, formattedMessage],
            }
          : prevChat
      );
    });

    return () => {
      socket.off("receiveMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

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
              <div className="sticky">
                <ChatHeader chat={selectedChat} />
              </div>
              <div className="flex-1 scrollbar-none overflow-y-auto">
                <ChatMessages messages={selectedChat.messages} />
              </div>
              <div className="sticky bottom-0 bg-white">
                <ChatInput selectedChat={selectedChat} />
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
        <div className="flex lg:-mt-6 h-[calc(100vh-100px)]">
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat?.id || null}
            isGroup={true}
            onAddGroup={handleGroupAdd}
          />
          {selectedChat ? (
            <div className="flex-1 flex flex-col">
              <div className="sticky ">
                <ChatHeader chat={selectedChat} fetchChats={fetchChats} />
              </div>
              <div className="flex-1 scrollbar-none overflow-y-auto">
                <ChatMessages messages={selectedChat.messages} />
              </div>
              <div className="sticky bottom-0 bg-white">
                <ChatInput selectedChat={selectedChat} />
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
      <Notifications />
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
