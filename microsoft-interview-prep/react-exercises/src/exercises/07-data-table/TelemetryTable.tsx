// Exercise 07 — Sortable, filterable, paginated data table.
// The generic machine-coding staple ("address book with pagination" is a known
// Microsoft prompt) dressed in this team's actual domain: service health rows.
// If any exercise here resembles the real onsite task, it's this one.
//
// Target: sort + filter in ~45 min, pagination +15.
//
// REQUIREMENTS:
//   1. Render ROWS in a semantic <table> — thead/th with scope="col", tbody.
//      Stable keys. (Already half-done below; keep it honest as you build.)
//   2. Click a column header to sort by it; click again to flip direction.
//      Sort state is ONE object: { column, direction } — not six booleans.
//      Numbers sort numerically, strings with localeCompare.
//   3. Text filter input: case-insensitive match on service OR region.
//   4. Pagination: 10 rows per page, Prev/Next + "page X of Y", and the two
//      interactions MUST compose: filtering while on page 4 of 5 must not
//      strand you on a page that no longer exists.
//   5. A11y: aria-sort on the sorted th, the header is a <button> inside the
//      th (keyboard operable for free), label the filter input.
//
// THE CENTRAL DISCIPLINE (this is what they're actually testing):
//   State is ONLY: raw-ish inputs — sort {column, direction}, filterText, page.
//   Everything else DERIVES in render:  filtered → sorted → paged.
//   If you ever setState a sorted/filtered COPY of the rows, stop — that's
//   the "two sources of truth" bug, and it's this problem's rabbit hole the
//   way symptom-patching was sortedSquares'.
//   Pipeline order matters too: why filter BEFORE sort? (Cheaper, and sort
//   is the expensive step.) Say it out loud.
//
// STRETCHES:
//   6. useMemo the filtered+sorted derivation; then explain when it's
//      premature (47 rows: it is; 50k rows: it isn't).
//   7. Debounce the filter input with YOUR useDebouncedValue from ex 04.
//   8. Name-drop question to be ready for: "what changes at 100k rows?"
//      (virtualization — react-window; you don't need to code it, you need
//      to know the word and why: DOM nodes, not data, are the bottleneck.)
//
// INTERVIEW TALKING POINTS:
//   - Derived state over stored state — the React docs' "avoid redundant
//     state" rule, and the single most common data-table mistake.
//   - toSorted() vs sort(): sort MUTATES; mutating a useMemo input in place
//     is a classic invisible bug. (toSorted copies; or spread first.)
//   - Where does this break at scale, and in what order? (sort cost →
//     render cost → DOM node count.)

import { useState } from 'react';
import { ROWS, type ServiceHealthRow } from '../../lib/telemetryData';

type SortColumn = keyof Pick<
  ServiceHealthRow,
  'service' | 'region' | 'status' | 'p95LatencyMs' | 'errorRatePct' | 'requestsPerMin'
>;

type SortState = { column: SortColumn; direction: 'asc' | 'desc' } | null;

const PAGE_SIZE = 10;

export default function TelemetryTable() {
  const [sort, setSort] = useState<SortState>(null);
  const [filterText, setFilterText] = useState('');
  const [page, setPage] = useState(0);

  void sort; void setSort; void filterText; void setFilterText; void page; void setPage; // placeholders — delete as you wire each up

  // TODO (steps 2-4): derive, in order: filtered → sorted → paged.
  // No new useState calls should appear below this line. None.
  const visibleRows = ROWS.slice(0, PAGE_SIZE); // placeholder — replace with the pipeline

  // TODO (step 2): handleHeaderClick(column) — same column flips direction,
  // new column starts 'asc'.

  return (
    <div>
      <h2>07 — Service health table</h2>

      {/* TODO (step 3): filter input (labelled!), wired to filterText */}
      {/* TODO (step 7, stretch): debounce it with useDebouncedValue */}

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {/* TODO (step 2): make headers clickable sort buttons; show ▲/▼
                on the active one; aria-sort on the th. */}
            <th scope="col">Service</th>
            <th scope="col">Region</th>
            <th scope="col">Status</th>
            <th scope="col">p95 (ms)</th>
            <th scope="col">Error %</th>
            <th scope="col">Req/min</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
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

      {/* TODO (step 4): Prev / Next + "page X of Y"; clamp page when the
          filter shrinks the result set. */}
    </div>
  );
}