import React from 'react';
import useApiConfigStore from './store/apiConfigStore';
import usePresetsStore from './store/presetsStore';

const ApiConfig: React.FC = () => {
  const store = useApiConfigStore();

  return (
    <div className="dd-app-api-config">
      <div className="dd-page-title">API设置</div>
      <div className="dd-config-field">
        <label>API URL</label>
        <input className="dd-input" value={store.url} onChange={(e) => store.setUrl(e.target.value)} placeholder="https://api.openai.com/v1" />
      </div>
      <div className="dd-config-field">
        <label>API Key</label>
        <input className="dd-input" type="password" value={store.key} onChange={(e) => store.setKey(e.target.value)} placeholder="sk-..." />
      </div>
      <div className="dd-config-field">
        <label>模型</label>
        <input className="dd-input" value={store.model} onChange={(e) => store.setModel(e.target.value)} placeholder="gpt-3.5-turbo" />
      </div>
      <div className="dd-config-field">
        <label>温度 ({store.temperature})</label>
        <input className="dd-range" type="range" min="0" max="2" step="0.1" value={store.temperature} onChange={(e) => store.setTemperature(parseFloat(e.target.value))} />
      </div>
      <div className="dd-config-field">
        <label>上下文消息数</label>
        <input className="dd-input" type="number" min="1" max="100" value={store.contextCount} onChange={(e) => store.setContextCount(parseInt(e.target.value) || 10)} />
      </div>
      <div className="dd-config-actions">
        <button className="dd-btn dd-btn-save" onClick={() => {
          const name = prompt('输入预设名称：');
          if (name) {
            usePresetsStore.getState().addPreset(name, {
              url: store.url,
              key: store.key,
              model: store.model,
              temperature: store.temperature,
              contextCount: store.contextCount,
            });
          }
        }}>保存为预设</button>
      </div>
    </div>
  );
};

export default ApiConfig;
