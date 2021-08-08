import { useDispatch } from "react-redux";
import { dispatchAction } from "..";
import User from "../../models/User";
import { AuthError } from "../reducers/authReducer";
import axios, { AxiosResponse } from "axios";
import BaseResponse from "../../models/BaseResponse";
import { AuthActionType } from "./actionTypes";
import { useHistory } from "react-router-dom";

export const useAuthActions = () => {
  const dispatch = useDispatch();
  const dispatcher = dispatchAction<AuthActionType>(dispatch);
  const history = useHistory();

  const setUser = (user?: User, token?: string) =>
    dispatcher({ type: "SET_USER", payload: { user, token } });

  const setSignupError = (error: AuthError) =>
    dispatcher({ type: "SET_SIGNUP_ERROR", payload: error });

  const setLoginError = (
    error: Omit<AuthError, "name" | "confirmPassword">
  ) => {
    dispatcher({ type: "SET_LOGIN_ERROR", payload: error });
  };

  const logoutUser = () => setUser();

  const registerUser = async (userInfo: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const result = await axios.post<
        any,
        AxiosResponse<BaseResponse<{ user: User; token: string }>>
      >("/api/users/register", userInfo);
      setSignupError({});
      const data = result.data.data;

      setUser(data?.user, data?.token);

      history.replace("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const response: BaseResponse<any> = error.response.data;
        setSignupError(response.error || {});
      } else setSignupError({});
    }
  };

  const loginUser = async (userInfo: { email: string; password: string }) => {
    try {
      const result = await axios.post<
        any,
        AxiosResponse<BaseResponse<{ user: User; token: string }>>
      >("/api/users/login", userInfo);
      setLoginError({});
      const data = result.data.data;

      setUser(data?.user, data?.token);

      history.replace("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const response: BaseResponse<any> = error.response.data;
        setLoginError(response.error || {});
      } else setLoginError({});
    }
  };

  return { setUser, registerUser, loginUser, logoutUser };
};
