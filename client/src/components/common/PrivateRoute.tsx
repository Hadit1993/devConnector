import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { GlobalState } from "../../redux/reducers";
import { AuthState } from "../../redux/reducers/authReducer";

export default function PrivateRoute(props: RouteProps) {
  const { isAuthenticated } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
}
