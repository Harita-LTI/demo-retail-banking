import { useState } from "react";
import { Table } from "react-bootstrap";
import { FaListAlt } from "react-icons/fa";
import { useGetCustomerListQuery } from "../../../services/adminServices";
import { NavLink } from "react-router";
import { generateCustomerId } from "../../../utils/utility";

const CustomerListTable = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const { data: customers, error, isLoading } = useGetCustomerListQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  const handleSelectAll = () => {
    // if (customers && selectedCustomers.length === customers.length) {
    //   setSelectedCustomers([]);
    // } else {
    //   setSelectedCustomers(customers.map((customer) => customer.id));
    // }
  };

  // const handleSelectCustomer = (id: string) => {
  //   if (selectedCustomers.includes(id)) {
  //     setSelectedCustomers(
  //       selectedCustomers.filter((customerId) => customerId !== id)
  //     );
  //   } else {
  //     setSelectedCustomers([...selectedCustomers, id]);
  //   }
  // };

  return (
    <Table hover>
      <thead className="border-bottom" style={{ backgroundColor: "#e8474c" }}>
        <tr className="text-primary">
          <th>
            <input
              type="checkbox"
              checked={
                customers && selectedCustomers.length === customers.length
              }
              onChange={handleSelectAll}
            />
          </th>
          <th>Customer ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers &&
          customers.map((customer) => (
            <tr key={customer.id} className="no-border">
              <td>
                <input
                  type="checkbox"
                  //checked={selectedCustomers.includes(customer.id)}
                  //onChange={() => handleSelectCustomer(customer.id)}
                />
              </td>
              <td>{generateCustomerId(customer.id)}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.status}</td>
              <td>
                <NavLink
                  to={`/admin/customer-details/${customer.id}`}
                  className="text-primary text-decoration-none"
                >
                  {/* <FaEye /> */}
                  <span title="View Customer Details">
                    <small className="me-2 text-small"></small>
                    <FaListAlt />
                  </span>
                </NavLink>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
export default CustomerListTable;
