import { useDispatch } from "react-redux";
import { dispatchAction } from "..";
import User from "../../models/User";
import { AuthError } from "../reducers/authReducer";
import axios from "axios";
import BaseResponse from "../../models/BaseResponse";
import { AuthActionType } from "./actionTypes";

import { useCallback, useMemo } from "react";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const dispatcher = useMemo(
    () => dispatchAction<AuthActionType>(dispatch),
    [dispatch]
  );

  const setUser = useCallback(
    (user?: User, token?: string) =>
      dispatcher({ type: "SET_USER", payload: { user, token } }),
    [dispatcher]
  );

  const setSignupError = useCallback(
    (error: AuthError) =>
      dispatcher({ type: "SET_SIGNUP_ERROR", payload: error }),
    [dispatcher]
  );

  const setLoginError = useCallback(
    (error: Omit<AuthError, "name" | "confirmPassword">) => {
      dispatcher({ type: "SET_LOGIN_ERROR", payload: error });
    },
    [dispatcher]
  );

  const logoutUser = useCallback(() => setUser(), [setUser]);

  const registerUser = useCallback(
    async (userInfo: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const result = await axios.post<
          BaseResponse<{ user: User; token: string }>
        >("/api/users/register", userInfo);
        setSignupError({});
        const data = result.data.data;

        setUser(data?.user, data?.token);
      } catch (error) {
        if (error.response && error.response.data) {
          const response: BaseResponse<any> = error.response.data;
          setSignupError(response.error || {});
        } else setSignupError({});
      }
    },
    [setSignupError, setUser]
  );

  const loginUser = useCallback(
    async (userInfo: { email: string; password: string }) => {
      try {
        const result = await axios.post<
          BaseResponse<{ user: User; token: string }>
        >("/api/users/login", userInfo);
        setLoginError({});
        const data = result.data.data;

        setUser(data?.user, data?.token);
      } catch (error) {
        if (error.response && error.response.data) {
          const response: BaseResponse<any> = error.response.data;
          setLoginError(response.error || {});
        } else setLoginError({});
      }
    },
    [setLoginError, setUser]
  );

  const deleteAccount = useCallback(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (window.confirm("Are you sure? This can NOT be undone!")) {
          await axios.delete<BaseResponse<any>>("/api/users");

          logoutUser();
          resolve();
        } else {
          throw new Error("delete account refused");
        }
      } catch (error) {
        console.log({ error });
        reject(error);
      }
    });
  }, [logoutUser]);

  return { setUser, registerUser, loginUser, logoutUser, deleteAccount };
};
