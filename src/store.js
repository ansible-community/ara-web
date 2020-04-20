import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import playbooksReducer from "./playbooks/playbooksReducer";
import authReducer from "./auth/authReducer";

const store = createStore(
  combineReducers({
    config: configReducer,
    playbooks: playbooksReducer,
    auth: authReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
