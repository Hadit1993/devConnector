import { applyMiddleware, compose, createStore } from "redux";
import rootReducer, { initialGlobalState } from "./reducers";
import { Dispatch } from "redux";

import deleteProfileMiddleware from "./middlewares/deleteProfileMiddleware";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  initialGlobalState,
  composeEnhancers(applyMiddleware(deleteProfileMiddleware))
);

export type ReduxAction<T = any> = { type: T; payload?: any };

export const dispatchAction = <T>(dispatch: Dispatch) => {
  return (action: ReduxAction<T>) => dispatch(action);
};
