'use client'
import api from "@/lib/api";

const BASE_STRING = "/analytics";

export const dashboardAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCounts: builder.query({
      query: () => ({
        url: `${BASE_STRING}/dashboard`,
        method: "GET",
      }),
    }),

    getLineChartData: builder.query({
      query: () => ({
        url: `${BASE_STRING}/events`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardCountsQuery, useGetLineChartDataQuery } = dashboardAPIs;
