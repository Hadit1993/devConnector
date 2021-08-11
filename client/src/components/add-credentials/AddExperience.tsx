import { FormEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Experience } from "../../models/Profile";
import { useProfileActions } from "../../redux/actions/profileActions";
import { GlobalState } from "../../redux/reducers";
import { ProfileState } from "../../redux/reducers/profileReducer";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

export default function AddExperience() {
  const [experience, setExperience] = useState<Partial<Experience>>({});

  const { experienceError } = useSelector<GlobalState, ProfileState>(
    (state) => state.profile
  );

  const { addExperience } = useProfileActions();

  const history = useHistory();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await addExperience(experience);
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
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center mt-5">
              Add any job that you have had in the past or current
            </p>
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
                placeHolder="* Company"
                name="company"
                value={experience.company}
                onChange={(e) =>
                  setExperience({ ...experience, company: e.target.value })
                }
                error={experienceError.company}
              />

              <TextFieldGroup
                placeHolder="* Job Title"
                name="title"
                value={experience.title}
                onChange={(e) =>
                  setExperience({ ...experience, title: e.target.value })
                }
                error={experienceError.title}
              />

              <TextFieldGroup
                placeHolder="Location"
                name="location"
                value={experience.location}
                onChange={(e) =>
                  setExperience({ ...experience, location: e.target.value })
                }
              />

              <h6>From Date</h6>

              <TextFieldGroup
                type="date"
                name="from"
                value={experience.from}
                onChange={(e) =>
                  setExperience({ ...experience, from: e.target.value })
                }
                error={experienceError.from}
              />

              <h6>To Date</h6>

              <TextFieldGroup
                type="date"
                name="to"
                value={experience.to}
                onChange={(e) =>
                  setExperience({ ...experience, to: e.target.value })
                }
                disabled={experience.current}
              />

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={`${experience.current}`}
                  checked={experience.current}
                  onChange={(e) => {
                    setExperience({ ...experience, current: e.target.checked });
                  }}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>

              <TextAreaFieldGroup
                placeHolder="Job description"
                name="description"
                value={experience.description}
                onChange={(e) =>
                  setExperience({
                    ...experience,
                    description: e.target.value,
                  })
                }
                info="Tell us about the position"
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
