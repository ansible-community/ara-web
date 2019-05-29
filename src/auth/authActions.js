import http from "../http";
import * as types from "./authActionsTypes";
import { setCredentials, removeCredentials } from "./localStorage";

export function logout() {
  removeCredentials();
  return {
    type: types.LOGOUT
  };
}

export function checkAuthentification() {
  return (dispatch, getState) => {
    const state = getState();
    return http({
      method: "get",
      url: `${state.config.apiURL}/api/v1/`
    })
      .then(response => {
        dispatch({
          type: types.LOGIN
        });
        return response;
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          dispatch(logout());
        }
        throw error;
      });
  };
}

export function login(username, password) {
  return dispatch => {
    setCredentials({ username, password });
    return dispatch(checkAuthentification());
  };
}
