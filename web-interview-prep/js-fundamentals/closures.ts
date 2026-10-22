// closures (two classic exercises)
//
// Part 1 — createCounter: the canonical "do you get closures" question.
// Write a function, createCounter, that takes a starting number and returns
// an object with three methods: increment(), decrement(), and value().
// The count must be PRIVATE — no property on the returned object, no global.
// Each counter returned by createCounter must be independent.
//
// Part 2 — the var loop bug: predict, then fix.
//
// Interview talking points:
//   - A closure is a function bundled with its lexical environment — it keeps
//     the variables it references alive after the outer function returns.
//   - This is exactly what bites you in React as "stale closures": an effect
//     or callback captures an old render's state value.

import { check, sleep } from './helpers.ts';

// ---- Part 1: createCounter ----

type Counter = {
  increment: () => number;
  decrement: () => number;
  value: () => number;
};

export function createCounter(start: number): Counter {
  let count: number| null = start;

  if (start) {
    count = start;
  }

  return {
    increment: () => {
      if (count == null) {
        throw new Error("You need to provide the counter with a valid init value first!");
      }

      count = count + 1;

      return count
    },
    decrement: () => {
      if (count == null) {
        throw new Error("You need to provide the counter with a valid init value first!");
      }

      count = count - 1;

      return count;
    },
    value: () => {
      if (count == null) {
        throw new Error("You need to provide the counter with a valid init value first!");
      }

      return count;
    }
  };
}

// ---- Part 2: the var loop bug ----
//
// Without running it: what does brokenLoop() collect? Fill in your prediction,
// then fix fixedLoop() so it collects [0, 1, 2]. There are at least two fixes
// (block scoping; or capturing the value per-iteration another way) — know both.

// TODO: your prediction for brokenLoop's output:
const brokenLoopPrediction: number[] = [
  3,3,3
];

const brokenLoop = async (): Promise<number[]> => {
  const collected: number[] = [];

  for (var i = 0; i < 3; i++) {
    setTimeout(() => collected.push(i), 10);
  }

  await sleep(30);
  return collected;
};

const fixedLoop = async (): Promise<number[]> => {
  const collected: number[] = [];
  // TODO: rewrite the loop so this returns [0, 1, 2]
  for (var i = 0; i < 3; i++) {
    const current = i;
    setTimeout(() => collected.push(current), 10);
  }

  await sleep(30);
  return collected;
};

// ---- tests ----

const main = async () => {
  const counterA = createCounter(5);
  const counterB = createCounter(100);

  check('counter starts at start value', counterA.value(), 5);
  counterA.increment();
  counterA.increment();
  check('increment returns the new value', counterA.increment(), 8);
  counterA.decrement();
  check('decrement works', counterA.value(), 7);


  check('counters are independent', counterB.value(), 100);
  check('no leaked count property', 'count' in counterA, false);

  if (brokenLoopPrediction.length === 0) {
    // (fixedLoop isn't graded yet either — its failure output would spoil the prediction)
    console.log('SKIP loop exercises: fill in brokenLoopPrediction first — no spoilers until you commit.');
  } else {
    check('your brokenLoop prediction', brokenLoopPrediction, await brokenLoop());
    check('fixedLoop collects [0, 1, 2]', await fixedLoop(), [0, 1, 2]);
  }
};

main();
