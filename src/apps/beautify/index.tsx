import React, { useState, useRef, useEffect } from 'react';

const Beautify: React.FC = () => {
  const [cssText, setCssText] = useState('');
  const [appliedCssText, setAppliedCssText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const styleId = 'beautify-custom-style-tag';

    const existing = document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }

    if (appliedCssText) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = appliedCssText;
      document.head.appendChild(styleElement);
    }

    return () => {
      const finalExisting = document.getElementById(styleId);
      if (finalExisting) {
        finalExisting.remove();
      }
    };
  }, [appliedCssText]);

  const handleSave = () => {
    setAppliedCssText(cssText);
  };

  return (
    <div className="dd-app-beautify">
      <div className="dd-page-title">自定义 CSS</div>
      <div>
        <textarea
          ref={textareaRef}
          className="dd-beautify-textarea"
          value={cssText}
          onChange={(e) => setCssText(e.target.value)}
          placeholder="请输入自定义 CSS 样式..."
        />
      </div>
      <div>
        <button className="dd-btn" onClick={handleSave}>
          保存应用
        </button>
      </div>
    </div>
  );
};

export default Beautify;
