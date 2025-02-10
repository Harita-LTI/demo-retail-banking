import { useEffect, useState } from "react";
import { FaListOl } from "react-icons/fa";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import {
  useGetStatementListInDateRangeQuery,
  useGetStatementListQuery,
} from "../../services/userServices";
// import { dateToDDMonYYYYTime } from "../../utils/utility";
import { RootState } from "../../store/store";
import PaginationTable from "../../components/common/Pagination/TableWithPagination";

const StatementList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
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
  const filteredStatementList = newList && [...newList.content].reverse();

  useEffect(() => {
    if (newList && selectedFilter !== "All") {
      setFinalizedStatementList(filteredStatementList);
      setTotalPages(newList.totalPages);
    } else {
      if (statementList && statementList.content.length) {
        let list = [...statementList.content].reverse();
        // let list = [...statementList.content];
        setFinalizedStatementList(list);
        setTotalPages(statementList.totalPages);
      }
    }
  }, [newList, statementList, selectedFilter]);

  // const sortStatementListToDesc = (list: any) => {
  //   return list.sort((a: any, b: any) => {
  //     return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  //   });
  // }

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

  if (isLoading) return <div>Loading...</div>;

  //@ts-ignore
  if (error && error.status === 404) {
    return <div>No transaction found</div>;
  } else if (error) {
    return <div>Error loading...</div>;
  }

  return (
    <Container className="">
      <div className="d-flex align-items-center pb-3">
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter Transactions"
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
            Clear Filter
          </Button>
        )}
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
