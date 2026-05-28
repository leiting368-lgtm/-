import React from 'react';
import Icon from './Icon';
import useAppStore from '../../stores/appStore';

const desktopApps = [
  { id: 'eggchat', name: '蛋蛋' },
  { id: 'global-settings', name: '全局设置' },
  { id: 'api-config', name: 'API设置' },
  { id: 'beautify', name: '美妆蛋' },
];

const Desktop: React.FC = () => {
  const setCurrentApp = useAppStore((state) => state.setCurrentApp);

  return (
    <div className="dd-desktop">
      {desktopApps.map((app) => (
        <Icon
          key={app.id}
          name={app.name}
          onClick={() => setCurrentApp(app.id)}
        />
      ))}
    </div>
  );
};

export default Desktop;
