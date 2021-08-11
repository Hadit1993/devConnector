import { FormEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Education, Experience } from "../../models/Profile";
import { useProfileActions } from "../../redux/actions/profileActions";
import { GlobalState } from "../../redux/reducers";
import { ProfileState } from "../../redux/reducers/profileReducer";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

export default function AddEducation() {
  const [education, setEducation] = useState<Partial<Education>>({});

  const { educationError } = useSelector<GlobalState, ProfileState>(
    (state) => state.profile
  );

  const { addEducation } = useProfileActions();

  const history = useHistory();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await addEducation(education);
      history.replace("/dashboard");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>

            <small className="d-block pb-3 text-center">
              * = required fields
            </small>
            <form
              onSubmit={onSubmit}
              style={{
                maxWidth: 500,
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 15,
              }}
            >
              <TextFieldGroup
                placeHolder="* School"
                name="school"
                value={education.school}
                onChange={(e) =>
                  setEducation({ ...education, school: e.target.value })
                }
                error={educationError.school}
              />

              <TextFieldGroup
                placeHolder="* Degree"
                name="degree"
                value={education.degree}
                onChange={(e) =>
                  setEducation({ ...education, degree: e.target.value })
                }
                error={educationError.degree}
              />

              <TextFieldGroup
                placeHolder="* Field Of Study"
                name="fieldOfStudy"
                value={education.fieldOfStudy}
                onChange={(e) =>
                  setEducation({ ...education, fieldOfStudy: e.target.value })
                }
                error={educationError.fieldOfStudy}
              />

              <h6>From Date</h6>

              <TextFieldGroup
                type="date"
                name="from"
                value={education.from}
                onChange={(e) =>
                  setEducation({ ...education, from: e.target.value })
                }
                error={educationError.from}
              />

              <h6>To Date</h6>

              <TextFieldGroup
                type="date"
                name="to"
                value={education.to}
                onChange={(e) =>
                  setEducation({ ...education, to: e.target.value })
                }
                disabled={education.current}
              />

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={`${education.current}`}
                  checked={education.current}
                  onChange={(e) => {
                    setEducation({ ...education, current: e.target.checked });
                  }}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current
                </label>
              </div>

              <TextAreaFieldGroup
                placeHolder="Job description"
                name="description"
                value={education.description}
                onChange={(e) =>
                  setEducation({
                    ...education,
                    description: e.target.value,
                  })
                }
              />

              <input
                style={{ width: "100%" }}
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
