import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateCustomer from "./pages/admin/CreateCustomer";
import CustomerListTable from "./pages/admin/CustomerList";
import DashboardPage from "./pages/user/Dashboard";
import DebitPage from "./pages/user/Debit";
import CreditPage from "./pages/user/Credit";
import CustomerDetailsPage from "./pages/admin/CustomerDetails";
import TransferPage from "./pages/user/Transfer";
import StatementPage from "./pages/user/StatementList";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import PageNotFound from "./components/common/PageNotFound";
import QuickPayPage from "./pages/user/QuickPay";
import AccountPage from "./pages/user/Accounts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          {/* admin screens */}
          <Route path="/admin" element={<CustomerListTable />} />
          <Route path="/admin/customers" element={<CustomerListTable />} />
          <Route path="/admin/create-customer" element={<CreateCustomer />} />
          <Route
            path="/admin/customer-details/:userId"
            element={<CustomerDetailsPage />}
          />

          {/* User screens */}
          <Route path="/user/dashboard" element={<DashboardPage />} />
          <Route path="/user/withdraw" element={<DebitPage />} />
          <Route path="/user/deposit" element={<CreditPage />} />
          <Route path="/user/transfer" element={<TransferPage />} />
          <Route path="/user/statement" element={<StatementPage />} />
          <Route path="/user/quick-pay" element={<QuickPayPage />} />
          <Route path="/user/accounts" element={<AccountPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
