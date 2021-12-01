import create from "zustand";

export const useStore = create((set) => ({
  // State
  user: null,

  // Mutations/Actions
  setUser: (payload) => set((state) => ({ user: payload })),
}));
