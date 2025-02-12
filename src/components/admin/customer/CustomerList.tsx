import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaListAlt } from "react-icons/fa";
import { useGetCustomerListQuery } from "../../../services/adminServices";
import { NavLink } from "react-router";
import { generateCustomerId } from "../../../utils/utility";
import PaginationTable from "../../common/Pagination/TableWithPagination";

const CustomerListTable = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);
  const [lastPageSize, setLastPageSize] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const {
    data: customersData,
    error,
    isLoading,
  }: any = useGetCustomerListQuery(
    { page: currentPage - 1, size: pageSize }
    //{ refetchOnMountOrArgChange: true }
    //{ skip: lastPageSize > pageSize }
  );
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (customersData && customersData.content) {
      setCustomers(
        customersData.content.map((item: any) => ({
          ...item,
          param: item.id,
          id: generateCustomerId(item.id),
        }))
      );
      setTotalPages(customersData.totalPages);
    }
  }, [customersData, pageSize]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  const columns = [
    { header: "Customer ID", accessor: "id" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Status", accessor: "userStatus" },
    {
      header: "",
      accessor: "param",
      type: "link",
      link: {
        href: "/admin/customer-details",
        icon: <FaListAlt />,
        title: "View Customer Details",
      },
    },
    // Add more columns as needed
  ];

  return (
    <PaginationTable
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      totalPages={totalPages}
      tableItems={customers ? customers : []}
      columns={columns}
      totalElements={
        customersData?.totalElements ? customersData.totalElements : 0
      }
      setLastPageSize={setLastPageSize}
    />
  );

  // return (
  //   <Table hover>
  //     <thead className="border-bottom" style={{ backgroundColor: "#e8474c" }}>
  //       <tr className="text-primary">
  //         <th>
  //           <input
  //             type="checkbox"
  //             checked={
  //               customers && selectedCustomers.length === customers.length
  //             }
  //             onChange={handleSelectAll}
  //           />
  //         </th>
  //         <th>Customer ID</th>
  //         <th>First Name</th>
  //         <th>Last Name</th>
  //         <th>Status</th>
  //         <th></th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {customers &&
  //         customers.map((customer) => (
  //           <tr key={customer.id} className="no-border">
  //             <td>
  //               <input
  //                 type="checkbox"
  //                 //checked={selectedCustomers.includes(customer.id)}
  //                 //onChange={() => handleSelectCustomer(customer.id)}
  //               />
  //             </td>
  //             <td>{generateCustomerId(customer.id)}</td>
  //             <td>{customer.firstName}</td>
  //             <td>{customer.lastName}</td>
  //             <td>{customer.status}</td>
  //             <td>
  //               <NavLink
  //                 to={`/admin/customer-details/${customer.id}`}
  //                 className="text-primary text-decoration-none"
  //               >
  //                 {/* <FaEye /> */}
  //                 <span title="View Customer Details">
  //                   <small className="me-2 text-small"></small>
  //                   <FaListAlt />
  //                 </span>
  //               </NavLink>
  //             </td>
  //           </tr>
  //         ))}
  //     </tbody>
  //   </Table>
  // );
};
export default CustomerListTable;
