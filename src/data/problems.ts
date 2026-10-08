import { Difficulty, TestCase } from '../types/dsa';

export interface DSAProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  pattern: string;
  topics: string[];
  description: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  javaSolutionLeetCode: string;
  javaSolutionMain: string;
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
  tests: TestCase[];
  source?: 'LeetCode' | 'KMIT DAA';
}

export const DSA_PROBLEMS_CATALOG: DSAProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    pattern: 'HashMap',
    topics: ['Array', 'Hash Table'],
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0,1]',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['Negative numbers in nums', 'Target is negative', 'Target is 0 with opposite numbers e.g. [-3, 3]', 'Duplicate numbers that sum to target e.g. [3, 3], target = 6'],
    javaSolutionLeetCode: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
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
}`,
    javaSolutionMain: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                System.out.println("[" + map.get(comp) + ", " + i + "]");
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
    tests: [
      { id: 1, name: 'Basic Case', input: '4\n2 7 11 15\n9', expected: '[0, 1]', category: 'normal' },
      { id: 2, name: 'Non-Adjacent', input: '3\n3 2 4\n6', expected: '[1, 2]', category: 'normal' },
      { id: 3, name: 'Duplicate Numbers', input: '2\n3 3\n6', expected: '[0, 1]', category: 'duplicate' },
      { id: 4, name: 'Negative Values', input: '4\n-1 -2 -3 -4\n-5', expected: '[1, 2]', category: 'negative' },
      { id: 5, name: 'Zero Target', input: '4\n-5 1 2 5\n0', expected: '[0, 3]', category: 'boundary' }
    ]
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Medium',
    pattern: "Kadane's Algorithm",
    topics: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleInput: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
    sampleOutput: '6',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    edgeCases: ['All negative numbers e.g. [-5, -1, -8]', 'Single element array', 'All positive numbers', 'Alternating positives and negatives'],
    javaSolutionLeetCode: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
}`,
    javaSolutionMain: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < n; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        System.out.println(maxSoFar);
    }
}`,
    tests: [
      { id: 1, name: 'Mixed Array', input: '9\n-2 1 -3 4 -1 2 1 -5 4', expected: '6', category: 'normal' },
      { id: 2, name: 'Single Element', input: '1\n1', expected: '1', category: 'boundary' },
      { id: 3, name: 'All Negative', input: '5\n-5 -4 -1 -7 -8', expected: '-1', category: 'negative' },
      { id: 4, name: 'All Positive', input: '4\n5 4 1 78', expected: '88', category: 'normal' }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    pattern: 'Stack / Monotonic Stack',
    topics: ['String', 'Stack'],
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only "()[]{}"'],
    sampleInput: 's = "()[]{}"',
    sampleOutput: 'true',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['Odd length strings (automatically false)', 'Single closing bracket e.g. "]"', 'Single opening bracket e.g. "{"', 'Mismatched order e.g. "([)]"'],
    javaSolutionLeetCode: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        if (s.length() % 2 != 0) return false;
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    javaSolutionMain: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        System.out.println(isValid(s));
    }
    
    public static boolean isValid(String s) {
        if (s.length() % 2 != 0) return false;
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    tests: [
      { id: 1, name: 'Simple Parentheses', input: '()[]{}', expected: 'true', category: 'normal' },
      { id: 2, name: 'Mismatched Types', input: '(]', expected: 'false', category: 'edge' },
      { id: 3, name: 'Nested Correctly', input: '([{}])', expected: 'true', category: 'normal' },
      { id: 4, name: 'Single Unclosed', input: '[', expected: 'false', category: 'boundary' },
      { id: 5, name: 'Interleaved Invalid', input: '([)]', expected: 'false', category: 'edge' }
    ]
  },
  {
    id: 'n-queens',
    title: 'N-Queens Problem',
    slug: 'n-queens',
    difficulty: 'Hard',
    pattern: 'Backtracking',
    topics: ['Array', 'Backtracking'],
    description: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\nReturn all distinct solutions to the n-queens puzzle.',
    constraints: ['1 <= n <= 9'],
    sampleInput: 'n = 4',
    sampleOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N^2)',
    edgeCases: ['n = 1 (trivial 1x1 solution)', 'n = 2 or n = 3 (no solutions exist)', 'n = 4 (2 symmetric solutions)'],
    javaSolutionLeetCode: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        backtrack(board, 0, n, result);
        return result;
    }
    
    private void backtrack(char[][] board, int col, int n, List<List<String>> result) {
        if (col == n) {
            result.add(construct(board));
            return;
        }
        for (int row = 0; row < n; row++) {
            if (isSafe(board, row, col, n)) {
                board[row][col] = 'Q';
                backtrack(board, col + 1, n, result);
                board[row][col] = '.';
            }
        }
    }
    
    private boolean isSafe(char[][] board, int row, int col, int n) {
        for (int j = 0; j < col; j++) if (board[row][j] == 'Q') return false;
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j] == 'Q') return false;
        return true;
    }
    
    private List<String> construct(char[][] board) {
        List<String> list = new ArrayList<>();
        for (char[] row : board) list.add(new String(row));
        return list;
    }
}`,
    javaSolutionMain: `import java.util.*;

public class Main {
    static int N;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        N = sc.nextInt();
        int[][] board = new int[N][N];
        if (!solve(board, 0)) {
            System.out.println("No Solution");
        } else {
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < N; j++) System.out.print(board[i][j]);
                System.out.println();
            }
        }
    }
    static boolean solve(int[][] b, int col) {
        if (col >= N) return true;
        for (int i = 0; i < N; i++) {
            if (isSafe(b, i, col)) {
                b[i][col] = 1;
                if (solve(b, col + 1)) return true;
                b[i][col] = 0;
            }
        }
        return false;
    }
    static boolean isSafe(int[][] b, int r, int c) {
        for (int i = 0; i < c; i++) if (b[r][i] == 1) return false;
        for (int i = r, j = c; i >= 0 && j >= 0; i--, j--) if (b[i][j] == 1) return false;
        for (int i = r, j = c; i < N && j >= 0; i++, j--) if (b[i][j] == 1) return false;
        return true;
    }
}`,
    tests: [
      { id: 1, name: 'n = 4', input: '4', expected: '0100\n0001\n1000\n0010', category: 'normal' },
      { id: 2, name: 'n = 1', input: '1', expected: '1', category: 'boundary' },
      { id: 3, name: 'n = 3', input: '3', expected: 'No Solution', category: 'edge' }
    ]
  },
  {
    id: 'binary-tree-right-side-view',
    title: 'Binary Tree Right Side View',
    slug: 'binary-tree-right-side-view',
    difficulty: 'Medium',
    pattern: 'Trees',
    topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    description: 'Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.',
    constraints: ['The number of nodes in the tree is in the range [0, 100].', '-100 <= Node.val <= 100'],
    sampleInput: 'root = [1,2,3,null,5,null,4]',
    sampleOutput: '[1,3,4]',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    edgeCases: ['Tree with only left children (left children still visible if no right)', 'Empty tree', 'Single root node'],
    javaSolutionLeetCode: `import java.util.*;

class Solution {
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
}`,
    javaSolutionMain: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String[] parts = sc.nextLine().trim().split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1")) {
            System.out.println("[]");
            return;
        }
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node curr = q.poll();
            if (i < parts.length && !parts[i].equals("-1")) {
                curr.left = new Node(Integer.parseInt(parts[i]));
                q.offer(curr.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1")) {
                curr.right = new Node(Integer.parseInt(parts[i]));
                q.offer(curr.right);
            }
            i++;
        }
        List<Integer> res = new ArrayList<>();
        rightView(root, res, 0);
        System.out.println(res);
    }
    static void rightView(Node curr, List<Integer> res, int depth) {
        if (curr == null) return;
        if (depth == res.size()) res.add(curr.data);
        rightView(curr.right, res, depth + 1);
        rightView(curr.left, res, depth + 1);
    }
}`,
    tests: [
      { id: 1, name: 'Standard Tree', input: '1 2 3 -1 5 -1 4', expected: '[1, 3, 4]', category: 'normal' },
      { id: 2, name: 'Single Node', input: '1', expected: '[1]', category: 'boundary' },
      { id: 3, name: 'Left Skewed', input: '1 2 -1 3 -1 4', expected: '[1, 2, 3, 4]', category: 'edge' }
    ]
  },
  {
    id: 'lonely-nodes',
    title: 'Find All The Lonely Nodes',
    slug: 'find-all-the-lonely-nodes',
    difficulty: 'Easy',
    pattern: 'BFS',
    topics: ['Tree', 'Breadth-First Search', 'Depth-First Search'],
    description: 'In a binary tree, a lonely node is a node that is the only child of its parent node. The root node is not lonely because it does not have a parent node.\nReturn an array containing the values of all lonely nodes in the tree sorted in ascending order.',
    constraints: ['1 <= Number of nodes <= 1000', '1 <= Node.val <= 10^6'],
    sampleInput: '2 3 4 -1 5',
    sampleOutput: '[5]',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['Full binary tree with no lonely nodes', 'Single node tree', 'Tree with multiple lonely leaves'],
    javaSolutionLeetCode: `import java.util.*;

class Solution {
    public List<Integer> getLonelyNodes(TreeNode root) {
        List<Integer> list = new ArrayList<>();
        if (root == null) return list;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode cur = q.poll();
            if (cur.left != null && cur.right == null) {
                list.add(cur.left.val);
                q.offer(cur.left);
            } else if (cur.left == null && cur.right != null) {
                list.add(cur.right.val);
                q.offer(cur.right);
            } else if (cur.left != null && cur.right != null) {
                q.offer(cur.left);
                q.offer(cur.right);
            }
        }
        Collections.sort(list);
        return list;
    }
}`,
    javaSolutionMain: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String[] arr = sc.nextLine().trim().split("\\\\s+");
        Node root = buildTree(arr);
        List<Integer> res = getLonely(root);
        Collections.sort(res);
        System.out.println(res);
    }
    
    static Node buildTree(String[] arr) {
        if (arr.length == 0 || arr[0].equals("-1")) return null;
        Node root = new Node(Integer.parseInt(arr[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < arr.length) {
            Node curr = q.poll();
            if (i < arr.length && !arr[i].equals("-1")) {
                curr.left = new Node(Integer.parseInt(arr[i]));
                q.offer(curr.left);
            }
            i++;
            if (i < arr.length && !arr[i].equals("-1")) {
                curr.right = new Node(Integer.parseInt(arr[i]));
                q.offer(curr.right);
            }
            i++;
        }
        return root;
    }
    
    static List<Integer> getLonely(Node root) {
        List<Integer> list = new ArrayList<>();
        if (root == null) return list;
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            Node cur = q.poll();
            if (cur.left != null && cur.right == null) {
                list.add(cur.left.data);
                q.offer(cur.left);
            } else if (cur.left == null && cur.right != null) {
                list.add(cur.right.data);
                q.offer(cur.right);
            } else if (cur.left != null && cur.right != null) {
                q.offer(cur.left);
                q.offer(cur.right);
            }
        }
        return list;
    }
}`,
    tests: [
      { id: 1, name: 'Single Lonely Child', input: '2 3 4 -1 5', expected: '[5]', category: 'normal' },
      { id: 2, name: 'Multiple Lonely', input: '1 2 3 -1 4 -1 5', expected: '[4, 5]', category: 'normal' },
      { id: 3, name: 'Balanced No Lonely', input: '1 2 3 4 5 6 7', expected: '[]', category: 'boundary' }
    ]
  },
  {
    id: 'reverse-string-recursion',
    title: 'Reverse String Recursion',
    slug: 'reverse-string-recursion',
    difficulty: 'Easy',
    pattern: 'Recursion',
    topics: ['String', 'Recursion'],
    description: 'Given a string s, reverse the order of its characters and return the resulting string using general recursion.',
    constraints: ['1 <= s.length <= 10^4'],
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    timeComplexity: 'O(N^2) or O(N)',
    spaceComplexity: 'O(N)',
    edgeCases: ['Single character string', 'Palindrome string', 'String with whitespaces'],
    javaSolutionLeetCode: `class Solution {
    public String reverseString(String s) {
        if (s.length() <= 1) return s;
        return reverseString(s.substring(1)) + s.charAt(0);
    }
}`,
    javaSolutionMain: `import java.util.Scanner;

public class Main {
    public static String reverse(String s) {
        if (s.length() <= 1) return s;
        return reverse(s.substring(1)) + s.charAt(0);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNext()) {
            System.out.println(reverse(sc.next()));
        }
    }
}`,
    tests: [
      { id: 1, name: 'hello', input: 'hello', expected: 'olleh', category: 'normal' },
      { id: 2, name: 'OpenAI', input: 'OpenAI', expected: 'IAnepO', category: 'normal' },
      { id: 3, name: 'Single char', input: 'a', expected: 'a', category: 'boundary' }
    ]
  },
  {
    id: 'happy-number',
    title: 'Happy Number',
    slug: 'happy-number',
    difficulty: 'Easy',
    pattern: 'Recursion',
    topics: ['Math', 'Hash Table', 'Two Pointers'],
    description: 'A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1, or it loops endlessly in a cycle which does not include 1.',
    constraints: ['1 <= n <= 2^31 - 1'],
    sampleInput: '19',
    sampleOutput: 'true',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(log N)',
    edgeCases: ['n = 1 (instantly happy)', 'n = 4 (unhappy cycle 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4)'],
    javaSolutionLeetCode: `class Solution {
    public boolean isHappy(int n) {
        if (n == 1) return true;
        if (n == 4) return false;
        return isHappy(sumOfDigits(n));
    }
    private int sumOfDigits(int num) {
        int sum = 0;
        while (num > 0) {
            int digit = num % 10;
            sum += digit * digit;
            num /= 10;
        }
        return sum;
    }
}`,
    javaSolutionMain: `import java.util.Scanner;

public class Main {
    static boolean isHappy(int num) {
        if (num == 1) return true;
        if (num == 4) return false;
        return isHappy(sumOfDigits(num));
    }
    static int sumOfDigits(int num) {
        int sum = 0;
        while (num > 0) {
            int d = num % 10;
            sum += d * d;
            num /= 10;
        }
        return sum;
    }
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        if (in.hasNextInt()) {
            int n = in.nextInt();
            System.out.println(isHappy(n) ? "Happy Number" : "Not a Happy Number");
        }
    }
}`,
    tests: [
      { id: 1, name: '13 is Happy', input: '13', expected: 'Happy Number', category: 'normal' },
      { id: 2, name: '36 is Not Happy', input: '36', expected: 'Not a Happy Number', category: 'normal' },
      { id: 3, name: '1 is Happy', input: '1', expected: 'Happy Number', category: 'boundary' },
      { id: 4, name: '19 is Happy', input: '19', expected: 'Happy Number', category: 'normal' }
    ]
  },
  {
    id: 'gcd-euclidean',
    title: 'Greatest Common Divisor (GCD)',
    slug: 'gcd-euclidean',
    difficulty: 'Easy',
    pattern: 'Divide and Conquer',
    topics: ['Math', 'Recursion', 'Number Theory'],
    description: 'Given two positive integers a and b, return their Greatest Common Divisor (GCD) using the Euclidean recursive algorithm.',
    constraints: ['0 <= a, b <= 10^9'],
    sampleInput: '48 18',
    sampleOutput: '6',
    timeComplexity: 'O(log(min(A, B)))',
    spaceComplexity: 'O(log(min(A, B)))',
    edgeCases: ['a = 0 or b = 0', 'a == b', 'Coprime numbers e.g. 17 and 13 (GCD = 1)'],
    javaSolutionLeetCode: `class Solution {
    public int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
}`,
    javaSolutionMain: `import java.util.Scanner;

public class Main {
    public static int gcd(int a, int b) {
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println(gcd(a, b));
        }
    }
}`,
    tests: [
      { id: 1, name: '48 and 18', input: '48 18', expected: '6', category: 'normal' },
      { id: 2, name: '63 and 21', input: '63 21', expected: '21', category: 'normal' },
      { id: 3, name: 'Coprimes 17 and 13', input: '17 13', expected: '1', category: 'boundary' },
      { id: 4, name: 'Zero operand', input: '23 0', expected: '23', category: 'edge' }
    ]
  }
];
