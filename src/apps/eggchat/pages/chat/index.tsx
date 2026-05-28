import React from 'react';
import useChatStore from '../../store/chatStore';
import useChat from '../../../../hooks/useChat';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';

const ChatPage: React.FC = () => {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const allMessages = useChatStore((s) => s.messages);

  if (!activeChatId) {
    return <div>请选择一个聊天</div>;
  }

  const { sendMessage, getAiReply, isLoading, activeContact } = useChat(activeChatId);
  const messages = allMessages[activeChatId] || [];

  return (
    <div className="dd-page-chat">
      <div className="dd-page-title">聊天</div>
      <div className="dd-chat-messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            sender={msg.sender}
            contactName={msg.sender === 'contact' ? activeContact?.name : undefined}
          />
        ))}
      </div>
      <InputArea
        onSend={sendMessage}
        onGetAiReply={getAiReply}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatPage;
