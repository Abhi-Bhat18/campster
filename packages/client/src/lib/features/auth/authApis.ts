import api from "@/lib/api";

const BASE_STRING = "/auth";

export const authAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: body,
      }),
    }),

    checkLogin: builder.query({
      query: () => ({
        url: "/auth/check",
        method: "GET",
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/forgot-password`,
        method: "POST",
        body: body,
      }),
    }),

    resetPassword : builder.mutation({ 
      query : (body) => ({ 
        url : `${BASE_STRING}/reset-password`,
        method : "PUT", 
        body : body
      })
    })
  }),
});

export const {
  useSignupMutation,
  useCheckLoginQuery,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authAPIs;
