import reducer from "./configReducer";
import * as types from "./configActionsTypes";

it("returns the initial state", () => {
  expect(reducer(undefined, {})).toEqual({});
});

it("SET_CONFIG", () => {
  const state = reducer(
    {},
    {
      type: types.SET_CONFIG,
      config: {
        apiURL: "http://example.org",
      },
    }
  );
  expect(state.apiURL).toBe("http://example.org");
});
