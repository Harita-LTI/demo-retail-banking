import { FaListOl } from "react-icons/fa";
import { Container, Table } from 'react-bootstrap';

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";

const transactions = [
  { id: 'T001', time: '10:30:45', type: 'Credit', amount: 5000, closingAmount: 15000 },
  { id: 'T002', time: '11:15:30', type: 'Debit', amount: 2000, closingAmount: 13000 },
  { id: 'T003', time: '12:45:00', type: 'Transfer', amount: 3000, closingAmount: 10000 },
];

const TransactionList = () => {
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
          {transactions.map((transaction) => (
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
      <TransactionList />
    </LayoutWithSidebar>
  );
}
export default StatementPage;
