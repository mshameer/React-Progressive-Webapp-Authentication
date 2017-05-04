import { combineReducers } from "redux";
import flashMessages from "reducers/flashMessages";
import login from "reducers/login";
import signup from "reducers/signup";
import user from "reducers/user";

const rootReducer = combineReducers({
    flashMessages,
    login,
    signup,
    user
});

export default rootReducer;
