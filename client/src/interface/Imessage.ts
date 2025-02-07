export interface Message {
  id: number;
  text: string;
  time: string;
  sender: "self" | "other";
  senderName?: string;
  senderImage?: string;
}
export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  image: string;
  isOnline: boolean;
  isGroup: boolean;
  members?: number;
  messages: Message[];
}
// Chat List Component
export interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChatId: number;
  isGroup: boolean;
}


// Chat Input Component
export interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

// Chat Header Component
export interface ChatHeaderProps {
    chat: Chat;
  }

  export // Chat Messages Component
  interface ChatMessagesProps {
    messages: Message[];
  }

  // Chat Messages Component
export interface ChatMessagesProps {
    messages: Message[];
  }