import { create } from 'zustand';

interface ApiConfigState {
  url: string;
  key: string;
  model: string;
  temperature: number;
  contextCount: number;
  setUrl: (url: string) => void;
  setKey: (key: string) => void;
  setModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setContextCount: (count: number) => void;
  loadPreset: (preset: { url: string; key: string; model: string; temperature: number; contextCount: number }) => void;
}

const useApiConfigStore = create<ApiConfigState>((set) => ({
  url: '',
  key: '',
  model: '',
  temperature: 0.7,
  contextCount: 10,
  setUrl: (url) => set({ url }),
  setKey: (key) => set({ key }),
  setModel: (model) => set({ model }),
  setTemperature: (temp) => set({ temperature: temp }),
  setContextCount: (count) => set({ contextCount: count }),
  loadPreset: (preset) => set(preset),
}));

export default useApiConfigStore;
