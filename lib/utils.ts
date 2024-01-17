import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

/**
 * Generates initials from a given string to be used as an avatar fallback.
 *
 * @param {string} str - The input string from which initials will be generated.
 * @returns {string} The generated initials.
 *
 * @example
 * // Returns "JD" for "John Doe"
 * const initials = getInitials("John Doe");
 */
export function getInitials(str: string): string {
  const matches = str?.match(/\b(\w)/g);
  return matches?.join("") || "";
}

export async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) return undefined;
  return res.json();
}
