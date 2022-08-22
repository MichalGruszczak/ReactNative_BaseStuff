import useAppStore from "../store/appStore";

const useAuth = () => {
  const { isAuth, setAuthTrue, setAuthFalse } = useAppStore((state) => ({
    isAuth: state.isAuth,
    setAuthTrue: state.setAuthTrue,
    setAuthFalse: state.setAuthFalse,
  }));

  return { isAuth, setAuthTrue, setAuthFalse };
};

export default useAuth;
