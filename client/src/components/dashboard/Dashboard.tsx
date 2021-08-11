import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { useAuthActions } from "../../redux/actions/authActions";
import { useProfileActions } from "../../redux/actions/profileActions";
import { GlobalState } from "../../redux/reducers";
import Spinner from "../common/Spinner";
import UserProfileActions from "./UserProfileActions";
import ExperienceInfo from "./ExperienceInfo";
import EducationInfo from "./EducationInfo";

export default function Dashboard() {
  const { auth, profile } = useSelector<GlobalState, GlobalState>(
    (state) => state
  );
  const { deleteAccount } = useAuthActions();
  const { getProfile } = useProfileActions();

  const hasProfile = !profile.loading && profile.profile !== undefined;

  useEffect(() => {
    if (!hasProfile) getProfile();
  }, [getProfile, hasProfile]);

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ textAlign: "center" }} className="display-4">
        Dashboard
      </h1>
      {profile.loading ? (
        <Spinner />
      ) : hasProfile ? (
        <div>
          <p className="lead text-muted text-center mt-5">
            Welcome{" "}
            <Link to={`/profile/${profile.profile?.handle}`}>
              {auth.user?.name}
            </Link>
          </p>

          <UserProfileActions />

          <ExperienceInfo experience={profile.profile!.experience} />
          <EducationInfo education={profile.profile!.education} />

          <div style={{ marginBottom: 60, display: "flex", marginTop: 40 }}>
            <button
              style={{ marginLeft: "auto", marginRight: "auto", width: 500 }}
              onClick={(e) => {
                e.preventDefault();
                deleteAccount().catch((error) => {});
              }}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        </div>
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
