import { createStore } from "redux";
import rootReducer, { initialGlobalState } from "./reducers";
import { Dispatch } from "redux";

export const store = createStore(
  rootReducer,
  initialGlobalState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type ReduxAction<T = any> = { type: T; payload?: any };

export const dispatchAction = <T>(dispatch: Dispatch) => {
  return (action: ReduxAction<T>) => dispatch(action);
};
