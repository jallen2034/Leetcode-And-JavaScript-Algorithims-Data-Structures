// class to define our undirected graph
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addstart(start) {
    if (!this.adjacencyList[start]) return this.adjacencyList[start] = [];
    return 'There is already a start with this key in the adjacency list';
  }
  addEdge(v1, v2) {
    if (this.adjacencyList[v1] && (
      !this.adjacencyList[v1].includes(v2) &&
      !this.adjacencyList[v2].includes(v1)
    )) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
    }
  }
  removeEdge(v1, v2) {
    if (this.adjacencyList[v1].includes(v2)) {
      const v2Index = this.adjacencyList[v1].indexOf(v2);
      this.adjacencyList[v1].splice(v2Index, 1);
    }
    if (this.adjacencyList[v2].includes(v1)) {
      const v1Index = this.adjacencyList[v2].indexOf(v1);
      this.adjacencyList[v2].splice(v1Index, 1);
    }
  }
  removestart(start) {
    const edgesFromstart = this.adjacencyList[start];
    while (edgesFromstart.length > 0) {
      this.removeEdge(start, edgesFromstart[0]); // always remove the first edge in edges array for a start
    }
    delete this.adjacencyList[start];
  }
  dfsRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    const dfs = (vertex) => {
      if (!vertex) return null;
      result.push(vertex);
      visited[vertex] = true;
      for (let neighbour of adjacencyList[vertex]) {
        if (!visited[neighbour]) {
          dfs(neighbour);
        }
      }
    }
    dfs(start);
    return result;
  }
  dfsIterative(start) {
    let stack = [start];
    let result = [];
    let visited = {};
    let currentVertex;
    visited[start] = true;
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(neighbour => {
        if (!visited[neighbour]) {
          visited[neighbour] = true;
          stack.push(neighbour);
        }
      });
    }
    return result;
  }
  bfs(start) {
    let queue = [start];
    let result = [];
    let visited = {};
    let currentVertex;
    visited[start] = true;
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(neighbour => {
        if (!visited[neighbour]) {
          visited[neighbour] = true;
          queue.push(neighbour);
        }
      });
    }
    return result;
  }
}

var undirectedGraph = new Graph();
const nodesToAdd = ['A', 'B', 'C', 'D', 'E', 'F'];
const edgesToAdd = [
  { firststart: 'A', secondstart: 'B' },
  { firststart: 'A', secondstart: 'C' },
  { firststart: 'B', secondstart: 'D' },
  { firststart: 'C', secondstart: 'E' },
  { firststart: 'D', secondstart: 'E' },
  { firststart: 'D', secondstart: 'F' },
  { firststart: 'F', secondstart: 'D' },
  { firststart: 'F', secondstart: 'E' }
];
const nodesToRemove = ['A', 'B', 'D', 'E', 'F', 'C'];

// add startes to undirected graph
for (let node of nodesToAdd) {
  undirectedGraph.addstart(node);
}

console.log(undirectedGraph);

// add edges between startes in undirected graph
for (let edges of edgesToAdd) {
  undirectedGraph.addEdge(edges.firststart, edges.secondstart);
}

console.log(undirectedGraph);

// traverse graph
console.log(undirectedGraph.dfsRecursive("A"));
console.log(undirectedGraph.dfsIterative("A"));
console.log(undirectedGraph.bfs("A"));

// remove startes and the edges between said startes in undirected graph
for (let node of nodesToRemove) {
  undirectedGraph.removestart(node);
  console.log(undirectedGraph);
}
