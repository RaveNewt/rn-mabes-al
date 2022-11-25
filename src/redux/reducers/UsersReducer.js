import { createReducer } from "@reduxjs/toolkit";
import { userApi } from "../../services/userApi";

const initialState = {
    users: [],
};

export default createReducer(initialState, (builder) => {
    builder.addMatcher(
        userApi.endpoints.getUsers.matchFulfilled,
        (state, action) => {
            return {
                ...state,
                users: action.payload.data,
            };
        }
    );
});
