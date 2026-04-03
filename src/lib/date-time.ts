function parseTimeParts(input: string): {
  hours: number;
  minutes: number;
  seconds: number;
} | null {
  const value = input.trim();

  const timeOnlyMatch = value.match(
    /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?(?:\.\d+)?$/,
  );

  if (timeOnlyMatch) {
    return {
      hours: Number(timeOnlyMatch[1]),
      minutes: Number(timeOnlyMatch[2]),
      seconds: Number(timeOnlyMatch[3] ?? "00"),
    };
  }

  // Keep wall-clock values stable by extracting time components directly
  // from datetime-like strings (e.g. 2026-01-01T12:00:00Z or with offsets).
  const dateTimeMatch = value.match(
    /T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?(?:\.\d+)?(?:Z|[+-][0-2]\d:[0-5]\d)?$/,
  );

  if (dateTimeMatch) {
    return {
      hours: Number(dateTimeMatch[1]),
      minutes: Number(dateTimeMatch[2]),
      seconds: Number(dateTimeMatch[3] ?? "00"),
    };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

export function extractTime(isoString: string): string {
  if (!isoString) return "";

  const parts = parseTimeParts(isoString);
  if (!parts) return "";

  return `${parts.hours.toString().padStart(2, "0")}:${parts.minutes
    .toString()
    .padStart(2, "0")}:${parts.seconds.toString().padStart(2, "0")}`;
}

export function extractTime12Hour(isoString: string): string {
  if (!isoString) return "";

  const parts = parseTimeParts(isoString);
  if (!parts) return "";

  let hours = parts.hours;
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  return `${hours.toString().padStart(2, "0")}:${parts.minutes
    .toString()
    .padStart(2, "0")}:${parts.seconds.toString().padStart(2, "0")} ${ampm}`;
}
