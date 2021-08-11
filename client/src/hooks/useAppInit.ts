import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import User from "../models/User";
import { useAuthActions } from "../redux/actions/authActions";

const useAppInit = () => {
  const { setUser, logoutUser } = useAuthActions();

  useEffect(() => {
    console.log("app started");
    const token = localStorage.getItem("authToken");
    console.log({ token });
    if (token) {
      const user = jwtDecode<User & { iat?: number; exp?: number }>(token);
      const currentTime = new Date().getTime() / 1000;
      const isExpired = user.exp! < currentTime;

      if (isExpired) {
        logoutUser();
        window.location.href = "/login";
      } else {
        delete user.iat;
        delete user.exp;

        setUser(user, token);
      }
    } else {
      logoutUser();
    }
  }, [setUser, logoutUser]);
};

export default useAppInit;
