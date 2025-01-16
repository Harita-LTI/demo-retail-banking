// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
//import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateCustomer from "./pages/admin/CreateCustomer";
import CustomerListTable from "./pages/admin/CustomerList";
import DashboardPage from "./pages/user/Dashboard";
import DebitPage from "./pages/user/Debit";
import CreditPage from "./pages/user/Credit";
// import LoginPage from "./Components/layout/LogPage/Loginpage";
// import Transactions from "./Components/Dashboard/TransactionList";
// import Transaction from "./Components/layout/Main/TransactionHistory/TransactionHistory";
// import Withdraw from "./Components/Cards/Withdraw/Withdraw";
// import Profile from "./Components/Profile";
// import Deposit from "./Components/layout/Main/Deposit/Deposit";
// import Register from "./Components/layout/LogPage/Register";
// import ProtectedRoutes from "./Components/ProtectedRoutes";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    color: #333;
    margin: 0;
    padding: 0;
    background-color: #f4f5f7;
  }
`;
const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

function App() {
  return (
    <Router>
      {/* // <GlobalStyle /> */}
      <AppContainer>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* admin screens */}
            <Route path="/admin" element={<CustomerListTable />} />
            <Route path="/admin/customers" element={<CustomerListTable />} />
            <Route path="/admin/create-customer" element={<CreateCustomer />} />

            {/* User screens */}
            <Route path="/user/dashboard" element={<DashboardPage />} />
            <Route path="/user/withdraw" element={<DebitPage />} />
            <Route path="/user/deposit" element={<CreditPage />} />

            {/* <Route
              path="/dashboard"
              element={<ProtectedRoutes Comp={Dashboard} />}
            />
            <Route
              path="/deposits"
              element={<ProtectedRoutes Comp={Deposit} />}
            />
            <Route
              path="/transaction"
              element={<ProtectedRoutes Comp={Transactions} />}
            />
            <Route
              path="/transaction-history"
              element={<ProtectedRoutes Comp={Transaction} />}
            />
            <Route
              path="/withdraw"
              element={<ProtectedRoutes Comp={Withdraw} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoutes Comp={Profile} />}
            />
            <Route path="/register" element={<Register />} />
            {/* Define routes for other components here... */}
            <Route path="/login" element={<LoginPage />} />
            {/* Redirect to Dashboard if the path is not found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
