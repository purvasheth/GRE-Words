import { combineReducers } from "redux";
import { createStore } from "redux";
import wordsReducer from "./words";
import userWordsReducer from "./userWords";

const rootReducer = combineReducers({
  words: wordsReducer,
  userWords: userWordsReducer,
});

const store = createStore(
  rootReducer,
  process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
