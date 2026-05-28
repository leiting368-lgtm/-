import { create } from 'zustand';

interface AppState {
  currentApp: string | null;
  setCurrentApp: (appId: string | null) => void;
}

const useAppStore = create<AppState>((set) => ({
  currentApp: null,
  setCurrentApp: (appId) => set({ currentApp: appId }),
}));

export default useAppStore;
