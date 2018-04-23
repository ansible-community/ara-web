import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axiosMockAdapter from "axios-mock-adapter";

import { getPlaybooks } from "./playbooksActions";
import * as types from "./playbooksActionsTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const axiosMock = new axiosMockAdapter(axios);

it("getPlaybooks", () => {
  axiosMock.onGet("https://api.example.org/api/v1/playbooks").reply(200, {
    count: 1,
    next: null,
    previous: null,
    results: [{ id: "p1" }]
  });
  const expectedActions = [
    {
      type: types.FETCH_PLAYBOOKS,
      playbooks: [{ id: "p1" }]
    }
  ];
  const store = mockStore({ config: { apiURL: "https://api.example.org" } });
  return store.dispatch(getPlaybooks()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
