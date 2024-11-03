'use client'
import api from "@/lib/api";

export const userAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/user",
        body: body,
        method: "PUT",
      }),
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/user/password",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useUpdatePasswordMutation } = userAPIs;
