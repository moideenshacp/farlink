import React, { useState } from "react";
import { Search, Users } from "lucide-react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import UserSearchModal from "./UserSearchModal";
import { ChatListProps } from "../../../interface/Imessage";
const isImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(url);
};

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelectChat,
  selectedChatId,
  isGroup,
  onAddChat,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredChats = chats.filter(
    (chat) =>
      chat.isGroup === isGroup &&
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 border-r mt-5 bg-white h-[calc(100vh-100px)] flex flex-col relative">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            className="bg-transparent outline-none flex-1 text-sm"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-none flex-1">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b ${
                selectedChatId === chat.id ? "bg-gray-100" : ""
              }`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="relative">
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
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
                  {isImageUrl(chat?.lastMessage) ? (
                    <p className="text-sm text-gray-500 truncate">Image</p>
                  ) : (
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage
                        ? chat.lastMessage.length > 10
                          ? chat.lastMessage.slice(0, 10) + "..."
                          : chat.lastMessage
                        : ""}
                    </p>
                  )}

                  {chat.unread > 0 && (
                    <span className="bg-[#1677ff] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col mt-[50%] h-full text-center p-4 text-gray-500">
            <p className="text-lg font-semibold">No chats yet</p>
            <p className="text-sm">
              "Great conversations start with a single message."
            </p>
          </div>
        )}
      </div>
      {!isGroup && onAddChat && (
        <>
          <button
            className="absolute bottom-16 right-6 w-12 h-12 bg-[#1677ff] rounded-2xl flex items-center justify-center shadow-lg hover:bg-[#1668cc] transition-colors duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <BiSolidMessageSquareAdd className="w-6 h-6 text-white" />
          </button>
          <UserSearchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectUser={(employee) => {
              onAddChat(employee);
              setIsModalOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ChatList;
