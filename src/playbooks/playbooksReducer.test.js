import reducer from "./playbooksReducer";
import * as types from "./playbooksActionsTypes";

it("FETCH_PLAYBOOKS", () => {
  const newState = reducer(undefined, {
    type: types.FETCH_PLAYBOOKS,
    playbooks: [{ id: "p1" }]
  });
  expect(newState).toEqual({
    p1: { id: "p1" }
  });
});
