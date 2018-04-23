import * as types from "./configActionsTypes";

export function setConfig(config) {
  return {
    type: types.SET_CONFIG,
    config
  };
}
