// largestComponent: return the SIZE (number of nodes) of the biggest island
// (undirected graph, already given as an adjacency list)

import { type AdjacencyList, check } from './helpers.ts';

// Structy test_00
//
//   Component 1 (4 nodes):   Component 2 (3 nodes):
//
//         5                     4 ─── 2
//         │ ╲                    ╲   ╱
//   1 ─── 0 ─── 8                  3
//
//   (0-5-8 is a triangle)    (2-3-4 is a triangle)
//
// Note: this time the neighbours are STRINGS ('8', '1'...), same as the keys,
// so no Number() conversion needed. Unlike last problem!
const graph: AdjacencyList = {
  0: ['8', '1', '5'],
  1: ['0'],
  5: ['0', '8'],
  8: ['0', '5'],
  2: ['3', '4'],
  3: ['2', '4'],
  4: ['3', '2'],
};

const findListNodes = (graph: AdjacencyList): string[] => {
  const listOfNodes: string[] = [];

  for (const key in graph) {
    listOfNodes.push(key);
  }

  return listOfNodes;
}

const largestComponent = (graph: AdjacencyList): number => {
  const listOfNode: string[] = findListNodes(graph);

  const visited = new Set<string>();

  let largestGroupFound: number = 0

  const DFSTraverseGraphRecursive = (node: string, traverseCount: number) => {
    if (visited.has(node)) {
      return traverseCount;
    }

    const adjacentNodes: string[] = graph[node];

    visited.add(node);
    traverseCount += 1;

    for (let node of adjacentNodes) {
      traverseCount = DFSTraverseGraphRecursive(node, traverseCount);
    }

    return traverseCount;
  }

  for (const node of listOfNode) {
    if (!visited.has(node)) {
      const nodeCount: number | undefined = DFSTraverseGraphRecursive(node, 0);

      if (nodeCount && nodeCount > largestGroupFound) {
        largestGroupFound = nodeCount;
      }
    }
  }

  return largestGroupFound;
};

// ---- tests ----

check('structy test_00', largestComponent(graph), 4);

// One big component: everything is connected
//   1 ─ 2 ─ 8 ─ 9
//           │
//       6 ─ 7
check('one big component', largestComponent({
  1: ['2'],
  2: ['1', '8'],
  6: ['7'],
  9: ['8'],
  7: ['6', '8'],
  8: ['9', '7', '2'],
}), 6);

// A lone node, a star, and a pair
//   3        4          1 ─ 2
//            │
//        5 ─ 6 ─ 8
//            │
//            7
check('lone node, star, pair', largestComponent({
  3: [],
  4: ['6'],
  6: ['4', '5', '7', '8'],
  8: ['6'],
  7: ['6'],
  5: ['6'],
  1: ['2'],
  2: ['1'],
}), 5);

// Empty graph
check('empty graph', largestComponent({}), 0);

// Mostly lone nodes
//   4 ─ 0 ─ 7     3 ─ 6     1     2     8
check('mostly lone nodes', largestComponent({
  0: ['4', '7'],
  1: [],
  2: [],
  3: ['6'],
  4: ['0'],
  6: ['3'],
  7: ['0'],
  8: [],
}), 3);

// EDGE: every node alone, so the largest island is just 1
check('every node alone', largestComponent({
  0: [],
  1: [],
  2: [],
}), 1);

// EDGE: the biggest component is the LAST one found, not the first
//   0 ─ 1          2 ─ 3 ─ 4 ─ 5
check('biggest found last', largestComponent({
  0: ['1'],
  1: ['0'],
  2: ['3'],
  3: ['2', '4'],
  4: ['3', '5'],
  5: ['4'],
}), 4);

// EDGE: keys that aren't numbers
//   a ─ b ─ c      x ─ y
check('non-numeric keys', largestComponent({
  a: ['b'],
  b: ['a', 'c'],
  c: ['b'],
  x: ['y'],
  y: ['x'],
}), 3);
