import { baseApi } from "./baseApi";

export interface RegisterUserObj {
  firstName: string
  lastName: string
  contact: string
  emailId: string
  panNumber: string
  aadharNumber: string
  address: string
  role: "BF_CUSTOMER"|"BF_ADMIN"
  userStatus: "ACTIVE"|"INACTIVE"
  dateOfBirth: string
  password?: string
}

export interface RegisterCustomerResponse {
  status:string
  statusCode:number
  message:string
  customerid:number
}

export interface createAccountObj {
  userId: number
  accountType: "Saving"|"Current"|"Joint"|string
  currency: "INR"
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

export const userTransactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*
     "status": "success",
    "statusCode": 200,
    "message": "Registration successful, Create Account to get account number. ",
    "customerid": "3"
    */
    registerCustomer: builder.mutation<RegisterCustomerResponse,RegisterUserObj>({
      query: (userData) => ({
        url: "/retailBanking/customer/createCustomer",
        method: "POST",
        body: userData,
        transformResponse: (response:any) => response.data,
      }),
    }),
    createAccount: builder.mutation<{},createAccountObj>({
      query: (userData) => ({
        url: "/retailBanking/account/createAccount",
        method: "POST",
        body: userData,
        transformResponse: (response:any) => response.data,
      }),
    }),
    closeAccountByAccountNumber: builder.mutation({
      query: () => ({
        url: (accountNumber:number) => `/retailBanking/account/closeAccount/${accountNumber}`,
        method: "POST",
        transformResponse: (response:any) => response.data,
      }),
    }),
    accountStatusUpdateByAccountNumber: builder.mutation({
      query: () => ({
        url: (accountNumber:number) => `/retailBanking/account/updateAccountStatus/${accountNumber}`,
        method: "POST",
        transformResponse: (response:any) => response.data,
      }),
    }),







    accountViewByAccountNumber: builder.query({
      query: (accountNumber:number) => `/retailBanking/account/accountByAccountNumber/${accountNumber}`,
    }),
    accountViewByUserId: builder.query({
      query: (userId:number) => `/retailBanking/account/accountByUserId/${userId}`,
    }),
    getCustomerList: builder.query<Customer[], void>({
      query: () => "/retailBanking/customer/displayAllCustomer",
      //method: "GET",
      transformResponse: (response: any[]) =>
        response.map(({ id, firstName, lastName, userStatus: status }) => ({
          id,
          firstName,
          lastName,
          status,
        })),
    }),
    getCustomerDetils: builder.query({
      query: (userId:number) => `/retailBanking/customer/displayCustomer/${userId}`,
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useCreateAccountMutation,
  useCloseAccountByAccountNumberMutation,
  useAccountStatusUpdateByAccountNumberMutation,

  useAccountViewByAccountNumberQuery,
  useAccountViewByUserIdQuery,
  useGetCustomerListQuery,
  useGetCustomerDetilsQuery,
} = userTransactionApi;
