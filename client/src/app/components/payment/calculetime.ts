export function calculateTimeDifference(OrderStartDate: string): string {
  // Convert OrderStartDate string to Date object
  const startDate = new Date(OrderStartDate);

  // Calculate the time difference between now and the OrderStartDate
  const timeDiff = startDate.getTime() - Date.now();
  if (timeDiff <= 0) {
    return "This order is starting late.";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Build the output string
  let output = "";
  if (days > 0) {
    output += `${days} day${days > 1 ? "s" : ""} `;
  }
  output += `${hours} hour${hours === 1 ? "" : "s"}`;

  return `This order starts in ${output}`;
}
