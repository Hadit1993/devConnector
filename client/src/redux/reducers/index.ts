import { combineReducers } from "redux";
import { authReducer, AuthState, initialAuthState } from "./authReducer";
import {
  profileInitialState,
  profileReducer,
  ProfileState,
} from "./profileReducer";

export interface GlobalState {
  auth: AuthState;
  profile: ProfileState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export const initialGlobalState: GlobalState = {
  auth: initialAuthState,
  profile: profileInitialState,
};

export default rootReducer;
