import { act } from "react-dom/test-utils";
import { ReduxAction } from "..";
import { LocalProfileActionType } from "../actions/actionTypes";
import { ProfileInfo } from "../actions/profileActions";

export type LocalProfileState = ProfileInfo & { displaySocialInputs: boolean };

export function localProfileReducer(
  state: LocalProfileState,
  action: ReduxAction<LocalProfileActionType>
): LocalProfileState {
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

    case "REPLACE_PROFILE_INFO":
      return {
        ...action.payload,
        displaySocialInputs: state.displaySocialInputs,
      };

    default:
      return state;
  }
}
