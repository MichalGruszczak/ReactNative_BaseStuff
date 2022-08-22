import create from "zustand";

type AppStore = {
  isAuth: boolean;
  setAuthTrue: () => void;
  setAuthFalse: () => void;
  user: any;
  setUserOnAuth: (user: any) => void;
  setUserOnLogout: () => void;
};

const useAppStore = create<AppStore>((set) => ({
  isAuth: false,
  setAuthTrue: () => set({ isAuth: true }),
  setAuthFalse: () => set({ isAuth: false }),
  user: null,
  setUserOnAuth: (user) => set({ user }),
  setUserOnLogout: () => set({ user: null }),
}));

export default useAppStore;
