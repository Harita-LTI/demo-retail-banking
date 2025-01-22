import { baseApi } from "./baseApi";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}
export const userDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    getCustomerDetails: builder.query({
      query: (userId) => `/retailBanking/customer/displayCustomer/${userId}`,
      //method: "GET",
      //transformResponse: (response) => response.data,
    }),
    updateCustomerDetails: builder.mutation({
      query: (userData) => ({
        url: `/User/update/${userData.userId}`,
        //method: "PUT",
        //body: userData,
        //transformResponse: (response) => response.data,
      }),
    }),
  }),
});

export const {
  useGetCustomerListQuery,
  useGetCustomerDetailsQuery,
  useUpdateCustomerDetailsMutation,
} = userDetailsApi;
