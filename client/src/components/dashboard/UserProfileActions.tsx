import { Link } from "react-router-dom";

export default function UserProfileActions() {
  return (
    <div
      className=" mb-4"
      role="group"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "auto",
        width: 450,
        marginRight: "auto",
        marginTop: 40,
      }}
    >
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1"></i>
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1"></i>
        Add Education
      </Link>
    </div>
  );
}
