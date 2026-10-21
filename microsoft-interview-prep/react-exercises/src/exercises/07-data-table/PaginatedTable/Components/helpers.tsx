import type { ServiceHealthRow } from "../../../../lib/telemetryData.ts";

const generateSortedRows = (
  sortDirection: "asc" | "desc",
  sortColumn: keyof ServiceHealthRow | null,
  rows: ServiceHealthRow[]
): ServiceHealthRow[]  => {
  const ASCENDING = 1;
  const DESCENDING = -1;

  const directionTextComparison = sortDirection === 'asc' ? ASCENDING : DESCENDING;

  if (sortColumn === null) {
    return rows;
  }

  const rowsCopy: ServiceHealthRow[] = [...rows];

  const sortedRows: ServiceHealthRow[] = rowsCopy.sort((rowA: ServiceHealthRow, rowB: ServiceHealthRow): number => {
    const rowAValue: string | number = rowA[sortColumn];
    const rowBValue: string | number = rowB[sortColumn];

    if (typeof rowAValue === 'number' && typeof rowBValue === 'number') {
      return (rowAValue - rowBValue) * directionTextComparison;
    }

    const textComparison: number = String(rowAValue).localeCompare(String(rowBValue)) * directionTextComparison;
    return textComparison;
  })

  return sortedRows;
}

export {
  generateSortedRows
}