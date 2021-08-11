import { ComponentType } from "react";
import { useSelector } from "react-redux";
import AddEducation from "../components/add-credentials/AddEducation";
import AddExperience from "../components/add-credentials/AddExperience";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import CreateProfile from "../components/create-profile/CreateProfile";
import Dashboard from "../components/dashboard/Dashboard";
import EditProfile from "../components/edit-profile/EditProfile";
import Landing from "../components/layout/Landing";
import { GlobalState } from "../redux/reducers";
import { AuthState } from "../redux/reducers/authReducer";

const useAppRoutes = () => {
  const { isAuthenticated, isReady } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );
  const appRoutes: {
    exact?: boolean;
    path: string;
    component: ComponentType;
    condition: boolean;
    redirect: string;
    isReady: boolean;
  }[] = [
    {
      exact: true,
      path: "/",
      component: Landing,
      condition: !isAuthenticated,
      redirect: "/dashboard",
      isReady,
    },
    {
      exact: true,
      path: "/register",
      component: Register,
      condition: !isAuthenticated,
      redirect: "/dashboard",
      isReady,
    },

    {
      exact: true,
      path: "/login",
      component: Login,
      condition: !isAuthenticated,
      redirect: "/dashboard",
      isReady,
    },
    {
      exact: true,
      path: "/dashboard",
      component: Dashboard,
      condition: isAuthenticated,
      redirect: "/",
      isReady,
    },
    {
      exact: true,
      path: "/create-profile",
      component: CreateProfile,
      condition: isAuthenticated,
      redirect: "/",
      isReady,
    },

    {
      exact: true,
      path: "/edit-profile",
      component: EditProfile,
      condition: isAuthenticated,
      redirect: "/",
      isReady,
    },
    {
      exact: true,
      path: "/add-experience",
      component: AddExperience,
      redirect: "/",
      isReady: isReady,
      condition: isAuthenticated,
    },

    {
      exact: true,
      path: "/add-education",
      component: AddEducation,
      redirect: "/",
      isReady: isReady,
      condition: isAuthenticated,
    },
  ];

  return appRoutes;
};

export default useAppRoutes;
