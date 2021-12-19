import create from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      music: {
        title: "Test title",
        artists: "Test artists",
        imageUrl: "",
        url: "https://firebasestorage.googleapis.com/v0/b/dollop-a1e86.appspot.com/o/Music%2F6198fea3c06aa256eb08de66%2FMusic.mpeg?alt=media&token=6198fea3c06aa256eb08de66Music",
      },

      // Mutations/Actions
      setUser: (payload) => set((state) => ({ user: payload })),
      setMusic: (payload) => set((state) => ({ music: payload })),
    }),
    {
      name: "dollop-app", // name of item in the storage (must be unique)
    }
  )
);
