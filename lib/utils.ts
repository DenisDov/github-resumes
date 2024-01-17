import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LanguageCounts, Repository } from "@/lib/types";

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

export async function fetchData(url: string) {
  const res = await fetch(url);
  if (!res.ok) return undefined;
  return res.json();
}

export async function getLanguages(repositories: Repository[]) {
  const languages = repositories.map((repo) => repo.language).filter(Boolean);

  const languageCounts: LanguageCounts = languages.reduce((acc, curr) => {
    if (curr !== undefined) {
      acc[curr] = (acc[curr] ?? 0) + 1;
    }
    return acc;
  }, {} as LanguageCounts);

  // Convert counts to percentages and create an array of objects
  const languageWithPercentage = Object.entries(languageCounts).map(
    ([language, count]) => ({
      name: language,
      percentage: ((count / languages.length) * 100).toFixed(0),
    })
  );

  return languageWithPercentage;
}

export async function getRepoDetails(repositories: Repository[]) {
  const repositoryInfo = repositories.map((repo) => {
    const creationDate = repo.created_at
      ? new Date(repo.created_at).getFullYear()
      : undefined;
    const lastCommitDate = repo.updated_at
      ? new Date(repo.updated_at).getFullYear()
      : undefined;
    const developmentPeriod =
      creationDate === lastCommitDate
        ? `${creationDate}`
        : `${creationDate} – ${lastCommitDate}`;
    return {
      name: repo.name,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      description: repo.description || "No description available.",
      developmentPeriod,
    };
  });

  return repositoryInfo;
}
