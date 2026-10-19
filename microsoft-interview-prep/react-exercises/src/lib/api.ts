// Infrastructure — a fake search API with realistic, RANDOM latency.
// The random latency is the whole point: it makes fetch race conditions
// reproducible. Typing "ab" fires a request for "a" and one for "ab", and
// the "a" response can easily come back LAST and clobber the right answer.
//
// Supports AbortController like real fetch: pass a signal and the promise
// rejects with a DOMException named 'AbortError' when aborted.

export type User = {
  id: number;
  name: string;
  team: string;
};

const USERS: User[] = [
  { id: 1, name: 'Ada Lovelace', team: 'Workbooks' },
  { id: 2, name: 'Alan Turing', team: 'Workbooks' },
  { id: 3, name: 'Grace Hopper', team: 'App Insights' },
  { id: 4, name: 'Annie Easley', team: 'App Insights' },
  { id: 5, name: 'Katherine Johnson', team: 'Monitor' },
  { id: 6, name: 'Margaret Hamilton', team: 'Monitor' },
  { id: 7, name: 'Barbara Liskov', team: 'Workbooks' },
  { id: 8, name: 'Frances Allen', team: 'App Insights' },
];

export function searchUsers(query: string, signal?: AbortSignal): Promise<User[]> {
  const latency = 200 + Math.random() * 1500;

  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const timer = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const results = q === ''
        ? USERS
        : USERS.filter(
            (u) => u.name.toLowerCase().includes(q) || u.team.toLowerCase().includes(q)
          );
      console.log(`[api] "${query}" resolved after ${Math.round(latency)}ms`);
      resolve(results);
    }, latency);

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      console.log(`[api] "${query}" aborted`);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}
