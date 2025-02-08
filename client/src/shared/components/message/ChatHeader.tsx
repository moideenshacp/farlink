import { MoreVertical } from "lucide-react";
import { ChatHeaderProps } from "../../../interface/Imessage";

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
    return (
      <div className="flex items-center mt-5 justify-between p-4 border-b bg-white">
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

  export default ChatHeader