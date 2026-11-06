import { create } from 'zustand/react';

import type { PublicUser } from '@shared/types/user';

type State = {
  user: PublicUser | null;
};

type Actions = {
  setUser: (u: PublicUser | null) => void;
};

export const useUser = create<State & Actions>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
