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
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
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
  const month = monthNames[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  let hours = dateObj.getUTCHours();
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
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
