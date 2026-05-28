import React from 'react';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'contact';
  contactName?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender, contactName }) => {
  if (sender === 'user') {
    return (
      <div className="dd-bubble-user">
        {text}
      </div>
    );
  }

  return (
    <div className="dd-bubble-contact">
      {contactName && <span>{contactName}: </span>}
      {text}
    </div>
  );
};

export default MessageBubble;
