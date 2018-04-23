import * as types from "./configActionsTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONFIG:
      return {
        ...action.config
      };
    default:
      return state;
  }
}
