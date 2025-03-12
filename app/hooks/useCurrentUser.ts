import { create } from 'zustand';
import { SafeUser } from '../types';

interface CurrentUserState {
  currentUser: SafeUser | null;
  setCurrentUser: (user: SafeUser | null) => void;
}

const useCurrentUser = create<CurrentUserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useCurrentUser;
