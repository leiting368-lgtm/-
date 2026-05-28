import { create } from 'zustand';

export interface Preset {
  id: string;
  name: string;
  url: string;
  key: string;
  model: string;
  temperature: number;
  contextCount: number;
}

interface PresetsState {
  presets: Preset[];
  addPreset: (name: string, config: Omit<Preset, 'id' | 'name'>) => void;
  removePreset: (id: string) => void;
}

const usePresetsStore = create<PresetsState>((set) => ({
  presets: [],
  addPreset: (name, config) =>
    set((state) => ({
      presets: [...state.presets, { id: Date.now().toString(), name, ...config }],
    })),
  removePreset: (id) =>
    set((state) => ({
      presets: state.presets.filter((p) => p.id !== id),
    })),
}));

export default usePresetsStore;
