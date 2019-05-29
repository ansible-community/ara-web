import {
  setCredentials,
  getCredentials,
  removeCredentials,
} from "./localStorage";

it("localStorage getCredentials", () => {
  expect(getCredentials()).toBe(null);
});

it("localStorage setCredentials getCredentials removeCredentials", () => {
  const credentials = {
    username: "foo",
    password: "bar"
  };
  setCredentials(credentials);
  expect(getCredentials()).toEqual(credentials);
  removeCredentials();
  expect(getCredentials()).toBe(null);
});
