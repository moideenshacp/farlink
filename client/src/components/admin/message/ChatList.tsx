import { Search, Users } from "lucide-react";
import { useState } from "react";
import { ChatListProps } from "../../../interface/Imessage";


  
  const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, selectedChatId, isGroup }) => {
      const [searchTerm, setSearchTerm] = useState('');
  
      const filteredChats = chats.filter(chat => 
          chat.isGroup === isGroup && 
          chat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return (
        <div className="w-80 border-r bg-white h-[calc(100vh-100px)] flex flex-col">
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
            {filteredChats.map(chat => (
              <div 
                key={chat.id} 
                className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
                onClick={() => onSelectChat(chat)}
              >
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

    export default ChatList