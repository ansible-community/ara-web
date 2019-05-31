import * as types from "./authActionsTypes";

const initialState = {
  isAuthenticated: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
