import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : import.meta.env.VITE_SERVER_URL;

export const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //Query: Used for read-only operations. Queries are typically GET requests.

    getAllLoans: builder.query({
      query: () => ({
        url: "loan/getAllLoans",
        method: "GET",
      }),
    }),
    getLoanDetailsById: builder.query({
      query: (id) => ({
        url: `loan/loanDetails/${id}`,
        method: "GET",
      }),
    }),
    getAllLoanStatuses: builder.query({
      query: () => ({
        url: "loan/loanStatuses",
        method: "GET",
      }),
    }),

    //Mutation: Used for write operations that change or update data on the server. Mutations include POST, PUT, DELETE, and similar requests.
    approveLoan: builder.mutation({
      query: (id) => ({
        url: `loan/approveLoan/${id}`,
        method: "PUT",
      }),
    }),
    applyLoan: builder.mutation({
      query: ({ userId, ...body }) => ({
        url: `loan/apply?userId=${userId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllLoansQuery,
  useGetLoanDetailsByIdQuery,
  useGetAllLoanStatusesQuery,
  useApproveLoanMutation,
  useApplyLoanMutation,
} = loanApi;
