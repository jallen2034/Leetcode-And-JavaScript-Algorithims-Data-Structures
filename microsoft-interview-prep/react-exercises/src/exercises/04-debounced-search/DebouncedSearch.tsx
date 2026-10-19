// Exercise 04 — Debounce in React: the useDebouncedValue hook
//
// This is exercise 02's search box, but done right: don't even FIRE a request
// per keystroke — wait until the user pauses typing. This is the capstone:
// it combines your debounce knowledge (js-fundamentals), useEffect cleanup,
// and the race-condition handling from exercise 02.
//
// YOUR JOB:
//   1. Implement useDebouncedValue below. Shape:
//        - useState holds the debounced value (initialised to `value`)
//        - useEffect schedules setTimeout(update, delay) when `value` changes
//        - the effect's CLEANUP clears the timeout — that's the "reset the
//          timer on every new call" half of debounce, for free from React.
//   2. Wire it up: search with `debouncedQuery` instead of `query` (fix the
//      marked line in the component).
//   3. Verify: type "workbooks" quickly — the console should show roughly ONE
//      api call after you stop, not one per keystroke.
//   4. Carry over your exercise-02 fix (abort/ignore stale) — debounce makes
//      races RARE, not impossible. Why not impossible? (Two requests can
//      still overlap if you pause twice within one response's latency.)
//
// INTERVIEW TALKING POINTS:
//   - Why a hook instead of debounce(handleChange)? The debounced function
//     would be recreated every render unless memoised, and debouncing the VALUE
//     keeps the input itself perfectly responsive (controlled input updates
//     immediately; only the expensive downstream work is delayed).
//   - Debounce the value, abort the request: the two tools solve different
//     halves (request volume vs. response ordering).

import { useEffect, useState } from 'react';
import { searchUsers, type User } from '../../lib/api';

export function useDebouncedValue<T>(value: T, delay: number): T {
  // TODO: implement me (see step 1 above)
  //
  // Placeholder so the app runs — this returns the value UN-debounced.
  // (The `void delay` line just keeps TypeScript quiet about the unused
  // param until you use it for real — delete it with the placeholder.)
  void delay;
  return value;
}

export default function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const debouncedQuery = useDebouncedValue(query, 400);

  useEffect(() => {
    // TODO (step 2): this still fires per keystroke — search with the
    // debounced value instead.
    // TODO (step 4): then make this effect race-proof like exercise 02.
    searchUsers(query).then(setResults);
  }, [query]);

  return (
    <div>
      <h2>04 — Debounced search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type quickly, watch the console"
      />
      <p style={{ opacity: 0.7 }}>
        live: <strong>{query || '(empty)'}</strong> — debounced:{' '}
        <strong>{debouncedQuery || '(empty)'}</strong>
      </p>
      <ul>
        {results.map((u) => (
          <li key={u.id}>
            {u.name} — {u.team}
          </li>
        ))}
      </ul>
    </div>
  );
}
