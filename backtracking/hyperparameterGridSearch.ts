// Backtracking question I bombed in a recent tech interview 💀
// This is LC 17 wearing a work badge: slots = hyperparameter names,
// options = each one's candidate values, result = one choice per slot.
// Do letterCombinations.ts FIRST, then this is a re-skin, not a new problem.
//
// ---- Pattern drill (~60 sec) ----
//   1. Say the mapping out loud: digit→param name, letters→candidate values,
//      "ad"→{ lr: 0.1, batch: 32 }. Literally the same recursion skeleton.
//   2. Part 1 base case: all param names consumed → push a COPY of the config.
//      Why a copy? (What happens to the results array if you push the shared
//      object you keep mutating?)
//   3. Part 2 is the same enumeration with an ORDER contract: first key
//      changes slowest = the OUTERMOST loop/recursion level. Which part of
//      your Part-1 code already guarantees that, and what test proves it?
//   4. Part 3 (generator): same skeleton, `yield` where Part 1 pushed.
//      Know the syntax cold: function* / yield / yield* for the recursion.
//      Why does this save memory — what never gets built?
//   5. Edge cases to narrate BEFORE coding (this is where screens are won):
//      {} → [{}] (one empty config — the "empty product" convention),
//      any param with [] options → [] (no valid configs at all).

import {check, checkUnordered} from './helpers.ts';

type Value = string | number;
type ParamGrid = Record<string, Value[]>;
type Config = Record<string, Value>;

// ============================================================================
// PART 1: object input — return ALL configurations (any order)
// ============================================================================

// Going to try implement the brute force method here I bombed.
function generateCombinations(params: ParamGrid): Config[] {
  console.log(params);



  return [];
}

// ============================================================================
// PART 2: keys + values input, ORDERED rows — first key changes slowest,
// last key changes fastest. No keys → one empty row. Any empty values → no rows.
// ============================================================================

function expandAttributeCombinations(keys: string[], values: Value[][]): Value[][] {
  // your code here
  return [];
}

// ============================================================================
// PART 3: generator — yield configurations ONE AT A TIME (same set as Part 1)
// ============================================================================

function* generateCombinationsLazy(params: ParamGrid): Generator<Config> {

}

// ---- tests: Part 1 ----

checkUnordered('P1: 2x2x2 grid → 8 configs',
  generateCombinations({lr: [0.1, 0.01], batch: [32, 64], optimizer: ['adam', 'sgd']}),
  [
    {lr: 0.1, batch: 32, optimizer: 'adam'},
    {lr: 0.1, batch: 32, optimizer: 'sgd'},
    {lr: 0.1, batch: 64, optimizer: 'adam'},
    {lr: 0.1, batch: 64, optimizer: 'sgd'},
    {lr: 0.01, batch: 32, optimizer: 'adam'},
    {lr: 0.01, batch: 32, optimizer: 'sgd'},
    {lr: 0.01, batch: 64, optimizer: 'adam'},
    {lr: 0.01, batch: 64, optimizer: 'sgd'},
  ]);
checkUnordered('P1: one param empty → no configs',
  generateCombinations({lr: [0.1, 0.01], batch: []}), []);
checkUnordered('P1: empty grid → one empty config',
  generateCombinations({}), [{}]);

// ---- tests: Part 2 (order is part of the contract — exact compare) ----

// check('P2: first key slowest, last fastest',
//   expandAttributeCombinations(['color', 'size'], [['red', 'blue'], ['S', 'M', 'L']]),
//   [
//     ['red', 'S'], ['red', 'M'], ['red', 'L'],
//     ['blue', 'S'], ['blue', 'M'], ['blue', 'L'],
//   ]);
// check('P2: singleton first key',
//   expandAttributeCombinations(['region', 'color', 'size'], [['US'], ['red', 'blue'], ['S', 'M']]),
//   [
//     ['US', 'red', 'S'], ['US', 'red', 'M'],
//     ['US', 'blue', 'S'], ['US', 'blue', 'M'],
//   ]);
// check('P2: no keys → one empty row', expandAttributeCombinations([], []), [[]]);
// check('P2: an empty values list → no rows',
//   expandAttributeCombinations(['a', 'b'], [['x'], []]), []);
//
// // ---- tests: Part 3 (laziness is the point) ----
//
// const gen = generateCombinationsLazy({ lr: [0.1, 0.01], batch: [32, 64] });
// const first = gen.next();
// const second = gen.next();
// check('P3: yields a valid first config without building the list',
//   first.done === false && first.value !== undefined && 'lr' in (first.value ?? {}), true);
// check('P3: second config differs from first',
//   JSON.stringify(first.value) !== JSON.stringify(second.value), true);
// const rest = [...gen];
// check('P3: total configs = 4', 2 + rest.length, 4);
// checkUnordered('P3: full drain matches Part 1',
//   [first.value, second.value, ...rest],
//   generateCombinations({ lr: [0.1, 0.01], batch: [32, 64] }));
