'use client'
import api from "@/lib/api";

export const emailAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignEmails: builder.query({
      query: (id) => ({
        url: `/email/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCampaignEmailsQuery } = emailAPIs;
