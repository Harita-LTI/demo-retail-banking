import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaUser } from "react-icons/fa";
import PrimaryLinkButton from "../../components/common/PrimaryLinkButton";
import CustomerDetails from "../../components/admin/customer/CustomerDetails";

function CustomerDetailsPage() {
  //return 'abcd'
  return (
    <LayoutWithSidebar
      icon={<FaUser />}
      title={"Customer Details"}
      btn={
        <PrimaryLinkButton buttonText="Customer List" url="/admin/customers" />
      }
    >
      <CustomerDetails />
    </LayoutWithSidebar>
  );
}
export default CustomerDetailsPage;
