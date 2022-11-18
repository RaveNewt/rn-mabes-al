import { baseAPI } from "./_baseAPI";

export const statusAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getStatuses: builder.query({
            query: () => ({
                url: "/api/statuses",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetStatusesQuery } = statusAPI;
