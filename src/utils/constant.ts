function formatDateTime(input) {
  const date = new Date(input);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 确保分钟是两位数
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day} ${month} at ${hours}.${minutes} ${period}`;
}

export { formatDateTime };
