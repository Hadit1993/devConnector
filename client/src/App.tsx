import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import NavbAr from "./components/layout/NavBar";
import jwtDecode from "jwt-decode";

import { useEffect } from "react";
import { useAuthActions } from "./redux/actions/authActions";
import User from "./models/User";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import { useSelector } from "react-redux";
import { GlobalState } from "./redux/reducers";
import { AuthState } from "./redux/reducers/authReducer";

function App() {
  const { setUser, logoutUser } = useAuthActions();
  const { isAuthenticated } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
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
    }
  }, [setUser, logoutUser]);
  return (
    <BrowserRouter>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",

          minHeight: "100vh",
        }}
      >
        <NavbAr />

        <div style={{ display: "flex", flexGrow: 1, flexDirection: "column" }}>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Landing}
              condition={!isAuthenticated}
              redirect="/dashboard"
            />
            <PrivateRoute
              exact
              path="/register"
              component={Register}
              condition={!isAuthenticated}
              redirect="/dashboard"
            />
            <PrivateRoute
              exact
              path="/login"
              component={Login}
              condition={!isAuthenticated}
              redirect="/dashboard"
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              condition={isAuthenticated}
              redirect="/"
            />
            <PrivateRoute
              exact
              condition={isAuthenticated}
              redirect="/"
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
