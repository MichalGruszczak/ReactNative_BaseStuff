import useAppStore from "../store/appStore";

const useUser = () => {
  const { user, setUserOnAuth, setUserOnLogout } = useAppStore((state) => ({
    user: state.user,
    setUserOnAuth: state.setUserOnAuth,
    setUserOnLogout: state.setUserOnLogout,
  }));

  return { user, setUserOnAuth, setUserOnLogout };
};

export default useUser;
