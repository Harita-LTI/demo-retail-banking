import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const token = api.getState().auth.token;
  //const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const result = await fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export const { reducerPath, reducer, middleware } = baseApi;
