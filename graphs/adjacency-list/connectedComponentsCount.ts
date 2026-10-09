// connectedComponentsCount: return how many separate "islands" of nodes the graph has
// (undirected graph, already given as an adjacency list)

import { type AdjacencyList, check } from './helpers.ts';

// Structy test_00
//
//   Component 1:           Component 2:
//
//   1                          2
//   │                         ╱ ╲
//   0 ─── 8                  3 ─── 4
//   │   ╱
//   5
//
//   (0-5-8 is a triangle)   (2-3-4 is a triangle)
//
const graph: AdjacencyList<number> = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
};

const createListNodesFromAdjList = (graph: AdjacencyList<number>): number[] => {
  const arrOfKeys: number[] = [];

  for (const key in graph) {
    arrOfKeys.push(Number(key));
  }

  return arrOfKeys;
}

// Heads-up: object keys are always strings in JS ("0", "1"...),
// but the neighbours inside the arrays are numbers (8, 1, 5...).
// Watch for that if you loop over the keys and check a Set.
const connectedComponentsCount = (graph: AdjacencyList<number>): number => {
  const keyList: number[] = createListNodesFromAdjList(graph);

  const visited = new Set<number>();
  let count: number = 0;

  const traverseGraphDFSRecursive = (src: number) => {
    if (visited.has(src)) {
      return;
    }

    visited.add(src);

    const adjacentNodes: number[] = graph[src];

    for (let node of adjacentNodes) {
      traverseGraphDFSRecursive(node);
    }
  }

  for (const key of keyList) {
    if (!visited.has(key)) {
      traverseGraphDFSRecursive(key);
      count += 1; // We only ever do a count to tally when we fully navigate 1 component fully to there are no more nodes.
    }
  }

  return count;
};

// ---- tests ----

check('structy test_00', connectedComponentsCount(graph), 2);

// One big component (a long chain with a branch)
//   1 ─ 2 ─ 8 ─ 9
//           │
//       6 ─ 7
check('one big component', connectedComponentsCount({
  1: [2],
  2: [1, 8],
  6: [7],
  9: [8],
  7: [6, 8],
  8: [9, 7, 2],
}), 1);

// The graph from the video: a lone node, a star, and a pair
//   3        4          1 ─ 2
//            │
//        5 ─ 6 ─ 8
//            │
//            7
check('lone node, star, pair', connectedComponentsCount({
  3: [],
  4: [6],
  6: [4, 5, 7, 8],
  8: [6],
  7: [6],
  5: [6],
  1: [2],
  2: [1],
}), 3);

// Empty graph: no nodes at all
check('empty graph', connectedComponentsCount({}), 0);

// Lots of lone nodes (no neighbours still counts as a component!)
//   4 ─ 0 ─ 7     3 ─ 6     1     2     8
check('lots of lone nodes', connectedComponentsCount({
  0: [4, 7],
  1: [],
  2: [],
  3: [6],
  4: [0],
  6: [3],
  7: [0],
  8: [],
}), 5);
