import * as actions from "./configActions";
import * as types from "./configActionsTypes";

it("setConfig", () => {
  const config = { apiURL: "http://example.org" };
  const expectedActions = {
    type: types.SET_CONFIG,
    config
  };
  expect(actions.setConfig(config)).toEqual(expectedActions);
});
