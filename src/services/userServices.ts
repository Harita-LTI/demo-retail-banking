import { baseApi } from "./baseApi";

interface StatementInfo {
  "transactionID": number
  "transaction_amount": number
  "closingBalance": number
  "transactionType": string
  "createdBy": string
  "currency": string
  "transactionRefNo": string
  "createdDate": string
}

export const userTransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    withdraw: builder.mutation<
    {},
    {userId:string, amount:number}
    >({
      query: (userData) => ({
        url: "/retailBanking/transaction/withdraw",
        method: "POST",
        body: userData,
        transformResponse: (response:any) => response.data,
      }),
    }),
    deposit: builder.mutation<
    {},
    {userId:string, amount:number}
    >({
      query: (userData) => ({
        url: "/retailBanking/transaction/deposit",
        method: "POST",
        body: userData,
        // transformResponse: (response:any) => response.data,
      }),
    }),
    transfer: builder.mutation<
    {},
    {amount:number, senderAccount:string, receiverAccount:string}
    >({
      query: (userData) => ({
        url: "/retailBanking/transaction/transfer",
        method: "POST",
        body: userData,
        transformResponse: (response:any) => response.data,
      }),
    }),
    getStatementList: builder.query<StatementInfo[], {userId:number}>({
      query: (userId) => `/retailBanking/transaction/statement/${userId}`,
      // transformResponse: (response: any[]) =>
      //   response.map(({ id, firstName, lastName, userStatus: status }) => ({
      //     id,
      //     firstName,
      //     lastName,
      //     status,
      //   })),
    }),
    getStatementListInDateRange: builder.query({
      query: () => `/retailBanking/transaction/statement/date-range`,
      // transformResponse: (response: any[]) =>
      //   response.map(({ id, firstName, lastName, userStatus: status }) => ({
      //     id,
      //     firstName,
      //     lastName,
      //     status,
      //   })),
    }),
  }),
});

export const {
  useDepositMutation,
  useWithdrawMutation,
  useTransferMutation,
  useGetStatementListInDateRangeQuery,
  useGetStatementListQuery
} = userTransactionApi;
