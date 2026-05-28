import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useContactsStore from '../apps/eggchat/store/contactsStore';
import useApiConfigStore from '../apps/api-config/store/apiConfigStore';
import useChatStore from '../apps/eggchat/store/chatStore';
import { streamChat } from './useApi';

export default function useChat(contactId: string) {
  const contacts = useContactsStore((s) => s.contacts);
  const activeContact = contacts.find((c) => c.id === contactId);

  const { url, key, model, temperature, contextCount } = useApiConfigStore();
  const addMessage = useChatStore((s) => s.addMessage);

  const [isLoading, setIsLoading] = useState(false);
  const [aiMessageId, setAiMessageId] = useState<string | null>(null);

  const sendMessage = (text: string) => {
    addMessage(contactId, {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    });
  };

  const getAiReply = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const currentMessages = useChatStore.getState().messages[contactId] || [];
    const filteredContext = currentMessages
      .filter((m) => (m.sender as string) !== 'system')
      .slice(-contextCount);

    const apiMessages = filteredContext.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.text,
    }));

    const newAiMsgId = uuidv4();
    setAiMessageId(newAiMsgId);

    addMessage(contactId, {
      id: newAiMsgId,
      text: '',
      sender: 'contact',
      timestamp: Date.now(),
    });

    try {
      let accum = '';
      for await (const chunk of streamChat(apiMessages, { url, key, model, temperature })) {
        accum += chunk;
        useChatStore.setState((state) => {
          const list = state.messages[contactId] || [];
          const updatedList = list.map((m) =>
            m.id === newAiMsgId ? { ...m, text: accum } : m
          );
          return {
            messages: {
              ...state.messages,
              [contactId]: updatedList,
            },
          };
        });
      }
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
      setAiMessageId(null);
    }
  };

  return {
    sendMessage,
    getAiReply,
    isLoading,
    activeContact,
  };
}
