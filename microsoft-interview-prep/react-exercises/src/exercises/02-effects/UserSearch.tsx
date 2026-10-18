// Exercise 02 — useEffect: fetching, race conditions, cleanup
//
// THE BUG: searchUsers() has RANDOM latency (200-1500ms). Type "workbooks"
// quickly, letter by letter. A request fires per keystroke, and a slow early
// response can land AFTER a fast later one — clobbering the results for a
// query you're no longer looking at. Watch the console: the last "[api] ...
// resolved" line often isn't your final query.
//
// YOUR JOB:
//   1. Reproduce the bug. Type fast, watch stale results win.
//   2. Fix it with the boolean-flag cleanup pattern: declare `let ignore =
//      false` in the effect, check it before setState, set it true in the
//      cleanup function. Convince yourself WHY this works: React runs the
//      previous effect's cleanup before re-running the effect, so every
//      superseded request gets its flag flipped.
//   3. Better fix: AbortController. Create one per effect run, pass its
//      .signal to searchUsers, call .abort() in cleanup. Catch the rejection
//      and IGNORE AbortError (check err.name) — don't show it as an error.
//      Why is this better than the flag? (The stale request actually stops;
//      with real fetch it frees the network/server, not just the UI.)
//   4. Add proper loading and error states.
//
// INTERVIEW TALKING POINTS:
//   - Cleanup runs before every re-run of the effect AND on unmount.
//   - Why StrictMode mounts effects twice in dev: to surface exactly this
//     kind of missing-cleanup bug.
//   - "You might not need an effect" — but you DO need one here. Know why:
//     synchronizing with an external system (the network).
//   - In production you'd reach for React Query: cache keyed by query string,
//     dedupe, retries, stale-while-revalidate. Server state != UI state.

import { useEffect, useState } from 'react';
import { searchUsers, type User } from '../../lib/api';

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);

  // TODO: add loading / error state (step 4)

  useEffect(() => {
    // BUGGY on purpose: no cleanup, no abort, no stale-response guard.
    searchUsers(query).then((users) => {
      setResults(users);
    });
  }, [query]);

  return (
    <div>
      <h2>02 — User search (race condition)</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type fast: w, wo, wor..."
      />
      <p style={{ opacity: 0.7 }}>
        showing results for: <strong>{query || '(all)'}</strong> — open the console
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
