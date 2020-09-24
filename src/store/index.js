import { combineReducers } from "redux";

import { Header } from "./modules/Header";
import { BoardList } from "./modules/BoardList";

export default combineReducers({
  Header,
  BoardList,
});
