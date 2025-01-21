import { baseApi } from "./baseApi";

export interface StatementInfo {
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
    {transactionId:string, amountWithdrawn:number, remainingBalance:number, message:string, timestamp:string},
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
    {transactionId:string, amountDeposited:number, newBalance:number, message:string, timestamp:string},
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
    getStatementList: builder.query({
      query: (userId:number) => `/retailBanking/transaction/statement/${userId}`,
      transformResponse: (response: StatementInfo[]) =>
        response.map(({ transactionID, transaction_amount, closingBalance, transactionType, createdBy, currency, transactionRefNo, createdDate }) => ({
          transactionID,
          transaction_amount,
          closingBalance,
          transactionType,
          createdBy,
          currency,
          transactionRefNo,
          createdDate
        })),
    }),
    getStatementListInDateRange: builder.query<{}, {userId:number, startDate:string, endDate:string}>({
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
