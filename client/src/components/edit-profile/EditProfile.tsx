import { FormEventHandler, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Profile from "../../models/Profile";

import { LocalProfileActionType } from "../../redux/actions/actionTypes";
import {
  ProfileInfo,
  useProfileActions,
} from "../../redux/actions/profileActions";
import { GlobalState } from "../../redux/reducers";
import { localProfileReducer } from "../../redux/reducers/localProfileReducer";

import { ProfileState } from "../../redux/reducers/profileReducer";
import statusOptions from "../../utils/statusOptions";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";

function convertProfileToInfo(profile: Profile): ProfileInfo {
  return {
    handle: profile.handle,
    status: profile.status,
    skills: profile.skills.join(","),
    company: profile.company,
    website: profile.website,
    location: profile.location,
    bio: profile.bio,
    githubUsername: profile.githubUsername,
    youtube: profile.social?.youtube,
    instagram: profile.social?.instagram,
    facebook: profile.social?.facebook,
    twitter: profile.social?.twitter,
    linkedin: profile.social?.linkedin,
  };
}

export default function EditProfile() {
  const [state, dispatch] = useReducer(localProfileReducer, {
    displaySocialInputs: false,
  });
  const { error } = useSelector<GlobalState, ProfileState>(
    (state) => state.profile
  );

  const { createProfile, getProfile } = useProfileActions();
  const history = useHistory();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await createProfile(state);
      history.replace("/dashboard");
    } catch (error) {}
  };

  const processValue = (type: LocalProfileActionType, value: string) => {
    const newValue = value.trim() === "" ? undefined : value;
    dispatch({ type, payload: newValue });
  };

  useEffect(() => {
    getProfile()
      .then((profile) => {
        dispatch({
          type: "REPLACE_PROFILE_INFO",
          payload: convertProfileToInfo(profile),
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [getProfile]);

  return (
    <div style={{ padding: 16 }}>
      <h1 className="display-4 text-center">Edit Your Profile</h1>
      {/* <p className="lead text-center">
        Lets get some information to make your profile stand out
      </p> */}
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
          options={statusOptions}
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
