import api from "@/lib/api";

const BASE_STRING = "/transactionals";

export const APIKeyAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionalEmails: builder.query({
      query: (params) => ({
        url: `${BASE_STRING}`,
        method: "GET",
        params,
      }),
    }),

    getAPIKeys: builder.query({
      query: (params) => ({
        url: `${BASE_STRING}/api-keys`,
        method: "GET",
        params: params,
      }),
    }),

    generateAPIKey: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/api-key`,
        method: "POST",
        body: body,
      }),
    }),

    invokeAPIKeys : builder.mutation({ 
        query : ( params ) => ({ 
            url : `${BASE_STRING}/api-key`,
            method : "DELETE",
            params : { keys : params}
        })
    })
  }),
});

export const { useGetTransactionalEmailsQuery, useGenerateAPIKeyMutation, useGetAPIKeysQuery, useInvokeAPIKeysMutation } = APIKeyAPIs;
