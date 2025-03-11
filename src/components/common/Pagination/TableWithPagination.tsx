import React from "react";
import { Table, Pagination, Form, Col } from "react-bootstrap";
import { NavLink } from "react-router";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import "./index.css";
import { dateToDDMonYYYYTime, formatAmount } from "../../../utils/utility";

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
  emptyMessage?: string | "No Records found";
  totalElements: number | 0;
  setLastPageSize: (size: number) => void;
}

interface PageRangeData {
  totalElements: number;
  pageSize: number | 0;
  currentPage: number | 0;
}

const PaginationTable: React.FC<PaginationTableProps> = ({
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalPages,
  tableItems,
  columns,
  emptyMessage,
  totalElements,
  setLastPageSize,
}) => {
  //const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = async (e: any) => {
    const newPageSize = e.target.value;
    await setLastPageSize(pageSize);
    await setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  function getPageRange({
    currentPage,
    pageSize,
    totalElements,
  }: PageRangeData) {
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(start + (pageSize - 1), totalElements);
    return (
      <p className="mb-0">
        Records <strong>{start + " - " + end + " "}</strong> of
        <strong>{" " + totalElements}</strong>
      </p>
    );
  }

  //const totalPages = Math.ceil(tableItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentTableItems = tableItems; //.slice(startIndex, startIndex + pageSize);
  // console.log("pagination called");

  //function prepareJsxElement(item: any) {}
  const getTransactionTypeIcon = (type: string) => {
    if (type === "DEBIT") {
      return <FaArrowUp className="text-danger" />;
    } else if (type === "CREDIT") {
      return <FaArrowDown className="text-success" />;
    }
    return null;
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-2 align-items-end ">
        <Col sm={8}>
          {getPageRange({ currentPage, pageSize, totalElements })}
        </Col>
        <Col sm={4}>
          <Form.Group
            controlId="pageSizeSelect"
            className="d-flex flex-row align-items-end w-100 justify-content-end"
          >
            <Form.Label className="me-2">Records per page </Form.Label>
            <Form.Control
              as="select"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="form-select w-auto"
            >
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </div>
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
          {currentTableItems && currentTableItems.length > 0 ? (
            currentTableItems.map((row, index) => (
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
                      : column.accessor === "transaction_amount" || column.accessor === "closingBalance"
                      ? formatAmount(row[column.accessor])
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ color: "#a4a1a1 !important" }}
              >
                {emptyMessage}
              </td>
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
