import React, { useRef } from 'react';
import { openDB } from 'idb';
import useAppStore from '../../stores/appStore';
import useContactsStore from '../eggchat/store/contactsStore';
import useChatStore from '../eggchat/store/chatStore';
import useUserStore from '../eggchat/store/userStore';
import useGlobalSettingsStore from './store/globalSettingsStore';

const GlobalSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInitializing = useGlobalSettingsStore((s) => s.isInitializing);
  const setIsInitializing = useGlobalSettingsStore((s) => s.setIsInitializing);

  const getAllStoreData = () => {
    return {
      appStore: useAppStore.getState(),
      contactsStore: useContactsStore.getState(),
      chatStore: useChatStore.getState(),
      userStore: useUserStore.getState(),
      globalSettingsStore: useGlobalSettingsStore.getState(),
    };
  };

  const getAllIdbData = async () => {
    const db = await openDB('three-egg-phone', 1);
    const storeNames = Array.from(db.objectStoreNames);
    const result: Record<string, any[]> = {};
    for (const name of storeNames) {
      result[name] = await db.getAll(name);
    }
    db.close();
    return result;
  };

  const handleExport = async () => {
    const storeData = getAllStoreData();
    const idbData = await getAllIdbData();
    const exportData = { storeData, idbData };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `three-egg-phone-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      // restore stores
      useAppStore.setState(data.storeData.appStore);
      useContactsStore.setState(data.storeData.contactsStore);
      useChatStore.setState(data.storeData.chatStore);
      useUserStore.setState(data.storeData.userStore);
      useGlobalSettingsStore.setState(data.storeData.globalSettingsStore);
      // restore idb - simply skip if no idb data (Phase 1 doesn't use idb yet)
      if (data.idbData && Object.keys(data.idbData).length > 0) {
        const db = await openDB('three-egg-phone', 1);
        const storeNames = Array.from(db.objectStoreNames);
        for (const name of storeNames) {
          const tx = db.transaction(name, 'readwrite');
          await tx.objectStore(name).clear();
          for (const item of (data.idbData[name] || [])) {
            await tx.objectStore(name).put(item);
          }
          await tx.done;
        }
        db.close();
      }
    } catch (err) {
      console.error('Import failed', err);
    }
    // reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleInitialize = async () => {
    // reset all stores
    useAppStore.setState({ currentApp: null });
    useContactsStore.setState({ contacts: [] });
    useChatStore.setState({ activeChatId: null, messages: {} });
    useUserStore.setState({ displayName: '我', avatar: '' });
    useGlobalSettingsStore.setState({ isInitializing: false });
    // clear idb
    const db = await openDB('three-egg-phone', 1);
    const storeNames = Array.from(db.objectStoreNames);
    for (const name of storeNames) {
      const tx = db.transaction(name, 'readwrite');
      await tx.objectStore(name).clear();
      await tx.done;
    }
    db.close();
  };

  return (
    <div className="dd-app-global-settings">
      <div className="dd-page-title">全局设置</div>
      <div className="dd-settings-section">
        <button className="dd-btn dd-btn-export" onClick={handleExport}>导出备份（JSON）</button>
      </div>
      <div className="dd-settings-section">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
        <button className="dd-btn dd-btn-import" onClick={() => fileInputRef.current?.click()}>导入备份（JSON）</button>
      </div>
      <div className="dd-settings-section">
        <button
          className={`dd-btn dd-btn-initialize ${isInitializing ? 'dd-btn-danger' : ''}`}
          onClick={() => {
            if (isInitializing) {
              handleInitialize();
              setIsInitializing(false);
            } else {
              setIsInitializing(true);
            }
          }}
        >
          一键初始化
        </button>
        {isInitializing && <p className="dd-warning-text">再次点击按钮确认初始化，将清空所有数据！</p >}
      </div>
    </div>
  );
};

export default GlobalSettings;
