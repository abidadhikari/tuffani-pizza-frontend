export function extractTime(isoString: string): string {
  console.log("Extracting time from ISO string:", isoString);
  return new Date(isoString).toISOString().substring(11, 19);
}

export function extractTime12Hour(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
}
