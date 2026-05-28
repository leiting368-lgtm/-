import React, { useState } from 'react';
import ContactsPage from './pages/contacts';
import MessageListPage from './pages/message-list';
import ChatPage from './pages/chat';
import UserInfoPage from './pages/user-info';
import SettingsPage from './pages/settings';
import useChatStore from './store/chatStore';

type SubPage = 'contacts' | 'message-list' | 'user-info' | 'settings' | 'chat';

const EggChat: React.FC = () => {
  const [subPage, setSubPage] = useState<SubPage>('contacts');
  const activeChatId = useChatStore((s) => s.activeChatId);

  const goToChat = (contactId: string) => {
    useChatStore.getState().setActiveChat(contactId);
    setSubPage('chat');
  };

  const renderSubPage = () => {
    switch (subPage) {
      case 'contacts':
        return <ContactsPage onGoToChat={goToChat} />;
      case 'message-list':
        return <MessageListPage onGoToChat={goToChat} />;
      case 'chat':
        return activeChatId ? <ChatPage /> : <div>请选择聊天</div>;
      case 'user-info':
        return <UserInfoPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <ContactsPage onGoToChat={goToChat} />;
    }
  };

  return (
    <div className="dd-app-eggchat">
      <div className="dd-eggchat-nav">
        <button className="dd-nav-btn" onClick={() => setSubPage('contacts')}>蛋友</button>
        <button className="dd-nav-btn" onClick={() => setSubPage('message-list')}>消息</button>
        <button className="dd-nav-btn" onClick={() => setSubPage('user-info')}>我的</button>
        <button className="dd-nav-btn" onClick={() => setSubPage('settings')}>设置</button>
      </div>
      <div className="dd-eggchat-content">
        {renderSubPage()}
      </div>
    </div>
  );
};

export default EggChat;
