import React, { useState } from "react";
import { Table, Pagination, Form } from "react-bootstrap";
import { NavLink } from "react-router";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import "./index.css";
import { dateToDDMonYYYYTime } from "../../../utils/utility";

interface TableItem {
  [key: string]: any;
}

interface Column {
  header: string;
  accessor: string;
  type?: string;
  link?: {
    href: string;
    icon: any;
    title: string;
  };
}

function prepareLinkElement(item: any, param: any) {
  const p = param ? "/" + param : "";
  const url = item.link.href + p;
  return (
    <NavLink to={url}>
      <span title={item.link.title} className="text-primary">
        <small className="me-2 text-small"></small>
        {item.link.icon}
      </span>
    </NavLink>
  );
}

interface PaginationTableProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
  tableItems: TableItem[];
  columns: Column[];
  emptyMessage?: string|"No Records found"
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
  tableItems,
  columns,
  emptyMessage
}) => {
  //const [currentPage, setCurrentPage] = useState<number>(1);
  //const [pageSize, setPageSize] = useState<number>(10);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (e: any) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  //const totalPages = Math.ceil(tableItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentTableItems = tableItems; //.slice(startIndex, startIndex + pageSize);
  console.log("pagination called");

  //function prepareJsxElement(item: any) {}
  const getTransactionTypeIcon = (type:string) => {
    if (type === 'DEBIT') {
      return <FaArrowUp className="text-danger"/>;
    } else if (type === 'CREDIT') {
      return <FaArrowDown className="text-success" />;
    }
    return null;
  };
  
  return (
    <div>
      {/* <div className="d-flex justify-content-end mb-2">
        <Form.Group
          controlId="pageSizeSelect"
          className="d-flex align-items-center"
        >
          <Form.Label>Page Size</Form.Label>
          <Form.Control
            as="select"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Form.Control>
        </Form.Group>
      </div> */}
      <Table hover>
        <thead
          className="border-bottom border-top"
          style={{ backgroundColor: "#e8474c" }}
        >
          <tr>
            <th>#</th>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableItems && currentTableItems.length > 0 ?  (currentTableItems.map((row, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.type && column.type === "link"
                    ? column.link
                      ? prepareLinkElement(column, row[column.accessor])
                      : ""
                    : column.accessor && column.accessor === "createdDate"
                    ? dateToDDMonYYYYTime(row[column.accessor])
                    : column.accessor && column.accessor === "icon"
                    ? getTransactionTypeIcon(row["transactionType"])
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={{ "color": "#a4a1a1 !important" }}>{emptyMessage}</td>
          </tr>
        )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination className="rounded-0">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationTable;
