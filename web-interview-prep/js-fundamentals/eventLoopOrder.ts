// event loop order (predict-the-output quiz — self-checking)
//
// Jake Archibald's "Tasks, microtasks, queues and schedules" in exercise form.
//
// HOW THIS WORKS: read the code inside runQuiz() below WITHOUT running it,
// and fill in the `prediction` array with the labels in the order you think
// they will log. Then run the file — it compares your prediction to reality.
//
// The rules to reason with:
//   1. Synchronous code runs to completion first.
//   2. Then the ENTIRE microtask queue drains (promise .then callbacks,
//      queueMicrotask, await continuations).
//   3. Then ONE macrotask runs (setTimeout/setInterval callbacks), and after
//      it, the microtask queue drains again. Repeat.
//
// Interview talking point: why does `await` split a function in two? The code
// after an await is effectively a .then callback — a microtask.

import { check } from './helpers.ts';

// TODO: fill in your prediction BEFORE running. The labels are the strings
// passed to log() below, e.g. 'start', 'timeout 1', 'promise 1', ...
const prediction: string[] = [
  // 'start',
  // ...
];

// ---- the quiz code (do not modify, just predict) ----

const actual: string[] = [];
const log = (label: string) => actual.push(label);

const runQuiz = async () => {
  log('start');

  setTimeout(() => {
    log('timeout 1');
    Promise.resolve().then(() => log('promise inside timeout'));
  }, 0);

  Promise.resolve()
    .then(() => log('promise 1'))
    .then(() => log('promise 2'));

  setTimeout(() => log('timeout 2'), 0);

  await Promise.resolve();
  log('after await');

  log('end of runQuiz');
};

runQuiz();
log('sync after runQuiz()');

// ---- grading (runs after everything has flushed) ----

setTimeout(() => {
  if (prediction.length === 0) {
    console.log('Fill in the `prediction` array first — no spoilers until you commit to an answer.');
    return;
  }
  check('your prediction', prediction, actual);
  if (JSON.stringify(prediction) !== JSON.stringify(actual)) {
    console.log('\nWalk through WHY each line landed where it did before peeking again.');
  }
}, 50);
