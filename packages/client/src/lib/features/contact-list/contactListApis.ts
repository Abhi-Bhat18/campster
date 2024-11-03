"use client";
import api from "@/lib/api";

const BASE_STRING = "/contact-lists";
export const contactListAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactLists: builder.query({
      query: (queryParams) => ({
        url: `${BASE_STRING}`,
        method: "GET",
        params: queryParams,
      }),
    }),

    getAContactLists: builder.query({
      query: ({ project_id, contact_list_id }) => ({
        url: `${BASE_STRING}/${contact_list_id}`,
        method: "GET",
        params: { project_id },
      }),
    }),

    createNewList: builder.mutation({
      query: (listBody) => ({
        url: `${BASE_STRING}`,
        method: "POST",
        body: listBody,
      }),
    }),

    updateContactList: builder.mutation({
      query: ({ body, id }) => ({
        url: `${BASE_STRING}/${id}`,
        method: "PUT",
        body: { ...body },
      }),
    }),

    searchForContactList: builder.query({
      query: (query) => ({
        url: `${BASE_STRING}/search`,
        method: "GET",
        params: { search: query },
      }),
    }),

    importContacts: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/import`,
        method: "POST",
        body: body,
      }),
    }),

    getContacts: builder.query({
      query: ({ project_id, contact_list_id }) => ({
        url: `${BASE_STRING}/contacts/${contact_list_id}`,
        method: "GET",
        params: { project_id },
      }),
    }),

    addNewContact: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/contact`,
        method: "POST",
        body: body,
      }),
    }),

    removeContacts: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/remove-contacts`,
        method: "PUT",
        body: body,
      }),
    }),

    removeList: builder.mutation({
      query: (params) => ({
        url: `${BASE_STRING}`,
        method: "DELETE",
        params: { lists: params },
      }),
    }),
  }),
});

export const {
  useCreateNewListMutation,
  useGetAllContactListsQuery,
  useGetAContactListsQuery,
  useSearchForContactListQuery,
  useImportContactsMutation,
  useGetContactsQuery,
  useAddNewContactMutation,
  useUpdateContactListMutation,
  useRemoveContactsMutation,
  useRemoveListMutation,
} = contactListAPIs;
