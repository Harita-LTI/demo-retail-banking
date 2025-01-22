import { replace } from "react-router";

export function navigateUser(user: any, navigate: any) {
  if (user?.role && user.role === "BF_ADMIN") {
    navigate("/admin/customers");
  } else if (user?.role && user.role !== "BF_ADMIN") {
    navigate("/user/dashboard");
  } else {
    console.log("role not found");
  }
}
