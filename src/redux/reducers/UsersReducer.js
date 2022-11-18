import { createReducer } from "@reduxjs/toolkit";
import { rankAPI } from "../../services/rankAPI";
import { userAPI } from "../../services/userAPI";

const initialState = {
    users: [],
};

export default createReducer(initialState, (builder) => {
    builder.addMatcher(
        userAPI.endpoints.getUsers.matchFulfilled,
        (state, action) => {
            return {
                ...state,
                users: action.payload.data,
            };
        }
    );
});
