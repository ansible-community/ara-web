import reducer from "./authReducer";
import * as types from "./authActionsTypes";

it("returns the initial state", () => {
  expect(reducer(undefined, {})).toEqual({ isAuthenticated: true });
});

it("LOGIN", () => {
  const newState = reducer(undefined, {
    type: types.LOGIN,
  });
  expect(newState).toEqual({
    isAuthenticated: true,
  });
});

it("LOGOUT", () => {
  const newState = reducer(undefined, {
    type: types.LOGOUT,
  });
  expect(newState).toEqual({
    isAuthenticated: false,
  });
});
