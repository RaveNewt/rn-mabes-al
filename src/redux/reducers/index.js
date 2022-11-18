import { combineReducers } from "redux";
import { baseAPI } from "../../services/_baseAPI";
import AuthReducer from "./AuthReducer";
import RanksReducer from "./RanksReducer";
import StatusReducer from "./StatusReducer";
import UsersReducer from "./UsersReducer";

const allReducers = combineReducers({
    rank: RanksReducer,
    auth: AuthReducer,
    status: StatusReducer,
    user: UsersReducer,
    api: baseAPI.reducer,
});

export default allReducers;
