import axios from "axios";

const setAuthToken = (token?: string) => {
  axios.defaults.headers["Authorization"] = token
    ? `Bearer ${token}`
    : undefined;
};

export default setAuthToken;
