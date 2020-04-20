import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { checkAuthentification } from "./authActions";
import * as types from "./authActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("checkAuthentification", () => {
  axiosMock.onGet("https://api.example.org/api/v1/").reply(200, {});
  const expectedActions = [
    {
      type: types.LOGIN,
    },
  ];
  const store = mockStore({ config: { apiURL: "https://api.example.org" } });
  return store.dispatch(checkAuthentification()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

it("checkAuthentification unauthorized", () => {
  axiosMock.onGet("https://api.example.org/api/v1/").reply(401, {});
  const expectedActions = [
    {
      type: types.LOGOUT,
    },
  ];
  const store = mockStore({ config: { apiURL: "https://api.example.org" } });
  return store.dispatch(checkAuthentification()).catch(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
