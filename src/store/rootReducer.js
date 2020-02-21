import { combineReducers } from "redux";
import inventoryLogReducer from "./inventoryLogReducer";
import sectionCountsReducer from "./sectionCountsReducer";

export default combineReducers({
  inventoryLogReducer,
  sectionCountsReducer
});
