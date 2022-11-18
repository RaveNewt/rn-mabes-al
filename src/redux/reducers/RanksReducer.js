import { createReducer } from "@reduxjs/toolkit";
import { rankAPI } from "../../services/rankAPI";

const initialState = {
    ranks: [],
};

export default createReducer(initialState, (builder) => {
    builder.addMatcher(
        rankAPI.endpoints.getRanks.matchFulfilled,
        (state, action) => {
            console.log("StatusReducer", action.payload.data);
            return {
                ...state,
                ranks: action.payload.data,
            };
        }
    );
});
