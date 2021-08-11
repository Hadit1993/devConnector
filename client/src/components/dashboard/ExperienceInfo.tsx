import { Experience } from "../../models/Profile";
import Moment from "react-moment";
import { useProfileActions } from "../../redux/actions/profileActions";

export default function ExperienceInfo(props: { experience: Experience[] }) {
  const { deleteExperience } = useProfileActions();

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th></th>
          </tr>

          {props.experience.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Now"}
              </td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteExperience(exp._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}
