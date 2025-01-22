import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: any; token: string },
      { emailId: string; password: string; timeZone: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    loginAndValidate: builder.mutation<
      { user: any; token: string },
      { emailId: string; password: string; timeZone: string }
    >({
      queryFn: async (credentials, api, extraOptions, baseQuery) => {
        // First API call for login
        const loginResult: any = await baseQuery({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        });

        if (loginResult.error) {
          return { error: loginResult.error };
        }

        const token = loginResult.data.token;

        // Second API call to get user details
        const userResult = await baseQuery({
          url: "/auth/validateToken",
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResult.error) {
          return { error: userResult.error };
        }

        return { data: { user: userResult.data, token } };
      },
    }),
    validate: builder.query({
      query: (token) => ({
        url: "/auth/validateToken",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      //query: () => "/auth/validateToken",
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLoginAndValidateMutation,
  useValidateQuery,
} = authApi;
