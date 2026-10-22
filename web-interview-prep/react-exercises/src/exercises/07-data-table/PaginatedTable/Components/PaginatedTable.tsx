import { ROWS, type ServiceHealthRow } from "../../../../lib/telemetryData.ts";
import { useState } from "react";
import { generateSortedRows } from "./helpers.tsx";
import type {TableCol} from "../types.ts";
import { useTablePaginate, type UseTablePaginateReturn } from "../Hooks/useTablePaginate.tsx";
import { SimplePaginate } from "./SimplePagination/SimplePaginate.tsx";

export default function PaginatedTable () {
  const [sortColumn, setSortColumn] = useState<keyof ServiceHealthRow | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleHeaderClick = (column: keyof ServiceHealthRow) => {
    if (column === sortColumn) {
      setSortDirection((sortDirection: "asc" | "desc") => {
        return sortDirection === 'asc' ? 'desc' : 'asc';
      })

      return;
    }

    setSortColumn(column);
    setSortDirection('asc');
  }

  const sortedRows: ServiceHealthRow[] = generateSortedRows(sortDirection, sortColumn, ROWS);

  const paginationConfig = { items: sortedRows, itemsPerPage: 15 }

  const {
    totalPages,
    currentPage,
    paginatedItems,
    setCurrentPage,
    showPaginationControls
  }: UseTablePaginateReturn<ServiceHealthRow> = useTablePaginate(paginationConfig);

  const COLUMNS: TableCol[] = [
    { key: 'service', label: 'Service' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
    { key: 'p95LatencyMs', label: 'p95 (ms)' },
    { key: 'errorRatePct', label: 'Error %' },
    { key: 'requestsPerMin', label: 'Req/min' },
  ]

  return (
    <>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
        {COLUMNS.map((column: TableCol) => {
          const isActive: boolean = column.key === sortColumn;
          const sortDirLabel = sortDirection === 'asc' ? 'ascending' : 'descending';
          const sortDirectionButtonLabel = sortDirection === 'asc' ? ' ▲' : ' ▼'

          return (
            <th
              key={column.key}
              scope="col"
              aria-sort={isActive ? sortDirLabel : undefined}
            >
              <button onClick={() => handleHeaderClick(column.key)}>
                {column.label}{isActive ? sortDirectionButtonLabel : ''}
              </button>
            </th>
          );
        })}
        </thead>
        <tbody>

        {paginatedItems.map((row: ServiceHealthRow) => (
          <tr key={row.id}>
            <td>{row.service}</td>
            <td>{row.region}</td>
            <td>{row.status}</td>
            <td style={{ textAlign: 'right' }}>{row.p95LatencyMs}</td>
            <td style={{ textAlign: 'right' }}>{row.errorRatePct}</td>
            <td style={{ textAlign: 'right' }}>{row.requestsPerMin.toLocaleString()}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {showPaginationControls &&
        <SimplePaginate
          {...{
            totalPages,
            currentPage,
            setCurrentPage
          }}
        />
      }
    </>
  );
}