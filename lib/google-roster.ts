import type { Assignment, Service, ServiceType } from "@/lib/types";

type CsvRow = Record<string, string>;

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
}

function parseCsv(csv: string): CsvRow[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const headers = splitCsvLine(lines[0] ?? "").map((header) => header.toLowerCase().trim());

  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    return headers.reduce<CsvRow>((row, header, index) => {
      row[header] = cells[index] ?? "";
      return row;
    }, {});
  });
}

function parsePeople(value: string) {
  return value
    .split(/[;,]/)
    .map((person) => person.trim())
    .filter(Boolean);
}

export async function getGoogleRosterServices(): Promise<Service[]> {
  const rosterUrl = process.env.GOOGLE_ROSTER_CSV_URL;
  if (!rosterUrl) return [];

  const response = await fetch(rosterUrl, {
    next: { revalidate: 300 }
  });

  if (!response.ok) return [];

  const rows = parseCsv(await response.text());
  const services = new Map<string, Service>();

  for (const row of rows) {
    const serviceDate = row.service_date || row.date;
    const serviceType = row.service_type as ServiceType;
    const role = row.role;
    const people = parsePeople(row.people);

    if (!serviceDate || !serviceType || !role || people.length === 0) continue;
    if (serviceType !== "saturday" && serviceType !== "youth") continue;

    const key = `${serviceDate}:${serviceType}:${row.title}`;
    const existing = services.get(key);
    const service =
      existing ??
      ({
        id: key,
        service_type: serviceType,
        service_date: serviceDate,
        title: row.title || (serviceType === "saturday" ? "Ibadah PHD" : "Ibadah Minggu Sore"),
        theme: row.theme,
        notes: row.notes,
        assignments: []
      } satisfies Service);

    const assignment = service.assignments.find((item: Assignment) => item.role === role);
    if (assignment) {
      assignment.people.push(...people);
    } else {
      service.assignments.push({ role, people });
    }

    services.set(key, service);
  }

  return Array.from(services.values()).sort((a, b) => new Date(a.service_date).getTime() - new Date(b.service_date).getTime());
}
