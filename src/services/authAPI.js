import { baseAPI } from "./_baseAPI";

export const authAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: "/api/login",
                method: "POST",
                body: payload,
            }),
        }),
        postUser: builder.mutation({
            query: (payload) => ({
                url: "/api/pers",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const { useLoginMutation, usePostUserMutation } = authAPI;
