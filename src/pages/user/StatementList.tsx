import { useEffect, useState } from "react";
import { FaFileAlt, FaFileDownload, FaListOl } from "react-icons/fa";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import {
  useGetStatementListInDateRangeQuery,
  useGetStatementListQuery,
} from "../../services/userServices";
import { dateToDDMonYYYYTime } from "../../utils/utility";
import { RootState } from "../../store/store";
import PaginationTable from "../../components/common/Pagination/TableWithPagination";

const StatementList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: statementList,
    error,
    isLoading,
  } = useGetStatementListQuery(
    { userId: user?.userId, page: currentPage - 1, size: pageSize },
    { skip: !user }
  );
  const [finalizedStatementList, setFinalizedStatementList] = useState<any>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const columns = [
    { header: "Time", accessor: "createdDate" },
    { header: "Type", accessor: "transactionType" },
    { header: "Amount", accessor: "transaction_amount" },
    { header: "Closing Balance", accessor: "closingBalance" },
    { header: "", accessor: "icon" },
  ];

  const params = {
    userId: user?.userId,
    startDate: startDate,
    endDate: endDate,
    page: currentPage - 1,
    size: pageSize,
  };
  const { data: newList, error: statementListErr } =
    useGetStatementListInDateRangeQuery(params, {
      skip: !startDate || !endDate || !user,
    });
  // @ts-ignore
  const filteredStatementList = newList && [...newList.content];

  useEffect(() => {
    if (newList && selectedFilter !== "All") {
      setFinalizedStatementList(filteredStatementList);
      setTotalPages(newList.totalPages);
    } else {
      if (statementList && statementList.content.length) {
        let list = [...statementList.content];
        setFinalizedStatementList(list);
        setTotalPages(statementList.totalPages);
      }
    }
  }, [newList, statementList, selectedFilter]);

  const calculateDateRange = (filterType: string) => {
    const now = new Date();
    let startDate, endDate;

    switch (filterType) {
      case "last10":
        startDate = new Date(now.setDate(now.getDate() - 10))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case "lastWeek":
        startDate = new Date(now.setDate(now.getDate() - 7))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case "lastMonth":
        startDate = new Date(now.setMonth(now.getMonth() - 1))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case "lastQuarter":
        startDate = new Date(now.setMonth(now.getMonth() - 3))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case "currentYear":
        startDate = new Date(now.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      default:
        startDate = "";
        endDate = "";
    }

    return { startDate, endDate };
  };

  const fetchStatements = (filterType: string, userId: number) => {
    const { startDate, endDate } = calculateDateRange(filterType);

    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleFilterSelect = (filterType: string | null) => {
    if (filterType) {
      setSelectedFilter(filterType);
      if (filterType === "All") {
        setSelectedFilter("All");
        setStartDate("");
        setEndDate("");
      } else {
        fetchStatements(filterType, user?.userId);
      }
    }
  };

  const clearFilter = () => {
    setSelectedFilter("All");
    setStartDate("");
    setEndDate("");
  };

  const handleViewPDF = () => {
    const doc = generatePDF();
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Statement List", 10, 10);
  
    // Table headers
    doc.text("S.No", 10, 20);
    doc.text("Time", 35, 20);
    doc.text("Amount", 120, 20);
    doc.text("Closing Balance", 160, 20);
  
    // Table content
    finalizedStatementList.forEach((item:any, index:any) => {
      const y = 30 + index * 10;
      doc.text(`${index + 1}`, 10, y);
      doc.text(dateToDDMonYYYYTime(item.createdDate),35, y);
      doc.text(`${item.transaction_amount}`, 120, y);
      doc.text(`${item.closingBalance}`, 160, y);
    });
  
    return doc;
  };
  
  const handleDownloadPDF = () => {
    const doc = generatePDF();
    const pdfBlob = doc.output("blob");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "statement_list.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <div>Loading...</div>;

  //@ts-ignore
  if (error && error.status === 404) {
    return <div>No transaction found</div>;
  } else if (error) {
    return <div>Error loading...</div>;
  }

  return (
    <Container>
      <div className="d-flex align-items-center pb-3">
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter"
          onSelect={handleFilterSelect}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="lastWeek">
            Last Week Transactions
          </Dropdown.Item>
          <Dropdown.Item eventKey="lastMonth">
            Last Month Transactions
          </Dropdown.Item>
          <Dropdown.Item eventKey="lastQuarter">
            Last Quarter Transactions
          </Dropdown.Item>
          <Dropdown.Item eventKey="currentYear">
            Current Year Transactions
          </Dropdown.Item>
        </DropdownButton>

        {selectedFilter !== "All" && (
          <Button variant="secondary" className="ms-2" onClick={clearFilter}>
            Clear
          </Button>
        )}

        <div className="ms-auto">
            <span className="fs-3 me-3">
              <FaFileAlt onClick={handleViewPDF} />
            </span>
            <span className="fs-3">
              <FaFileDownload onClick={handleDownloadPDF} />
            </span>
        </div>
      </div>

      <PaginationTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        tableItems={finalizedStatementList ? finalizedStatementList : []}
        columns={columns}
        emptyMessage="No transaction found"
        totalElements={
          statementList?.totalElements ? statementList.totalElements : 0
        }
        setLastPageSize={() => {}}
      />
    </Container>
  );
};

function StatementPage() {
  return (
    <LayoutWithSidebar title="Account Statement" icon={<FaListOl />}>
      <StatementList />
    </LayoutWithSidebar>
  );
}
export default StatementPage;
