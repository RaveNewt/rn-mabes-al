import { baseAPI } from "./_baseAPI";

export const rankAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getRanks: builder.query({
            query: () => ({
                url: "/api/ranks",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetRanksQuery } = rankAPI;
