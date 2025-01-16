import { baseApi } from "./baseApi";

//const backendURL = "http://localhost:8080";
export const userDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.mutation({
      query: (userId) => `/User/getUser/${userId}`,
      method: "GET",
      transformResponse: (response) => response.data,
    }),
    updateUserDetails: builder.mutation({
      query: (userData) => ({
        url: `/User/update/${userData.userId}`,
        method: "PUT",
        body: userData,
        transformResponse: (response) => response.data,
      }),
    }),
  }),
});

export const { useGetUserDetailsMutation, useUpdateUserDetailsMutation } =
  userDetailsApi;
