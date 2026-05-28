import React from 'react';
import useContactsStore from '../../store/contactsStore';
import useChatStore from '../../store/chatStore';

interface MessageListPageProps {
  onGoToChat: (contactId: string) => void;
}

const MessageListPage: React.FC<MessageListPageProps> = ({ onGoToChat }) => {
  const contacts = useContactsStore((s) => s.contacts);
  const messages = useChatStore((s) => s.messages);

  const activeChats = contacts.filter(
    (c) => messages[c.id] && messages[c.id].length > 0
  );

  const truncate = (str: string) => {
    if (str.length > 50) {
      return str.slice(0, 50) + '...';
    }
    return str;
  };

  return (
    <div className="dd-page-message-list">
      <div className="dd-page-title">消息</div>
      {activeChats.length === 0 ? (
        <p className="dd-empty-text">暂无聊天记录</p>
      ) : (
        <div>
          {activeChats.map((c) => {
            const chatMsgs = messages[c.id];
            const lastMsg = chatMsgs[chatMsgs.length - 1];
            return (
              <div
                key={c.id}
                className="dd-message-item"
                onClick={() => onGoToChat(c.id)}
              >
                <div className="dd-msg-contact-name">{c.name}</div>
                <div className="dd-msg-last-text">{truncate(lastMsg?.text || '')}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessageListPage;
