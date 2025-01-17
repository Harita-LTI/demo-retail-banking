import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaUsers } from "react-icons/fa";
import PrimaryLinkButton from "../../components/common/PrimaryLinkButton";
import CustomerListTable from "../../components/admin/customer/CustomerList";

function CustomerListPage() {
  //return 'abcd'
  return (
    <LayoutWithSidebar
      icon={<FaUsers />}
      title={"Customers"}
      btn={
        <PrimaryLinkButton
          buttonText="Add New Customer"
          url="/admin/create-customer"
        />
      }
    >
      <CustomerListTable />
    </LayoutWithSidebar>
  );
}
export default CustomerListPage;
