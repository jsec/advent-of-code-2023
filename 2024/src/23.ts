import { getSplitInput } from './utils/input.js';

type Graph = Record<string, Set<string>>;

const generateAdjacencyList = () => {
  const list: Graph = {};

  const edges = getSplitInput().map(line => line.split('-'));

  for (const edge of edges) {
    const a = edge[0]!;
    const b = edge[1]!;

    if (!list[a]) {
      list[a] = new Set();
    }

    if (!list[b]) {
      list[b] = new Set();
    }

    list[a].add(b!);
    list[b].add(a!);
  }

  return list;
};

const p1 = (graph: Graph) => {
  const cliques = new Set<string>();

  for (const node in graph) {
    const neighbors = [...graph[node]!];

    for (let x = 0; x < neighbors.length; x++) {
      for (let y = x + 1; y < neighbors.length; y++) {
        const n1 = neighbors[x]!;
        const n2 = neighbors[y]!;

        if (graph[n1]!.has(n2)) {
          const clique = [node, n1, n2].sort();
          cliques.add(clique.join(','));
        }
      }
    }
  }

  return [...cliques].filter(clique => clique
    .split(',')
    .some(c => c.startsWith('t')),
  ).length;
};

const graph = generateAdjacencyList();

console.log('P1:', p1(graph));
