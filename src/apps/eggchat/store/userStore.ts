import { create } from 'zustand';

interface UserState {
  displayName: string;
  avatar: string;
  setDisplayName: (name: string) => void;
  setAvatar: (url: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  displayName: '我',
  avatar: '',
  setDisplayName: (name) => set({ displayName: name }),
  setAvatar: (url) => set({ avatar: url }),
}));

export default useUserStore;
