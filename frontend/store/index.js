import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,

      // Mutations/Actions
      setUser: (payload) => set((state) => ({ user: payload })),
    }),
    {
      name: "dollop-app", // name of item in the storage (must be unique)
    }
  )
);
