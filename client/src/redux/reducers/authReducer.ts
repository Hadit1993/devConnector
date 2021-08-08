import { ReduxAction } from "..";
import User from "../../models/User";
import setAuthToken from "../../utils/setAuthToken";
import { AuthActionType } from "../actions/actionTypes";

export interface AuthError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  signupError: AuthError;
  loginError: Omit<AuthError, "name" | "confirmPassword">;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  signupError: {},
  loginError: {},
};

export function authReducer(
  state: AuthState = initialAuthState,
  action: ReduxAction<AuthActionType>
): AuthState {
  switch (action.type) {
    case "SET_USER":
      const { user, token } = action.payload;
      if (!user) {
        localStorage.removeItem("authToken");
      } else {
        const savedToken = localStorage.getItem("authToken");
        if (!savedToken) localStorage.setItem("authToken", token);
      }
      setAuthToken(token);
      return {
        ...state,
        user,
        isAuthenticated: user ? true : false,
      };

    case "SET_SIGNUP_ERROR":
      return { ...state, signupError: action.payload };

    case "SET_LOGIN_ERROR":
      return { ...state, loginError: action.payload };

    default:
      return state;
  }
}
