import React from 'react';
import usePresetsStore from '../../store/presetsStore';
import useApiConfigStore from '../../store/apiConfigStore';

const PresetsPage: React.FC = () => {
  const presets = usePresetsStore((s) => s.presets);
  const removePreset = usePresetsStore((s) => s.removePreset);
  const loadPreset = useApiConfigStore((s) => s.loadPreset);

  return (
    <div className="dd-page-presets">
      <div className="dd-page-title">预设列表</div>
      {presets.length === 0 && <p className="dd-empty-text">暂无预设</p >}
      {presets.map((p) => (
        <div key={p.id} className="dd-preset-item">
          <span className="dd-preset-name">{p.name}</span>
          <button className="dd-btn dd-btn-apply" onClick={() => loadPreset(p)}>应用</button>
          <button className="dd-btn dd-btn-delete" onClick={() => removePreset(p.id)}>删除</button>
        </div>
      ))}
    </div>
  );
};

export default PresetsPage;
