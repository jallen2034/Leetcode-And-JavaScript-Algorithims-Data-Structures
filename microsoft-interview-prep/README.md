# Microsoft technical screen prep

Exercises for the frontend screen (John's team — Azure Workbooks). Everything is
scaffold + failing tests / reproducible bugs: **no solutions anywhere**, you write them.

## Suggested order for today

### 1. JS fundamentals (`js-fundamentals/`) — run with `node <file>.ts`

Tests start out FAILING; make them pass. Each file header has the problem
statement and the interview talking points to rehearse out loud.

| File | Topic | Reading it pairs with |
|---|---|---|
| `debounce.ts` | write debounce from memory | CSS-Tricks debounce/throttle article |
| `throttle.ts` | throttle + know the difference cold | same |
| `closures.ts` | createCounter + the var loop bug | MDN Closures |
| `eventLoopOrder.ts` | predict-the-output quiz (microtasks vs tasks) | Jake Archibald's event loop post |
| `promiseAll.ts` | implement Promise.all | MDN Using promises |

The quiz files (`eventLoopOrder`, `closures` part 2) won't grade — or spoil —
until you've filled in your prediction.

### 2. React exercises (`react-exercises/`)

```sh
cd react-exercises
npm install   # already done if node_modules exists
npm run dev
```

Four exercises behind the tab bar, each with a reproducible bug and TODO steps
in the file header:

1. **Re-renders** (`src/exercises/01-rerenders/`) — laggy input caused by an
   expensive child; fix with memo → useMemo → useCallback, in that order, and
   understand why memo alone does nothing. (Comeau's "Why React Re-Renders",
   Dodds' "fix the slow render first".)
2. **useEffect + fetch** (`src/exercises/02-effects/`) — a real race condition
   you can watch happen in the console; fix with cleanup flag, then
   AbortController. (React docs "Synchronizing with Effects".)
3. **List keys** (`src/exercises/03-lists/`) — index-as-key corrupting input
   state on prepend/sort/remove. (React docs "Rendering Lists".)
4. **Debounced search** (`src/exercises/04-debounced-search/`) — write
   `useDebouncedValue`; capstone combining 1–3 with your debounce.

### 3. If time remains

- Re-write `debounce` from a blank file, no peeking at your earlier attempt.
- Skim: Azure Workbooks overview + Application Insights overview (Microsoft
  Learn) — know what the product IS before the call.
- Rehearse the talking points in each file header — saying them out loud once
  is worth three silent reads.

## Topics deliberately left as reading only (no exercise)

React Query / server state, virtualization (react-window), web workers,
accessibility, `this` binding, TS generics/narrowing — skim the tier list
articles for these; low odds they ask you to code them in a first screen.
