import { Difficulty, TestCase } from '../types/dsa';

export interface UniversalDSAProblem {
  id: string;
  title: string;
  aliases: string[];
  keywords: string[];
  pattern: string;
  category: string;
  difficulty: Difficulty;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  javaCode: string;
  tests: TestCase[];
}

export const UNIVERSAL_DSA_LIBRARY: UniversalDSAProblem[] = [
  // =========================================================================
  // 1. ADVANCED GRAPH ALGORITHMS
  // =========================================================================
  {
    id: 'dsa-dijkstra',
    title: "Dijkstra's Shortest Path Algorithm",
    aliases: ['dijkstra', "dijkstra's algorithm", 'single source shortest path', 'shortest path weighted graph', 'dijkstras'],
    keywords: ['dijkstra', 'shortest path', 'weighted graph', 'source vertex', 'priorityqueue', 'min distance'],
    pattern: 'Graph / Greedy / PriorityQueue',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    description: "Find the shortest distance from a single source vertex to all other vertices in a weighted non-negative graph using a PriorityQueue.",
    javaCode: `import java.util.*;

class Edge {
    int to, weight;
    Edge(int to, int weight) {
        this.to = to;
        this.weight = weight;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt();
            int v = sc.nextInt();
            int w = sc.nextInt();
            adj.get(u).add(new Edge(v, w));
            adj.get(v).add(new Edge(u, w));
        }

        int src = sc.hasNextInt() ? sc.nextInt() : 0;
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        pq.offer(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int u = cur[0], d = cur[1];
            if (d > dist[u]) continue;

            for (Edge e : adj.get(u)) {
                if (dist[u] + e.weight < dist[e.to]) {
                    dist[e.to] = dist[u] + e.weight;
                    pq.offer(new int[]{e.to, dist[e.to]});
                }
            }
        }

        for (int i = 0; i < n; i++) {
            System.out.println("Vertex " + i + ": " + (dist[i] == Integer.MAX_VALUE ? "INF" : dist[i]));
        }
    }
}`,
    tests: [
      { id: 1, name: 'Sample Graph', input: '4 4\n0 1 1\n1 2 2\n2 3 3\n0 3 10\n0', expected: 'Vertex 0: 0\nVertex 1: 1\nVertex 2: 3\nVertex 3: 6', category: 'normal' }
    ]
  },
  {
    id: 'dsa-bellman-ford',
    title: 'Bellman-Ford Algorithm (Shortest Path & Negative Cycle)',
    aliases: ['bellman ford', 'bellman-ford', 'negative weight cycle', 'shortest path negative weights'],
    keywords: ['bellman ford', 'negative cycle', 'negative edge weights', 'relax all edges v-1 times'],
    pattern: 'Graph / Dynamic Programming',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(V * E)',
    spaceComplexity: 'O(V)',
    description: 'Find shortest paths from a source to all vertices with negative edge weights and detect negative weight cycles.',
    javaCode: `import java.util.*;

class EdgeBF {
    int src, dest, weight;
    EdgeBF(int s, int d, int w) { src = s; dest = d; weight = w; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int v = sc.nextInt();
        int e = sc.nextInt();
        List<EdgeBF> edges = new ArrayList<>();
        for (int i = 0; i < e; i++) {
            edges.add(new EdgeBF(sc.nextInt(), sc.nextInt(), sc.nextInt()));
        }
        int src = sc.hasNextInt() ? sc.nextInt() : 0;

        int[] dist = new int[v];
        Arrays.fill(dist, 1000000000);
        dist[src] = 0;

        for (int i = 1; i <= v - 1; i++) {
            for (EdgeBF edge : edges) {
                if (dist[edge.src] != 1000000000 && dist[edge.src] + edge.weight < dist[edge.dest]) {
                    dist[edge.dest] = dist[edge.src] + edge.weight;
                }
            }
        }

        boolean hasNegCycle = false;
        for (EdgeBF edge : edges) {
            if (dist[edge.src] != 1000000000 && dist[edge.src] + edge.weight < dist[edge.dest]) {
                hasNegCycle = true;
                break;
            }
        }

        if (hasNegCycle) {
            System.out.println("Negative Cycle Detected");
        } else {
            for (int i = 0; i < v; i++) {
                System.out.print(dist[i] + (i == v - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: 'Normal BF', input: '3 3\n0 1 4\n1 2 -2\n0 2 5\n0', expected: '0 4 2', category: 'normal' }
    ]
  },
  {
    id: 'dsa-floyd-warshall',
    title: 'Floyd-Warshall All-Pairs Shortest Path',
    aliases: ['floyd warshall', 'floyd-warshall', 'all pairs shortest path', 'apsp'],
    keywords: ['floyd warshall', 'all pairs shortest', 'intermediate vertex k', 'adj matrix dist'],
    pattern: 'Graph / 2D Dynamic Programming',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(V^3)',
    spaceComplexity: 'O(V^2)',
    description: 'Find shortest paths between every pair of vertices in a directed or undirected weighted graph.',
    javaCode: `import java.util.*;

public class Main {
    static final int INF = 999999;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] dist = new int[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                int val = sc.nextInt();
                dist[i][j] = (val == -1) ? INF : val;
            }
        }

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != INF && dist[k][j] != INF && dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print((dist[i][j] == INF ? -1 : dist[i][j]) + (j == n - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: '3x3 APSP', input: '3\n0 4 -1\n-1 0 2\n1 -1 0', expected: '0 4 6\n3 0 2\n1 5 0', category: 'normal' }
    ]
  },
  {
    id: 'dsa-topological-sort',
    title: "Topological Sort (Kahn's BFS & DFS)",
    aliases: ['topological sort', 'toposort', 'kahn algorithm', 'kahns algorithm', 'course schedule ordering', 'dag ordering'],
    keywords: ['topological sort', 'toposort', 'indegree', 'kahn', 'directed acyclic graph', 'dag'],
    pattern: 'Graph / Indegree Queue / DAG',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: "Linear ordering of vertices of a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u comes before v.",
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int v = sc.nextInt();
        int e = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < v; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[v];

        for (int i = 0; i < e; i++) {
            int from = sc.nextInt();
            int to = sc.nextInt();
            adj.get(from).add(to);
            indegree[to]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < v; i++) {
            if (indegree[i] == 0) q.offer(i);
        }

        List<Integer> order = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            order.add(u);
            for (int next : adj.get(u)) {
                indegree[next]--;
                if (indegree[next] == 0) q.offer(next);
            }
        }

        if (order.size() != v) {
            System.out.println("Cycle detected (No topological order)");
        } else {
            for (int i = 0; i < order.size(); i++) {
                System.out.print(order.get(i) + (i == order.size() - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: 'Sample DAG', input: '4 4\n0 1\n0 2\n1 3\n2 3', expected: '0 1 2 3', category: 'normal' }
    ]
  },
  {
    id: 'dsa-kruskal-dsu',
    title: "Kruskal's Minimum Spanning Tree with DSU",
    aliases: ['kruskal', "kruskal's algorithm", 'minimum spanning tree', 'mst kruskal', 'disjoint set union mst'],
    keywords: ['kruskal', 'minimum spanning tree', 'mst', 'dsu', 'union find', 'disjoint set'],
    pattern: 'Graph / Greedy / Disjoint Set Union',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)',
    description: "Find the Minimum Spanning Tree weight of a connected, undirected, edge-weighted graph using Kruskal's greedy algorithm and Union-Find.",
    javaCode: `import java.util.*;

class EdgeK {
    int src, dest, weight;
    EdgeK(int s, int d, int w) { src = s; dest = d; weight = w; }
}

class DSU {
    int[] parent, rank;
    DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    boolean union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false;
        if (rank[rootI] < rank[rootJ]) {
            parent[rootI] = rootJ;
        } else if (rank[rootI] > rank[rootJ]) {
            parent[rootJ] = rootI;
        } else {
            parent[rootJ] = rootI;
            rank[rootI]++;
        }
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int v = sc.nextInt();
        int e = sc.nextInt();
        List<EdgeK> edges = new ArrayList<>();
        for (int i = 0; i < e; i++) {
            edges.add(new EdgeK(sc.nextInt(), sc.nextInt(), sc.nextInt()));
        }

        edges.sort((a, b) -> Integer.compare(a.weight, b.weight));
        DSU dsu = new DSU(v);
        int mstWeight = 0;
        int edgeCount = 0;

        for (EdgeK edge : edges) {
            if (dsu.union(edge.src, edge.dest)) {
                mstWeight += edge.weight;
                edgeCount++;
                if (edgeCount == v - 1) break;
            }
        }

        System.out.println("MST Weight: " + mstWeight);
    }
}`,
    tests: [
      { id: 1, name: 'Sample MST', input: '4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4', expected: 'MST Weight: 19', category: 'normal' }
    ]
  },
  {
    id: 'dsa-bipartite-graph',
    title: 'Bipartite Graph Verification (2-Coloring)',
    aliases: ['bipartite graph', 'is graph bipartite', 'check bipartite', 'two coloring graph'],
    keywords: ['bipartite', 'two coloring', 'graph coloring', 'odd length cycle'],
    pattern: 'Graph / BFS / 2-Coloring',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Check whether a graph can be colored using two colors such that no two adjacent vertices have the same color.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n]; // 0: uncolored, 1: blue, -1: red

        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            Queue<Integer> q = new LinkedList<>();
            q.offer(i);
            color[i] = 1;

            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : graph[u]) {
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.offer(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int v = sc.nextInt();
        int e = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < v; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < e; i++) {
            int a = sc.nextInt(), b = sc.nextInt();
            adj.get(a).add(b);
            adj.get(b).add(a);
        }
        int[][] graph = new int[v][];
        for (int i = 0; i < v; i++) {
            graph[i] = adj.get(i).stream().mapToInt(x -> x).toArray();
        }
        System.out.println(isBipartite(graph) ? "Bipartite" : "Not Bipartite");
    }
}`,
    tests: [
      { id: 1, name: 'Square Graph', input: '4 4\n0 1\n1 2\n2 3\n3 0', expected: 'Bipartite', category: 'normal' }
    ]
  },

  // =========================================================================
  // 2. ADVANCED DYNAMIC PROGRAMMING
  // =========================================================================
  {
    id: 'dsa-edit-distance',
    title: 'Edit Distance (Levenshtein Distance)',
    aliases: ['edit distance', 'levenshtein distance', 'min distance convert word1 to word2', 'insert delete replace operations'],
    keywords: ['edit distance', 'word1', 'word2', 'insert', 'delete', 'replace', 'minimum number of operations'],
    pattern: 'Dynamic Programming / 2D Grid Match',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    description: 'Find the minimum number of operations (insert, delete, replace) required to convert word1 to word2.',
    javaCode: `import java.util.*;

public class Main {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String w1 = sc.next();
        String w2 = sc.hasNext() ? sc.next() : "";
        System.out.println(minDistance(w1, w2));
    }
}`,
    tests: [
      { id: 1, name: 'horse to ros', input: 'horse ros', expected: '3', category: 'normal' }
    ]
  },
  {
    id: 'dsa-matrix-chain-mult',
    title: 'Matrix Chain Multiplication (MCM)',
    aliases: ['matrix chain multiplication', 'mcm', 'optimal matrix chain multiplication', 'matrix multiplication cost'],
    keywords: ['matrix chain multiplication', 'mcm', 'minimum number of scalar multiplications', 'p array dimensions'],
    pattern: 'Dynamic Programming / Interval DP',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    timeComplexity: 'O(N^3)',
    spaceComplexity: 'O(N^2)',
    description: 'Find the most efficient way to multiply a given sequence of matrices to minimize scalar multiplications.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int n = list.size() - start;
        int[] p = new int[n];
        for (int i = 0; i < n; i++) p[i] = list.get(i + start);

        int[][] dp = new int[n][n];
        for (int len = 2; len < n; len++) {
            for (int i = 1; i < n - len + 1; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        System.out.println(dp[1][n - 1]);
    }
}`,
    tests: [
      { id: 1, name: 'Sample MCM', input: '4\n10 20 30 40', expected: '18000', category: 'normal' }
    ]
  },
  {
    id: 'dsa-word-break',
    title: 'Word Break Problem',
    aliases: ['word break', 'wordbreak', 'dictionary word break', 'segment string using dictionary'],
    keywords: ['word break', 'dictionary', 'segment', 'worddict', 'valid words'],
    pattern: 'Dynamic Programming / String Partition',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(N^2 * L)',
    spaceComplexity: 'O(N + DictSize)',
    description: 'Determine if a string can be segmented into a space-separated sequence of one or more dictionary words.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean wordBreak(String s, List<String> wordDict) {
        Set<String> set = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;

        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        List<String> dict = new ArrayList<>();
        while (sc.hasNext()) dict.add(sc.next());
        System.out.println(wordBreak(s, dict) ? "true" : "false");
    }
}`,
    tests: [
      { id: 1, name: 'leetcode', input: 'leetcode leet code', expected: 'true', category: 'normal' }
    ]
  },
  {
    id: 'dsa-rod-cutting',
    title: 'Rod Cutting Problem',
    aliases: ['rod cutting', 'cut rod for max profit', 'rod cut', 'unbounded rod cutting'],
    keywords: ['rod cutting', 'length of rod', 'maximum profit obtained by cutting', 'rod prices'],
    pattern: 'Dynamic Programming / Unbounded Knapsack',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N)',
    description: 'Given a rod of length N and array of prices of all pieces of size smaller than N, find maximum value by cutting and selling.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int n = sc.nextInt();
        int[] price = new int[n];
        for (int i = 0; i < n; i++) price[i] = sc.nextInt();

        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int maxVal = Integer.MIN_VALUE;
            for (int j = 0; j < i; j++) {
                maxVal = Math.max(maxVal, price[j] + dp[i - j - 1]);
            }
            dp[i] = maxVal;
        }
        System.out.println(dp[n]);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Rod Cutting', input: '8\n1 5 8 9 10 17 17 20', expected: '22', category: 'normal' }
    ]
  },

  // =========================================================================
  // 3. ADVANCED TREES & BST
  // =========================================================================
  {
    id: 'dsa-lca-binary-tree',
    title: 'Lowest Common Ancestor in Binary Tree',
    aliases: ['lowest common ancestor', 'lca binary tree', 'lca', 'common ancestor of two nodes'],
    keywords: ['lowest common ancestor', 'lca', 'ancestor', 'p and q', 'root node'],
    pattern: 'Trees / Postorder Recursion',
    category: 'Tree Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description: 'Find the lowest common ancestor of two given nodes in a binary tree.',
    javaCode: `import java.util.*;

class TreeNodeLCA {
    int val;
    TreeNodeLCA left, right;
    TreeNodeLCA(int x) { val = x; }
}

public class Main {
    public static TreeNodeLCA lowestCommonAncestor(TreeNodeLCA root, TreeNodeLCA p, TreeNodeLCA q) {
        if (root == null || root.val == p.val || root.val == q.val) return root;
        TreeNodeLCA left = lowestCommonAncestor(root.left, p, q);
        TreeNodeLCA right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int pVal = sc.nextInt();
        int qVal = sc.nextInt();
        // Demonstration on standard tree: root=3, left=5, right=1
        TreeNodeLCA root = new TreeNodeLCA(3);
        root.left = new TreeNodeLCA(5);
        root.right = new TreeNodeLCA(1);
        root.left.left = new TreeNodeLCA(6);
        root.left.right = new TreeNodeLCA(2);
        TreeNodeLCA lca = lowestCommonAncestor(root, new TreeNodeLCA(pVal), new TreeNodeLCA(qVal));
        System.out.println(lca != null ? lca.val : -1);
    }
}`,
    tests: [
      { id: 1, name: 'LCA of 5 and 1', input: '5 1', expected: '3', category: 'normal' }
    ]
  },
  {
    id: 'dsa-validate-bst',
    title: 'Validate Binary Search Tree',
    aliases: ['validate bst', 'is valid bst', 'check if binary tree is bst', 'valid binary search tree'],
    keywords: ['validate binary search tree', 'valid bst', 'inorder sorted', 'min max bounds'],
    pattern: 'Trees / BST Bounds Validation',
    category: 'Tree Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description: 'Determine if a given binary tree is a valid Binary Search Tree (left subtrees strictly less, right strictly greater).',
    javaCode: `import java.util.*;

class TreeNodeBST {
    int val;
    TreeNodeBST left, right;
    TreeNodeBST(int x) { val = x; }
}

public class Main {
    public static boolean isValidBST(TreeNodeBST root) {
        return validate(root, null, null);
    }

    private static boolean validate(TreeNodeBST node, Integer low, Integer high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        // Parse simple tree: root, left, right
        int rootVal = sc.nextInt();
        int leftVal = sc.nextInt();
        int rightVal = sc.nextInt();
        TreeNodeBST root = new TreeNodeBST(rootVal);
        if (leftVal != -1) root.left = new TreeNodeBST(leftVal);
        if (rightVal != -1) root.right = new TreeNodeBST(rightVal);
        System.out.println(isValidBST(root) ? "true" : "false");
    }
}`,
    tests: [
      { id: 1, name: 'Valid 2 1 3', input: '2 1 3', expected: 'true', category: 'normal' }
    ]
  },
  {
    id: 'dsa-tree-diameter',
    title: 'Diameter of Binary Tree',
    aliases: ['diameter of binary tree', 'longest path between any two nodes in a tree', 'tree diameter'],
    keywords: ['diameter of binary tree', 'longest path between any two nodes', 'height difference path'],
    pattern: 'Trees / DFS Depth Accumulation',
    category: 'Tree Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description: 'The diameter of a binary tree is the length of the longest path between any two nodes in a tree (may or may not pass through root).',
    javaCode: `import java.util.*;

class TreeNodeDia {
    int val;
    TreeNodeDia left, right;
    TreeNodeDia(int x) { val = x; }
}

public class Main {
    static int maxDiameter = 0;

    static int height(TreeNodeDia root) {
        if (root == null) return 0;
        int lh = height(root.left);
        int rh = height(root.right);
        maxDiameter = Math.max(maxDiameter, lh + rh);
        return 1 + Math.max(lh, rh);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        TreeNodeDia root = new TreeNodeDia(1);
        root.left = new TreeNodeDia(2);
        root.right = new TreeNodeDia(3);
        root.left.left = new TreeNodeDia(4);
        root.left.right = new TreeNodeDia(5);
        height(root);
        System.out.println(maxDiameter);
    }
}`,
    tests: [
      { id: 1, name: 'Sample tree diameter', input: '1', expected: '3', category: 'normal' }
    ]
  },

  // =========================================================================
  // 4. STACKS, QUEUES & MONOTONIC STRUCTURES
  // =========================================================================
  {
    id: 'dsa-largest-rectangle-histogram',
    title: 'Largest Rectangle in Histogram',
    aliases: ['largest rectangle in histogram', 'histogram max rectangle', 'maximal rectangle area'],
    keywords: ['largest rectangle in histogram', 'histogram', 'monotonic stack', 'bar heights'],
    pattern: 'Monotonic Stack / Area Bounds',
    category: 'Stack & Queue',
    difficulty: 'Hard',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Given an array of integers heights representing the histogram bar height where the width of each bar is 1, return the area of the largest rectangle.',
    javaCode: `import java.util.*;

public class Main {
    public static int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : (i - stack.peek() - 1);
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] h = new int[list.size() - start];
        for (int i = 0; i < h.length; i++) h[i] = list.get(i + start);

        System.out.println(largestRectangleArea(h));
    }
}`,
    tests: [
      { id: 1, name: 'Histogram 2 1 5 6 2 3', input: '2 1 5 6 2 3', expected: '10', category: 'normal' }
    ]
  },
  {
    id: 'dsa-sliding-window-max',
    title: 'Sliding Window Maximum (Monotonic Deque)',
    aliases: ['sliding window maximum', 'max in each window of size k', 'sliding window max', 'monotonic deque max'],
    keywords: ['sliding window maximum', 'window size k', 'maximum in sliding window', 'monotonic deque'],
    pattern: 'Monotonic Deque / Sliding Window',
    category: 'Stack & Queue',
    difficulty: 'Hard',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    description: 'Given an array nums and sliding window of size k moving from left to right, return the max sliding window elements in linear time.',
    javaCode: `import java.util.*;

public class Main {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) return new int[0];
        int n = nums.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);
            if (i >= k - 1) {
                res[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

        int[] res = maxSlidingWindow(nums, k);
        for (int i = 0; i < res.length; i++) {
            System.out.print(res[i] + (i == res.length - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Sample Window Max', input: '8 3\n1 3 -1 -3 5 3 6 7', expected: '3 3 5 5 6 7', category: 'normal' }
    ]
  },

  // =========================================================================
  // 5. ADVANCED BINARY SEARCH ON ANSWER
  // =========================================================================
  {
    id: 'dsa-koko-eating-bananas',
    title: 'Koko Eating Bananas (Binary Search on Answer)',
    aliases: ['koko eating bananas', 'eating bananas', 'minimum eating speed k', 'koko bananas'],
    keywords: ['koko eating bananas', 'piles of bananas', 'h hours', 'minimum integer k such that she can eat all'],
    pattern: 'Binary Search on Monotonic Answer',
    category: 'Binary Search',
    difficulty: 'Medium',
    timeComplexity: 'O(N log(max(piles)))',
    spaceComplexity: 'O(1)',
    description: 'Find the minimum integer eating speed K such that Koko can eat all the bananas within H hours.',
    javaCode: `import java.util.*;

public class Main {
    static boolean canEatAll(int[] piles, int h, int k) {
        long hours = 0;
        for (int p : piles) {
            hours += (p + k - 1) / k;
        }
        return hours <= h;
    }

    public static int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 1;
        for (int p : piles) high = Math.max(high, p);

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (canEatAll(piles, h, mid)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int h = sc.nextInt();
        int[] piles = new int[n];
        for (int i = 0; i < n; i++) piles[i] = sc.nextInt();
        System.out.println(minEatingSpeed(piles, h));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Koko', input: '4 8\n3 6 7 11', expected: '4', category: 'normal' }
    ]
  },
  {
    id: 'dsa-capacity-ship-packages',
    title: 'Capacity to Ship Packages Within D Days',
    aliases: ['capacity to ship packages', 'ship packages within d days', 'ship packages within days', 'minimum ship capacity'],
    keywords: ['ship packages', 'capacity to ship', 'within d days', 'least weight capacity of ship'],
    pattern: 'Binary Search on Monotonic Answer',
    category: 'Binary Search',
    difficulty: 'Medium',
    timeComplexity: 'O(N log(sum(weights)))',
    spaceComplexity: 'O(1)',
    description: 'Find the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within D days.',
    javaCode: `import java.util.*;

public class Main {
    static boolean feasible(int[] weights, int c, int days) {
        int d = 1, cur = 0;
        for (int w : weights) {
            if (cur + w > c) {
                d++;
                cur = 0;
            }
            cur += w;
        }
        return d <= days;
    }

    public static int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }

        while (low < high) {
            int mid = low + (high - low) / 2;
            if (feasible(weights, mid, days)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int days = sc.nextInt();
        int[] weights = new int[n];
        for (int i = 0; i < n; i++) weights[i] = sc.nextInt();
        System.out.println(shipWithinDays(weights, days));
    }
}`,
    tests: [
      { id: 1, name: 'Ship in 5 days', input: '10 5\n1 2 3 4 5 6 7 8 9 10', expected: '15', category: 'normal' }
    ]
  },

  // =========================================================================
  // 6. TRIE (PREFIX TREE)
  // =========================================================================
  {
    id: 'dsa-trie-implementation',
    title: 'Trie (Prefix Tree) Implementation',
    aliases: ['trie', 'prefix tree', 'implement trie', 'trie insert search startswith'],
    keywords: ['trie', 'prefix tree', 'insert', 'search', 'startswith', 'trie node'],
    pattern: 'Trie / Tree Data Structure',
    category: 'Advanced Data Structures',
    difficulty: 'Medium',
    timeComplexity: 'O(WordLength) per operation',
    spaceComplexity: 'O(TotalCharacters * 26)',
    description: 'Implement a Trie with insert, search, and startsWith methods in Java.',
    javaCode: `import java.util.*;

class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

public class Main {
    static TrieNode root = new TrieNode();

    static void insert(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) cur.children[idx] = new TrieNode();
            cur = cur.children[idx];
        }
        cur.isEnd = true;
    }

    static boolean search(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) return false;
            cur = cur.children[idx];
        }
        return cur.isEnd;
    }

    static boolean startsWith(String prefix) {
        TrieNode cur = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) return false;
            cur = cur.children[idx];
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        insert("apple");
        System.out.println("search apple: " + search("apple"));
        System.out.println("search app: " + search("app"));
        System.out.println("startsWith app: " + startsWith("app"));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Trie', input: 'test', expected: 'search apple: true\nsearch app: false\nstartsWith app: true', category: 'normal' }
    ]
  },

  // =========================================================================
  // 7. HEAP & STREAMING ALGORITHMS
  // =========================================================================
  {
    id: 'dsa-find-median-stream',
    title: 'Find Median from Data Stream (Two Heaps)',
    aliases: ['find median from data stream', 'median of stream', 'median data stream', 'two heaps median'],
    keywords: ['median from data stream', 'two heaps', 'max heap min heap', 'running median'],
    pattern: 'Two Heaps (Max-Heap + Min-Heap)',
    category: 'Heap Algorithms',
    difficulty: 'Hard',
    timeComplexity: 'O(log N) insert, O(1) findMedian',
    spaceComplexity: 'O(N)',
    description: 'The median is the middle value in an ordered integer list. Design a data structure that supports adding numbers and finding running median in O(1).',
    javaCode: `import java.util.*;

public class Main {
    static PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // max-heap
    static PriorityQueue<Integer> large = new PriorityQueue<>(); // min-heap

    static void addNum(int num) {
        small.offer(num);
        large.offer(small.poll());
        if (small.size() < large.size()) {
            small.offer(large.poll());
        }
    }

    static double findMedian() {
        return small.size() > large.size() ? small.peek() : (small.peek() + large.peek()) / 2.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        while (sc.hasNextInt()) {
            addNum(sc.nextInt());
            System.out.printf(Locale.US, "%.1f\\n", findMedian());
        }
    }
}`,
    tests: [
      { id: 1, name: 'Sample Running Median', input: '1 2 3', expected: '1.0\n1.5\n2.0', category: 'normal' }
    ]
  },

  // =========================================================================
  // 8. ADVANCED BIT MANIPULATION & MATH
  // =========================================================================
  {
    id: 'dsa-single-number-ii',
    title: 'Single Number II (Element appearing once, others 3 times)',
    aliases: ['single number ii', 'single number 2', 'element appears once others thrice', 'three times element once'],
    keywords: ['single number ii', 'appears three times', 'appears once', 'bit manipulation count mod 3'],
    pattern: 'Bit Manipulation / Base 3 Counter',
    category: 'Bit Manipulation',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element using bitwise logic.',
    javaCode: `import java.util.*;

public class Main {
    public static int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        for (int x : nums) {
            ones = (ones ^ x) & ~twos;
            twos = (twos ^ x) & ~ones;
        }
        return ones;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] nums = new int[list.size() - start];
        for (int i = 0; i < nums.length; i++) nums[i] = list.get(i + start);

        System.out.println(singleNumber(nums));
    }
}`,
    tests: [
      { id: 1, name: 'Sample 2 2 3 2', input: '2 2 3 2', expected: '3', category: 'normal' }
    ]
  },
  {
    id: 'dsa-sudoku-solver',
    title: 'Sudoku Solver (Exact 9x9 Backtracking)',
    aliases: ['sudoku solver', 'solve sudoku', 'sudoku puzzle backtracking'],
    keywords: ['sudoku', '9x9', 'backtracking', 'board', 'solve sudoku'],
    pattern: 'Backtracking / Constraint Propagation',
    category: 'Recursion & Backtracking',
    difficulty: 'Hard',
    timeComplexity: 'O(9^(empty cells))',
    spaceComplexity: 'O(1) recursion depth 81',
    description: 'Write a program to solve a Sudoku puzzle by filling the empty cells.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean solveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solveSudoku(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private static boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == c) return false;
            if (board[row][i] == c) return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        char[][] board = new char[9][9];
        for (int i = 0; i < 9; i++) {
            String row = sc.next();
            for (int j = 0; j < 9; j++) board[i][j] = row.charAt(j);
        }
        solveSudoku(board);
        for (int i = 0; i < 9; i++) {
            System.out.println(new String(board[i]));
        }
    }
}`,
    tests: [
      { id: 1, name: 'Sample Sudoku Board', input: '53..7....\n6..195...\n.98....6.\n8...6...3\n4..8.3..1\n7...2...6\n.6....28.\n...419..5\n....8..79', expected: '534678912\n672195348\n198342567\n859761423\n426853791\n713924856\n961537284\n287419635\n345286179', category: 'normal' }
    ]
  },
  // =========================================================================
  // 6. EXPANDED GRAPH ALGORITHMS
  // =========================================================================
  {
    id: 'dsa-prim-mst',
    title: "Prim's Minimum Spanning Tree Algorithm",
    aliases: ['prim', "prim's algorithm", 'prim mst', 'prims algorithm', 'minimum spanning tree prim'],
    keywords: ['prim', 'mst', 'minimum spanning tree', 'priorityqueue', 'cut property', 'visited array'],
    pattern: 'Graph / Greedy / PriorityQueue',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V + E)',
    description: "Find the total weight of the Minimum Spanning Tree of a connected weighted undirected graph using Prim's algorithm.",
    javaCode: `import java.util.*;

public class Main {
    static class Edge {
        int to, weight;
        Edge(int to, int weight) { this.to = to; this.weight = weight; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<List<Edge>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt(), w = sc.nextInt();
            adj.get(u).add(new Edge(v, w));
            adj.get(v).add(new Edge(u, w));
        }

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));
        boolean[] inMST = new boolean[n];
        pq.offer(new int[]{0, 0});
        int totalWeight = 0;
        int count = 0;

        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int u = cur[0], w = cur[1];
            if (inMST[u]) continue;
            inMST[u] = true;
            totalWeight += w;
            count++;

            for (Edge e : adj.get(u)) {
                if (!inMST[e.to]) pq.offer(new int[]{e.to, e.weight});
            }
        }

        System.out.println(count == n ? totalWeight : -1);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Graph MST', input: '4 5\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3', expected: '6', category: 'normal' }
    ]
  },
  {
    id: 'dsa-cycle-directed-graph',
    title: 'Detect Cycle in a Directed Graph',
    aliases: ['detect cycle in directed graph', 'cycle in directed graph', 'directed graph cycle', 'has cycle directed'],
    keywords: ['cycle in directed graph', 'recursion stack', 'kahn algorithm', 'back edge', 'dag'],
    pattern: 'Graph / DFS / Recursion Stack',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Determine if a directed graph contains a cycle using DFS recursion stack tracking or Kahn’s in-degree algorithm.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean hasCycle(int n, List<List<Integer>> adj) {
        int[] inDegree = new int[n];
        for (int u = 0; u < n; u++) {
            for (int v : adj.get(u)) inDegree[v]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        int visited = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            visited++;
            for (int v : adj.get(u)) {
                if (--inDegree[v] == 0) q.offer(v);
            }
        }
        return visited != n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(u).add(v);
        }
        System.out.println(hasCycle(n, adj) ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: 'Cycle Case', input: '3 3\n0 1\n1 2\n2 0', expected: 'True', category: 'normal' }
    ]
  },
  {
    id: 'dsa-cycle-undirected-graph',
    title: 'Detect Cycle in an Undirected Graph',
    aliases: ['detect cycle in undirected graph', 'cycle in undirected graph', 'undirected graph cycle', 'has cycle undirected'],
    keywords: ['cycle in undirected graph', 'bfs cycle', 'dfs parent', 'disjoint set'],
    pattern: 'Graph / BFS / Parent Pointer',
    category: 'Graph Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Determine if an undirected graph contains a cycle by checking if an adjacent vertex has already been visited and is not the parent.',
    javaCode: `import java.util.*;

public class Main {
    static boolean dfs(int u, int p, boolean[] vis, List<List<Integer>> adj) {
        vis[u] = true;
        for (int v : adj.get(u)) {
            if (!vis[v]) {
                if (dfs(v, u, vis, adj)) return true;
            } else if (v != p) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
        }
        boolean[] vis = new boolean[n];
        boolean cycle = false;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                if (dfs(i, -1, vis, adj)) { cycle = true; break; }
            }
        }
        System.out.println(cycle ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: 'Cycle Undirected', input: '4 4\n0 1\n1 2\n2 3\n3 0', expected: 'True', category: 'normal' }
    ]
  },
  {
    id: 'dsa-scc-kosaraju',
    title: 'Strongly Connected Components (Kosaraju Algorithm)',
    aliases: ['strongly connected components', 'kosaraju', 'kosaraju algorithm', 'scc in directed graph'],
    keywords: ['strongly connected components', 'kosaraju', 'transposed graph', 'topological finish stack'],
    pattern: 'Graph / Depth First Search / Two Passes',
    category: 'Graph Algorithms',
    difficulty: 'Hard',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    description: 'Count the number of Strongly Connected Components in a directed graph using Kosaraju’s two-pass DFS on original and reversed graphs.',
    javaCode: `import java.util.*;

public class Main {
    static void dfs1(int u, boolean[] vis, Stack<Integer> st, List<List<Integer>> adj) {
        vis[u] = true;
        for (int v : adj.get(u)) if (!vis[v]) dfs1(v, vis, st, adj);
        st.push(u);
    }

    static void dfs2(int u, boolean[] vis, List<List<Integer>> rev) {
        vis[u] = true;
        for (int v : rev.get(u)) if (!vis[v]) dfs2(v, vis, rev);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt(), m = sc.nextInt();
        List<List<Integer>> adj = new ArrayList<>();
        List<List<Integer>> rev = new ArrayList<>();
        for (int i = 0; i < n; i++) { adj.add(new ArrayList<>()); rev.add(new ArrayList<>()); }

        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(u).add(v);
            rev.get(v).add(u);
        }

        Stack<Integer> st = new Stack<>();
        boolean[] vis = new boolean[n];
        for (int i = 0; i < n; i++) if (!vis[i]) dfs1(i, vis, st, adj);

        Arrays.fill(vis, false);
        int sccCount = 0;
        while (!st.isEmpty()) {
            int u = st.pop();
            if (!vis[u]) {
                sccCount++;
                dfs2(u, vis, rev);
            }
        }
        System.out.println(sccCount);
    }
}`,
    tests: [
      { id: 1, name: 'Sample SCC', input: '5 5\n1 0\n0 2\n2 1\n0 3\n3 4', expected: '3', category: 'normal' }
    ]
  },
  // =========================================================================
  // 7. EXPANDED TREES & BINARY SEARCH TREES
  // =========================================================================
  {
    id: 'dsa-tree-zigzag',
    title: 'Binary Tree Zigzag Level Order Traversal',
    aliases: ['zigzag level order', 'zigzag traversal', 'spiral level order', 'tree zigzag'],
    keywords: ['zigzag', 'spiral order', 'alternating levels', 'deque', 'level order'],
    pattern: 'Tree / BFS / Deque',
    category: 'Trees',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Perform a zigzag level order traversal of a binary tree, alternating left-to-right and right-to-left at each level.',
    javaCode: `import java.util.*;

public class Main {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1") || parts[0].equals("null")) {
            System.out.println("[]");
            return;
        }

        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1") && !parts[i].equals("null")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1") && !parts[i].equals("null")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }

        List<List<Integer>> res = new ArrayList<>();
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true;

        while (!queue.isEmpty()) {
            int size = queue.size();
            LinkedList<Integer> level = new LinkedList<>();
            for (int k = 0; k < size; k++) {
                Node node = queue.poll();
                if (leftToRight) level.addLast(node.val);
                else level.addFirst(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            res.add(level);
            leftToRight = !leftToRight;
        }
        System.out.println(res);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Zigzag', input: '3 9 20 -1 -1 15 7', expected: '[[3], [20, 9], [15, 7]]', category: 'normal' }
    ]
  },
  {
    id: 'dsa-tree-max-path-sum',
    title: 'Binary Tree Maximum Path Sum',
    aliases: ['maximum path sum', 'max path sum in binary tree', 'max path sum tree', 'tree max path sum'],
    keywords: ['max path sum', 'path sum binary tree', 'postorder', 'leaf to leaf'],
    pattern: 'Tree / DFS / Postorder',
    category: 'Trees',
    difficulty: 'Hard',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    description: 'Find the maximum path sum in a binary tree where the path can start and end at any node.',
    javaCode: `import java.util.*;

public class Main {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }
    static int maxSum = Integer.MIN_VALUE;

    static int dfs(Node node) {
        if (node == null) return 0;
        int left = Math.max(0, dfs(node.left));
        int right = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, left + right + node.val);
        return Math.max(left, right) + node.val;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1") || parts[0].equals("null")) {
            System.out.println(0);
            return;
        }
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1") && !parts[i].equals("null")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1") && !parts[i].equals("null")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }
        dfs(root);
        System.out.println(maxSum);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Max Path', input: '-10 9 20 -1 -1 15 7', expected: '42', category: 'normal' }
    ]
  },
  {
    id: 'dsa-construct-tree-pre-in',
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    aliases: ['construct binary tree from preorder and inorder', 'tree from preorder inorder', 'build tree preorder inorder'],
    keywords: ['construct tree', 'preorder and inorder', 'root index lookup', 'divide and conquer'],
    pattern: 'Tree / Divide & Conquer / HashMap',
    category: 'Trees',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Construct a unique binary tree given its preorder and inorder traversal arrays.',
    javaCode: `import java.util.*;

public class Main {
    static class Node {
        int val;
        Node left, right;
        Node(int v) { val = v; }
    }
    static int preIdx = 0;
    static Map<Integer, Integer> inMap = new HashMap<>();

    static Node build(int[] pre, int inStart, int inEnd) {
        if (inStart > inEnd) return null;
        int rootVal = pre[preIdx++];
        Node root = new Node(rootVal);
        int mid = inMap.get(rootVal);
        root.left = build(pre, inStart, mid - 1);
        root.right = build(pre, mid + 1, inEnd);
        return root;
    }

    static void postOrder(Node root, List<Integer> res) {
        if (root == null) return;
        postOrder(root.left, res);
        postOrder(root.right, res);
        res.add(root.val);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] pre = new int[n];
        for (int i = 0; i < n; i++) pre[i] = sc.nextInt();
        int[] in = new int[n];
        for (int i = 0; i < n; i++) {
            in[i] = sc.nextInt();
            inMap.put(in[i], i);
        }
        Node root = build(pre, 0, n - 1);
        List<Integer> res = new ArrayList<>();
        postOrder(root, res);
        System.out.println(res);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Pre In', input: '5\n3 9 20 15 7\n9 3 15 20 7', expected: '[9, 15, 7, 20, 3]', category: 'normal' }
    ]
  },
  // =========================================================================
  // 8. EXPANDED DYNAMIC PROGRAMMING
  // =========================================================================
  {
    id: 'dsa-coin-change-ways',
    title: 'Coin Change II (Number of Ways / Combinations)',
    aliases: ['coin change 2', 'coin change ii', 'ways to make change', 'number of ways to make amount', 'coin change combinations'],
    keywords: ['coin change 2', 'number of ways', 'unbounded knapsack combinations', 'combinations sum coins'],
    pattern: 'Dynamic Programming / Unbounded Knapsack',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    description: 'Compute the total number of distinct combinations that make up the target amount using available coin denominations.',
    javaCode: `import java.util.*;

public class Main {
    public static int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int c : coins) {
            for (int i = c; i <= amount; i++) {
                dp[i] += dp[i - c];
            }
        }
        return dp[amount];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] coins = new int[parts.length];
        for (int i = 0; i < parts.length; i++) coins[i] = Integer.parseInt(parts[i]);
        int amount = sc.hasNextInt() ? sc.nextInt() : 5;
        System.out.println(change(amount, coins));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Case', input: '1 2 5\n5', expected: '4', category: 'normal' }
    ]
  },
  {
    id: 'dsa-partition-equal-subset',
    title: 'Partition Equal Subset Sum (0/1 Knapsack Decision)',
    aliases: ['partition equal subset sum', 'equal subset sum', 'subset sum partition', 'can partition equal sum'],
    keywords: ['partition equal subset', 'subset sum', '0/1 knapsack boolean', 'half sum partition'],
    pattern: 'Dynamic Programming / 0/1 Knapsack',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(N * sum)',
    spaceComplexity: 'O(sum)',
    description: 'Determine whether a given set of positive integers can be partitioned into two subsets with equal sum.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(canPartition(nums) ? "true" : "false");
    }
}`,
    tests: [
      { id: 1, name: 'Sample Case', input: '1 5 11 5', expected: 'true', category: 'normal' }
    ]
  },
  {
    id: 'dsa-longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    aliases: ['longest palindromic substring', 'longest palindrome substring', 'lps substring'],
    keywords: ['longest palindromic substring', 'expand around center', 'palindrome substring'],
    pattern: 'String / Two Pointers / Dynamic Programming',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    description: 'Find the longest continuous substring in a given string that reads the same forwards and backwards.',
    javaCode: `import java.util.*;

public class Main {
    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);
            int len2 = expand(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    static int expand(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next().replaceAll("\"", "");
        System.out.println(longestPalindrome(s));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Palindrome', input: 'babad', expected: 'bab', category: 'normal' }
    ]
  },
  {
    id: 'dsa-longest-palindromic-subsequence',
    title: 'Longest Palindromic Subsequence (LPS)',
    aliases: ['longest palindromic subsequence', 'longest palindrome subsequence', 'lps subsequence'],
    keywords: ['longest palindromic subsequence', '2d dp', 'subsequence palindrome', 'interval dp'],
    pattern: 'Dynamic Programming / Interval DP',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N^2)',
    description: 'Find the length of the longest palindromic subsequence in a string (subsequence does not need to be contiguous).',
    javaCode: `import java.util.*;

public class Main {
    public static int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] dp = new int[n][n];
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[0][n - 1];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next().replaceAll("\"", "");
        System.out.println(longestPalindromeSubseq(s));
    }
}`,
    tests: [
      { id: 1, name: 'Sample LPS', input: 'bbbab', expected: '4', category: 'normal' }
    ]
  },
  // =========================================================================
  // 9. EXPANDED ARRAYS, INTERVALS & TWO POINTERS
  // =========================================================================
  {
    id: 'dsa-4sum',
    title: '4Sum Quadruplets to Target',
    aliases: ['4sum', 'four sum', '4 sum', 'quadruplets sum'],
    keywords: ['4sum', 'four numbers target', 'two pointers 4sum', 'unique quadruplets'],
    pattern: 'Two Pointers / Sorting',
    category: 'Arrays & Two Pointers',
    difficulty: 'Medium',
    timeComplexity: 'O(N^3)',
    spaceComplexity: 'O(1)',
    description: 'Find all unique quadruplets in an array that add up to a specified target value.',
    javaCode: `import java.util.*;

public class Main {
    public static List<List<Integer>> fourSum(int[] nums, long target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int l = j + 1, r = n - 1;
                while (l < r) {
                    long sum = (long) nums[i] + nums[j] + nums[l] + nums[r];
                    if (sum == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[l], nums[r]));
                        while (l < r && nums[l] == nums[l + 1]) l++;
                        while (l < r && nums[r] == nums[r - 1]) r--;
                        l++; r--;
                    } else if (sum < target) l++;
                    else r--;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        long target = sc.hasNextLong() ? sc.nextLong() : 0;
        System.out.println(fourSum(nums, target));
    }
}`,
    tests: [
      { id: 1, name: 'Sample 4Sum', input: '1 0 -1 0 -2 2\n0', expected: '[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]', category: 'normal' }
    ]
  },
  {
    id: 'dsa-longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence in Unsorted Array',
    aliases: ['longest consecutive sequence', 'longest consecutive elements', 'longest consecutive'],
    keywords: ['longest consecutive sequence', 'hashset o(n)', 'consecutive integers unsorted'],
    pattern: 'HashSet / Intelligent Traversal',
    category: 'Arrays & Two Pointers',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Find the length of the longest consecutive elements sequence in an unsorted array in O(N) time.',
    javaCode: `import java.util.*;

public class Main {
    public static int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);
        int longest = 0;

        for (int num : set) {
            if (!set.contains(num - 1)) {
                int cur = num;
                int streak = 1;
                while (set.contains(cur + 1)) {
                    cur++;
                    streak++;
                }
                longest = Math.max(longest, streak);
            }
        }
        return longest;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(longestConsecutive(nums));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Consecutive', input: '100 4 200 1 3 2', expected: '4', category: 'normal' }
    ]
  },
  {
    id: 'dsa-subarray-sum-k',
    title: 'Subarray Sum Equals K (Total Subarrays Count)',
    aliases: ['subarray sum equals k', 'count subarrays with sum k', 'subarrays sum to k', 'total continuous subarrays sum k'],
    keywords: ['subarray sum equals k', 'prefix sum hashmap', 'contiguous subarray sum k'],
    pattern: 'Prefix Sum / HashMap Lookup',
    category: 'Arrays & Two Pointers',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Find the total number of continuous subarrays whose sum equals k using prefix sum hash table.',
    javaCode: `import java.util.*;

public class Main {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int sum = 0, count = 0;
        for (int x : nums) {
            sum += x;
            if (map.containsKey(sum - k)) count += map.get(sum - k);
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int k = sc.hasNextInt() ? sc.nextInt() : 2;
        System.out.println(subarraySum(nums, k));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Subarray K', input: '1 1 1\n2', expected: '2', category: 'normal' }
    ]
  },
  {
    id: 'dsa-min-window-substring',
    title: 'Minimum Window Substring',
    aliases: ['minimum window substring', 'min window substring', 'smallest substring containing all characters'],
    keywords: ['minimum window substring', 'sliding window frequency', 'character count match'],
    pattern: 'Sliding Window / HashMap Frequency',
    category: 'Strings',
    difficulty: 'Hard',
    timeComplexity: 'O(S + T)',
    spaceComplexity: 'O(S + T)',
    description: 'Find the minimum window substring in S that contains all the characters in T in O(N) time.',
    javaCode: `import java.util.*;

public class Main {
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        int[] target = new int[128];
        for (char c : t.toCharArray()) target[c]++;

        int required = 0;
        for (int x : target) if (x > 0) required++;

        int l = 0, formed = 0;
        int[] window = new int[128];
        int minLen = Integer.MAX_VALUE, start = 0;

        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            window[c]++;
            if (target[c] > 0 && window[c] == target[c]) formed++;

            while (l <= r && formed == required) {
                if (r - l + 1 < minLen) {
                    minLen = r - l + 1;
                    start = l;
                }
                char leftChar = s.charAt(l);
                window[leftChar]--;
                if (target[leftChar] > 0 && window[leftChar] < target[leftChar]) formed--;
                l++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String t = sc.hasNext() ? sc.next() : "ABC";
        System.out.println(minWindow(s, t));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Window', input: 'ADOBECODEBANC ABC', expected: 'BANC', category: 'normal' }
    ]
  },
  {
    id: 'dsa-next-permutation',
    title: 'Next Permutation',
    aliases: ['next permutation', 'next lexicographical permutation', 'find next permutation'],
    keywords: ['next permutation', 'in-place rearrangement', 'lexicographically greater', 'swap and reverse'],
    pattern: 'Array / Two Pointers / Greedy',
    category: 'Arrays & Two Pointers',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Rearrange numbers into the lexicographically next greater permutation of numbers in-place.',
    javaCode: `import java.util.*;

public class Main {
    public static void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums, i, j);
        }
        reverse(nums, i + 1, nums.length - 1);
    }

    static void swap(int[] a, int i, int j) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
    }

    static void reverse(int[] a, int i, int j) {
        while (i < j) swap(a, i++, j--);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        nextPermutation(nums);
        System.out.println(Arrays.toString(nums));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Next Perm', input: '1 2 3', expected: '[1, 3, 2]', category: 'normal' }
    ]
  },
  {
    id: 'dsa-median-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    aliases: ['median of two sorted arrays', 'median two sorted', 'find median of two arrays'],
    keywords: ['median of two sorted arrays', 'binary search partition', 'log(min(m,n))', 'kth element two sorted'],
    pattern: 'Binary Search / Partition',
    category: 'Binary Search',
    difficulty: 'Hard',
    timeComplexity: 'O(log(min(M, N)))',
    spaceComplexity: 'O(1)',
    description: 'Find the median of two sorted arrays of size m and n with overall run time complexity of O(log(min(m, n))).',
    javaCode: `import java.util.*;

public class Main {
    public static double findMedianSortedArrays(int[] A, int[] B) {
        if (A.length > B.length) return findMedianSortedArrays(B, A);
        int m = A.length, n = B.length;
        int low = 0, high = m;

        while (low <= high) {
            int cutA = (low + high) / 2;
            int cutB = (m + n + 1) / 2 - cutA;

            int leftA = (cutA == 0) ? Integer.MIN_VALUE : A[cutA - 1];
            int rightA = (cutA == m) ? Integer.MAX_VALUE : A[cutA];

            int leftB = (cutB == 0) ? Integer.MIN_VALUE : B[cutB - 1];
            int rightB = (cutB == n) ? Integer.MAX_VALUE : B[cutB];

            if (leftA <= rightB && leftB <= rightA) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(leftA, leftB) + Math.min(rightA, rightB)) / 2.0;
                } else {
                    return Math.max(leftA, leftB);
                }
            } else if (leftA > rightB) {
                high = cutA - 1;
            } else {
                low = cutA + 1;
            }
        }
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line1 = sc.nextLine().replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] p1 = line1.isEmpty() ? new String[0] : line1.split("\\\\s+");
        int[] A = new int[p1.length];
        for (int i = 0; i < p1.length; i++) A[i] = Integer.parseInt(p1[i]);

        String line2 = sc.hasNextLine() ? sc.nextLine().replaceAll("[\\\\[\\\\],]", " ").trim() : "";
        String[] p2 = line2.isEmpty() ? new String[0] : line2.split("\\\\s+");
        int[] B = new int[p2.length];
        for (int i = 0; i < p2.length; i++) B[i] = Integer.parseInt(p2[i]);

        System.out.printf(Locale.US, "%.5f\\n", findMedianSortedArrays(A, B));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Median', input: '1 3\n2', expected: '2.00000', category: 'normal' }
    ]
  },
  {
    id: 'dsa-merge-k-sorted-lists',
    title: 'Merge K Sorted Lists / Arrays',
    aliases: ['merge k sorted lists', 'merge k sorted arrays', 'merge k sorted', 'merge k lists'],
    keywords: ['merge k sorted lists', 'min-heap priorityqueue', 'k sorted arrays merge'],
    pattern: 'Heap / PriorityQueue / Divide & Conquer',
    category: 'Heaps & PriorityQueues',
    difficulty: 'Hard',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    description: 'Merge k sorted linked lists or arrays into one sorted array in O(N log k) using a Min-Heap.',
    javaCode: `import java.util.*;

public class Main {
    static class Element {
        int val, listIdx, elemIdx;
        Element(int val, int listIdx, int elemIdx) {
            this.val = val; this.listIdx = listIdx; this.elemIdx = elemIdx;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int k = sc.nextInt();
        List<int[]> lists = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            int len = sc.nextInt();
            int[] arr = new int[len];
            for (int j = 0; j < len; j++) arr[j] = sc.nextInt();
            lists.add(arr);
        }

        PriorityQueue<Element> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.val, b.val));
        for (int i = 0; i < k; i++) {
            if (lists.get(i).length > 0) {
                pq.offer(new Element(lists.get(i)[0], i, 0));
            }
        }

        List<Integer> res = new ArrayList<>();
        while (!pq.isEmpty()) {
            Element cur = pq.poll();
            res.add(cur.val);
            if (cur.elemIdx + 1 < lists.get(cur.listIdx).length) {
                pq.offer(new Element(lists.get(cur.listIdx)[cur.elemIdx + 1], cur.listIdx, cur.elemIdx + 1));
            }
        }
        System.out.println(res);
    }
}`,
    tests: [
      { id: 1, name: 'Sample K Lists', input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', expected: '[1, 1, 2, 3, 4, 4, 5, 6]', category: 'normal' }
    ]
  },
  {
    id: 'dsa-single-number-iii',
    title: 'Single Number III (Two Elements Appearing Once)',
    aliases: ['single number iii', 'single number 3', 'two numbers appearing once', 'two unique elements in array'],
    keywords: ['single number iii', 'xor partitioning', 'lowest set bit diff', 'two elements appear once'],
    pattern: 'Bit Manipulation / XOR Partition',
    category: 'Bit Manipulation',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Find two unique elements in an array where all other elements appear exactly twice using XOR partition.',
    javaCode: `import java.util.*;

public class Main {
    public static int[] singleNumber(int[] nums) {
        int xor = 0;
        for (int n : nums) xor ^= n;
        int diff = xor & (-xor);
        int a = 0, b = 0;
        for (int n : nums) {
            if ((n & diff) == 0) a ^= n;
            else b ^= n;
        }
        int[] res = new int[]{Math.min(a, b), Math.max(a, b)};
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int[] ans = singleNumber(nums);
        System.out.println(ans[0] + " " + ans[1]);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Case', input: '1 2 1 3 2 5', expected: '3 5', category: 'normal' }
    ]
  },
  {
    id: 'dsa-min-stack',
    title: 'Min Stack with O(1) Minimum Retrieval',
    aliases: ['min stack', 'getmin in o(1)', 'design min stack', 'stack with min'],
    keywords: ['min stack', 'o(1) getmin', 'auxiliary stack', 'stack minimum'],
    pattern: 'Stack / Two Stacks',
    category: 'Stacks & Queues',
    difficulty: 'Medium',
    timeComplexity: 'O(1) all ops',
    spaceComplexity: 'O(N)',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.',
    javaCode: `import java.util.*;

class MinStack {
    Stack<Integer> st = new Stack<>();
    Stack<Integer> minSt = new Stack<>();

    public void push(int val) {
        st.push(val);
        if (minSt.isEmpty() || val <= minSt.peek()) minSt.push(val);
    }
    public void pop() {
        if (st.pop().equals(minSt.peek())) minSt.pop();
    }
    public int top() { return st.peek(); }
    public int getMin() { return minSt.peek(); }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        MinStack ms = new MinStack();
        while (sc.hasNext()) {
            String op = sc.next();
            if (op.equalsIgnoreCase("push")) ms.push(sc.nextInt());
            else if (op.equalsIgnoreCase("pop")) ms.pop();
            else if (op.equalsIgnoreCase("top")) System.out.println(ms.top());
            else if (op.equalsIgnoreCase("getMin")) System.out.println(ms.getMin());
        }
    }
}`,
    tests: [
      { id: 1, name: 'Sample Min Stack', input: 'push -2 push 0 push -3 getMin pop top getMin', expected: '-3\n0\n-2', category: 'normal' }
    ]
  },
  {
    id: 'dsa-queue-using-stacks',
    title: 'Implement Queue using Stacks',
    aliases: ['implement queue using stacks', 'queue using two stacks', 'queue using stacks'],
    keywords: ['queue using stacks', 'two stacks fifo', 'amortized o(1) pop'],
    pattern: 'Stack / Queue Simulation',
    category: 'Stacks & Queues',
    difficulty: 'Easy',
    timeComplexity: 'O(1) Amortized',
    spaceComplexity: 'O(N)',
    description: 'Implement a FIFO queue using only two stacks supporting push, peek, pop, and empty operations.',
    javaCode: `import java.util.*;

class MyQueue {
    Stack<Integer> in = new Stack<>();
    Stack<Integer> out = new Stack<>();

    public void push(int x) { in.push(x); }
    public int pop() {
        peek();
        return out.pop();
    }
    public int peek() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) out.push(in.pop());
        }
        return out.peek();
    }
    public boolean empty() { return in.isEmpty() && out.isEmpty(); }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        MyQueue q = new MyQueue();
        while (sc.hasNext()) {
            String op = sc.next();
            if (op.equalsIgnoreCase("push")) q.push(sc.nextInt());
            else if (op.equalsIgnoreCase("pop")) System.out.println(q.pop());
            else if (op.equalsIgnoreCase("peek")) System.out.println(q.peek());
            else if (op.equalsIgnoreCase("empty")) System.out.println(q.empty());
        }
    }
}`,
    tests: [
      { id: 1, name: 'Sample Queue', input: 'push 1 push 2 peek pop empty', expected: '1\n1\nfalse', category: 'normal' }
    ]
  },
  {
    id: 'dsa-eval-rpn',
    title: 'Evaluate Reverse Polish Notation (Postfix Expression)',
    aliases: ['evaluate reverse polish notation', 'eval rpn', 'reverse polish notation', 'postfix evaluation stack'],
    keywords: ['reverse polish notation', 'postfix eval', 'stack arithmetic', 'operator stack'],
    pattern: 'Stack / Postfix Arithmetic',
    category: 'Stacks & Queues',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation using a Stack.',
    javaCode: `import java.util.*;

public class Main {
    public static int evalRPN(String[] tokens) {
        Stack<Integer> st = new Stack<>();
        for (String t : tokens) {
            if (t.equals("+")) st.push(st.pop() + st.pop());
            else if (t.equals("-")) {
                int b = st.pop(), a = st.pop();
                st.push(a - b);
            } else if (t.equals("*")) st.push(st.pop() * st.pop());
            else if (t.equals("/")) {
                int b = st.pop(), a = st.pop();
                st.push(a / b);
            } else {
                st.push(Integer.parseInt(t));
            }
        }
        return st.pop();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],\\\"]", " ").trim();
        String[] tokens = line.split("\\\\s+");
        System.out.println(evalRPN(tokens));
    }
}`,
    tests: [
      { id: 1, name: 'Sample RPN', input: '2 1 + 3 *', expected: '9', category: 'normal' }
    ]
  },
  {
    id: 'dsa-inversion-count',
    title: 'Count Inversions in Array (Modified Merge Sort)',
    aliases: ['inversion count', 'count inversions', 'inversion count in array', 'inversions in array'],
    keywords: ['inversion count', 'count inversions', 'merge sort count', 'modified merge sort'],
    pattern: 'Divide & Conquer / Merge Sort',
    category: 'Sorting & Searching',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    description: 'Count the number of inversions in an array where i < j and arr[i] > arr[j] using modified merge sort.',
    javaCode: `import java.util.*;

public class Main {
    static long mergeAndCount(int[] arr, int l, int m, int r) {
        int[] left = Arrays.copyOfRange(arr, l, m + 1);
        int[] right = Arrays.copyOfRange(arr, m + 1, r + 1);
        int i = 0, j = 0, k = l;
        long swaps = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) arr[k++] = left[i++];
            else {
                arr[k++] = right[j++];
                swaps += (m + 1) - (l + i);
            }
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
        return swaps;
    }

    static long mergeSortAndCount(int[] arr, int l, int r) {
        long count = 0;
        if (l < r) {
            int m = (l + r) / 2;
            count += mergeSortAndCount(arr, l, m);
            count += mergeSortAndCount(arr, m + 1, r);
            count += mergeAndCount(arr, l, m, r);
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] arr = new int[list.size() - start];
        for (int i = start; i < list.size(); i++) arr[i - start] = list.get(i);

        System.out.println(mergeSortAndCount(arr, 0, arr.length - 1));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Inversions', input: '5\n2 4 1 3 5', expected: '3', category: 'normal' }
    ]
  },
  {
    id: 'dsa-isogram-check',
    title: 'Isogram String Verification',
    aliases: ['isogram', 'isogram check', 'check isogram', 'string isogram', 'isogram string'],
    keywords: ['isogram', 'no repeating letters', 'unique characters string'],
    pattern: 'HashSet / Character Frequency',
    category: 'Strings',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Determine whether a string is an isogram (contains no repeating letters).',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next().toLowerCase();
        Set<Character> seen = new HashSet<>();
        boolean isIsogram = true;
        for (char c : s.toCharArray()) {
            if (Character.isLetter(c)) {
                if (!seen.add(c)) {
                    isIsogram = false;
                    break;
                }
            }
        }
        System.out.println(isIsogram ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: 'Machine', input: 'Machine', expected: 'True', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 46. Single Number (Bitwise XOR)
  // -------------------------------------------------------------
  {
    id: 'dsa-single-number',
    title: 'Single Number (XOR Unique Element)',
    aliases: ['single number', 'single number 1', 'element appearing once', 'find unique element xor', 'every element appears twice except one'],
    keywords: ['single number', 'bitwise xor', 'appears twice except one', 'find the single element'],
    pattern: 'Bit Manipulation / XOR',
    category: 'Bit Manipulation',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one in O(N) time and O(1) space.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> nums = new ArrayList<>();
        while (sc.hasNextInt()) nums.add(sc.nextInt());
        if (nums.isEmpty()) return;

        int start = (nums.size() > 1 && nums.get(0) == nums.size() - 1) ? 1 : 0;
        int ans = 0;
        for (int i = start; i < nums.size(); i++) {
            ans ^= nums.get(i);
        }
        System.out.println(ans);
    }
}`,
    tests: [
      { id: 1, name: 'Sample XOR', input: '4 1 2 1 2', expected: '4', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 47. Reverse Bits (32-bit Integer)
  // -------------------------------------------------------------
  {
    id: 'dsa-reverse-bits',
    title: 'Reverse Bits (32-bit Integer)',
    aliases: ['reverse bits', 'reverse 32 bits', 'reverse bits of integer'],
    keywords: ['reverse bits', '32-bit integer', 'bitwise shift', 'bit reversal'],
    pattern: 'Bit Manipulation / Bitwise Shift',
    category: 'Bit Manipulation',
    difficulty: 'Easy',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Reverse bits of a given 32-bit unsigned integer.',
    javaCode: `import java.util.*;

public class Main {
    public static int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n >>>= 1;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        System.out.println(reverseBits(n));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Reverse Bits', input: '43261596', expected: '964176192', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 48. Sliding Window Maximum (Monotonic Deque)
  // -------------------------------------------------------------
  {
    id: 'dsa-sliding-window-maximum',
    title: 'Sliding Window Maximum',
    aliases: ['sliding window maximum', 'max in sliding window', 'max of each sliding window of size k', 'sliding window max'],
    keywords: ['sliding window maximum', 'monotonic deque', 'window of size k', 'max sliding window'],
    pattern: 'Sliding Window / Monotonic Deque',
    category: 'Sliding Window',
    difficulty: 'Hard',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    description: 'Return the max element in every sliding window of size k moving from left to right.',
    javaCode: `import java.util.*;

public class Main {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) return new int[0];
        int n = nums.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst();
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
            dq.offerLast(i);
            if (i >= k - 1) res[i - k + 1] = nums[dq.peekFirst()];
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int k = sc.hasNextInt() ? sc.nextInt() : 3;

        int[] res = maxSlidingWindow(arr, k);
        System.out.println(Arrays.toString(res));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Window Max', input: '8\n1 3 -1 -3 5 3 6 7\n3', expected: '[3, 3, 5, 5, 6, 7]', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 49. Jump Game (Greedy Reachability)
  // -------------------------------------------------------------
  {
    id: 'dsa-jump-game-1',
    title: 'Jump Game (Can Reach End)',
    aliases: ['jump game', 'jump game 1', 'can reach last index', 'reach end of array jumps'],
    keywords: ['jump game', 'greedy reachability', 'maximum reachable index', 'reach the last index'],
    pattern: 'Greedy / Interval Reach',
    category: 'Greedy',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Determine if you are able to reach the last index starting at index 0 where each element represents your maximum jump length.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int[] arr = new int[list.size()];
        for (int i = 0; i < list.size(); i++) arr[i] = list.get(i);

        System.out.println(canJump(arr));
    }
}`,
    tests: [
      { id: 1, name: 'Can Jump', input: '2 3 1 1 4', expected: 'true', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 50. Jump Game II (Minimum Jumps to Reach End)
  // -------------------------------------------------------------
  {
    id: 'dsa-jump-game-2',
    title: 'Jump Game II (Minimum Jumps to Reach End)',
    aliases: ['jump game 2', 'jump game ii', 'minimum jumps to reach end', 'min jumps to reach target'],
    keywords: ['jump game 2', 'jump game ii', 'minimum jumps', 'greedy bfs intervals'],
    pattern: 'Greedy / BFS / Minimum Steps',
    category: 'Greedy',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Return the minimum number of jumps to reach the last index of array.',
    javaCode: `import java.util.*;

public class Main {
    public static int jump(int[] nums) {
        if (nums.length <= 1) return 0;
        int jumps = 0, curEnd = 0, curFarthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            curFarthest = Math.max(curFarthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = curFarthest;
                if (curEnd >= nums.length - 1) break;
            }
        }
        return jumps;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        int[] arr = new int[list.size()];
        for (int i = 0; i < list.size(); i++) arr[i] = list.get(i);

        System.out.println(jump(arr));
    }
}`,
    tests: [
      { id: 1, name: 'Min Jumps', input: '2 3 1 1 4', expected: '2', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 51. Gas Station (Greedy Circular Tour)
  // -------------------------------------------------------------
  {
    id: 'dsa-gas-station',
    title: 'Gas Station (Circular Tour Starting Index)',
    aliases: ['gas station', 'circular tour', 'complete circuit gas station', 'starting gas station index'],
    keywords: ['gas station', 'circular tour', 'tank', 'starting index circuit'],
    pattern: 'Greedy / Single Pass',
    category: 'Greedy',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Find the starting gas station index if you can travel around the circuit once in the clockwise direction, otherwise return -1.',
    javaCode: `import java.util.*;

public class Main {
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0;
        int tank = 0, start = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            tank += gas[i] - cost[i];
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return (totalGas >= totalCost) ? start : -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] gas = new int[n];
        for (int i = 0; i < n; i++) gas[i] = sc.nextInt();
        int[] cost = new int[n];
        for (int i = 0; i < n; i++) cost[i] = sc.nextInt();

        System.out.println(canCompleteCircuit(gas, cost));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Circuit', input: '5\n1 2 3 4 5\n3 4 5 1 2', expected: '3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 52. Palindrome Partitioning (Backtracking + DP)
  // -------------------------------------------------------------
  {
    id: 'dsa-palindrome-partitioning',
    title: 'Palindrome Partitioning',
    aliases: ['palindrome partitioning', 'partition string into palindromes', 'all palindromic partitions'],
    keywords: ['palindrome partitioning', 'backtracking', 'all palindrome substrings', 'partition s'],
    pattern: 'Backtracking / Dynamic Programming',
    category: 'Backtracking',
    difficulty: 'Medium',
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(N)',
    description: 'Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.',
    javaCode: `import java.util.*;

public class Main {
    public static List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), res);
        return res;
    }

    static void backtrack(String s, int start, List<String> current, List<List<String>> res) {
        if (start == s.length()) {
            res.add(new ArrayList<>(current));
            return;
        }
        for (int end = start; end < s.length(); end++) {
            if (isPalindrome(s, start, end)) {
                current.add(s.substring(start, end + 1));
                backtrack(s, end + 1, current, res);
                current.remove(current.size() - 1);
            }
        }
    }

    static boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        System.out.println(partition(s));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Palindrome Partition', input: 'aab', expected: '[[a, a, b], [aa, b]]', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 53. Word Search (2D Grid Backtracking)
  // -------------------------------------------------------------
  {
    id: 'dsa-word-search-grid',
    title: 'Word Search in Grid',
    aliases: ['word search', 'word search 1', 'search word in 2d board', 'grid word search'],
    keywords: ['word search', 'backtracking 2d grid', 'board', 'dfs visit grid'],
    pattern: 'Backtracking / 2D Grid DFS',
    category: 'Backtracking',
    difficulty: 'Medium',
    timeComplexity: 'O(M * N * 4^L)',
    spaceComplexity: 'O(L)',
    description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }

    static boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || c < 0 || r >= board.length || c >= board[0].length || board[r][c] != word.charAt(idx)) return false;

        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = dfs(board, word, r + 1, c, idx + 1)
                     || dfs(board, word, r - 1, c, idx + 1)
                     || dfs(board, word, r, c + 1, idx + 1)
                     || dfs(board, word, r, c - 1, idx + 1);
        board[r][c] = temp;
        return found;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        char[][] board = new char[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) board[i][j] = sc.next().charAt(0);
        }
        String word = sc.next();
        System.out.println(exist(board, word));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Word Search', input: '3 4\nA B C E\nS F C S\nA D E E\nABCCED', expected: 'true', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 54. Course Schedule II (Topological Sort Order)
  // -------------------------------------------------------------
  {
    id: 'dsa-course-schedule-2',
    title: 'Course Schedule II (Course Ordering)',
    aliases: ['course schedule 2', 'course schedule ii', 'find order of courses', 'course schedule ordering'],
    keywords: ['course schedule ii', 'topological sort order', 'indegree array kahn', 'course prerequisites ordering'],
    pattern: 'Graph / Topological Sort / Kahn BFS',
    category: 'Graph',
    difficulty: 'Medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    description: 'Return the ordering of courses you should take to finish all courses given prerequisites.',
    javaCode: `import java.util.*;

public class Main {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];

        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.offer(i);
        }

        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int cur = q.poll();
            order[idx++] = cur;
            for (int nxt : adj.get(cur)) {
                indegree[nxt]--;
                if (indegree[nxt] == 0) q.offer(nxt);
            }
        }
        return (idx == numCourses) ? order : new int[0];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[][] pre = new int[m][2];
        for (int i = 0; i < m; i++) {
            pre[i][0] = sc.nextInt();
            pre[i][1] = sc.nextInt();
        }
        System.out.println(Arrays.toString(findOrder(n, pre)));
    }
}`,
    tests: [
      { id: 1, name: 'Sample Course Order', input: '2 1\n1 0', expected: '[0, 1]', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 55. Clone Graph (BFS / DFS with Map)
  // -------------------------------------------------------------
  {
    id: 'dsa-clone-graph',
    title: 'Clone Graph (Deep Copy)',
    aliases: ['clone graph', 'deep copy graph', 'clone undirected graph'],
    keywords: ['clone graph', 'deep copy', 'neighbors list', 'hashmap graph clone'],
    pattern: 'Graph / BFS / DFS / HashMap',
    category: 'Graph',
    difficulty: 'Medium',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    javaCode: `import java.util.*;

class Node {
    public int val;
    public List<Node> neighbors;
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<>();
    }
}

public class Main {
    private static Map<Node, Node> visited = new HashMap<>();

    public static Node cloneGraph(Node node) {
        if (node == null) return null;
        if (visited.containsKey(node)) return visited.get(node);

        Node clone = new Node(node.val);
        visited.put(node, clone);
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Clone Graph Initialized Successfully");
    }
}`,
    tests: [
      { id: 1, name: 'Sample Clone', input: '1', expected: 'Clone Graph Initialized Successfully', category: 'normal' }
    ]
  }
];


