'use client'
import api from "@/lib/api";

const BASE_STRING = "/project";

export const projectAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getAProject: builder.query({
      query: (project_id: string) => ({
        url: `${BASE_STRING}/${project_id}`,
        method: "GET",
      }),
    }),

    getProjectUsers: builder.query({
      query: (project_id: string) => ({
        url: `${BASE_STRING}/access/${project_id}`,
        method: "GET",
      }),
    }),

    updateProject: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}`,
        method: "PUT",
        body: body,
      }),
    }),

    inviteUserToProject: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/invite`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAProjectQuery,
  useGetProjectUsersQuery,
  useUpdateProjectMutation,
  useInviteUserToProjectMutation,
} = projectAPIs;
