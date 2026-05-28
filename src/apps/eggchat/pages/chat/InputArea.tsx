import React, { useState } from 'react';

interface InputAreaProps {
  onSend: (text: string) => void;
  onGetAiReply: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, onGetAiReply, isLoading }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="dd-chat-input-wrapper">
      <input
        className="dd-chat-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="dd-btn dd-btn-send" onClick={handleSend}>发送</button>
      <button className="dd-btn dd-btn-ai-reply" disabled={isLoading} onClick={onGetAiReply}>获取AI回复</button>
    </div>
  );
};

export default InputArea;
