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
import { useCallback, useMemo } from "react";

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

  const dispatcher = useMemo(
    () => dispatchAction<ProfileActionTypes>(dispatch),
    [dispatch]
  );

  const setLoading = useCallback(
    (loading: boolean) =>
      dispatcher({ type: "SET_PROFILE_LOADING", payload: loading }),
    [dispatcher]
  );

  const setProfile = useCallback(
    (profile?: Profile) =>
      dispatcher({ type: "SET_PROFILE", payload: profile }),
    [dispatcher]
  );

  const setError = useCallback(
    (error: ProfileError) =>
      dispatcher({ type: "SET_PROFILE_ERROR", payload: error }),
    [dispatcher]
  );

  const setProfiles = useCallback(
    (profiles: Profile[]) =>
      dispatcher({ type: "SET_PROFILES", payload: profiles }),
    [dispatcher]
  );

  const setExperienceError = useCallback(
    (error: ExperienceError) =>
      dispatcher({ type: "SET_EXPERIENCE_ERROR", payload: error }),
    [dispatcher]
  );

  const setEducationError = useCallback(
    (error: EducationError) =>
      dispatcher({ type: "SET_EDUCATION_ERROR", payload: error }),
    [dispatcher]
  );

  const createProfile = useCallback(
    async (info: ProfileInfo) => {
      try {
        setLoading(true);
        const result = await axios.post<
          any,
          AxiosResponse<BaseResponse<Profile>>
        >("/api/profile", info);

        setProfile(result.data.data);
        setError({});
      } catch (error) {
        if (error.response && error.response.data) {
          const response: BaseResponse<any> = error.response.data;
          setError(response.error || {});
        } else setError({});
      } finally {
        setLoading(false);
      }
    },
    [setError, setLoading, setProfile]
  );

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      console.log("hello");
      const result = await axios.get<BaseResponse<Profile>>("/api/profile");

      setProfile(result.data.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setProfile]);

  const getProfileByHandle = useCallback(
    async (handle: string) => {
      try {
        setLoading(true);
        const result = await axios.get<BaseResponse<Profile>>(
          `/api/profile/handle/${handle}`
        );
        setLoading(false);
        setProfile(result.data.data);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading, setProfile]
  );

  const getProfileByUserId = useCallback(
    async (userId: string) => {
      try {
        setLoading(true);
        const result = await axios.get<BaseResponse<Profile>>(
          `/api/profile/user/${userId}`
        );
        setLoading(false);
        setProfile(result.data.data);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading, setProfile]
  );

  const getAllProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get<BaseResponse<Profile[]>>("/api/profile");
      setLoading(false);
      setProfiles(result.data.data || []);
    } catch (error) {
      setLoading(false);
    }
  }, [setLoading, setProfiles]);

  const addExperience = useCallback(
    async (info: Partial<Experience>) => {
      try {
        setLoading(true);
        const result = await axios.post<BaseResponse<Profile>>(
          "/api/profile/experience",
          info
        );
        setLoading(false);
        setProfile(result.data.data);
        setExperienceError({});
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data) {
          setLoading(false);
          const response: BaseResponse<any> = error.response.data;
          setExperienceError(response.error || {});
        } else setExperienceError({});
      }
    },
    [setLoading, setProfile, setExperienceError]
  );

  const addEducation = useCallback(
    async (info: Partial<Education>) => {
      try {
        setLoading(true);
        const result = await axios.post<BaseResponse<Profile>>(
          "/api/profile/education",
          info
        );
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
    },
    [setLoading, setProfile, setEducationError]
  );

  const deleteExperience = useCallback(
    async (experienceId: string) => {
      try {
        setLoading(true);
        const result = await axios.delete<BaseResponse<Profile>>(
          `/api/profile/experience/${experienceId}`
        );
        setLoading(false);
        setProfile(result.data.data);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading, setProfile]
  );

  const deleteEducation = useCallback(
    async (educationId: string) => {
      try {
        setLoading(true);
        const result = await axios.delete<BaseResponse<Profile>>(
          `/api/profile/education/${educationId}`
        );
        setLoading(false);
        setProfile(result.data.data);
      } catch (error) {
        setLoading(false);
      }
    },
    [setLoading, setProfile]
  );

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
