import { baseApi } from "./baseApi";

export interface RegisterUserObj {
  firstName: string;
  lastName: string;
  contact: string;
  emailId: string;
  panNumber: string;
  aadharNumber: string;
  address: string;
  role: "BF_CUSTOMER" | "BF_ADMIN";
  userStatus: "ACTIVE" | "INACTIVE";
  dateOfBirth: string;
  password?: string;
  gender: string;
}

export interface RegisterCustomerResponse {
  status: string;
  statusCode: number;
  message: string;
  customerid: number;
}

export interface createAccountObj {
  userId: number;
  accountType: "Saving" | "Current" | "Joint" | string;
  currency: "INR" | string;
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

export const userTransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<
      RegisterCustomerResponse,
      RegisterUserObj
    >({
      query: (userData) => ({
        url: "/retailBanking/customer/createCustomer",
        method: "POST",
        body: userData,
        transformResponse: (response: any) => response.data,
      }),
    }),
    updateCustomer: builder.mutation({
      query: (userData) => ({
        url: "/retailBanking/customer/updateCustomer",
        method: "POST",
        body: userData,
        transformResponse: (response: any) => response.data,
      }),
    }),
    createAccount: builder.mutation<{}, createAccountObj>({
      query: (userData) => ({
        url: "/retailBanking/account/createAccount",
        method: "POST",
        body: userData,
        transformResponse: (response: any) => response.data,
      }),
    }),
    closeAccountByAccountNumber: builder.mutation({
      query: (userData: any) => ({
        url: `/retailBanking/account/closeAccount`,
        method: "POST",
        body: userData,
        transformResponse: (response: any) => response.data,
      }),
    }),
    accountStatusUpdateByAccountNumber: builder.mutation({
      query: (userData: any) => ({
        url: `/retailBanking/account/updateAccountStatus`,
        method: "POST",
        body: userData,
        transformResponse: (response: any) => response.data,
      }),
    }),
    accountViewByAccountNumber: builder.query({
      query: (accountNumber: number) =>
        `/retailBanking/account/accountByAccountNumber/${accountNumber}`,
    }),
    accountViewByUserId: builder.query({
      query: (userId: number) =>
        `/retailBanking/account/accountByUserId/${userId}`,
    }),
    allAccountViewByUserId: builder.query({
      query: (userId: number) =>
        `/retailBanking/account/allAccountByUserId/${userId}`,
    }),
    getCustomerList: builder.query<Customer[], any>({
      query: ({ page, size }) => ({
        url: "/retailBanking/customer/displayAllCustomer",
        params: { page, size },
      }),
      // transformResponse: (response: any[]) =>
      //   response.map(({ id, firstName, lastName, userStatus: status }) => ({
      //     id,
      //     firstName,
      //     lastName,
      //     status,
      //   })),
    }),
    getCustomerDetils: builder.query({
      query: (userId: number) =>
        `/retailBanking/customer/displayCustomer/${userId}`,
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useUpdateCustomerMutation,
  useCreateAccountMutation,
  useCloseAccountByAccountNumberMutation,
  useAccountStatusUpdateByAccountNumberMutation,

  useAccountViewByAccountNumberQuery,
  useAccountViewByUserIdQuery,
  useAllAccountViewByUserIdQuery,
  useGetCustomerListQuery,
  useGetCustomerDetilsQuery,
} = userTransactionApi;
