import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import axiosMockAdapter from "axios-mock-adapter";

import App from "./App";

const axiosMock = new axiosMockAdapter(axios);

it("renders without crashing", () => {
  axiosMock.onGet("config.json").reply(200, {
    apiURL: "http://localhost:8000",
  });
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
