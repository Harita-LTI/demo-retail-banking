import React, { useState } from "react";
import { Table } from "react-bootstrap";
import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaEye, FaListAlt, FaShare, FaUsers } from "react-icons/fa";
import PrimaryLinkButton from "../../components/common/PrimaryLinkButton";
const CustomerListTable = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const customers = [
    { id: "10001", name: "John Doe", status: "Active" },
    { id: "10002", name: "Jane Smith", status: "Inactive" },
    { id: "10003", name: "Michael Johnson", status: "Active" },
    { id: "10004", name: "Emily Davis", status: "Inactive" },
    { id: "10005", name: "David Martinez", status: "Active" },
    { id: "10006", name: "Sarah Brown", status: "Inactive" },
    { id: "10007", name: "Chris Wilson", status: "Active" },
    { id: "10008", name: "Jessica Lee", status: "Inactive" },
    { id: "10009", name: "Daniel Garcia", status: "Active" },
    { id: "10010", name: "Lisa Taylor", status: "Inactive" },
    { id: "10011", name: "Matthew Anderson", status: "Active" },
    { id: "10012", name: "Laura Thomas", status: "Inactive" },
    { id: "10013", name: "James Jackson", status: "Active" },
    { id: "10014", name: "Megan White", status: "Inactive" },
    { id: "10015", name: "Anthony Harris", status: "Active" },
  ];

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map((customer) => customer.id));
    }
  };

  const handleSelectCustomer = (id: string) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(
        selectedCustomers.filter((customerId) => customerId !== id)
      );
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  return (
    <Table hover>
      <thead className="border-bottom" style={{ backgroundColor: "#e8474c" }}>
        <tr className="text-red">
          <th>
            {" "}
            <input
              type="checkbox"
              checked={selectedCustomers.length === customers.length}
              onChange={handleSelectAll}
            />{" "}
          </th>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id} className="no-border">
            <td>
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer.id)}
                onChange={() => handleSelectCustomer(customer.id)}
              />
            </td>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.status}</td>
            <td>
              <a href="#" className="text-red text-decoration-none">
                {/* <FaEye /> */}
                <span title="View Customer Details">
                  <small className="me-2 text-small"></small>
                  <FaListAlt />
                </span>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
//export default CustomerListTable;

function CustomerListPage() {
  //return 'abcd'
  return (
    <LayoutWithSidebar
      icon={<FaUsers />}
      title={"Customers"}
      btn={
        <PrimaryLinkButton
          buttonText="Add New Customer"
          url="/admin/create-customer"
        />
      }
    >
      <CustomerListTable />
    </LayoutWithSidebar>
  );
}
export default CustomerListPage;
