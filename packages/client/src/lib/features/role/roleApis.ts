'use client'
import api from "@/lib/api";

export const roleAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.mutation({
      query: (body) => ({
        url: "/roles",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRolesMutation } = roleAPIs;
