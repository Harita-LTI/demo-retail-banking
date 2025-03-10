import { replace } from "react-router";

export function navigateUser(user: any, navigate: any) {
  if (
    user?.role &&
    (user.role === "BF_ADMIN" || user.role === "BF_CORPORATOR")
  ) {
    navigate("/admin/customers");
  } else if (user?.role && user.role === "BF_CUSTOMER") {
    navigate("/user/dashboard");
  } else {
    console.log("role not found");
  }
}
