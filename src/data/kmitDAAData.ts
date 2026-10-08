// KMIT KR24 Regulations DAA Lab & Course Data
import { Difficulty, TestCase } from '../types/dsa';

export interface CollegeAssignment {
  id: string;
  code: string;
  labSection: string;
  title: string;
  unit: string;
  topic: string;
  difficulty: Difficulty;
  pattern: string;
  status: 'Started' | 'Submitted' | 'Verified';
  timestamp: string;
  description: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  javaCodeTemplate: string;
  verifiedSolution: string;
  tests: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
}

export const KMIT_COLLEGE_ASSIGNMENTS: CollegeAssignment[] = [
  {
    id: 'kmit-att-01',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: '05_10_2026 Attendance program',
    unit: 'Unit-I',
    topic: 'Recursion & Basic Algorithms',
    difficulty: 'Easy',
    pattern: 'Recursion',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 4:35 PM',
    description: 'Given attendance records of N students, verify present status and compute total consecutive present students using recursion.',
    constraints: ['1 <= N <= 1000', 'Attendance string consists of P, A, L'],
    sampleInput: '5\nPPALLP',
    sampleOutput: '2',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    // Recursive function to compute maximum consecutive present ('P') students
    public static int maxConsecutivePresent(String s, int index, int currentStreak, int maxStreak) {
        if (index >= s.length()) return Math.max(maxStreak, currentStreak);
        if (s.charAt(index) == 'P') {
            return maxConsecutivePresent(s, index + 1, currentStreak + 1, Math.max(maxStreak, currentStreak + 1));
        } else {
            return maxConsecutivePresent(s, index + 1, 0, maxStreak);
        }
    }

    // Recursive function to count presence
    public static int countChar(String s, int index, char target) {
        if (index >= s.length()) return 0;
        return (s.charAt(index) == target ? 1 : 0) + countChar(s, index + 1, target);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int n = sc.hasNextInt() ? sc.nextInt() : 0;
        String s = sc.hasNext() ? sc.next() : "";
        if (s.isEmpty() && n > 0) s = String.valueOf(n);

        int consecutive = maxConsecutivePresent(s, 0, 0, 0);
        System.out.println(consecutive);
    }
}`,
    verifiedSolution: `import java.util.*;

public class Main {
    // Recursive function to compute maximum consecutive present ('P') students
    public static int maxConsecutivePresent(String s, int index, int currentStreak, int maxStreak) {
        if (index >= s.length()) return Math.max(maxStreak, currentStreak);
        if (s.charAt(index) == 'P') {
            return maxConsecutivePresent(s, index + 1, currentStreak + 1, Math.max(maxStreak, currentStreak + 1));
        } else {
            return maxConsecutivePresent(s, index + 1, 0, maxStreak);
        }
    }

    // Recursive function to count presence
    public static int countChar(String s, int index, char target) {
        if (index >= s.length()) return 0;
        return (s.charAt(index) == target ? 1 : 0) + countChar(s, index + 1, target);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int n = sc.hasNextInt() ? sc.nextInt() : 0;
        String s = sc.hasNext() ? sc.next() : "";
        if (s.isEmpty() && n > 0) s = String.valueOf(n);

        int consecutive = maxConsecutivePresent(s, 0, 0, 0);
        System.out.println(consecutive);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Attendance PPALLP', input: '5\nPPALLP', expected: '2', category: 'normal' },
      { id: 2, name: 'All Present', input: '5\nPPPPP', expected: '5', category: 'normal' },
      { id: 3, name: 'Alternating', input: '4\nPLPL', expected: '1', category: 'boundary' },
      { id: 4, name: 'All Absent', input: '3\nAAA', expected: '0', category: 'edge' }
    ]
  },
  {
    id: 'kmit-ap47-encrypt',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: 'U3_DAA_Backtracking_AP47_Encrypt',
    unit: 'Unit-III',
    topic: 'Backtracking & Generalized Abbreviation',
    difficulty: 'Medium',
    pattern: 'Backtracking',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 3:35 PM',
    description: 'Write a function to generate the generalized abbreviations (encrypted forms) of a given word using recursive backtracking.\nEvery character can either remain as is or be replaced by the count of consecutive abbreviated characters.',
    constraints: ['1 <= word.length <= 15', 'word consists of lowercase English letters'],
    sampleInput: 'kmit',
    sampleOutput: '[1m1t, 1m2, 1mi1, 1mit, 2i1, 2it, 3t, 4, k1i1, k1it, k2t, k3, km1t, km2, kmi1, kmit]',
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(N)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        List<String> res = new ArrayList<>();
        backtrack(res, word, 0, "", 0);
        Collections.sort(res);
        System.out.println(res);
    }

    private static void backtrack(List<String> res, String word, int pos, String cur, int count) {
        if (pos == word.length()) {
            if (count > 0) cur += count;
            res.add(cur);
            return;
        }
        // Option 1: abbreviate current character
        backtrack(res, word, pos + 1, cur, count + 1);
        // Option 2: keep current character
        backtrack(res, word, pos + 1, cur + (count > 0 ? count : "") + word.charAt(pos), 0);
    }
}`,
    verifiedSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        List<String> list = new ArrayList<>();
        backtrack(list, s, 0, "", 0);
        Collections.sort(list);
        System.out.println(list);
    }
    
    private static void backtrack(List<String> ret, String word, int pos, String cur, int count) {
        if (pos == word.length()) {
            if (count > 0) cur += count;
            ret.add(cur);
            return;
        }
        backtrack(ret, word, pos + 1, cur, count + 1);
        backtrack(ret, word, pos + 1, cur + (count > 0 ? count : "") + word.charAt(pos), 0);
    }
}`,
    tests: [
      { id: 1, name: 'Input kmit', input: 'kmit', expected: '[1m1t, 1m2, 1mi1, 1mit, 2i1, 2it, 3t, 4, k1i1, k1it, k2t, k3, km1t, km2, kmi1, kmit]', category: 'normal' },
      { id: 2, name: 'Input cse', input: 'cse', expected: '[1s1, 1se, 2e, 3, c1e, c2, cs1, cse]', category: 'normal' },
      { id: 3, name: 'Single letter', input: 'r', expected: '[1, r]', category: 'edge' }
    ]
  },
  {
    id: 'kmit-ap46-difference',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: 'U3_DAA_Backtracking_AP46_Difference',
    unit: 'Unit-III',
    topic: 'Gray Code & Bit Difference',
    difficulty: 'Medium',
    pattern: 'Bit Manipulation / Backtracking',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 3:35 PM',
    description: 'An n-bit gray code sequence is a sequence of 2^n integers where adjacent numbers differ by exactly one bit in binary representation. Return the valid n-bit gray code sequence starting with 0.',
    constraints: ['1 <= n <= 16'],
    sampleInput: '2',
    sampleOutput: '[0, 1, 3, 2]',
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(2^N)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    static int nums = 0;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Integer> ret = new ArrayList<>();
        backTrack(n, ret);
        System.out.println(ret);
    }
    
    private static void backTrack(int n, List<Integer> ret) {
        if (n == 0) {
            ret.add(nums);
            return;
        }
        backTrack(n - 1, ret);
        nums = nums ^ (1 << (n - 1));
        backTrack(n - 1, ret);
    }
}`,
    verifiedSolution: `import java.util.*;

public class Main {
    static int nums = 0;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        nums = 0;
        List<Integer> ret = new ArrayList<>();
        backTrack(n, ret);
        System.out.println(ret);
    }
    private static void backTrack(int n, List<Integer> ret) {
        if (n == 0) {
            ret.add(nums);
            return;
        }
        backTrack(n - 1, ret);
        nums = nums ^ (1 << (n - 1));
        backTrack(n - 1, ret);
    }
}`,
    tests: [
      { id: 1, name: 'n = 2', input: '2', expected: '[0, 1, 3, 2]', category: 'normal' },
      { id: 2, name: 'n = 1', input: '1', expected: '[0, 1]', category: 'boundary' },
      { id: 3, name: 'n = 3', input: '3', expected: '[0, 1, 3, 2, 6, 7, 5, 4]', category: 'normal' }
    ]
  },
  {
    id: 'kmit-ap50-exam-selection',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: 'U3_DAA_Backtracking_AP50_Exam Question Selection',
    unit: 'Unit-III',
    topic: 'Brace Expansion & DFS',
    difficulty: 'Medium',
    pattern: 'Backtracking / DFS',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 3:35 PM',
    description: 'You are given a string representing question choices with options in curly braces {a,b,c}. Return all unique question combinations that can be formed in lexicographical order.',
    constraints: ['1 <= s.length <= 50', 'Curly braces properly formatted'],
    sampleInput: '{a,b}c{d,e}f',
    sampleOutput: '[acdf, acef, bcdf, bcef]',
    timeComplexity: 'O(k^(N/k))',
    spaceComplexity: 'O(N)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        List<String> res = new ArrayList<>();
        dfs(s, 0, new StringBuilder(), res);
        Collections.sort(res);
        System.out.println(res);
    }

    private static void dfs(String s, int index, StringBuilder sb, List<String> res) {
        if (index == s.length()) {
            if (sb.length() > 0) res.add(sb.toString());
            return;
        }
        char c = s.charAt(index);
        int pos = sb.length();
        if (c == '{') {
            List<Character> options = new ArrayList<>();
            int end = index + 1;
            while (end < s.length() && s.charAt(end) != '}') {
                if (Character.isLetter(s.charAt(end))) options.add(s.charAt(end));
                end++;
            }
            Collections.sort(options);
            for (char opt : options) {
                sb.append(opt);
                dfs(s, end + 1, sb, res);
                sb.setLength(pos);
            }
        } else if (Character.isLetter(c)) {
            sb.append(c);
            dfs(s, index + 1, sb, res);
            sb.setLength(pos);
        } else {
            dfs(s, index + 1, sb, res);
        }
    }
}`,
    verifiedSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        List<String> res = new ArrayList<>();
        dfs(s, 0, new StringBuilder(), res);
        Collections.sort(res);
        System.out.println(res);
    }
    private static void dfs(String s, int index, StringBuilder sb, List<String> res) {
        if (index == s.length()) {
            if (sb.length() > 0) res.add(sb.toString());
            return;
        }
        char c = s.charAt(index);
        int pos = sb.length();
        if (c == '{') {
            List<Character> options = new ArrayList<>();
            int end = index + 1;
            while (end < s.length() && s.charAt(end) != '}') {
                if (Character.isLetter(s.charAt(end))) options.add(s.charAt(end));
                end++;
            }
            Collections.sort(options);
            for (char opt : options) {
                sb.append(opt);
                dfs(s, end + 1, sb, res);
                sb.setLength(pos);
            }
        } else if (Character.isLetter(c)) {
            sb.append(c);
            dfs(s, index + 1, sb, res);
            sb.setLength(pos);
        } else {
            dfs(s, index + 1, sb, res);
        }
    }
}`,
    tests: [
      { id: 1, name: 'Standard braces', input: '{a,b}c{d,e}f', expected: '[acdf, acef, bcdf, bcef]', category: 'normal' },
      { id: 2, name: 'Single word', input: 'abcd', expected: '[abcd]', category: 'boundary' }
    ]
  },
  {
    id: 'kmit-nqueens',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: 'U3_DAA_N_Queens_Problem',
    unit: 'Unit-III',
    topic: 'Classical Backtracking',
    difficulty: 'Hard',
    pattern: 'Backtracking',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 2:15 PM',
    description: 'Arrange N queens on an N x N chessboard such that no two queens attack each other (no same row, column, or diagonal). Output 1 for solution, or print the board matrices.',
    constraints: ['1 <= N <= 10'],
    sampleInput: '4',
    sampleOutput: '0100\n0001\n1000\n0010',
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N^2)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    static int N;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        N = sc.nextInt();
        int[][] board = new int[N][N];
        if (!solve(board, 0)) {
            System.out.println("No Solution");
        } else {
            printBoard(board);
        }
    }
    
    static boolean solve(int[][] board, int col) {
        if (col >= N) return true;
        for (int i = 0; i < N; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 1;
                if (solve(board, col + 1)) return true;
                board[i][col] = 0;
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
    
    static void printBoard(int[][] b) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) System.out.print(b[i][j]);
            System.out.println();
        }
    }
}`,
    verifiedSolution: `import java.util.*;

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
            printBoard(board);
        }
    }
    static boolean solve(int[][] board, int col) {
        if (col >= N) return true;
        for (int i = 0; i < N; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 1;
                if (solve(board, col + 1)) return true;
                board[i][col] = 0;
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
    static void printBoard(int[][] b) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) System.out.print(b[i][j]);
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: 'N = 4', input: '4', expected: '0100\n0001\n1000\n0010', category: 'normal' },
      { id: 2, name: 'N = 1', input: '1', expected: '1', category: 'boundary' },
      { id: 3, name: 'N = 3 (No sol)', input: '3', expected: 'No Solution', category: 'edge' }
    ]
  },
  {
    id: 'kmit-max-area-island',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: 'U3_DAA_BFS_Max_Area_Of_Island',
    unit: 'Unit-III',
    topic: 'Breadth First Search on 2D Matrix',
    difficulty: 'Medium',
    pattern: 'BFS / Matrix Traversal',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 1:45 PM',
    description: 'You are given an m x n binary matrix grid. An island is a group of 1s connected 4-directionally. Return the maximum area of an island in grid. If no island, return 0.',
    constraints: ['m == grid.length, n == grid[i].length', '1 <= m, n <= 50', 'grid[i][j] is either 0 or 1'],
    sampleInput: '4\n5\n1 1 0 0 0\n1 1 0 0 0\n0 0 0 1 1\n0 0 0 1 1',
    sampleOutput: 'Max Area of island is 4',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] g = new int[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) g[i][j] = sc.nextInt();
        }
        System.out.println("Max Area of island is " + maxArea(g));
    }
    
    public static int maxArea(int[][] grid) {
        int max = 0;
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    max = Math.max(max, bfs(grid, i, j));
                }
            }
        }
        return max;
    }
    
    static int bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{r, c});
        grid[r][c] = 0;
        int area = 0;
        int[][] dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            area++;
            for (int[] d : dirs) {
                int nr = cur[0] + d[0];
                int nc = cur[1] + d[1];
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return area;
    }
}`,
    verifiedSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] g = new int[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) g[i][j] = sc.nextInt();
        }
        System.out.println("Max Area of island is " + maxArea(g));
    }
    public static int maxArea(int[][] grid) {
        int max = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) max = Math.max(max, bfs(grid, i, j));
            }
        }
        return max;
    }
    static int bfs(int[][] grid, int r, int c) {
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{r, c});
        grid[r][c] = 0;
        int area = 0;
        int[][] dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            area++;
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return area;
    }
}`,
    tests: [
      { id: 1, name: 'Two separate islands of 4', input: '4\n5\n1 1 0 0 0\n1 1 0 0 0\n0 0 0 1 1\n0 0 0 1 1', expected: 'Max Area of island is 4', category: 'normal' },
      { id: 2, name: 'All zeros', input: '1\n4\n0 0 0 0', expected: 'Max Area of island is 0', category: 'edge' }
    ]
  },
  {
    id: 'kmit-climbing-stairs',
    code: 'DAA-3-1-AUDI-2026_27',
    labSection: 'LAB',
    title: 'U1_DAA_Recursion_Climbing_Stairs',
    unit: 'Unit-I',
    topic: 'Recursion & Dynamic Programming',
    difficulty: 'Easy',
    pattern: 'Dynamic Programming / Recursion',
    status: 'Started',
    timestamp: 'On Monday, 5 October 2026, 12:30 PM',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 <= n <= 45'],
    sampleInput: '4',
    sampleOutput: 'Number of ways = 5',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaCodeTemplate: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            System.out.println("Number of ways = " + countWays(n));
        }
    }
    
    public static int countWays(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
    verifiedSolution: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int n = sc.nextInt();
            System.out.println("Number of ways = " + countWays(n));
        }
    }
    public static int countWays(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
    tests: [
      { id: 1, name: 'n = 4', input: '4', expected: 'Number of ways = 5', category: 'normal' },
      { id: 2, name: 'n = 2', input: '2', expected: 'Number of ways = 2', category: 'boundary' },
      { id: 3, name: 'n = 3', input: '3', expected: 'Number of ways = 3', category: 'normal' }
    ]
  }
];
