import { useDispatch } from "react-redux";
import { dispatchAction } from "..";
import Profile, { Education, Experience, Social } from "../../models/Profile";
import {
  EducationError,
  ExperienceError,
  ProfileError,
} from "../reducers/profileReducer";
import { ProfileActionTypes } from "./actionTypes";
import axios, { AxiosResponse } from "axios";
import BaseResponse from "../../models/BaseResponse";

type ProfileInfo = {
  handle?: string;
  status?: string;
  skills?: string;
  company?: string;
  website?: string;
  location?: string;
  bio?: string;
  githubUsername?: string;
} & Social;

export const useProfileActions = () => {
  const dispatch = useDispatch();
  const dispatcher = dispatchAction<ProfileActionTypes>(dispatch);

  const setLoading = (loading: boolean) =>
    dispatcher({ type: "SET_PROFILE_LOADING", payload: loading });

  const setProfile = (profile?: Profile) =>
    dispatcher({ type: "SET_PROFILE", payload: profile });

  const setError = (error: ProfileError) =>
    dispatcher({ type: "SET_PROFILE_ERROR", payload: error });

  const setProfiles = (profiles: Profile[]) =>
    dispatcher({ type: "SET_PROFILES", payload: profiles });

  const setExperienceError = (error: ExperienceError) =>
    dispatcher({ type: "SET_EXPERIENCE_ERROR", payload: error });

  const setEducationError = (error: EducationError) =>
    dispatcher({ type: "SET_EDUCATION_ERROR", payload: error });

  const createProfile = async (info: ProfileInfo) => {
    try {
      setLoading(true);
      const result = await axios.post<
        any,
        AxiosResponse<BaseResponse<Profile>>
      >("/api/profile", info);
      setLoading(false);
      setProfile(result.data.data);
      setError({});
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const response: BaseResponse<any> = error.response.data;
        setError(response.error || {});
      } else setError({});
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const result = await axios.get<any, AxiosResponse<BaseResponse<Profile>>>(
        "/api/profile"
      );
      setLoading(false);
      setProfile(result.data.data);
      setError({});
    } catch (error) {}
  };

  const getProfileByHandle = async (handle: string) => {
    try {
      setLoading(true);
      const result = await axios.get<any, AxiosResponse<BaseResponse<Profile>>>(
        `/api/profile/handle/${handle}`
      );
      setLoading(false);
      setProfile(result.data.data);
      setError({});
    } catch (error) {}
  };

  const getProfileByUserId = async (userId: string) => {
    try {
      setLoading(true);
      const result = await axios.get<any, AxiosResponse<BaseResponse<Profile>>>(
        `/api/profile/user/${userId}`
      );
      setLoading(false);
      setProfile(result.data.data);
      setError({});
    } catch (error) {}
  };

  const getAllProfiles = async () => {
    try {
      setLoading(true);
      const result = await axios.get<
        any,
        AxiosResponse<BaseResponse<Profile[]>>
      >("/api/profile");
      setLoading(false);
      setProfiles(result.data.data || []);
      setError({});
    } catch (error) {}
  };

  const addExperience = async (info: Partial<Experience>) => {
    try {
      setLoading(true);
      const result = await axios.post<
        any,
        AxiosResponse<BaseResponse<Profile>>
      >("/api/profile/experience", info);
      setLoading(false);
      setProfile(result.data.data);
      setExperienceError({});
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const response: BaseResponse<any> = error.response.data;
        setExperienceError(response.error || {});
      } else setExperienceError({});
    }
  };

  const addEducation = async (info: Partial<Education>) => {
    try {
      setLoading(true);
      const result = await axios.post<
        any,
        AxiosResponse<BaseResponse<Profile>>
      >("/api/profile/education", info);
      setLoading(false);
      setProfile(result.data.data);
      setEducationError({});
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const response: BaseResponse<any> = error.response.data;
        setEducationError(response.error || {});
      } else setEducationError({});
    }
  };

  const deleteExperience = async (experienceId: string) => {
    try {
      setLoading(true);
      const result = await axios.delete<
        any,
        AxiosResponse<BaseResponse<Profile>>
      >(`/api/profile/experience/${experienceId}`);
      setLoading(false);
      setProfile(result.data.data);
    } catch (error) {}
  };

  const deleteEducation = async (educationId: string) => {
    try {
      setLoading(true);
      const result = await axios.delete<
        any,
        AxiosResponse<BaseResponse<Profile>>
      >(`/api/profile/education/${educationId}`);
      setLoading(false);
      setProfile(result.data.data);
    } catch (error) {}
  };

  return {
    createProfile,
    getProfile,
    getProfileByHandle,
    getProfileByUserId,
    getAllProfiles,
    addExperience,
    addEducation,
    deleteExperience,
    deleteEducation,
  };
};
