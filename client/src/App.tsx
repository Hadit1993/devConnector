import { BrowserRouter, Route } from "react-router-dom";
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

function App() {
  const { setUser, logoutUser } = useAuthActions();

  useEffect(() => {
    console.log("app opened");
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
          <Route exact path="/" component={Landing} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
