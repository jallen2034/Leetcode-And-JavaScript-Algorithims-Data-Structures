// class to define our undirected graph
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addNode(node) {
    if (!this.adjacencyList[node]) return this.adjacencyList[node] = [];
    return 'There is already a node with this key in the adjacency list';
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
  removeNode(node) {
    const edgesFromnode = this.adjacencyList[node];
    while (edgesFromnode.length > 0) {
      this.removeEdge(node, edgesFromnode[0]); // always remove the first edge in edges array for a node
    }
    delete this.adjacencyList[node];
  }
  dfsRecursive(node) {
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
    dfs(node);
    return result;
  }
  dfsIterative(node) {
    let stack = [node];
    let result = [];
    let visited = {};
    let currentVertex;
    visited[node] = true;
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
  bfs(node) {
    let queue = [node];
    let result = [];
    let visited = {};
    let currentVertex;
    visited[node] = true;
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
  { firstnode: 'A', secondnode: 'B' },
  { firstnode: 'A', secondnode: 'C' },
  { firstnode: 'B', secondnode: 'D' },
  { firstnode: 'C', secondnode: 'E' },
  { firstnode: 'D', secondnode: 'E' },
  { firstnode: 'D', secondnode: 'F' },
  { firstnode: 'F', secondnode: 'D' },
  { firstnode: 'F', secondnode: 'E' }
];
const nodesToRemove = ['A', 'B', 'D', 'E', 'F', 'C'];

// add nodees to undirected graph
for (let node of nodesToAdd) {
  undirectedGraph.addNode(node);
}

console.log(undirectedGraph);

// add edges between nodees in undirected graph
for (let edges of edgesToAdd) {
  undirectedGraph.addEdge(edges.firstnode, edges.secondnode);
}

console.log(undirectedGraph);

// traverse graph
console.log(undirectedGraph.dfsRecursive("A"));
console.log(undirectedGraph.dfsIterative("A"));
console.log(undirectedGraph.bfs("A"));

// remove nodees and the edges between said nodees in undirected graph
for (let node of nodesToRemove) {
  undirectedGraph.removeNode(node);
  console.log(undirectedGraph);
}
