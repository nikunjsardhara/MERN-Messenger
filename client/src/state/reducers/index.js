import { combineReducers } from "redux";
import userReducer from "./userReducer";
import messengerReducer from "./messengerReducer";

const reducers = combineReducers({
    user: userReducer,
    messenger: messengerReducer
});

export default reducers;