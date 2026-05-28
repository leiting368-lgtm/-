import { create } from 'zustand';

interface UserState {
  displayName: string;
  avatar: string;
  description: string;
  setDisplayName: (name: string) => void;
  setAvatar: (url: string) => void;
  setDescription: (desc: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  displayName: '我',
  avatar: '',
  description: '',
  setDisplayName: (name) => set({ displayName: name }),
  setAvatar: (url) => set({ avatar: url }),
  setDescription: (desc) => set({ description: desc }),
}));

export default useUserStore;
