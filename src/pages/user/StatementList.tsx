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
import autoTable from "jspdf-autotable";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import {
  useGetStatementListInDateRangeQuery,
  useGetStatementListQuery,
} from "../../services/userServices";
import { dateToDDMonYYYYTime, formatAmount } from "../../utils/utility";
import { RootState } from "../../store/store";
import PaginationTable from "../../components/common/Pagination/TableWithPagination";
import { useAccountViewByUserIdQuery } from "../../services/adminServices";

const StatementList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error: accountInfoErr, isLoading: accountInfoIsLoading } = useAccountViewByUserIdQuery(user?.userId, {skip: !user});
 
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

    // Add bank logo
    const logo = new Image();
    logo.src = "/assets/images/unity_bank_full_logo_vertical.png";
    doc.addImage(logo, "PNG", 10, 10, 50, 15);

    // Add today's date
    const today = new Date().toLocaleDateString("en-GB");
    doc.setFontSize(10);
    doc.text(today, 182, 20);

    // Statement details box
    doc.setFontSize(12);
    doc.rect(50, 30, 95, 15);
    doc.text("Statement for account:", 60, 35);
    doc.setFont("helvetica", "bold");
    doc.text(`${accountInfo?.accountNumber}`, 60 + doc.getTextWidth("Statement for account: "), 35);
    doc.setFont("helvetica", "normal");
    if(selectedFilter === "All") {
      doc.text(`Peroid: All transactions till date`, 65, 42);
    } else {
      doc.text(`Peroid: ${startDate} to ${endDate}`, 65, 42);
    }

    // User details box
    doc.rect(10, 50, 70, 30);
    doc.setFontSize(10);
    doc.text(`Name: ${user.first_Name} ${user.last_name}`, 15, 55);
    doc.text("Mobile: Registered", 15, 65);
    doc.text("Email: Registered", 15, 75);

    // Bank details box
    doc.rect(120, 50, 80, 30);
    doc.text("Bank Branch: Wakad, Pune, 411057", 125, 55);
    doc.text("IFSC: UNBK0000007", 125, 65);
    doc.text("MICR No: NA", 125, 75);

    // Account details
    doc.setFontSize(12);
    doc.rect(10, 85, 190, 10);
    doc.text(
      `Transaction details for account number ${accountInfo.accountNumber} (${accountInfo.accountType}) (Currency - ${accountInfo.currency})`,
      20, 91
    );

    // Table headers and content
    const tableColumn = ["S.No", "Time", "Reference No", "Deposits", "Withdrawals", "Amount", "Closing Balance"];
    const tableRows: string[][] = [];

    finalizedStatementList.forEach((item: any, index: any) => {
      const rowData = [
        `${index + 1}`,
        dateToDDMonYYYYTime(item.createdDate),
        item.transactionRefNo,
        item.transactionType === "CREDIT" ? formatAmount(item.transaction_amount) : "",
        item.transactionType === "DEBIT" ? formatAmount(item.transaction_amount) : "",
        formatAmount(item.transaction_amount),
        formatAmount(item.closingBalance),
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      startY: 100,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] },
      styles: { fontSize: 10 },
      margin: { left: 10, right: 10 },
      didDrawPage: (data) => {
        // Add footer
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);

        const footerText1 = doc.splitTextToSize('SMS "HELP" space <customer ID> to +91 1234567892', 60);
        const footerText2 = doc.splitTextToSize('For mobile banking download our "Unity Feel" app', 60);
        const footerText3 = doc.splitTextToSize('For email contact us to service@unitybank.com', 60);

        doc.text(footerText1, 10, pageHeight - 25);
        doc.text(footerText2, 90, pageHeight - 25);
        doc.text(footerText3, 162, pageHeight - 25);

        // Add page number
        const pageCount = doc.getNumberOfPages();
        doc.text(`Page ${pageCount}`, 190, pageHeight - 10);
      },
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
            Last 30 Days Transactions
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
