import bcrypt from "bcryptjs";
// 16-01-2025 11:38:15
export function convertStingToDate(date: string) {
  const dateObj = new Date(date);
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// 23 Jan 2025, 11:30AM
export function dateToDDMonYYYYTime(date: string) {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strHours = String(hours).padStart(2, "0");

  return `${day} ${month} ${year}, ${strHours}:${minutes} ${ampm}`;
}

export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function convertDateFormat(dateString: string) {
  // Split the input date string by the hyphen
  const [year, month, day] = dateString.split("-");

  // Return the date in the desired format
  return `${day}/${month}/${year}`;
}

export function encrypt(password: string) {
  // Generate salt and hash the password
  const salt = "$2a$10$vpDxyCQL8SmhLaoqFHmxJu"; //bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

export function generateCustomerId(id: number) {
  const prefix = "0032";
  const serialNumber = prefix + id.toString().padStart(7, "0");
  return serialNumber;
}

export function getBgClass(status: string) {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "BLOCKED":
      return "danger";
    case "CLOSED":
      return "secondary";
    default:
      return "success";
  }
}

export function formatDate(dateTime: string) {
  const date = new Date(dateTime);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function sortAccountsByStatus(accounts: any[]) {
  const statusOrder: any = {
    ACTIVE: 1,
    BLOCKED: 2,
    CLOSED: 3,
  };

  return accounts.sort(
    (a: any, b: any) =>
      statusOrder[a.accountStatus] - statusOrder[b.accountStatus]
  );
}

export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};