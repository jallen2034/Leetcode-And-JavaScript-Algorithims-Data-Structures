import type { ServiceHealthRow } from "../../../../lib/telemetryData.ts";

const generateSortedRows = (
  sortDirection: "asc" | "desc",
  sortColumn: keyof ServiceHealthRow | null,
  rows: ServiceHealthRow[]
): ServiceHealthRow[]  => {
  const ASCENDING = 1;
  const DESCENDING = -1;

  const directionMultiplier = sortDirection === 'asc' ? ASCENDING : DESCENDING;

  if (sortColumn === null) {
    return rows;
  }

  const rowsCopy: ServiceHealthRow[] = [...rows];

  const sortedRows: ServiceHealthRow[] = rowsCopy.sort((rowA: ServiceHealthRow, rowB: ServiceHealthRow): number => {
    const rowAValue: string | number = rowA[sortColumn];
    const rowBValue: string | number = rowB[sortColumn];

    if (typeof rowAValue === 'number' && typeof rowBValue === 'number') {
      const numericComparison: number = (rowAValue - rowBValue) * directionMultiplier;
      return numericComparison;
    }

    const sortDirectionFactor: number = String(rowAValue).localeCompare(String(rowBValue)) * directionMultiplier;
    return sortDirectionFactor;
  })

  return sortedRows;
}

export {
  generateSortedRows
}