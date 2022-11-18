import { createReducer } from "@reduxjs/toolkit";
import { statusAPI } from "../../services/statusAPI";

const initialState = {
    statuses: [],
};

export default createReducer(initialState, (builder) => {
    builder.addMatcher(
        statusAPI.endpoints.getStatuses.matchFulfilled,
        (state, action) => {
            return {
                ...state,
                statuses: action.payload.data,
            };
        }
    );
});
