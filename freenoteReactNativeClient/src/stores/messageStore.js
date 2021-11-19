import create from "zustand";

export const useMessageStore = create((set) => {
  return {
    successMessage: "",
    errorMessage: "",
    setSuccessMessage: (msg) => {
      set(state => ({ ...state, successMessage: msg }));
      setTimeout(() => {
        set(state => ({ ...state, successMessage: "" }))
      }, 3 * 1 * 1000);
    },
    setErrorMessage: (msg) => {
      set(state => ({ ...state, errorMessage: msg }))
      setTimeout(() => {
        set(state => ({ ...state, errorMessage: "" }))
      }, 3 * 1 * 1000);
    }
  }
});