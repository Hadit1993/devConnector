import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import User from "../../models/User";
import { useAuthActions } from "../../redux/actions/authActions";
import { GlobalState } from "../../redux/reducers";
import { AuthState } from "../../redux/reducers/authReducer";

export default function NavbAr() {
  const { isAuthenticated, user } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: 16,
          paddingRight: 16,
          alignItems: "center",
        }}
      >
        <Link className="navbar-brand" to="/">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto" style={{ marginRight: "auto" }}>
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {" "}
                Developers
              </Link>
            </li>
          </ul>
        </div>
        {isAuthenticated ? <AuthLinks user={user!} /> : <GuestLinks />}
      </div>
    </nav>
  );
}

const AuthLinks = (props: { user: User }) => {
  const { logoutUser } = useAuthActions();
  return (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link className="nav-link" to="/profile">
          <img
            style={{ width: "25px", height: "25px", borderRadius: "12.5px" }}
            src={props.user.avatar}
            alt={props.user.name}
            title="you must have a Gravatar connected to your email to display an image"
          />
        </Link>
      </li>
      <li className="nav-item">
        <p
          style={{
            cursor: "pointer",

            marginBottom: 0,
          }}
          className="nav-link"
          onClick={logoutUser}
        >
          Logout
        </p>
      </li>
    </ul>
  );
};

const GuestLinks = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
};
