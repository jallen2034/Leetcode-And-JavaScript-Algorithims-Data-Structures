// class to define our undirected graph
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
     if (!this.adjacencyList[vertex]) return this.adjacencyList[vertex] = [];
     return 'There is already a vertex with this key in the adjacency list';
  }
  addEdge(v1, v2) {
    if (this.adjacencyList[v1]) {
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
  removeVertex(vertex) {
    const edgesToRemove = this.adjacencyList[vertex];
    while (edgesToRemove.length > 0) {
      this.removeEdge(vertex, edgesToRemove[0]);
    }
    delete this.adjacencyList[vertex];
  }
}

var undirectedGraph = new Graph();
const vertexesToAdd = ['Tokyo', 'Kyoto', 'Aspen', 'Dallas', 'Hong Kong'];
const edgesToAdd = [
  {firstVertex: 'Tokyo', secondVertex: 'Kyoto'},
  {firstVertex: 'Kyoto', secondVertex: 'Dallas'},
  {firstVertex: 'Aspen', secondVertex: 'Dallas'},
  {firstVertex: 'Aspen', secondVertex: 'Tokyo'},
  {firstVertex: 'Hong Kong', secondVertex: 'Tokyo'},
  {firstVertex: 'Hong Kong', secondVertex: 'Aspen'},
];
const vertexesToRemove = ['Hong Kong', 'Aspen', 'Tokyo', 'Kyoto', 'Dallas'];

// add vertexes to undirected graph
for (let vertex of vertexesToAdd) {
  undirectedGraph.addVertex(vertex);
}

console.log(undirectedGraph);

// add edges between vertexes in undirected graph
for (let edges of edgesToAdd) {
  undirectedGraph.addEdge(edges.firstVertex, edges.secondVertex);
}

console.log(undirectedGraph);

// remove vertexes and the edges between said vertexes in undirected graph
for (let vertex of vertexesToRemove) {
  undirectedGraph.removeVertex(vertex);
  console.log(undirectedGraph);
}
