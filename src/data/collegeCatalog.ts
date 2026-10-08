import { Difficulty, TestCase } from '../types/dsa';

export interface CollegeExamProblem {
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

export const COLLEGE_EXAM_CATALOG: CollegeExamProblem[] = [
  // -------------------------------------------------------------
  // 1. Matrix Multiplication
  // -------------------------------------------------------------
  {
    id: 'col-matrix-mult',
    title: 'Matrix Multiplication',
    aliases: ['matrix multiplication', 'multiply matrices', 'multiply two matrices', 'product of matrices', 'matrix product'],
    keywords: ['matrix multiplication', 'matrices a and b', 'multiply', 'r1', 'c1', 'r2', 'c2', 'row col product'],
    pattern: '2D Arrays / Nested Loops',
    category: 'Matrix Operations',
    difficulty: 'Medium',
    timeComplexity: 'O(R1 * C1 * C2)',
    spaceComplexity: 'O(R1 * C2)',
    description: 'Multiply two matrices A (size R1 x C1) and B (size R2 x C2). Print the resulting matrix or -1 if multiplication is not possible (C1 != R2).',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int r1 = sc.nextInt();
        int c1 = sc.nextInt();
        int[][] a = new int[r1][c1];
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c1; j++) a[i][j] = sc.nextInt();
        }

        if (!sc.hasNextInt()) return;
        int r2 = sc.nextInt();
        int c2 = sc.nextInt();
        int[][] b = new int[r2][c2];
        for (int i = 0; i < r2; i++) {
            for (int j = 0; j < c2; j++) b[i][j] = sc.nextInt();
        }

        if (c1 != r2) {
            System.out.println("-1");
            return;
        }

        int[][] res = new int[r1][c2];
        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                for (int k = 0; k < c1; k++) {
                    res[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        for (int i = 0; i < r1; i++) {
            for (int j = 0; j < c2; j++) {
                System.out.print(res[i][j] + (j == c2 - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: '2x2 Multiplication', input: '2 2\n1 2\n3 4\n2 2\n1 0\n0 1', expected: '1 2\n3 4', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 2. Spiral Matrix Traversal
  // -------------------------------------------------------------
  {
    id: 'col-spiral-matrix',
    title: 'Spiral Matrix Traversal',
    aliases: ['spiral matrix', 'spiral order', 'spiral traversal', 'print matrix in spiral order', 'spiral print'],
    keywords: ['spiral', 'spiral order', 'matrix in spiral', 'm x n matrix', 'boundary traversal'],
    pattern: 'Matrix / Simulation / Boundary Pointers',
    category: 'Matrix Operations',
    difficulty: 'Medium',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(1)',
    description: 'Given an M x N matrix, return all elements of the matrix in spiral order (clockwise starting from top-left).',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] mat = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) mat[i][j] = sc.nextInt();
        }

        List<Integer> res = new ArrayList<>();
        int top = 0, bottom = m - 1, left = 0, right = n - 1;

        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) res.add(mat[top][j]);
            top++;

            for (int i = top; i <= bottom; i++) res.add(mat[i][right]);
            right--;

            if (top <= bottom) {
                for (int j = right; j >= left; j--) res.add(mat[bottom][j]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.add(mat[i][left]);
                left++;
            }
        }

        for (int i = 0; i < res.size(); i++) {
            System.out.print(res.get(i) + (i == res.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: '3x3 Matrix Spiral', input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 3 6 9 8 7 4 5', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 3. Matrix Transpose & Symmetric Check
  // -------------------------------------------------------------
  {
    id: 'col-matrix-transpose-symm',
    title: 'Matrix Transpose & Symmetric Check',
    aliases: ['transpose of matrix', 'symmetric matrix', 'transpose and check symmetric', 'matrix transpose', 'check if matrix is symmetric'],
    keywords: ['transpose', 'symmetric matrix', 'symmetric', 'square matrix transpose', 'transpose of the matrix'],
    pattern: '2D Arrays / In-place Swap',
    category: 'Matrix Operations',
    difficulty: 'Easy',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    description: 'Compute the transpose of a square matrix and check whether the matrix is symmetric (equal to its transpose).',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] mat = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) mat[i][j] = sc.nextInt();
        }

        boolean isSymmetric = true;
        int[][] trans = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                trans[j][i] = mat[i][j];
                if (mat[i][j] != mat[j][i]) isSymmetric = false;
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(trans[i][j] + (j == n - 1 ? "" : " "));
            }
            System.out.println();
        }
        System.out.println(isSymmetric ? "Symmetric" : "Not Symmetric");
    }
}`,
    tests: [
      { id: 1, name: '2x2 Symmetric Matrix', input: '2\n1 2\n2 1', expected: '1 2\n2 1\nSymmetric', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 4. Rotate Matrix 90 Degrees
  // -------------------------------------------------------------
  {
    id: 'col-rotate-matrix-90',
    title: 'Rotate Matrix 90 Degrees Clockwise',
    aliases: ['rotate matrix by 90', 'rotate matrix 90 degrees', 'rotate image 90 degrees', 'rotate 2d matrix', 'rotate matrix clockwise'],
    keywords: ['rotate matrix', '90 degrees', 'rotate matrix by 90', 'rotate matrix clockwise', 'clockwise 90'],
    pattern: 'Matrix / Transpose and Reverse',
    category: 'Matrix Operations',
    difficulty: 'Medium',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    description: 'Rotate an N x N matrix by 90 degrees clockwise in-place.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] mat = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) mat[i][j] = sc.nextInt();
        }

        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = temp;
            }
        }

        // Reverse each row
        for (int i = 0; i < n; i++) {
            int l = 0, r = n - 1;
            while (l < r) {
                int temp = mat[i][l];
                mat[i][l] = mat[i][r];
                mat[i][r] = temp;
                l++; r--;
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(mat[i][j] + (j == n - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: '2x2 Rotation', input: '2\n1 2\n3 4', expected: '3 1\n4 2', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 5. Leaders in an Array
  // -------------------------------------------------------------
  {
    id: 'col-leaders-array',
    title: 'Leaders in an Array',
    aliases: ['leaders in array', 'find leaders in an array', 'leaders in an array', 'leader elements', 'find all leaders'],
    keywords: ['leaders in the array', 'leader', 'greater than all elements to its right', 'find all leaders', 'leaders in array'],
    pattern: 'Right-to-Left Scan / Array',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'An element is a leader if it is strictly greater than all elements to its right. The rightmost element is always a leader.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        // If first element is N size indicator
        int[] nums;
        if (list.size() > 1 && list.get(0) == list.size() - 1) {
            nums = new int[list.size() - 1];
            for (int i = 1; i < list.size(); i++) nums[i - 1] = list.get(i);
        } else {
            nums = new int[list.size()];
            for (int i = 0; i < list.size(); i++) nums[i] = list.get(i);
        }

        int n = nums.length;
        List<Integer> leaders = new ArrayList<>();
        int maxRight = nums[n - 1];
        leaders.add(maxRight);

        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] >= maxRight) {
                maxRight = nums[i];
                leaders.add(maxRight);
            }
        }

        Collections.reverse(leaders);
        for (int i = 0; i < leaders.size(); i++) {
            System.out.print(leaders.get(i) + (i == leaders.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Sample Array Leaders', input: '6\n16 17 4 3 5 2', expected: '17 5 2', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 6. Tower of Hanoi
  // -------------------------------------------------------------
  {
    id: 'col-tower-of-hanoi',
    title: 'Tower of Hanoi',
    aliases: ['tower of hanoi', 'toh', 'tower of hanoi recursion', 'hanoi problem', 'disks from source rod'],
    keywords: ['tower of hanoi', 'move n disks', 'source rod', 'destination rod', 'auxiliary rod', 'hanoi'],
    pattern: 'Recursion / Divide and Conquer',
    category: 'Classical DAA',
    difficulty: 'Medium',
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(N)',
    description: 'Solve the classical Tower of Hanoi puzzle recursively for N disks moving from Rod A to Rod C via Rod B.',
    javaCode: `import java.util.*;

public class Main {
    static int steps = 0;

    static void solveHanoi(int n, char from, char to, char aux) {
        if (n == 0) return;
        solveHanoi(n - 1, from, aux, to);
        System.out.println("Move disk " + n + " from rod " + from + " to rod " + to);
        steps++;
        solveHanoi(n - 1, aux, to, from);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        solveHanoi(n, 'A', 'C', 'B');
        System.out.println("Total moves: " + steps);
    }
}`,
    tests: [
      { id: 1, name: '2 Disks Hanoi', input: '2', expected: 'Move disk 1 from rod A to rod B\nMove disk 2 from rod A to rod C\nMove disk 1 from rod B to rod C\nTotal moves: 3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 7. Pangram String Check
  // -------------------------------------------------------------
  {
    id: 'col-pangram-check',
    title: 'Pangram String Verification',
    aliases: ['pangram', 'check pangram', 'string is a pangram', 'pangram checking', 'all english letters'],
    keywords: ['pangram', 'contains every letter', 'alphabet', 'all 26 letters', 'check whether a given string is a pangram'],
    pattern: 'Bitmask / Boolean Array / Hashing',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Check whether a given string is a pangram (contains every character of the English alphabet from a to z).',
    javaCode: `import java.util.*;

public class Main {
    public static boolean isPangram(String s) {
        boolean[] seen = new boolean[26];
        int count = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                int idx = c - 'a';
                if (!seen[idx]) {
                    seen[idx] = true;
                    count++;
                }
            }
        }
        return count == 26;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String s = sc.nextLine();
        System.out.println(isPangram(s) ? "Pangram" : "Not Pangram");
    }
}`,
    tests: [
      { id: 1, name: 'Quick brown fox', input: 'The quick brown fox jumps over the lazy dog', expected: 'Pangram', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 8. Infix to Postfix Expression Conversion
  // -------------------------------------------------------------
  {
    id: 'col-infix-to-postfix',
    title: 'Infix to Postfix Conversion',
    aliases: ['infix to postfix', 'convert infix to postfix', 'infix expression to postfix', 'postfix conversion'],
    keywords: ['infix to postfix', 'infix expression', 'operator precedence', 'stack', 'shunting yard'],
    pattern: 'Stack / Expression Parsing',
    category: 'Classical DAA',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Convert a standard infix arithmetic expression to postfix notation (Reverse Polish Notation) using a stack.',
    javaCode: `import java.util.*;

public class Main {
    static int precedence(char ch) {
        switch (ch) {
            case '+':
            case '-': return 1;
            case '*':
            case '/': return 2;
            case '^': return 3;
        }
        return -1;
    }

    public static String infixToPostfix(String exp) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (int i = 0; i < exp.length(); ++i) {
            char c = exp.charAt(i);
            if (Character.isWhitespace(c)) continue;

            if (Character.isLetterOrDigit(c)) {
                result.append(c);
            } else if (c == '(') {
                stack.push(c);
            } else if (c == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                if (!stack.isEmpty()) stack.pop();
            } else {
                while (!stack.isEmpty() && precedence(c) <= precedence(stack.peek())) {
                    result.append(stack.pop());
                }
                stack.push(c);
            }
        }

        while (!stack.isEmpty()) {
            result.append(stack.pop());
        }
        return result.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String exp = sc.next();
        System.out.println(infixToPostfix(exp));
    }
}`,
    tests: [
      { id: 1, name: 'Simple Infix', input: 'a+b*(c^d-e)^(f+g*h)-i', expected: 'abcd^e-fgh*+^*+i-', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 9. Evaluate Postfix Expression
  // -------------------------------------------------------------
  {
    id: 'col-eval-postfix',
    title: 'Evaluate Postfix Expression',
    aliases: ['evaluate postfix', 'postfix evaluation', 'evaluate reverse polish notation', 'eval postfix', 'postfix stack'],
    keywords: ['evaluate postfix', 'postfix expression', 'rpn', 'evaluate the value of a postfix'],
    pattern: 'Stack / Postfix Evaluation',
    category: 'Classical DAA',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Evaluate an arithmetic postfix expression using a stack.',
    javaCode: `import java.util.*;

public class Main {
    public static int evaluatePostfix(String exp) {
        Stack<Integer> stack = new Stack<>();
        String[] tokens = exp.trim().contains(" ") ? exp.trim().split("\\\\s+") : exp.split("");

        for (String token : tokens) {
            if (token.isEmpty()) continue;
            if (token.length() == 1 && "+-*/^".contains(token)) {
                int b = stack.pop();
                int a = stack.pop();
                switch (token.charAt(0)) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                    case '^': stack.push((int) Math.pow(a, b)); break;
                }
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String line = sc.nextLine().trim();
        System.out.println(evaluatePostfix(line));
    }
}`,
    tests: [
      { id: 1, name: '2 3 1 * + 9 -', input: '2 3 1 * + 9 -', expected: '-4', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 10. Armstrong Number
  // -------------------------------------------------------------
  {
    id: 'col-armstrong-number',
    title: 'Armstrong Number Check',
    aliases: ['armstrong number', 'check armstrong', 'is armstrong', 'narcissistic number', 'armstrong'],
    keywords: ['armstrong number', 'armstrong', 'sum of powers of digits', 'narcissistic', 'check if a given number is an armstrong'],
    pattern: 'Math / Digit Extraction',
    category: 'Number Theory',
    difficulty: 'Easy',
    timeComplexity: 'O(log10(N))',
    spaceComplexity: 'O(1)',
    description: 'An Armstrong number is an integer such that the sum of its digits raised to the power of number of digits equals the number itself.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean isArmstrong(long n) {
        if (n < 0) return false;
        String s = String.valueOf(n);
        int d = s.length();
        long sum = 0;
        long temp = n;
        while (temp > 0) {
            long rem = temp % 10;
            sum += Math.pow(rem, d);
            temp /= 10;
        }
        return sum == n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        System.out.println(isArmstrong(n) ? "Armstrong" : "Not Armstrong");
    }
}`,
    tests: [
      { id: 1, name: '153 is Armstrong', input: '153', expected: 'Armstrong', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 11. Find Missing Number in 1..N
  // -------------------------------------------------------------
  {
    id: 'col-missing-number-1-n',
    title: 'Missing Number in 1 to N',
    aliases: ['missing number', 'missing number in array', 'find missing number in 1 to n', 'find the missing number', 'missing number 1 to n'],
    keywords: ['missing number', 'size n-1', 'numbers from 1 to n', 'find the missing number'],
    pattern: 'Math / Gauss Formula / XOR',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Given an array of size N-1 containing numbers from 1 to N, find the missing number using Gauss formula / XOR.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Long> nums = new ArrayList<>();
        while (sc.hasNextLong()) nums.add(sc.nextLong());
        if (nums.isEmpty()) return;

        long n;
        long sum = 0;
        if (nums.size() > 1 && nums.get(0) == nums.size() - 1) {
            n = nums.get(0) + 1;
            for (int i = 1; i < nums.size(); i++) sum += nums.get(i);
        } else {
            n = nums.size() + 1;
            for (long x : nums) sum += x;
        }

        long total = (n * (n + 1)) / 2;
        System.out.println(total - sum);
    }
}`,
    tests: [
      { id: 1, name: 'Missing 4 in 1..5', input: '1 2 3 5', expected: '4', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 12. Sieve of Eratosthenes (Primes up to N)
  // -------------------------------------------------------------
  {
    id: 'col-sieve-eratosthenes',
    title: 'Sieve of Eratosthenes',
    aliases: ['sieve of eratosthenes', 'sieve', 'primes up to n', 'print all prime numbers smaller than', 'prime numbers up to n'],
    keywords: ['sieve of eratosthenes', 'sieve', 'primes smaller than or equal to n', 'print all prime numbers'],
    pattern: 'Number Theory / Sieve',
    category: 'Number Theory',
    difficulty: 'Medium',
    timeComplexity: 'O(N log log N)',
    spaceComplexity: 'O(N)',
    description: 'Generate all prime numbers less than or equal to N using the classical Sieve of Eratosthenes.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n < 2) return;

        boolean[] prime = new boolean[n + 1];
        Arrays.fill(prime, true);
        prime[0] = prime[1] = false;

        for (int p = 2; p * p <= n; p++) {
            if (prime[p]) {
                for (int i = p * p; i <= n; i += p) prime[i] = false;
            }
        }

        List<Integer> primes = new ArrayList<>();
        for (int p = 2; p <= n; p++) {
            if (prime[p]) primes.add(p);
        }

        for (int i = 0; i < primes.size(); i++) {
            System.out.print(primes.get(i) + (i == primes.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Primes up to 20', input: '20', expected: '2 3 5 7 11 13 17 19', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 13. Pascal's Triangle
  // -------------------------------------------------------------
  {
    id: 'col-pascals-triangle',
    title: "Pascal's Triangle Generation",
    aliases: ['pascals triangle', "pascal's triangle", 'pascal triangle', 'generate pascals triangle', 'pascals triangle rows'],
    keywords: ['pascal', "pascal's triangle", 'numrows', 'generate the first numrows', 'pascals triangle'],
    pattern: 'Combinatorics / Dynamic Programming',
    category: 'Classical DAA',
    difficulty: 'Easy',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N^2)',
    description: "Generate the first numRows of Pascal's triangle where each number is the sum of the two directly above it.",
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int numRows = sc.nextInt();
        List<List<Integer>> triangle = new ArrayList<>();

        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    row.add(triangle.get(i - 1).get(j - 1) + triangle.get(i - 1).get(j));
                }
            }
            triangle.add(row);
        }

        for (List<Integer> r : triangle) {
            for (int j = 0; j < r.size(); j++) {
                System.out.print(r.get(j) + (j == r.size() - 1 ? "" : " "));
            }
            System.out.println();
        }
    }
}`,
    tests: [
      { id: 1, name: '3 Rows Pascal', input: '3', expected: '1\n1 1\n1 2 1', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 14. Segregate Even and Odd Numbers
  // -------------------------------------------------------------
  {
    id: 'col-segregate-even-odd',
    title: 'Segregate Even and Odd Numbers',
    aliases: ['segregate even and odd', 'segregate even odd', 'even and odd segregation', 'even numbers followed by odd'],
    keywords: ['segregate even numbers and odd numbers', 'even and odd', 'segregate', 'even numbers', 'odd numbers'],
    pattern: 'Two Pointers / Partitioning',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Segregate even and odd numbers such that all even numbers appear first followed by all odd numbers.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        // Skip leading count if present
        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        List<Integer> evens = new ArrayList<>();
        List<Integer> odds = new ArrayList<>();

        for (int i = start; i < list.size(); i++) {
            int x = list.get(i);
            if (x % 2 == 0) evens.add(x);
            else odds.add(x);
        }

        evens.addAll(odds);
        for (int i = 0; i < evens.size(); i++) {
            System.out.print(evens.get(i) + (i == evens.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Segregate Sample', input: '12 34 45 9 8 90 3', expected: '12 34 8 90 45 9 3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 15. Count Vowels and Consonants in a String
  // -------------------------------------------------------------
  {
    id: 'col-count-vowels-consonants',
    title: 'Count Vowels and Consonants',
    aliases: ['count vowels and consonants', 'vowels and consonants', 'count vowels', 'vowel consonant count', 'number of vowels and consonants'],
    keywords: ['vowels and consonants', 'count the number of vowels and consonants', 'vowels', 'consonants'],
    pattern: 'String Processing / Character Classification',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Count the total number of vowels and consonants in a given sentence or word.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String s = sc.nextLine().toLowerCase();

        int vowels = 0, consonants = 0;
        for (char c : s.toCharArray()) {
            if (c >= 'a' && c <= 'z') {
                if ("aeiou".indexOf(c) != -1) vowels++;
                else consonants++;
            }
        }

        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
}`,
    tests: [
      { id: 1, name: 'Hello World', input: 'Hello World', expected: 'Vowels: 3\nConsonants: 7', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 16. Check String Rotation
  // -------------------------------------------------------------
  {
    id: 'col-string-rotation',
    title: 'Check String Rotation',
    aliases: ['check string rotation', 'strings are rotations', 'string rotation check', 's2 is a rotation of s1', 'rotation of each other'],
    keywords: ['rotation of each other', 's2 is a rotation of s1', 'string rotation', 'rotation of s1', 'strings are rotations'],
    pattern: 'String Matching / Concatenation',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Check if string s2 is a rotation of string s1 (e.g. s2 can be obtained by rotating s1 by some number of characters).',
    javaCode: `import java.util.*;

public class Main {
    public static boolean areRotations(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        String concat = s1 + s1;
        return concat.contains(s2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s1 = sc.next();
        String s2 = sc.hasNext() ? sc.next() : "";
        System.out.println(areRotations(s1, s2) ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: 'ABCD CDAB', input: 'ABCD CDAB', expected: 'True', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 17. Equilibrium Index of an Array
  // -------------------------------------------------------------
  {
    id: 'col-equilibrium-index',
    title: 'Equilibrium Index of an Array',
    aliases: ['equilibrium index', 'find equilibrium index', 'equilibrium point', 'equilibrium index of an array'],
    keywords: ['equilibrium index', 'sum of lower indices', 'sum of higher indices', 'equilibrium point', 'equilibrium'],
    pattern: 'Prefix Sum / Array',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Equilibrium index of an array is an index such that the sum of elements at lower indices is equal to the sum of elements at higher indices.',
    javaCode: `import java.util.*;

public class Main {
    public static int findEquilibrium(int[] arr) {
        long totalSum = 0;
        for (int x : arr) totalSum += x;

        long leftSum = 0;
        for (int i = 0; i < arr.length; i++) {
            totalSum -= arr[i]; // right sum
            if (leftSum == totalSum) return i;
            leftSum += arr[i];
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] arr = new int[list.size() - start];
        for (int i = 0; i < arr.length; i++) arr[i] = list.get(i + start);

        System.out.println(findEquilibrium(arr));
    }
}`,
    tests: [
      { id: 1, name: 'Equilibrium Sample', input: '-7 1 5 2 -4 3 0', expected: '3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 18. Job Sequencing with Deadlines
  // -------------------------------------------------------------
  {
    id: 'col-job-sequencing',
    title: 'Job Sequencing with Deadlines',
    aliases: ['job sequencing', 'job sequencing with deadlines', 'job sequencing problem', 'deadline profit', 'maximum profit job scheduling'],
    keywords: ['job sequencing', 'deadlines', 'maximum profit', 'job sequencing problem with deadlines', 'deadline profit'],
    pattern: 'Greedy / Disjoint Set / Sorting',
    category: 'Classical DAA',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N + N * MaxDeadline)',
    spaceComplexity: 'O(MaxDeadline)',
    description: 'Given a set of jobs where every job has a deadline and profit, find the maximum profit earned by scheduling jobs within their deadlines.',
    javaCode: `import java.util.*;

class Job {
    String id;
    int deadline;
    int profit;
    Job(String id, int d, int p) {
        this.id = id;
        this.deadline = d;
        this.profit = p;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        List<Job> jobs = new ArrayList<>();
        int maxDeadline = 0;

        for (int i = 0; i < n; i++) {
            String id = sc.next();
            int d = sc.nextInt();
            int p = sc.nextInt();
            jobs.add(new Job(id, d, p));
            maxDeadline = Math.max(maxDeadline, d);
        }

        // Sort descending by profit
        jobs.sort((a, b) -> Integer.compare(b.profit, a.profit));

        boolean[] slot = new boolean[maxDeadline + 1];
        int count = 0, totalProfit = 0;
        List<String> scheduled = new ArrayList<>();

        for (Job job : jobs) {
            for (int t = Math.min(maxDeadline, job.deadline); t > 0; t--) {
                if (!slot[t]) {
                    slot[t] = true;
                    count++;
                    totalProfit += job.profit;
                    scheduled.add(job.id);
                    break;
                }
            }
        }

        System.out.println("Jobs scheduled: " + count);
        System.out.println("Total profit: " + totalProfit);
        System.out.println("Job sequence: " + scheduled);
    }
}`,
    tests: [
      { id: 1, name: '4 Jobs', input: '4\na 4 20\nb 1 10\nc 1 40\nd 1 30', expected: 'Jobs scheduled: 2\nTotal profit: 60\nJob sequence: [c, a]', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 19. Activity Selection Problem
  // -------------------------------------------------------------
  {
    id: 'col-activity-selection',
    title: 'Activity Selection Problem',
    aliases: ['activity selection', 'activity selection problem', 'maximum activities', 'greedy activity selection', 'interval scheduling'],
    keywords: ['activity selection', 'maximum number of activities', 'activity selection problem', 'start time finish time'],
    pattern: 'Greedy / Sorting by Finish Time',
    category: 'Classical DAA',
    difficulty: 'Easy',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    description: 'Select the maximum number of mutually compatible activities given start and finish times.',
    javaCode: `import java.util.*;

class Activity {
    int start, finish, id;
    Activity(int id, int s, int f) {
        this.id = id;
        this.start = s;
        this.finish = f;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        List<Activity> acts = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            acts.add(new Activity(i, sc.nextInt(), sc.nextInt()));
        }

        // Sort by finish time
        acts.sort((a, b) -> Integer.compare(a.finish, b.finish));

        List<Integer> selected = new ArrayList<>();
        selected.add(acts.get(0).id);
        int lastFinish = acts.get(0).finish;

        for (int i = 1; i < n; i++) {
            if (acts.get(i).start >= lastFinish) {
                selected.add(acts.get(i).id);
                lastFinish = acts.get(i).finish;
            }
        }

        System.out.println("Max activities: " + selected.size());
        System.out.println("Selected activities indices: " + selected);
    }
}`,
    tests: [
      { id: 1, name: 'Sample 3 activities', input: '3\n1 2\n3 4\n0 6', expected: 'Max activities: 2\nSelected activities indices: [0, 1]', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 20. Remove Duplicate Characters from String
  // -------------------------------------------------------------
  {
    id: 'col-remove-duplicate-chars',
    title: 'Remove Duplicate Characters from String',
    aliases: ['remove duplicate characters', 'remove duplicates from string', 'remove duplicate characters from string', 'remove duplicates string', 'unique characters string'],
    keywords: ['remove all duplicate characters from it', 'duplicate characters', 'preserving the order', 'remove duplicate characters'],
    pattern: 'LinkedHashSet / Boolean Seen Array',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Remove all duplicate characters from a given string while preserving the first occurrence order.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String s = sc.nextLine();

        Set<Character> seen = new LinkedHashSet<>();
        for (char c : s.toCharArray()) seen.add(c);

        StringBuilder sb = new StringBuilder();
        for (char c : seen) sb.append(c);
        System.out.println(sb.toString());
    }
}`,
    tests: [
      { id: 1, name: 'geeksforgeeks', input: 'geeksforgeeks', expected: 'geksfor', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 21. Majority Element (Boyer-Moore Voting)
  // -------------------------------------------------------------
  {
    id: 'col-majority-element',
    title: 'Majority Element (Boyer-Moore Voting)',
    aliases: ['majority element', 'boyer moore', 'majority element in an array', 'appears more than n/2 times', 'moore voting algorithm'],
    keywords: ['majority element', 'more than n/2', 'boyer moore', 'appears more than n/2 times'],
    pattern: "Boyer-Moore Voting / Single Pass",
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Find the majority element in an array that appears strictly more than N/2 times.',
    javaCode: `import java.util.*;

public class Main {
    public static int majorityElement(int[] nums) {
        int candidate = nums[0];
        int count = 1;
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
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

        System.out.println(majorityElement(nums));
    }
}`,
    tests: [
      { id: 1, name: 'Majority Sample', input: '3 2 3', expected: '3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 22. Strong Number / Krishnamurthy Number
  // -------------------------------------------------------------
  {
    id: 'col-strong-number',
    title: 'Strong Number Check',
    aliases: ['strong number', 'krishnamurthy number', 'check strong number', 'sum of factorials of digits', 'is strong number'],
    keywords: ['strong number', 'krishnamurthy', 'sum of factorial of digits', 'factorial of each digit'],
    pattern: 'Math / Factorials',
    category: 'Number Theory',
    difficulty: 'Easy',
    timeComplexity: 'O(log10(N))',
    spaceComplexity: 'O(1)',
    description: 'A Strong number is a number whose sum of all digits factorial equals the number itself (e.g. 145 = 1! + 4! + 5!).',
    javaCode: `import java.util.*;

public class Main {
    static int fact(int n) {
        int res = 1;
        for (int i = 2; i <= n; i++) res *= i;
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        long temp = n;
        long sum = 0;
        while (temp > 0) {
            sum += fact((int)(temp % 10));
            temp /= 10;
        }
        System.out.println(sum == n ? "Strong Number" : "Not Strong Number");
    }
}`,
    tests: [
      { id: 1, name: '145 Strong Number', input: '145', expected: 'Strong Number', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 23. Perfect Number Check
  // -------------------------------------------------------------
  {
    id: 'col-perfect-number',
    title: 'Perfect Number Verification',
    aliases: ['perfect number', 'check perfect number', 'is perfect number', 'sum of proper divisors'],
    keywords: ['perfect number', 'sum of proper divisors', 'divisors sum equal to number'],
    pattern: 'Math / Divisors',
    category: 'Number Theory',
    difficulty: 'Easy',
    timeComplexity: 'O(sqrt(N))',
    spaceComplexity: 'O(1)',
    description: 'A perfect number is a positive integer that is equal to the sum of its positive proper divisors (e.g. 6 = 1 + 2 + 3, 28).',
    javaCode: `import java.util.*;

public class Main {
    public static boolean isPerfect(long n) {
        if (n <= 1) return false;
        long sum = 1;
        for (long i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                sum += i;
                if (i * i != n) sum += n / i;
            }
        }
        return sum == n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        System.out.println(isPerfect(n) ? "Perfect Number" : "Not Perfect Number");
    }
}`,
    tests: [
      { id: 1, name: '28 Perfect Number', input: '28', expected: 'Perfect Number', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 24. Roman Numeral to Integer Conversion
  // -------------------------------------------------------------
  {
    id: 'col-roman-to-int',
    title: 'Roman Numeral to Integer',
    aliases: ['roman to integer', 'convert roman to integer', 'roman numeral to int', 'roman to int', 'roman number'],
    keywords: ['roman to integer', 'roman numeral', 'roman number', 'symbol value'],
    pattern: 'HashMap / String Scanning',
    category: 'String & Math',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Convert a Roman numeral string (I, V, X, L, C, D, M) to its decimal integer value.',
    javaCode: `import java.util.*;

public class Main {
    static int val(char r) {
        switch (r) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
        }
        return 0;
    }

    public static int romanToInt(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int s1 = val(s.charAt(i));
            if (i + 1 < s.length()) {
                int s2 = val(s.charAt(i + 1));
                if (s1 >= s2) total += s1;
                else { total += s2 - s1; i++; }
            } else {
                total += s1;
            }
        }
        return total;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        System.out.println(romanToInt(s));
    }
}`,
    tests: [
      { id: 1, name: 'MCMXCIV = 1994', input: 'MCMXCIV', expected: '1994', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 25. Count Set Bits / Hamming Weight
  // -------------------------------------------------------------
  {
    id: 'col-count-set-bits',
    title: 'Count Set Bits (Hamming Weight)',
    aliases: ['count set bits', 'hamming weight', 'number of 1 bits', 'kernighan algorithm', 'set bits in integer'],
    keywords: ['count set bits', 'number of set bits', 'binary representation', 'hamming weight'],
    pattern: "Bit Manipulation / Brian Kernighan's Algorithm",
    category: 'Bit Manipulation',
    difficulty: 'Easy',
    timeComplexity: 'O(Number of set bits)',
    spaceComplexity: 'O(1)',
    description: 'Count the number of set bits (1s) in the binary representation of an integer.',
    javaCode: `import java.util.*;

public class Main {
    public static int countSetBits(long n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        System.out.println(countSetBits(n));
    }
}`,
    tests: [
      { id: 1, name: '7 has 3 bits', input: '7', expected: '3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 26. Fractional Knapsack (Greedy)
  // -------------------------------------------------------------
  {
    id: 'col-fractional-knapsack',
    title: 'Fractional Knapsack Problem',
    aliases: ['fractional knapsack', 'fractional knapsack greedy', 'knapsack greedy', 'greedy knapsack'],
    keywords: ['fractional knapsack', 'capacity', 'value per unit weight', 'maximum total value'],
    pattern: 'Greedy / Sorting by Ratio',
    category: 'Classical DAA',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
    description: 'Given weights and values of N items, put these items in a knapsack of capacity W to get the maximum total value (items can be broken into fractions).',
    javaCode: `import java.util.*;

class Item {
    double weight, value, ratio;
    Item(double w, double v) {
        this.weight = w;
        this.value = v;
        this.ratio = v / w;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        double capacity = sc.nextDouble();
        List<Item> items = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            items.add(new Item(sc.nextDouble(), sc.nextDouble()));
        }

        items.sort((a, b) -> Double.compare(b.ratio, a.ratio));

        double totalVal = 0.0;
        for (Item item : items) {
            if (capacity >= item.weight) {
                capacity -= item.weight;
                totalVal += item.value;
            } else {
                totalVal += item.ratio * capacity;
                break;
            }
        }

        System.out.printf(Locale.US, "%.2f\\n", totalVal);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Knapsack', input: '3 50\n10 60\n20 100\n30 120', expected: '240.00', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 27. 0/1 Knapsack Problem (Dynamic Programming)
  // -------------------------------------------------------------
  {
    id: 'col-01-knapsack',
    title: '0/1 Knapsack Problem',
    aliases: ['0/1 knapsack', 'zero one knapsack', '0 1 knapsack', 'knapsack dynamic programming', 'knapsack dp'],
    keywords: ['0/1 knapsack', 'cannot break items', 'knapsack capacity', 'maximum value in knapsack'],
    pattern: 'Dynamic Programming / Knapsack',
    category: 'Classical DAA',
    difficulty: 'Medium',
    timeComplexity: 'O(N * W)',
    spaceComplexity: 'O(W)',
    description: 'Given weights and values of N items, find the maximum value subset of items such that total weight does not exceed capacity W (cannot break items).',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int w = sc.nextInt();
        int[] val = new int[n];
        int[] wt = new int[n];
        for (int i = 0; i < n; i++) val[i] = sc.nextInt();
        for (int i = 0; i < n; i++) wt[i] = sc.nextInt();

        int[] dp = new int[w + 1];
        for (int i = 0; i < n; i++) {
            for (int j = w; j >= wt[i]; j--) {
                dp[j] = Math.max(dp[j], dp[j - wt[i]] + val[i]);
            }
        }

        System.out.println(dp[w]);
    }
}`,
    tests: [
      { id: 1, name: 'Sample 0/1 Knapsack', input: '3 50\n60 100 120\n10 20 30', expected: '220', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 28. Next Greater Element
  // -------------------------------------------------------------
  {
    id: 'col-next-greater-element',
    title: 'Next Greater Element',
    aliases: ['next greater element', 'nge', 'next greater element in array', 'next greater'],
    keywords: ['next greater element', 'next greater', 'nge', 'first greater element to the right'],
    pattern: 'Monotonic Stack',
    category: 'Array & Stack',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Given an array, print the Next Greater Element (NGE) for every element. The NGE for an element x is the first greater element on the right side of x.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] arr = new int[list.size() - start];
        for (int i = 0; i < arr.length; i++) arr[i] = list.get(i + start);

        int n = arr.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) stack.pop();
            res[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }

        for (int i = 0; i < n; i++) {
            System.out.print(res[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Sample NGE', input: '4 5 2 25', expected: '5 25 25 -1', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 29. Subarray with Given Sum
  // -------------------------------------------------------------
  {
    id: 'col-subarray-given-sum',
    title: 'Subarray with Given Sum',
    aliases: ['subarray with given sum', 'find subarray with given sum', 'subarray sum target', 'continuous subarray sum'],
    keywords: ['subarray with given sum', 'sum equals target', 'subarray with sum'],
    pattern: 'Sliding Window / HashMap Prefix Sum',
    category: 'Array Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Find a continuous subarray which adds to a given sum S. Return 1-based start and end indices or -1.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int n = sc.nextInt();
        long target = sc.nextLong();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        int l = 0;
        long cur = 0;
        for (int r = 0; r < n; r++) {
            cur += arr[r];
            while (cur > target && l < r) {
                cur -= arr[l];
                l++;
            }
            if (cur == target) {
                System.out.println((l + 1) + " " + (r + 1));
                return;
            }
        }
        System.out.println("-1");
    }
}`,
    tests: [
      { id: 1, name: 'Subarray Sum 12', input: '5 12\n1 2 3 7 5', expected: '2 4', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 30. Sorting Algorithms (Merge Sort / Quick Sort)
  // -------------------------------------------------------------
  {
    id: 'col-merge-sort',
    title: 'Merge Sort Implementation',
    aliases: ['merge sort', 'implement merge sort', 'sort array using merge sort', 'merge sort algorithm'],
    keywords: ['merge sort', 'divide and conquer sort', 'merge sort implementation'],
    pattern: 'Divide and Conquer / Recursion',
    category: 'Sorting Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    description: 'Implement stable Divide-and-Conquer Merge Sort on an array of integers.',
    javaCode: `import java.util.*;

public class Main {
    static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1, n2 = r - m;
        int[] L = new int[n1], R = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];

        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }

    static void sort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            sort(arr, l, m);
            sort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] arr = new int[list.size() - start];
        for (int i = 0; i < arr.length; i++) arr[i] = list.get(i + start);

        sort(arr, 0, arr.length - 1);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i == arr.length - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Sample Merge Sort', input: '5 2 9 1 5 6', expected: '1 2 5 5 6 9', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 31. Quick Sort Implementation
  // -------------------------------------------------------------
  {
    id: 'col-quick-sort',
    title: 'Quick Sort Implementation',
    aliases: ['quick sort', 'implement quick sort', 'sort array using quick sort', 'quick sort algorithm', 'quicksort'],
    keywords: ['quick sort', 'partition sort', 'pivot element', 'quicksort'],
    pattern: 'Divide and Conquer / Partitioning',
    category: 'Sorting Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(N log N) avg, O(N^2) worst',
    spaceComplexity: 'O(log N)',
    description: 'Implement Quick Sort using Lomuto / Hoare partitioning on an integer array.',
    javaCode: `import java.util.*;

public class Main {
    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        return i + 1;
    }

    static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] arr = new int[list.size() - start];
        for (int i = 0; i < arr.length; i++) arr[i] = list.get(i + start);

        quickSort(arr, 0, arr.length - 1);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i == arr.length - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Quick Sort 10 7 8 9 1 5', input: '10 7 8 9 1 5', expected: '1 5 7 8 9 10', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 32. Matrix Boundary Elements
  // -------------------------------------------------------------
  {
    id: 'col-matrix-boundary',
    title: 'Boundary Elements of Matrix',
    aliases: ['boundary elements', 'boundary elements of matrix', 'print boundary elements', 'matrix boundary'],
    keywords: ['boundary elements', 'matrix boundary', 'outer boundary elements', 'print boundary of matrix'],
    pattern: '2D Arrays / Boundary Scan',
    category: 'Matrix Operations',
    difficulty: 'Easy',
    timeComplexity: 'O(M + N)',
    spaceComplexity: 'O(1)',
    description: 'Print all boundary elements of an M x N matrix in clockwise order.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] mat = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) mat[i][j] = sc.nextInt();
        }

        List<Integer> res = new ArrayList<>();
        for (int j = 0; j < n; j++) res.add(mat[0][j]);
        for (int i = 1; i < m; i++) res.add(mat[i][n - 1]);
        if (m > 1) {
            for (int j = n - 2; j >= 0; j--) res.add(mat[m - 1][j]);
        }
        if (n > 1) {
            for (int i = m - 2; i > 0; i--) res.add(mat[i][0]);
        }

        for (int i = 0; i < res.size(); i++) {
            System.out.print(res.get(i) + (i == res.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Boundary 3x3', input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 3 6 9 8 7 4', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 33. Move All Zeroes to End
  // -------------------------------------------------------------
  {
    id: 'col-move-zeroes',
    title: 'Move All Zeroes to End',
    aliases: ['move zeroes', 'move all zeroes to end', 'push zeroes to end', 'zeroes to end'],
    keywords: ['move all zeroes', 'zeroes to end', 'push zeroes to the end of array'],
    pattern: 'Two Pointers / In-place Array Compaction',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] nums = new int[list.size() - start];
        for (int i = 0; i < nums.length; i++) nums[i] = list.get(i + start);

        int insertPos = 0;
        for (int x : nums) {
            if (x != 0) nums[insertPos++] = x;
        }
        while (insertPos < nums.length) nums[insertPos++] = 0;

        for (int i = 0; i < nums.length; i++) {
            System.out.print(nums[i] + (i == nums.length - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: '0 1 0 3 12', input: '0 1 0 3 12', expected: '1 3 12 0 0', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 34. Check if Array is Sorted and Rotated
  // -------------------------------------------------------------
  {
    id: 'col-sorted-rotated-array',
    title: 'Check if Array is Sorted and Rotated',
    aliases: ['sorted and rotated', 'check if array is sorted and rotated', 'array is sorted and rotated'],
    keywords: ['sorted and rotated', 'check if an array is sorted and rotated', 'rotated sorted check'],
    pattern: 'Array / Single Inversion Point',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Check if an array was originally sorted in non-decreasing order, then rotated some number of positions.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean check(int[] nums) {
        int count = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) count++;
        }
        return count <= 1;
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

        System.out.println(check(nums) ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: '3 4 5 1 2 is sorted and rotated', input: '3 4 5 1 2', expected: 'True', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 35. Word Frequency / Character Frequency
  // -------------------------------------------------------------
  {
    id: 'col-word-frequency',
    title: 'Word Frequency Count',
    aliases: ['word frequency', 'count word frequency', 'frequency of words', 'count occurrence of each word'],
    keywords: ['word frequency', 'frequency of each word', 'count words frequency', 'words count in sentence'],
    pattern: 'HashMap / String Tokenization',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(Distinct Words)',
    description: 'Count the frequency of each unique word in a given text and display in alphabetical or insertion order.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String line = sc.nextLine().trim();
        if (line.isEmpty()) return;

        String[] words = line.split("\\\\s+");
        Map<String, Integer> map = new TreeMap<>();
        for (String w : words) {
            String clean = w.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
            if (!clean.isEmpty()) map.put(clean, map.getOrDefault(clean, 0) + 1);
        }

        for (Map.Entry<String, Integer> e : map.entrySet()) {
            System.out.println(e.getKey() + ": " + e.getValue());
        }
    }
}`,
    tests: [
      { id: 1, name: 'Hello hello world', input: 'Hello hello world', expected: 'hello: 2\nworld: 1', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 36. Palindrome Number
  // -------------------------------------------------------------
  {
    id: 'col-palindrome-number',
    title: 'Palindrome Number Check',
    aliases: ['palindrome number', 'check palindrome number', 'is palindrome number', 'integer palindrome', 'number is palindrome'],
    keywords: ['palindrome number', 'check if a given number is palindrome', 'reverse equals original number'],
    pattern: 'Math / Digit Reversal',
    category: 'Number Theory',
    difficulty: 'Easy',
    timeComplexity: 'O(log10(N))',
    spaceComplexity: 'O(1)',
    description: 'Check whether a given integer is a palindrome (reads same forward and backward). Negative numbers are not palindromes.',
    javaCode: `import java.util.*;

public class Main {
    public static boolean isPalindrome(long n) {
        if (n < 0) return false;
        long rev = 0, temp = n;
        while (temp > 0) {
            rev = rev * 10 + (temp % 10);
            temp /= 10;
        }
        return rev == n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        System.out.println(isPalindrome(n) ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: '121 is Palindrome', input: '121', expected: 'True', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 37. Longest Word in a Sentence
  // -------------------------------------------------------------
  {
    id: 'col-longest-word',
    title: 'Longest Word in a Sentence',
    aliases: ['longest word', 'longest word in sentence', 'find longest word', 'longest word in a given string'],
    keywords: ['longest word', 'longest word in a sentence', 'max length word', 'longest word in the string'],
    pattern: 'String Tokenization / Scan',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Find and return the longest word in a given sentence.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String line = sc.nextLine().trim();
        String[] words = line.split("\\\\s+");
        String longest = "";
        for (String w : words) {
            String clean = w.replaceAll("[^a-zA-Z0-9]", "");
            if (clean.length() > longest.length()) {
                longest = clean;
            }
        }
        System.out.println(longest);
    }
}`,
    tests: [
      { id: 1, name: 'Sample sentence', input: 'The quick brown fox jumped over the lazy dog', expected: 'jumped', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 38. Matrix Diagonal Sum
  // -------------------------------------------------------------
  {
    id: 'col-matrix-diagonal-sum',
    title: 'Matrix Diagonal Sum',
    aliases: ['diagonal sum', 'matrix diagonal sum', 'sum of diagonals', 'primary and secondary diagonal sum'],
    keywords: ['diagonal sum', 'matrix diagonal', 'primary diagonal', 'secondary diagonal'],
    pattern: 'Matrix / Single Pass',
    category: 'Matrix Operations',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    description: 'Given a square matrix, return the sum of the matrix diagonals. Count intersection only once.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] mat = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) mat[i][j] = sc.nextInt();
        }

        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum += mat[i][i];
            if (i != n - 1 - i) sum += mat[i][n - 1 - i];
        }
        System.out.println(sum);
    }
}`,
    tests: [
      { id: 1, name: '3x3 Diagonal Sum', input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '25', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 39. Power(x, n) / Modular Exponentiation
  // -------------------------------------------------------------
  {
    id: 'col-power-modular-exp',
    title: 'Power(x, n) Binary Exponentiation',
    aliases: ['power function', 'pow(x,n)', 'binary exponentiation', 'modular exponentiation', 'calculate power'],
    keywords: ['power(x, n)', 'calculate x raised to the power n', 'binary exponentiation', 'modular exponentiation'],
    pattern: 'Divide and Conquer / Bitmask',
    category: 'Number Theory',
    difficulty: 'Medium',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description: 'Calculate x raised to the power n in O(log n) time using binary exponentiation.',
    javaCode: `import java.util.*;

public class Main {
    public static double myPow(double x, long n) {
        if (n < 0) {
            x = 1 / x;
            n = -n;
        }
        double ans = 1.0;
        while (n > 0) {
            if ((n & 1) == 1) ans *= x;
            x *= x;
            n >>= 1;
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextDouble()) return;
        double x = sc.nextDouble();
        long n = sc.hasNextLong() ? sc.nextLong() : 2;
        System.out.printf(Locale.US, "%.5f\\n", myPow(x, n));
    }
}`,
    tests: [
      { id: 1, name: '2.0 ^ 10', input: '2.0 10', expected: '1024.00000', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 40. Prime Factors of a Number
  // -------------------------------------------------------------
  {
    id: 'col-prime-factors',
    title: 'Prime Factors of a Number',
    aliases: ['prime factors', 'prime factorization', 'factors of number', 'find prime factors'],
    keywords: ['prime factors', 'prime factorization', 'all prime factors of a number'],
    pattern: 'Number Theory / Trial Division',
    category: 'Number Theory',
    difficulty: 'Easy',
    timeComplexity: 'O(sqrt(N))',
    spaceComplexity: 'O(1)',
    description: 'Find all prime factors of a given positive integer and print them in non-decreasing order.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        List<Long> factors = new ArrayList<>();

        while (n % 2 == 0) {
            factors.add(2L);
            n /= 2;
        }
        for (long i = 3; i * i <= n; i += 2) {
            while (n % i == 0) {
                factors.add(i);
                n /= i;
            }
        }
        if (n > 2) factors.add(n);

        for (int i = 0; i < factors.size(); i++) {
            System.out.print(factors.get(i) + (i == factors.size() - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    tests: [
      { id: 1, name: 'Factors of 315', input: '315', expected: '3 3 5 7', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 41. Pairs with Given Difference K
  // -------------------------------------------------------------
  {
    id: 'col-pairs-difference-k',
    title: 'Pairs with Given Difference K',
    aliases: ['pairs with difference k', 'pairs with given difference', 'count pairs with difference k', 'difference k pairs'],
    keywords: ['pairs with given difference', 'difference k', 'pairs having difference equal to k'],
    pattern: 'HashSet / Two Pointers',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Count or find all unique pairs in an array having an absolute difference equal to K.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        Set<Integer> set = new HashSet<>();
        for (int x : arr) set.add(x);

        int count = 0;
        for (int x : set) {
            if (set.contains(x + k)) count++;
        }
        System.out.println(count);
    }
}`,
    tests: [
      { id: 1, name: 'Sample Difference 2', input: '5 2\n1 5 3 4 2', expected: '3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 42. String Compression (Run-Length Encoding)
  // -------------------------------------------------------------
  {
    id: 'col-string-compression',
    title: 'String Compression / Run-Length Encoding',
    aliases: ['string compression', 'run length encoding', 'rle', 'compress string'],
    keywords: ['string compression', 'consecutive characters count', 'run-length encoding', 'compress the string'],
    pattern: 'Two Pointers / String Manipulation',
    category: 'String Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Perform basic string compression using counts of repeated characters (e.g. aabcccccaaa -> a2b1c5a3).',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        if (s.isEmpty()) return;

        StringBuilder sb = new StringBuilder();
        int count = 1;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {
                count++;
            } else {
                sb.append(s.charAt(i)).append(count);
                count = 1;
            }
        }
        System.out.println(sb.toString());
    }
}`,
    tests: [
      { id: 1, name: 'aabcccccaaa', input: 'aabcccccaaa', expected: 'a2b1c5a3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 43. Check Power of Two
  // -------------------------------------------------------------
  {
    id: 'col-power-of-two',
    title: 'Check Power of Two',
    aliases: ['power of two', 'check power of 2', 'is power of two', 'power of 2'],
    keywords: ['power of two', 'is power of 2', 'check whether a number is power of 2'],
    pattern: 'Bit Manipulation',
    category: 'Bit Manipulation',
    difficulty: 'Easy',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Check whether a given non-zero integer is a power of two using bitwise AND.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long n = sc.nextLong();
        boolean ans = (n > 0) && ((n & (n - 1)) == 0);
        System.out.println(ans ? "True" : "False");
    }
}`,
    tests: [
      { id: 1, name: '16 is power of 2', input: '16', expected: 'True', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 44. Binary to Decimal & Decimal to Binary
  // -------------------------------------------------------------
  {
    id: 'col-binary-decimal-conv',
    title: 'Binary to Decimal and Decimal to Binary',
    aliases: ['binary to decimal', 'decimal to binary', 'binary conversion', 'base conversion'],
    keywords: ['binary to decimal', 'decimal to binary', 'convert binary', 'convert decimal'],
    pattern: 'Math / Base Conversion',
    category: 'Number Theory',
    difficulty: 'Easy',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description: 'Convert between binary strings and decimal representations.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String type = sc.next().toLowerCase();
        String val = sc.next();

        if (type.contains("bin")) {
            // Binary to decimal
            System.out.println(Long.parseLong(val, 2));
        } else {
            // Decimal to binary
            System.out.println(Long.toBinaryString(Long.parseLong(val)));
        }
    }
}`,
    tests: [
      { id: 1, name: 'Bin to Dec 1010', input: 'bin 1010', expected: '10', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 45. Peak Element in an Array
  // -------------------------------------------------------------
  {
    id: 'col-peak-element',
    title: 'Peak Element in an Array',
    aliases: ['peak element', 'find peak element', 'peak in array', 'element not smaller than its neighbours'],
    keywords: ['peak element', 'peak element in an array', 'greater than its neighbors'],
    pattern: 'Binary Search / Array',
    category: 'Array Algorithms',
    difficulty: 'Medium',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    description: 'An element is called a peak element if its value is not smaller than the value of its adjacent elements.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        if (list.isEmpty()) return;

        int start = (list.size() > 1 && list.get(0) == list.size() - 1) ? 1 : 0;
        int[] nums = new int[list.size() - start];
        for (int i = 0; i < nums.length; i++) nums[i] = list.get(i + start);

        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[mid + 1]) high = mid;
            else low = mid + 1;
        }
        System.out.println(nums[low]);
    }
}`,
    tests: [
      { id: 1, name: 'Peak in 1 2 3 1', input: '1 2 3 1', expected: '3', category: 'normal' }
    ]
  },

  // -------------------------------------------------------------
  // 46. Count Distinct Elements in Array
  // -------------------------------------------------------------
  {
    id: 'col-count-distinct',
    title: 'Count Distinct Elements in Array',
    aliases: ['count distinct elements', 'distinct elements', 'count distinct', 'number of distinct elements', 'unique elements count', 'distinct numbers'],
    keywords: ['count distinct', 'distinct elements', 'number of unique elements', 'how many distinct', 'distinct numbers'],
    pattern: 'HashSet / Frequency',
    category: 'Array Algorithms',
    difficulty: 'Easy',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Given an array of integers, count and print the total number of distinct (unique) elements.',
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Long> nums = new ArrayList<>();
        while (sc.hasNextLong()) nums.add(sc.nextLong());
        if (nums.isEmpty()) return;

        int start = (nums.size() > 1 && nums.get(0) == nums.size() - 1) ? 1 : 0;
        Set<Long> set = new HashSet<>();
        for (int i = start; i < nums.size(); i++) set.add(nums.get(i));
        System.out.println(set.size());
    }
}`,
    tests: [
      { id: 1, name: 'Sample Case', input: '6\n1 2 2 3 4 4', expected: '4', category: 'normal' }
    ]
  }
];
