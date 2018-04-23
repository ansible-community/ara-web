import * as types from "./playbooksActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLAYBOOKS:
      return action.playbooks.reduce((accumulator, playbook) => {
        accumulator[playbook.id] = playbook;
        return accumulator;
      }, {});
    default:
      return state;
  }
}
