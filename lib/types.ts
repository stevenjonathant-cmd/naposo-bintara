export type ServiceType = "saturday" | "youth";

export type Assignment = {
  role: string;
  people: string[];
};

export type Service = {
  id: string;
  service_type: ServiceType;
  service_date: string;
  title: string;
  theme?: string;
  notes?: string;
  assignments: Assignment[];
};

export type Event = {
  id: string;
  title: string;
  event_date: string;
  location: string;
  description: string;
  status: "published" | "draft";
};

export type Song = {
  id: string;
  title: string;
  category: string;
  song_number?: string;
  tags: string[];
  image_urls: string[];
};

export type FinanceReport = {
  id: string;
  title: string;
  month: number;
  year: number;
  notes?: string;
  file_url: string;
};

export type WeeklyAgendaItem = {
  id: string;
  weekday: "Wednesday" | "Friday" | "Saturday" | "Sunday";
  time: string;
  title: string;
  description: string;
  location: string;
  accent: "teal" | "amber" | "rose" | "blue";
};

export type Profile = {
  id: string;
  display_name: string;
  is_approved: boolean;
  is_admin: boolean;
  is_finance: boolean;
};
