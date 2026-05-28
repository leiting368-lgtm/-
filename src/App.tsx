import React from 'react';
import Desktop from './apps/desktop';
import useAppStore from './stores/appStore';
import EggChat from './apps/eggchat';
import GlobalSettings from './apps/global-settings';
import ApiConfig from './apps/api-config';
import Beautify from './apps/beautify';

const App: React.FC = () => {
  const currentApp = useAppStore((state) => state.currentApp);

  const renderApp = () => {
    switch (currentApp) {
      case 'eggchat':
        return <EggChat />;
      case 'global-settings':
        return <GlobalSettings />;
      case 'api-config':
        return <ApiConfig />;
      case 'beautify':
        return <Beautify />;
      default:
        return <Desktop />;
    }
  };

  return (
    <div className="dd-app">
      {renderApp()}
    </div>
  );
};

export default App;
