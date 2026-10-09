// undirectedPath: edges are TWO-WAY, so ['i', 'j'] means i → j AND j → i
//
//   i ─── j            o ─── n
//   │   ╱
//   k ─── l
//   │
//   m
//
// NOTE: the edge-list → adjacency-list conversion is step 1 of this exercise,
// so it stays here on purpose (helpers.ts has edgeListToAdjList when you just
// need it as plumbing).

import { type AdjacencyList, check } from './helpers.ts';

// Edges from the Structy prompt (test_00)
const edges: string[][] = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n'],
];

// Same graph plus the j ─── k edge drawn in the video (makes an i-j-k triangle)
const edgesWithTriangle: string[][] = [...edges, ['j', 'k']];

// TODO step 1: turn the edge list into an adjacency list
//
// Input edges:            Target adjacency list:
//   ['i', 'j']              {
//   ['k', 'i']                i: ['j', 'k'],
//   ['m', 'k']                j: ['i'],
//   ['k', 'l']                k: ['i', 'm', 'l'],
//   ['o', 'n']                m: ['k'],
//                             l: ['k'],
//                             o: ['n'],
//                             n: ['o'],
//                           }
//
const convertEdgeListToAdjacencyList = (edges: string[][]): AdjacencyList => {
  const finalAdjList = new Map<string, string[]>();

  for (const edge of edges) {
    const [a, b] = edge;

    if (!finalAdjList.has(a)) {
      finalAdjList.set(a, []);
    }

    if (!finalAdjList.has(b)) {
      finalAdjList.set(b, []);
    }

    finalAdjList.get(a)!.push(b);
    finalAdjList.get(b)!.push(a);
  }

  return Object.fromEntries(finalAdjList);
};

// TODO step 2: iterative DFS (stack) with a visited Set
const undirectedPathDFSIterative = (edges: string[][], nodeA: string, nodeB: string): boolean => {
  const stack: any[] = [nodeA];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const currentNode: any = stack.pop();

    if (currentNode === nodeB) {
      return true;
    }

    if (currentNode) {
      visited.add(currentNode);

      const adjacentNodesToCurr: string[] = graph[currentNode];

      for (let node of adjacentNodesToCurr) {
        if (!visited.has(node)) {
          stack.push(node);
        }
      }
    }
  }

  return false;
};

const undirectedPathDFCRecursive = (
  graph: AdjacencyList,
  src: string,
  dst: string,
  visited: Set<string>
) => {
  if (src === dst) {
    return true;
  }

  if (visited.has(src)) {
    return false;
  }

  const neighbours: string[] = graph[src];
  visited.add(src);

  for (let neighbour of neighbours) {
    if (undirectedPathDFCRecursive(graph, neighbour, dst, visited)) {
      return true;
    }
  }

  return false;
}

console.log("=== ADJACENCY LIST ===");
console.log(convertEdgeListToAdjacencyList(edges), '← check this looks right first');

const graph: AdjacencyList = convertEdgeListToAdjacencyList(edges);

console.log("\n=== RECURSIVE DFS TESTS ===");
check('j → m', undirectedPathDFCRecursive(graph, 'j', 'm', new Set<string>()), true);
// check('l → j', undirectedPathDFCRecursive(graph, 'l', 'j', new Set<string>()), true);
// check('k → o', undirectedPathDFCRecursive(graph, 'k', 'o', new Set<string>()), false);
// check('o → n', undirectedPathDFCRecursive(graph, 'o', 'n', new Set<string>()), true);
// check('triangle i → l', undirectedPathDFCRecursive(convertEdgeListToAdjacencyList(edgesWithTriangle), 'i', 'l', new Set<string>()), true);
// check('triangle j → o', undirectedPathDFCRecursive(convertEdgeListToAdjacencyList(edgesWithTriangle), 'j', 'o', new Set<string>()), false);
//
// console.log("\n=== ITERATIVE DFS TESTS ===");
// check('j → m', undirectedPathDFSIterative(edges, 'j', 'm'), true);
// check('l → j', undirectedPathDFSIterative(edges, 'l', 'j'), true);
// check('k → o', undirectedPathDFSIterative(edges, 'k', 'o'), false);
// check('o → n', undirectedPathDFSIterative(edges, 'o', 'n'), true);
// check('triangle i → l', undirectedPathDFSIterative(edgesWithTriangle, 'i', 'l'), true);
// check('triangle j → o', undirectedPathDFSIterative(edgesWithTriangle, 'j', 'o'), false);
