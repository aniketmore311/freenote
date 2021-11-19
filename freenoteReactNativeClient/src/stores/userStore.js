import create from "zustand";

export const useUserStore = create((set) => {
  return {
    user: null,
    setUser: (val) => { set(state => ({ ...state, user: val })) },
  }
})