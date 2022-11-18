import { baseAPI } from "./_baseAPI";

export const userAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/api/pers",
                method: "GET",
            }),
        }),
    }),
});
export const { useGetUsersQuery } = userAPI;
