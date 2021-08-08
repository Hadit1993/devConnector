import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GlobalState } from "../../redux/reducers";
import { AuthState } from "../../redux/reducers/authReducer";

export default function Landing() {
  const { isAuthenticated } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) history.replace("/dashboard");
  }, [history, isAuthenticated]);

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <h1 style={{ textAlign: "center" }} className="display-3">
            Developer Connector
          </h1>

          <p
            style={{
              marginTop: 40,

              textAlign: "center",
            }}
            className="lead"
          >
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>

          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10%",
            }}
          >
            <Link
              style={{ width: "15%", marginRight: 10 }}
              to="/register"
              className="btn btn-lg btn-info mr-2"
            >
              Sign Up
            </Link>

            <Link
              style={{ width: "15%" }}
              to="/login"
              className="btn btn-lg btn-light"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
