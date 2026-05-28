import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
}

interface ContactsState {
  contacts: Contact[];
  addContact: (name: string, avatar?: string) => void;
  removeContact: (id: string) => void;
}

const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  addContact: (name, avatar) =>
    set((state) => ({
      contacts: [...state.contacts, { id: uuidv4(), name, avatar }],
    })),
  removeContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id !== id),
    })),
}));

export default useContactsStore;
