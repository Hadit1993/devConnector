import { ReduxAction } from "..";
import Profile, { Social } from "../../models/Profile";
import { ProfileActionTypes } from "../actions/actionTypes";

export type ProfileError = Social & {
  handle?: string;
  status?: string;
  skills?: string;
};

export type ExperienceError = {
  title?: string;
  company?: string;
  from?: string;
};

export type EducationError = {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: string;
};

export interface ProfileState {
  profile?: Profile;
  profiles: Profile[];
  loading: boolean;
  error: ProfileError;
  experienceError: ExperienceError;
  educationError: EducationError;
}

export const profileInitialState: ProfileState = {
  profiles: [],
  loading: false,
  error: {},
  experienceError: {},
  educationError: {},
};

export function profileReducer(
  state: ProfileState = profileInitialState,
  action: ReduxAction<ProfileActionTypes>
): ProfileState {
  switch (action.type) {
    case "SET_PROFILE_LOADING":
      return { ...state, loading: action.payload };

    case "SET_PROFILE_ERROR":
      return { ...state, error: action.payload };

    case "SET_PROFILE":
      return { ...state, profile: action.payload };

    case "SET_PROFILES":
      return { ...state, profiles: action.payload };

    case "SET_EXPERIENCE_ERROR":
      return { ...state, experienceError: action.payload };

    case "SET_EDUCATION_ERROR":
      return { ...state, educationError: action.payload };

    default:
      return state;
  }
}
