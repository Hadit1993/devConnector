import { Education } from "../../models/Profile";
import Moment from "react-moment";
import { useProfileActions } from "../../redux/actions/profileActions";

export default function EducationInfo(props: { education: Education[] }) {
  const { deleteEducation } = useProfileActions();

  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Field Of Study</th>
            <th>years</th>
            <th></th>
          </tr>

          {props.education.map((edu) => (
            <tr key={edu._id}>
              <td>{edu.school}</td>
              <td>{edu.degree}</td>
              <td>{edu.fieldOfStudy}</td>
              <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                {edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Now"}
              </td>
              <td>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteEducation(edu._id);
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
