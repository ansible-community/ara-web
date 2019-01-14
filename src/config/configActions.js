import axios from "axios";
import * as types from "./configActionsTypes";

export function setConfig(config) {
  return {
    type: types.SET_CONFIG,
    config
  };
}

export function getConfig() {
  return dispatch => {
    return axios.get(`${process.env.PUBLIC_URL}/config.json`).then(response => {
      const config = response.data;
      dispatch(setConfig(config));
      return response;
    });
  };
}
