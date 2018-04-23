import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import configReducer from "./config/configReducer";
import playbooksReducer from "./playbooks/playbooksReducer";

const store = createStore(
  combineReducers({
    config: configReducer,
    playbooks: playbooksReducer
  }),
  applyMiddleware(thunk)
);

export default store;
