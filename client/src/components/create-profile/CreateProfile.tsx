import { FormEventHandler, useReducer } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReduxAction } from "../../redux";
import {
  ProfileInfo,
  useProfileActions,
} from "../../redux/actions/profileActions";
import { GlobalState } from "../../redux/reducers";
import { ProfileState } from "../../redux/reducers/profileReducer";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

type ActionType =
  | "SET_HANDLE"
  | "SET_COMPANY"
  | "SET_WEBSITE"
  | "SET_LOCATION"
  | "SET_STATUS"
  | "SET_SKILLS"
  | "SET_BIO"
  | "SET_GITHUB_USERNAME"
  | "SET_YOUTUBE"
  | "SET_FACEBOOK"
  | "SET_LINKEDIN"
  | "SET_INSTAGRAM"
  | "SET_TWITTER"
  | "DISPLAY_SOCIAL_INPUTS";

type State = ProfileInfo & { displaySocialInputs: boolean };

function reducer(state: State, action: ReduxAction<ActionType>): State {
  switch (action.type) {
    case "SET_HANDLE":
      return { ...state, handle: action.payload };
    case "SET_COMPANY":
      return { ...state, company: action.payload };
    case "SET_WEBSITE":
      return { ...state, website: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "SET_BIO":
      return { ...state, bio: action.payload };
    case "SET_GITHUB_USERNAME":
      return { ...state, githubUsername: action.payload };
    case "SET_YOUTUBE":
      return { ...state, youtube: action.payload };
    case "SET_FACEBOOK":
      return { ...state, facebook: action.payload };
    case "SET_LINKEDIN":
      return { ...state, linkedin: action.payload };
    case "SET_INSTAGRAM":
      return { ...state, instagram: action.payload };
    case "SET_TWITTER":
      return { ...state, twitter: action.payload };
    case "DISPLAY_SOCIAL_INPUTS":
      return { ...state, displaySocialInputs: action.payload };

    default:
      return state;
  }
}

export default function CreateProfile() {
  const [state, dispatch] = useReducer(reducer, { displaySocialInputs: false });
  const { error } = useSelector<GlobalState, ProfileState>(
    (state) => state.profile
  );

  const { createProfile } = useProfileActions();
  const history = useHistory();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await createProfile(state);
      history.replace("/dashboard");
    } catch (error) {}
  };

  const processValue = (type: ActionType, value: string) => {
    const newValue = value.trim() === "" ? undefined : value;
    dispatch({ type, payload: newValue });
  };

  const options: { label: string; value: string }[] = [
    { label: "* Select Professional Status", value: "" },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h1 className="display-4 text-center">Create Your Profile</h1>
      <p className="lead text-center">
        Lets get some information to make your profile stand out
      </p>
      <small className="d-block pb-3 text-center">* = required fields</small>

      <form
        style={{
          maxWidth: 500,
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
        }}
        onSubmit={onSubmit}
      >
        <TextFieldGroup
          placeHolder="* Profile Handle"
          name="handle"
          value={state.handle}
          onChange={(e) => processValue("SET_HANDLE", e.target.value)}
          error={error.handle}
          info="a unique handle for your profile url. your full name, company name, nickname."
        />

        <SelectListGroup
          options={options}
          name="status"
          value={state.status}
          onChange={(e) => processValue("SET_STATUS", e.target.value)}
          error={error.status}
          info="Give us an idea of where are at your career"
        />
        <TextFieldGroup
          placeHolder="Company"
          name="company"
          value={state.company}
          onChange={(e) => processValue("SET_COMPANY", e.target.value)}
          info="could be your own company or someone you work for"
        />

        <TextFieldGroup
          placeHolder="Website"
          name="website"
          value={state.website}
          onChange={(e) => processValue("SET_WEBSITE", e.target.value)}
          info="could be your website or the company one"
        />

        <TextFieldGroup
          placeHolder="Location"
          name="location"
          value={state.location}
          onChange={(e) => processValue("SET_LOCATION", e.target.value)}
          info="city or city & state suggested (eg. Boston, MA)"
        />

        <TextFieldGroup
          placeHolder="* Skills"
          name="skills"
          value={state.skills}
          onChange={(e) => processValue("SET_SKILLS", e.target.value)}
          error={error.skills}
          info="please use comma separated value (eg. HTML,CSS,Javascript)"
        />

        <TextFieldGroup
          placeHolder="Github Username"
          name="githubUsername"
          value={state.githubUsername}
          onChange={(e) => processValue("SET_GITHUB_USERNAME", e.target.value)}
          info="if you want your latest repos and github link, include your username"
        />
        <TextAreaFieldGroup
          placeHolder="Short Bio"
          name="bio"
          value={state.bio}
          onChange={(e) => processValue("SET_BIO", e.target.value)}
          info="tell us a little about yourself"
        />
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => {
              e.preventDefault();
              dispatch({
                type: "DISPLAY_SOCIAL_INPUTS",
                payload: !state.displaySocialInputs,
              });
            }}
          >
            Add social network links
          </button>
          <span className="text-muted">{"  "}Optional</span>
        </div>
        {state.displaySocialInputs && (
          <div>
            <InputGroup
              placeHolder="Twitter Profile Url"
              name="twitter"
              icon="fab fa-twitter"
              value={state.twitter}
              error={error.twitter}
              onChange={(e) => processValue("SET_TWITTER", e.target.value)}
            />

            <InputGroup
              placeHolder="Linkedin Profile Url"
              name="linkedin"
              icon="fab fa-linkedin"
              value={state.linkedin}
              error={error.linkedin}
              onChange={(e) => processValue("SET_LINKEDIN", e.target.value)}
            />
            <InputGroup
              placeHolder="Youtube Profile Url"
              name="youtube"
              icon="fab fa-youtube"
              value={state.youtube}
              error={error.youtube}
              onChange={(e) => processValue("SET_YOUTUBE", e.target.value)}
            />

            <InputGroup
              placeHolder="Instagram Profile Url"
              name="instagram"
              icon="fab fa-instagram"
              value={state.instagram}
              error={error.instagram}
              onChange={(e) => processValue("SET_INSTAGRAM", e.target.value)}
            />
          </div>
        )}
        <input
          style={{ width: "100%" }}
          type="submit"
          value="submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    </div>
  );
}
