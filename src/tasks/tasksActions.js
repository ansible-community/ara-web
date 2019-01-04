import axios from "axios";

export function getTasks(playbook) {
  return (dispatch, getState) => {
    const { apiURL } = getState().config;
    return axios
      .get(`${apiURL}/api/v1/tasks?playbook=${playbook.id}`);
  };
}
