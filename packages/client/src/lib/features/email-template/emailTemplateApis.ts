"use client";
import api from "@/lib/api";

const BASE_STRING = "/templates";


export const emailTemplateAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query({
      query: (queryParams) => ({
        url: `${BASE_STRING}`,
        method: "GET",
        params: queryParams,
      }),
    }),

    getAnEmailTemplate: builder.query({
      query: ({ project_id, template_id }) => ({
        url: `${BASE_STRING}/${template_id}`,
        method: "GET",
        params: { project_id },
      }),
    }),

    searchForTemplate: builder.query({
      query: (query) => ({
        url: `${BASE_STRING}/search`,
        method: "GET",
        params: { search: query },
      }),
    }),

    createNewTemplate: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}`,
        method: "POST",
        body: body,
      }),
    }),

    updateTemplate: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}`,
        method: "PUT",
        body: body,
      }),
    }),

    archiveTemplates: builder.mutation({
      query: (templateIds) => ({
        url: `${BASE_STRING}`,
        method: "DELETE",
        params: { templates: templateIds },
      }),
    }),
  }),
});

export const {
  useGetAnEmailTemplateQuery,
  useGetEmailTemplatesQuery,
  useSearchForTemplateQuery,
  useCreateNewTemplateMutation,
  useUpdateTemplateMutation,
  useArchiveTemplatesMutation
} = emailTemplateAPIs;
