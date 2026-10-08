import { DSAPatternInfo } from '../types/dsa';

export const DSA_PATTERNS: Record<string, DSAPatternInfo> = {
  'HashMap': {
    name: 'HashMap / Frequency Map',
    category: 'Data Structures',
    description: 'Uses hash-based lookup for O(1) average time search, pair finding, frequency counting, and complement mapping.',
    recognitionSignals: ['pair sum', 'two sum', 'frequency', 'count occurrences', 'contains duplicate', 'anagram', 'lookup in O(1)', 'complement'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['Empty array', 'Duplicate elements', 'Negative numbers', 'Large numbers exceeding 32-bit int', 'No valid pair exists'],
    javaTemplate: `import java.util.*;

class Solution {
    public int[] solve(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`
  },
  'Two Pointers': {
    name: 'Two Pointers',
    category: 'Array / String',
    description: 'Uses two converging or directional pointers (left & right) across a sorted array or sequence to achieve linear time.',
    recognitionSignals: ['sorted array', 'pair with target in sorted', 'palindrome', 'reverse', 'trap rain water', 'container with most water', 'remove duplicates'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    edgeCases: ['Empty array', 'Array of size 1', 'All duplicate values', 'Pointers crossing boundaries', 'Target at extreme ends'],
    javaTemplate: `class Solution {
    public int[] twoPointers(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[] { left + 1, right + 1 };
            else if (sum < target) left++;
            else right--;
        }
        return new int[0];
    }
}`
  },
  'Kadane\'s Algorithm': {
    name: "Kadane's Algorithm",
    category: 'Dynamic Programming',
    description: 'Finds the contiguous subarray with maximum sum in linear time by resetting current sum when it dips below zero.',
    recognitionSignals: ['maximum subarray', 'largest sum contiguous', 'max contiguous subsegment', 'subarray with maximum'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    edgeCases: ['All negative numbers', 'Single element', 'Array with all zeros', 'Extremely large sum requiring long'],
    javaTemplate: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentMax = nums[0];
        int globalMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            globalMax = Math.max(globalMax, currentMax);
        }
        return globalMax;
    }
}`
  },
  'Sliding Window': {
    name: 'Sliding Window',
    category: 'Array / String',
    description: 'Maintains a dynamic or fixed range [left, right] to track optimal subarray or substring metrics without recalculating.',
    recognitionSignals: ['longest substring', 'subarray of size k', 'at most k distinct', 'minimum window substring', 'contiguous subarray sum'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K)',
    edgeCases: ['Window larger than array', 'Empty string/array', 'All identical characters', 'No substring satisfies criteria'],
    javaTemplate: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastIndex = new int[128];
        Arrays.fill(lastIndex, -1);
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
  },
  'Backtracking': {
    name: 'Backtracking',
    category: 'Recursion / Search',
    description: 'Systematically searches candidate solutions by building incrementally and abandoning (backtracking) paths that violate constraints.',
    recognitionSignals: ['n-queens', 'permutations', 'subsets', 'combinations', 'hamiltonian', 'maze', 'brace expansion', 'abbreviation', 'campus bikes', 'generate all', 'path with maximum gold'],
    timeComplexity: 'O(k^N) or O(N!)',
    spaceComplexity: 'O(N)',
    edgeCases: ['N = 0 or 1', 'No valid solution exists', 'Large branching factor requiring memoization/pruning', 'State rollback cleanup error'],
    javaTemplate: `import java.util.*;

class Solution {
    public List<List<Integer>> backtrackSolve(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result, new boolean[nums.length]);
        return result;
    }
    private void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result, boolean[] used) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result, used);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }
}`
  },
  'Binary Search': {
    name: 'Binary Search',
    category: 'Searching',
    description: 'Halves search space at each iteration on sorted collections or monotonic answer predicates.',
    recognitionSignals: ['sorted array', 'search target', 'rotated sorted', 'binary search', 'search on answer', 'find minimum in rotated'],
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    edgeCases: ['Target not present', 'Single element array', 'Target at index 0 or N-1', 'Duplicates present', 'Integer overflow in (low + high) / 2'],
    javaTemplate: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`
  },
  'BFS': {
    name: 'Breadth-First Search (BFS)',
    category: 'Graph / Tree',
    description: 'Traverses level by level using a FIFO Queue to find shortest paths in unweighted graphs or layer-wise tree inspection.',
    recognitionSignals: ['shortest path unweighted', 'level order traversal', 'lonely nodes', 'max area of island', 'distinct islands', 'number of islands', 'connected components', 'word ladder', 'nearest distance'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    edgeCases: ['Empty graph/tree', 'Disconnected components', 'Cycles in graph (require visited array)', 'Source equals target'],
    javaTemplate: `import java.util.*;

class Solution {
    public int bfs(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[m][n];
        // queue.offer(new int[]{startRow, startCol});
        int steps = 0;
        int[][] dirs = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int k = 0; k < size; k++) {
                int[] curr = queue.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0], nc = curr[1] + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
            steps++;
        }
        return steps;
    }
}`
  },
  'DFS': {
    name: 'Depth-First Search (DFS)',
    category: 'Graph / Tree',
    description: 'Explores as far as possible along each branch before backtracking using recursive stack or explicit LIFO Stack.',
    recognitionSignals: ['the maze', 'boundary of binary tree', 'symmetric tree', 'balanced binary tree', 'path sum', 'depth of graph', 'cycle detection', 'topological sort'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V) recursion stack',
    edgeCases: ['Deep recursion stack overflow', 'Cyclic graphs without visited set', 'Tree with single node or null root', 'Multiple disconnected components'],
    javaTemplate: `import java.util.*;

class Solution {
    public void dfs(int node, List<List<Integer>> adj, boolean[] visited, List<Integer> order) {
        visited[node] = true;
        order.add(node);
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited, order);
            }
        }
    }
}`
  },
  'Dynamic Programming': {
    name: 'Dynamic Programming (1D / 2D)',
    category: 'Optimization',
    description: 'Breaks complex problem into overlapping subproblems with optimal substructure, caching sub-results in memo table.',
    recognitionSignals: ['climbing stairs', 'coin change', 'house robber', 'longest common subsequence', '0/1 knapsack', 'minimum path sum', 'edit distance', 'partition equal subset'],
    timeComplexity: 'O(N) or O(M * N)',
    spaceComplexity: 'O(N) or O(M * N)',
    edgeCases: ['n = 0 or 1', 'target = 0', 'impossible to reach target', 'boundary indices out of bounds in dp table'],
    javaTemplate: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
  },
  'Trees': {
    name: 'Binary Trees & BST',
    category: 'Tree',
    description: 'Hierarchical node traversal (inorder, preorder, postorder, level order) and BST property validation.',
    recognitionSignals: ['binary tree', 'lowest common ancestor', 'symmetric tree', 'balanced binary tree', 'binary tree right side view', 'largest value in each tree row', 'average of levels', 'diameter of binary tree'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) where H is tree height',
    edgeCases: ['Root is null', 'Single node tree', 'Skewed linear tree (H = N)', 'Duplicate values in tree'],
    javaTemplate: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfs(root, result, 0);
        return result;
    }
    private void dfs(TreeNode node, List<Integer> result, int depth) {
        if (node == null) return;
        if (depth == result.size()) {
            result.add(node.val);
        }
        dfs(node.right, result, depth + 1);
        dfs(node.left, result, depth + 1);
    }
}`
  },
  'Stack / Monotonic Stack': {
    name: 'Stack / Monotonic Stack',
    category: 'Data Structures',
    description: 'Maintains monotonic increasing or decreasing elements to solve next greater element, daily temperatures, or balanced parentheses in O(N).',
    recognitionSignals: ['valid parentheses', 'next greater element', 'daily temperatures', 'largest rectangle in histogram', 'trapping rain water', 'remove duplicate letters'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['Empty string/array', 'Unbalanced opening or closing parentheses', 'All elements decreasing/increasing'],
    javaTemplate: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
  },
  'Prefix Sum': {
    name: 'Prefix Sum',
    category: 'Array',
    description: 'Precomputes cumulative running sums to answer range sum queries and subarray sum equals k in O(1) time.',
    recognitionSignals: ['range sum query', 'subarray sum equals k', 'contiguous array', 'equilibrium index'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N) or O(1)',
    edgeCases: ['Subarray starting at index 0', 'Negative sums', 'Zero sum subarrays', 'Single element matching target'],
    javaTemplate: `import java.util.*;

class Solution {
    public int subarraySum(int[] nums, int k) {
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
}`
  },
  'Divide and Conquer': {
    name: 'Divide and Conquer',
    category: 'Algorithm Strategy',
    description: 'Splits problem into independent subproblems (Divide), solves them recursively (Conquer), and merges results (Combine).',
    recognitionSignals: ['quick sort', 'merge sort', 'majority element', 'pow(x, n)', 'divide and conquer', 'master theorem'],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(log N) to O(N)',
    edgeCases: ['Array size 0 or 1', 'Odd vs even partition lengths', 'Base case termination', 'Negative exponents in pow(x, n)'],
    javaTemplate: `class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double ans = 1;
        double currentProduct = x;
        for (long i = N; i > 0; i /= 2) {
            if (i % 2 == 1) ans = ans * currentProduct;
            currentProduct = currentProduct * currentProduct;
        }
        return ans;
    }
}`
  },
  'Trie': {
    name: 'Trie (Prefix Tree)',
    category: 'Tree / String',
    description: 'Tree data structure for high-efficiency prefix searches, autocomplete, and string dictionary lookups.',
    recognitionSignals: ['implement trie', 'word search ii', 'prefix search', 'replace words', 'design add and search words'],
    timeComplexity: 'O(L) per search/insert (L = word length)',
    spaceComplexity: 'O(N * L)',
    edgeCases: ['Empty string', 'Prefix matching entire word', 'Character outside [a-z] alphabet'],
    javaTemplate: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    private TrieNode root = new TrieNode();
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) node.children[idx] = new TrieNode();
            node = node.children[idx];
        }
        node.isEnd = true;
    }
}`
  },
  'Intervals': {
    name: 'Intervals / Interval Scheduling',
    category: 'Greedy / Sorting',
    description: 'Sorts intervals by start or end time to merge overlapping segments or find maximum non-overlapping appointments.',
    recognitionSignals: ['merge intervals', 'insert interval', 'non-overlapping intervals', 'meeting rooms'],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['No overlapping intervals', 'All intervals completely enclosed', 'Single interval', 'Touching boundaries e.g. [1,4] and [4,5]'],
    javaTemplate: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();
        int[] curr = intervals[0];
        result.add(curr);
        for (int[] interval : intervals) {
            if (interval[0] <= curr[1]) {
                curr[1] = Math.max(curr[1], interval[1]);
            } else {
                curr = interval;
                result.add(curr);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`
  }
};
