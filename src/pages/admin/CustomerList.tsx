import React from "react";
import { Table } from "react-bootstrap";
const CustomerListTable = () => {
  const dummyData = [
    { number: 1, customerId: "C001", customerName: "John Doe" },
    { number: 2, customerId: "C002", customerName: "Jane Smith" },
    { number: 3, customerId: "C003", customerName: "Bob Johnson" },
    { number: 4, customerId: "C004", customerName: "Alice Williams" },
    { number: 5, customerId: "C005", customerName: "Charlie Brown" },
    { number: 6, customerId: "C006", customerName: "Emily Davis" },
    { number: 7, customerId: "C007", customerName: "Michael Miller" },
    { number: 8, customerId: "C008", customerName: "Sarah Wilson" },
    { number: 9, customerId: "C009", customerName: "David Lee" },
    { number: 10, customerId: "C010", customerName: "Laura Clark" },
  ];
  return (
    <Table
      striped
      bordered
      hover
      variant="light"
      className="border-top border-bottom"
    >
      {" "}
      <thead>
        {" "}
        <tr>
          {" "}
          <th>Number</th> <th>Customer ID</th> <th>Customer Name</th>{" "}
        </tr>{" "}
      </thead>{" "}
      <tbody>
        {" "}
        {dummyData.map((data, index) => (
          <tr key={index}>
            {" "}
            <td>{data.number}</td> <td>{data.customerId}</td>{" "}
            <td>{data.customerName}</td>{" "}
          </tr>
        ))}{" "}
      </tbody>{" "}
    </Table>
  );
};
export default CustomerListTable;
