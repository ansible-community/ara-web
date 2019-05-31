import axios from "axios";
import { getCredentials } from "./auth/localStorage";

axios.interceptors.request.use(config => {
  const credentials = getCredentials();
  if (credentials) {
    config.auth = credentials;
  }
  return config;
});

export default axios;
