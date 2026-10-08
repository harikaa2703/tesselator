export interface PreindexedPDF {
  id: string;
  name: string;
  pages: number;
  chunksCount: number;
  topics: string[];
  status: 'Indexed' | 'Ready';
  uploadedDate: string;
  sampleChunks: Array<{
    id: string;
    section: string;
    text: string;
    keywords: string[];
  }>;
}

export const PREINDEXED_PDFS: PreindexedPDF[] = [
  {
    id: 'pdf-daa-u3',
    name: 'DAA Unit 3 - Traversal, Trees & Backtracking.pdf',
    pages: 134,
    chunksCount: 342,
    topics: ['BFS', 'DFS', 'Max Area of Island', 'Distinct Islands', 'The Maze', 'Boundary Traversal', 'Trees', 'Balanced Tree', 'Symmetric Tree', 'N-Queens', 'Hamiltonian Cycle', 'Brace Expansion', 'Gray Code', 'Path With Maximum Gold', 'Campus Bikes II'],
    status: 'Indexed',
    uploadedDate: '2026-10-05',
    sampleChunks: [
      {
        id: 'chunk-u3-1',
        section: 'Part-I: Breadth First Search (BFS)',
        text: 'Breadth-First Search (BFS) is a graph traversal approach in which you start at a source node and explore layer by layer. Uses a Queue data structure (FIFO) and boolean visited array. Time Complexity is O(V + E), Space Complexity is O(V). Applications include Find All Lonely Nodes, Max Area of Island, and Number of Distinct Islands.',
        keywords: ['bfs', 'breadth first search', 'queue', 'island', 'lonely nodes', 'graph traversal']
      },
      {
        id: 'chunk-u3-2',
        section: 'Part-II: Binary Trees & Properties',
        text: 'A binary tree is a non-linear data structure with at most two children per node. Balanced Binary Tree property: for all nodes in the tree, |LeftHeight - RightHeight| <= 1. Computed in O(N) using post-order depth calculation. Symmetric Tree mirrors itself around root: root.left == root.right recursively.',
        keywords: ['binary tree', 'balanced binary tree', 'symmetric tree', 'height', 'postorder', 'tree traversal']
      },
      {
        id: 'chunk-u3-3',
        section: 'Part-III: Backtracking Principles',
        text: 'Backtracking is depth-first node generation with bounding functions to prune dead branches. Live Node: nodes that can generate successors. E-Node: current node being expanded. Bounding function kills branches that violate constraints. Applications: N-Queens Problem (O(N!)), Hamiltonian Cycle (O(N^N)), Brace Expansion, Gray Code, Generalized Abbreviation.',
        keywords: ['backtracking', 'n-queens', 'bounding function', 'hamiltonian cycle', 'live node', 'e-node', 'dead node']
      }
    ]
  },
  {
    id: 'pdf-daa-u1',
    name: 'DAA Unit 1 - Introduction, Asymptotics, Recursion & D&C.pdf',
    pages: 112,
    chunksCount: 289,
    topics: ['Space Complexity', 'Time Complexity', 'Big Oh', 'Omega', 'Theta', 'Little Oh', 'Recursion', 'Fibonacci', 'Climbing Stairs', 'Reverse String', 'Happy Number', 'GCD Euclidean', 'Strobogrammatic II', 'Divide and Conquer', 'Master Theorem', 'Quick Sort', 'Merge Sort', 'Majority Element'],
    status: 'Indexed',
    uploadedDate: '2026-10-05',
    sampleChunks: [
      {
        id: 'chunk-u1-1',
        section: 'Asymptotic Notations',
        text: 'Big-Oh O(g(n)) gives asymptotic upper bound: f(n) <= c*g(n) for n >= n0. Omega gives asymptotic lower bound: f(n) >= c*g(n). Theta gives tight bound: c1*g(n) <= f(n) <= c2*g(n). Growth ordering: 1 < log n < n < n log n < n^2 < n^3 < 2^n < n!.',
        keywords: ['big oh', 'asymptotic', 'complexity', 'omega', 'theta', 'time complexity', 'upper bound']
      },
      {
        id: 'chunk-u1-2',
        section: 'Divide & Conquer and Master Theorem',
        text: 'D&C splits n inputs into subproblems: T(n) = aT(n/b) + f(n). Solved via Master Theorem by comparing f(n) with n^(log_b(a)). Quick sort partitions around a pivot in O(N log N) average time, O(N^2) worst case. Merge sort splits in halves and merges in O(N log N) guaranteed time.',
        keywords: ['divide and conquer', 'master theorem', 'quick sort', 'merge sort', 'recurrence', 'partition']
      }
    ]
  },
  {
    id: 'pdf-daa-u4-5',
    name: 'DAA Unit 4 & 5 - Dynamic Programming, Greedy & Branch-Bound.pdf',
    pages: 148,
    chunksCount: 401,
    topics: ['0/1 Knapsack', 'Travelling Salesperson', 'Dynamic Programming', 'Greedy Choice', 'Huffman Coding', 'Dijkstra', 'Branch and Bound', 'LCBB', 'FIFO Branch and Bound'],
    status: 'Indexed',
    uploadedDate: '2026-10-05',
    sampleChunks: [
      {
        id: 'chunk-u4-1',
        section: 'Dynamic Programming vs Greedy',
        text: 'Dynamic Programming solves optimization problems with overlapping subproblems and optimal substructure by memorizing subproblem answers in a table. Greedy algorithms make locally optimal decisions hoping for a global optimum. Knapsack 0/1 requires DP (O(N*W)), whereas Fractional Knapsack can be solved greedily by value/weight ratio.',
        keywords: ['dynamic programming', 'greedy', '0/1 knapsack', 'optimal substructure', 'memoization']
      }
    ]
  }
];
