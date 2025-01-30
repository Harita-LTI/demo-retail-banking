import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaListOl } from "react-icons/fa";
import { Container, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { useSelector } from "react-redux";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useGetStatementListInDateRangeQuery, useGetStatementListQuery } from "../../services/userServices";
import { dateToDDMonYYYYTime } from "../../utils/utility";
import { RootState } from "../../store/store";

const StatementList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data:statementList, error, isLoading } = useGetStatementListQuery(user?.userId, {skip: !user});
  // const reversedStatementList = statementList && [...statementList].reverse();
  // const [ finalizedStatementList, setFinalizedStatementList ] = useState<any>(reversedStatementList);
  const [ finalizedStatementList, setFinalizedStatementList ] = useState<any>([]);
  const [ startDate, setStartDate ] = useState<string>("");
  const [ endDate, setEndDate ] = useState<string>("");

  console.log("----------------------", startDate, endDate)
  
  const userData = {
    userId: user?.userId,
    startDate: startDate,
    endDate: endDate
  }
  const { data:newList, error: statementListErr } = useGetStatementListInDateRangeQuery(userData, { skip: !startDate || !endDate || !user});
  // @ts-ignore
  const filteredStatementList = newList && [...newList].reverse();

  useEffect(() => {
    if(filteredStatementList)
      setFinalizedStatementList(filteredStatementList);
    else
      setFinalizedStatementList(statementList);
  }, [filteredStatementList, statementList]);


  const calculateDateRange = (filterType: string) => {
    const now = new Date();
    let startDate, endDate;
  
    switch (filterType) {
      case 'last10':
        startDate = new Date(now.setDate(now.getDate() - 10)).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      case 'lastWeek':
        startDate = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      case 'lastMonth':
        startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      case 'lastQuarter':
        startDate = new Date(now.setMonth(now.getMonth() - 3)).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      case 'currentYear':
        startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
        endDate = new Date().toISOString().split('T')[0];
        break;
      default:
        startDate = '';
        endDate = '';
    }
  
    return { startDate, endDate };
  };

  const fetchStatements = (filterType: string, userId: number) => {
    const { startDate, endDate } = calculateDateRange(filterType);
    console.log("------2", startDate, endDate)
  
    setStartDate(startDate);
    setEndDate(endDate);

    // const { data, error } = useGetStatementListInDateRangeQuery({
    //   userId,
    //   startDate,
    //   endDate
    // });
  
    // if (error) {
    //   console.error('Error fetching range statement:', error);
    //   return reversedStatementList;
    // }
  
    // return data || reversedStatementList;
  };

  const handleFilterSelect = (filterType: string|null) => {
    console.log("------1", filterType)
    // let filteredStatements:any;

    // if (!filterType ) {
    //   // filteredStatements = reversedStatementList;
    //   reversedStatementList;
    // } else {
    //   // filteredStatements = fetchStatements(filterType, user.userId)
    // }
    if(filterType)
      fetchStatements(filterType, user?.userId)
    // setFinalizedStatementList(filteredStatements);
  };

  const getTransactionTypeIcon = (type:string) => {
    if (type === 'DEBIT') {
      return <FaArrowUp className="text-danger"/>;
    } else if (type === 'CREDIT') {
      return <FaArrowDown className="text-success" />;
    }
    return null;
  };

  if (isLoading) return <div>Loading...</div>;

  //@ts-ignore
  if (error && error.status === 404) {
    return <div>No transaction found</div>
  }
  else if (error) {
    return <div>Error loading...</div>
  }

  return (
    <Container className="">
      <DropdownButton id="dropdown-basic-button" title="Filter Transactions" className="pb-3" onSelect={handleFilterSelect}>
        {/* <Dropdown.Item eventKey="last10">Last 10 Transactions</Dropdown.Item> */}
        <Dropdown.Item eventKey="lastWeek">Last Week Transactions</Dropdown.Item>
        <Dropdown.Item eventKey="lastMonth">Last Month Transactions</Dropdown.Item>
        <Dropdown.Item eventKey="lastQuarter">Last Quarter Transactions</Dropdown.Item>
        <Dropdown.Item eventKey="currentYear">Current Year Transactions</Dropdown.Item>
      </DropdownButton>
      <Table hover>
        <thead>
          <tr className="text-primary">
            <th>Time</th>
            <th>Type</th>
            <th>Amount</th>
            <th className="text-center">Closing Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {finalizedStatementList && finalizedStatementList.length > 0 ? (finalizedStatementList?.map((transaction:any) => (
            <tr key={transaction.transactionID}>
              <td>{dateToDDMonYYYYTime(transaction.createdDate)}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transaction_amount}</td>
              <td className="text-center">{transaction.closingBalance}</td>
              <td>{getTransactionTypeIcon(transaction.transactionType)}</td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan={5} style={{ "color": "#a4a1a1 !important" }}>No recent transaction</td>
            </tr>
          )}
        </tbody>
      </Table>
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
