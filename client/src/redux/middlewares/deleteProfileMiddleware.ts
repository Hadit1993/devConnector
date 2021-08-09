import { Middleware } from "redux";
import { ReduxAction } from "..";
import { ProfileActionTypes } from "../actions/actionTypes";

const deleteProfileMiddleware: Middleware =
  (store) => (next) => (action: ReduxAction) => {
    if (action.type === "SET_USER" && !action.payload.user) {
      const deleteProfileAction: ReduxAction<ProfileActionTypes> = {
        type: "SET_PROFILE",
      };
      store.dispatch(deleteProfileAction);
    }
    next(action);
  };

export default deleteProfileMiddleware;
