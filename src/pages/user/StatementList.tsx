import { FaListOl } from "react-icons/fa";
import { Container, Table } from 'react-bootstrap';

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useGetStatementListQuery } from "../../services/userServices";
import { useEffect, useState } from "react";

const statements = [
  { id: 'T001', time: '10:30:45', type: 'Credit', amount: 5000, closingAmount: 15000 },
  { id: 'T002', time: '11:15:30', type: 'Debit', amount: 2000, closingAmount: 13000 },
  { id: 'T003', time: '12:45:00', type: 'Transfer', amount: 3000, closingAmount: 10000 },
];

const StatementList = () => {
  const [statementList, setStatementList] = useState([]);
  const { data, error, isLoading } = useGetStatementListQuery({userId: 1}); // #check

  useEffect(() => {
    if(!statementList || !statementList.length) {
      try {
        // #check
        const resp = data;
        console.log("++++++++++++++", resp)
      }
      catch (err) {
        console.log(err)
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
          {statements.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.time}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.closingAmount}</td>
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
