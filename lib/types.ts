export type Repository = {
  name: string;
  url?: string;
  language?: string;
  stars?: number;
  forks?: number;
  description: string;
  developmentPeriod: string;
  created_at?: string;
  updated_at?: string;
  html_url?: string;
  stargazers_count?: number;
  forks_count?: number;
};

export type LanguageCounts = Record<string, number>;
