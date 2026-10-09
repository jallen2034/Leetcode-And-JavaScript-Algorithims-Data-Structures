// hasPath on a DIRECTED graph (the one from the video)
//
//   f → g → h
//   ↓ ↗
//   i ← j
//   ↓
//   k

import { type AdjacencyList, check } from './helpers.ts';

const graph: AdjacencyList = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

const hasPathDFSIterative = (graph: AdjacencyList, src: string, dst: string): boolean => {
  const stack: string[] = [src];
  const traversedNodes: any[] = [];

  while (stack.length > 0) {
    const curr: string | undefined = stack.pop();

    traversedNodes.push(curr);

    if (curr) {
      const adjacentNodesToCurr: string[] = graph[curr];

      for (const node of adjacentNodesToCurr) {
        stack.push(node);
      }
    }
  }

  return traversedNodes.includes(dst);
};

const hasPathBFS = (graph: AdjacencyList, src: string, dst: string): boolean => {
  const queue: string[] = [src];
  const traversedNodes = new Set<string>([ src ]);

  while (queue.length > 0) {
    const curr = queue.shift();

    if (curr === undefined) {
      continue;
    }

    if (curr === dst) {
      return true;
    }

    const adjacentNodesToCurr: string[] = graph[curr];

    for (const node of adjacentNodesToCurr) {
      // Don't double back and traverse/add nodes to the queue we've already visited in our traversal.
      if (!traversedNodes.has(node)) {
        traversedNodes.add(node);
        queue.push(node);
      }
    }
  }

  return false;
}

// ---- tests ----

check('f → k', hasPathBFS(graph, 'f', 'k'), true);
check('j → h', hasPathBFS(graph, 'j', 'h'), true);
check('h → h', hasPathBFS(graph, 'h', 'h'), true);
check('j → f', hasPathBFS(graph, 'j', 'f'), false);
check('k → f', hasPathBFS(graph, 'k', 'f'), false);
