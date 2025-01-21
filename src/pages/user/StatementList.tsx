import { useEffect, useState } from "react";
import { FaListOl } from "react-icons/fa";
import { Container, Table } from 'react-bootstrap';

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { StatementInfo, useGetStatementListQuery } from "../../services/userServices";
import { convertStingToDate } from "../../utility";

const StatementList = () => {
  const [statementList, setStatementList] = useState<StatementInfo[]>([]);
  const { data:resp, error, isLoading } = useGetStatementListQuery(1);

  useEffect(() => {
    if(!statementList || !statementList.length) {
      
      if(resp && resp.length) {
        setStatementList(resp)
      }
    }
  }, [statementList])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading...</div>;

  return (
    <Container className="">
      <h2 className="mb-4">Account Statement</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Closing Amount</th>
          </tr>
        </thead>
        <tbody>
          {statementList.map((transaction:any) => (
            <tr key={transaction.transactionID}>
              <td>{transaction.transactionID}</td>
              <td>{convertStingToDate(transaction.createdDate)}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.transaction_amount}</td>
              <td>{transaction.closingBalance}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

function StatementPage() {
  return (
    <LayoutWithSidebar title="Statement" icon={<FaListOl />}>
      <StatementList />
    </LayoutWithSidebar>
  );
}
export default StatementPage;
