import { combineReducers } from "redux";
import stock from "./stock";

const rootReducer = combineReducers({
  stock
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
