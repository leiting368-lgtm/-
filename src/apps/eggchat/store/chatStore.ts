import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: number;
}

interface ChatState {
  activeChatId: string | null;
  messages: Record<string, Message[]>;
  setActiveChat: (contactId: string | null) => void;
  addMessage: (contactId: string, msg: Message) => void;
}

const useChatStore = create<ChatState>((set) => ({
  activeChatId: null,
  messages: {},
  setActiveChat: (contactId) => set({ activeChatId: contactId }),
  addMessage: (contactId, msg) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [contactId]: [...(state.messages[contactId] || []), msg],
      },
    })),
}));

export default useChatStore;
