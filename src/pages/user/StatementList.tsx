import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaListOl } from "react-icons/fa";
import { Container, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { useSelector } from "react-redux";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useGetStatementListQuery } from "../../services/userServices";
import { dateToDDMonYYYYTime } from "../../utils/utility";
import { RootState } from "../../store/store";

const StatementList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data:statementList, error, isLoading } = useGetStatementListQuery(2); // #check user.userId
  const reversedStatementList = statementList && [...statementList].reverse();
  const [ statementObjList, setStatementObjList ] = useState(reversedStatementList);
  // const [filteredTransactions, setFilteredTransactions] = useState(reversedStatementList);

  const filterTransactions = (filterType:string) => {
    const now = new Date();
    let filteredList;

    switch (filterType) {
      case 'last10':
        filteredList = reversedStatementList?.slice(0, 10);
        break;
      case 'lastWeek':
        filteredList = reversedStatementList?.filter(transaction => {
          const transactionDate = new Date(transaction.createdDate);
          const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
          return transactionDate >= oneWeekAgo;
        });
        break;
      case 'lastMonth':
        filteredList = reversedStatementList?.filter(transaction => {
          const transactionDate = new Date(transaction.createdDate);
          const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
          return transactionDate >= oneMonthAgo;
        });
        break;
      case 'lastQuarter':
        filteredList = reversedStatementList?.filter(transaction => {
          const transactionDate = new Date(transaction.createdDate);
          const oneQuarterAgo = new Date(now.setMonth(now.getMonth() - 3));
          return transactionDate >= oneQuarterAgo;
        });
        break;
      case 'currentYear':
        filteredList = reversedStatementList?.filter(transaction => {
          const transactionDate = new Date(transaction.createdDate);
          return transactionDate.getFullYear() === now.getFullYear();
        });
        break;
      default:
        filteredList = reversedStatementList;
    }
    setStatementObjList(filteredList);
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
  if (error) return <div>Error loading...</div>;

  return (
    // () => filterTransactions
    <Container className="">
      <DropdownButton id="dropdown-basic-button" title="Filter Transactions" className="pb-3" onSelect={() => {}}>
        <Dropdown.Item eventKey="last10">Last 10 Transactions</Dropdown.Item>
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
          {reversedStatementList?.map((transaction) => (
            <tr key={transaction.transactionID}>
              <td>{dateToDDMonYYYYTime(transaction.createdDate)}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transaction_amount}</td>
              <td className="text-center">{transaction.closingBalance}</td>
              <td>{getTransactionTypeIcon(transaction.transactionType)}</td>
            </tr>
          ))}
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
