import { create } from 'zustand';

interface GlobalSettingsState {
  isInitializing: boolean;
  setIsInitializing: (val: boolean) => void;
}

const useGlobalSettingsStore = create<GlobalSettingsState>((set) => ({
  isInitializing: false,
  setIsInitializing: (val) => set({ isInitializing: val }),
}));

export default useGlobalSettingsStore;
