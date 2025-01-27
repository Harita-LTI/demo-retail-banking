const errorList: any = {
  "customer-details-get": "Error loading customer details.",
  "customer-account-get": "Error loading cutomer accounts.",
  "customer-no-account":
    "No account found. You can create one using Create Account button.",
  "customer-list-get": "Error loading customer list.",
};

export default function showError(errorId: any) {
  const defaultError = "An error has occured. Please try again.";
  return errorList[errorId] ? errorList[errorId] : defaultError;
}
