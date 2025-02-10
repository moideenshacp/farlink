/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Message {
  id: number;
  text: string;
  time: string;
  sender: "self" | "other";
  senderName?: string;
  senderImage?: string;
}
export interface Chat {
  id?: number;
  name: string;
  lastMessage?: string;
  time?: string;
  unread: number;
  image?: string;
  isOnline?: boolean;
  isGroup?: boolean;
  members?: [];
  messages: Message[] ;
  groupName?:string
  participants:any[]
  groupAdmin?:string
}
// Chat List Component
export interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChatId: number | null;
  isGroup: boolean;
  onAddChat?: (user:any) => void;
  onAddGroup?: (groupName:string, members:any) => void;

}


// Chat Input Component
export interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  selectedChat?:Chat
}

// Chat Header Component
export interface ChatHeaderProps {
    chat: Chat;
    fetchChats?: () => void;
  }

  export // Chat Messages Component
  interface ChatMessagesProps {
    messages: Message[];
  }

  // Chat Messages Component
export interface ChatMessagesProps {
    messages: Message[];
  }

 export interface  NewMessageProps {
    chatId: string
    sender: string,
    text: string,
    time: Date,
  };
