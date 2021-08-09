import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useProfileActions } from "../../redux/actions/profileActions";
import { GlobalState } from "../../redux/reducers";
import Spinner from "../common/Spinner";

export default function Dashboard() {
  const { auth, profile } = useSelector<GlobalState, GlobalState>(
    (state) => state
  );

  const { getProfile } = useProfileActions();

  const hasProfile =
    !profile.loading &&
    auth.user !== undefined &&
    profile.profile !== undefined;

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ textAlign: "center" }} className="display-4">
        Dashboard
      </h1>
      {profile.loading ? (
        <Spinner />
      ) : hasProfile ? (
        <h4>Display Profile</h4>
      ) : (
        <div>
          <p style={{ textAlign: "center" }} className="lead text-muted">
            Welcome {auth.user?.name}
          </p>
          <p style={{ textAlign: "center" }}>
            {" "}
            You don't have yet setup a profile, please add some info
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 60,
            }}
          >
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
