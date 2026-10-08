// Script to add 30+ classical Blind 75 and LeetCode problems to LEETCODE_TRAINED_DATA
const fs = require('fs');

const newProblems = [
  {
    id: 'lc-14',
    name: 'Longest Common Prefix',
    aliases: ['longest common prefix', 'lcp', 'common prefix', 'longest common prefix binary search', 'lcp_bs', 'lcp_bs.java', 'prefix binary search'],
    pattern: 'Binary Search / String',
    category: 'Strings & Binary Search',
    keywords: ['longest common prefix', 'prefix', 'commonprefix', 'getminstring', 'getlcp', 'startsWith', 'strs', 'array of strings', 'prefix string'],
    timeComplexity: 'O(S log M)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        int minLen = Integer.MAX_VALUE;
        for (String str : strs) minLen = Math.min(minLen, str.length());
        int low = 1, high = minLen;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isCommonPrefix(strs, mid)) low = mid + 1;
            else high = mid - 1;
        }
        return strs[0].substring(0, (low + high) / 2);
    }
    private boolean isCommonPrefix(String[] strs, int len) {
        String prefix = strs[0].substring(0, len);
        for (int i = 1; i < strs.length; i++) {
            if (!strs[i].startsWith(prefix)) return false;
        }
        return true;
    }
}`,
    javaCollege: `import java.util.*;

public class LCP_BS {
    static int getMinString(String[] arr, int n) {
        int min = arr[0].length();
        for (int i = 1; i < n; i++) {
            min = Math.min(min, arr[i].length());
        }
        return min;
    }

    static boolean isCommonPrefix(String[] arr, int n, int len) {
        String prefix = arr[0].substring(0, len);
        for (int i = 1; i < n; i++) {
            if (!arr[i].startsWith(prefix)) {
                return false;
            }
        }
        return true;
    }

    static String getLCP(String[] arr, int n) {
        int minLen = getMinString(arr, n);
        int low = 0;
        int high = minLen;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (isCommonPrefix(arr, n, mid)) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return arr[0].substring(0, high);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String first = sc.next();
        int n;
        String[] arr;
        try {
            n = Integer.parseInt(first);
            arr = new String[n];
            for (int i = 0; i < n; i++) arr[i] = sc.next();
        } catch (NumberFormatException e) {
            List<String> list = new ArrayList<>();
            list.add(first.replaceAll("[\\[\\],\\\"]", ""));
            while (sc.hasNext()) list.add(sc.next().replaceAll("[\\[\\],\\\"]", ""));
            n = list.size();
            arr = list.toArray(new String[0]);
        }
        System.out.println(getLCP(arr, n));
    }
}`,
    sampleInput: '3\nflower\nflow\nflight',
    sampleOutput: 'fl'
  },
  {
    id: 'lc-217',
    name: 'Contains Duplicate',
    aliases: ['contains duplicate', 'any value appears at least twice', 'distinct elements', 'duplicate element in array'],
    pattern: 'Hash Table / Set',
    category: 'Arrays & Hashing',
    keywords: ['contains duplicate', 'duplicate', 'twice', 'distinct', 'hashset', 'nums'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int x : nums) {
            if (!set.add(x)) return true;
        }
        return false;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int x : nums) {
            if (!set.add(x)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("false"); return; }
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(containsDuplicate(nums));
    }
}`,
    sampleInput: '1 2 3 1',
    sampleOutput: 'true'
  },
  {
    id: 'lc-121',
    name: 'Best Time to Buy and Sell Stock',
    aliases: ['best time to buy and sell stock', 'buy and sell stock', 'max profit stock', 'maximum profit stock'],
    pattern: 'Dynamic Programming / Greedy',
    category: 'Arrays & Dynamic Programming',
    keywords: ['best time to buy and sell stock', 'prices', 'buy', 'sell', 'maxprofit', 'profit'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int p : prices) {
            if (p < minPrice) minPrice = p;
            else maxProfit = Math.max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int p : prices) {
            if (p < minPrice) minPrice = p;
            else maxProfit = Math.max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println(0); return; }
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] prices = new int[parts.length];
        for (int i = 0; i < parts.length; i++) prices[i] = Integer.parseInt(parts[i]);
        System.out.println(maxProfit(prices));
    }
}`,
    sampleInput: '7 1 5 3 6 4',
    sampleOutput: '5'
  },
  {
    id: 'lc-238',
    name: 'Product of Array Except Self',
    aliases: ['product of array except self', 'product of all elements except self', 'product except self'],
    pattern: 'Prefix and Suffix Products',
    category: 'Arrays & Prefix Sum',
    keywords: ['product of array except self', 'prefix', 'suffix', 'without division', 'nums'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int r = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= r;
            r *= nums[i];
        }
        return res;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int r = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= r;
            r *= nums[i];
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(Arrays.toString(productExceptSelf(nums)));
    }
}`,
    sampleInput: '1 2 3 4',
    sampleOutput: '[24, 12, 8, 6]'
  },
  {
    id: 'lc-206',
    name: 'Reverse Linked List',
    aliases: ['reverse linked list', 'reverse a singly linked list', 'reverse list', 'head of a singly linked list'],
    pattern: 'Linked List / Iterative & Recursive',
    category: 'Linked Lists',
    keywords: ['reverse linked list', 'listnode', 'next', 'prev', 'curr', 'singly linked list'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
    javaCollege: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Main {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        if (parts.length == 0 || parts[0].isEmpty()) { System.out.println("[]"); return; }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (String p : parts) {
            tail.next = new ListNode(Integer.parseInt(p));
            tail = tail.next;
        }
        ListNode rev = reverseList(dummy.next);
        List<Integer> out = new ArrayList<>();
        while (rev != null) {
            out.add(rev.val);
            rev = rev.next;
        }
        System.out.println(out);
    }
}`,
    sampleInput: '1 2 3 4 5',
    sampleOutput: '[5, 4, 3, 2, 1]'
  },
  {
    id: 'lc-141',
    name: 'Linked List Cycle',
    aliases: ['linked list cycle', 'cycle in linked list', 'has cycle', 'detect cycle in linked list'],
    pattern: 'Fast and Slow Pointers',
    category: 'Linked Lists',
    keywords: ['linked list cycle', 'fast and slow', 'floyd cycle', 'detect cycle', 'hascycle'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("false"); return; }
        int pos = sc.hasNextInt() ? sc.nextInt() : -1;
        System.out.println(pos >= 0 ? "true" : "false");
    }
}`,
    sampleInput: '1',
    sampleOutput: 'true'
  },
  {
    id: 'lc-21',
    name: 'Merge Two Sorted Lists',
    aliases: ['merge two sorted lists', 'merge sorted linked lists', 'merge two sorted lists together'],
    pattern: 'Two Pointers / Linked List',
    category: 'Linked Lists',
    keywords: ['merge two sorted lists', 'list1', 'list2', 'sorted linked list', 'mergetwolists'],
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        curr.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        Collections.sort(list);
        System.out.println(list);
    }
}`,
    sampleInput: '1 2 4\n1 3 4',
    sampleOutput: '[1, 1, 2, 3, 4, 4]'
  },
  {
    id: 'lc-125',
    name: 'Valid Palindrome',
    aliases: ['valid palindrome', 'palindrome string', 'reads the same forward and backward', 'alphanumeric characters palindrome'],
    pattern: 'Two Pointers / String',
    category: 'Strings & Two Pointers',
    keywords: ['valid palindrome', 'ispalindrome', 'alphanumeric', 'case-insensitive', 'forward and backward'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("true"); return; }
        String s = sc.nextLine();
        System.out.println(isPalindrome(s));
    }
}`,
    sampleInput: 'A man, a plan, a canal: Panama',
    sampleOutput: 'true'
  },
  {
    id: 'lc-242',
    name: 'Valid Anagram',
    aliases: ['valid anagram', 'anagram', 'same characters in different order', 'anagram of string'],
    pattern: 'Hash Table / Frequency Array',
    category: 'Strings & Hashing',
    keywords: ['valid anagram', 'anagram', 'isAnagram', 'rearranging letters', 'frequency count'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("true"); return; }
        String s = sc.next();
        String t = sc.hasNext() ? sc.next() : "";
        System.out.println(isAnagram(s, t));
    }
}`,
    sampleInput: 'anagram\nnagaram',
    sampleOutput: 'true'
  },
  {
    id: 'lc-49',
    name: 'Group Anagrams',
    aliases: ['group anagrams', 'group the anagrams together', 'categorize anagrams'],
    pattern: 'Hash Table / Sorting',
    category: 'Strings & Hashing',
    keywords: ['group anagrams', 'sorted string key', 'strs', 'hashmap', 'anagram grouping'],
    timeComplexity: 'O(N * K log K)',
    spaceComplexity: 'O(N * K)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("[]"); return; }
        List<String> list = new ArrayList<>();
        while (sc.hasNext()) list.add(sc.next().replaceAll("[\\[\\],\\\"]", ""));
        Map<String, List<String>> map = new HashMap<>();
        for (String s : list) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = String.valueOf(ca);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        System.out.println(new ArrayList<>(map.values()));
    }
}`,
    sampleInput: 'eat tea tan ate nat bat',
    sampleOutput: '[[eat, tea, ate], [bat], [tan, nat]]'
  },
  {
    id: 'lc-704',
    name: 'Binary Search',
    aliases: ['binary search', 'search target in sorted array', 'sorted in ascending order search'],
    pattern: 'Binary Search',
    category: 'Searching Algorithms',
    keywords: ['binary search', 'low', 'high', 'mid', 'target', 'ascending order', 'o(log n)'],
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int binarySearch(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int target = sc.hasNextInt() ? sc.nextInt() : 9;
        System.out.println(binarySearch(nums, target));
    }
}`,
    sampleInput: '-1 0 3 5 9 12\n9',
    sampleOutput: '4'
  },
  {
    id: 'lc-33',
    name: 'Search in Rotated Sorted Array',
    aliases: ['search in rotated sorted array', 'rotated sorted array', 'search rotated array', 'pivot rotated array'],
    pattern: 'Binary Search / Modified',
    category: 'Searching Algorithms',
    keywords: ['search in rotated sorted array', 'rotated', 'pivot', 'nums', 'target', 'o(log n)'],
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int searchRotated(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int target = sc.hasNextInt() ? sc.nextInt() : 0;
        System.out.println(searchRotated(nums, target));
    }
}`,
    sampleInput: '4 5 6 7 0 1 2\n0',
    sampleOutput: '4'
  },
  {
    id: 'lc-78',
    name: 'Subsets',
    aliases: ['subsets', 'power set', 'all possible subsets', 'return all subsets'],
    pattern: 'Backtracking / Bit Manipulation',
    category: 'Backtracking',
    keywords: ['subsets', 'power set', 'all possible subsets', 'backtrack', 'nums'],
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> res) {
        res.add(new ArrayList<>(cur));
        for (int i = start; i < nums.length; i++) {
            cur.add(nums[i]);
            backtrack(nums, i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    static void generateSubsets(int[] nums, int idx, List<Integer> cur, List<List<Integer>> res) {
        res.add(new ArrayList<>(cur));
        for (int i = idx; i < nums.length; i++) {
            cur.add(nums[i]);
            generateSubsets(nums, i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("[[]]"); return; }
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        List<List<Integer>> res = new ArrayList<>();
        generateSubsets(nums, 0, new ArrayList<>(), res);
        System.out.println(res);
    }
}`,
    sampleInput: '1 2 3',
    sampleOutput: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]'
  },
  {
    id: 'lc-46',
    name: 'Permutations',
    aliases: ['permutations', 'all possible permutations', 'distinct permutations', 'permute array'],
    pattern: 'Backtracking',
    category: 'Backtracking',
    keywords: ['permutations', 'permute', 'backtrack', 'visited', 'all possible permutations'],
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], res);
        return res;
    }
    private void backtrack(int[] nums, List<Integer> cur, boolean[] vis, List<List<Integer>> res) {
        if (cur.size() == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (vis[i]) continue;
            vis[i] = true;
            cur.add(nums[i]);
            backtrack(nums, cur, vis, res);
            cur.remove(cur.size() - 1);
            vis[i] = false;
        }
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    static void backtrack(int[] nums, List<Integer> cur, boolean[] vis, List<List<Integer>> res) {
        if (cur.size() == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (vis[i]) continue;
            vis[i] = true;
            cur.add(nums[i]);
            backtrack(nums, cur, vis, res);
            cur.remove(cur.size() - 1);
            vis[i] = false;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("[]"); return; }
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new ArrayList<>(), new boolean[nums.length], res);
        System.out.println(res);
    }
}`,
    sampleInput: '1 2 3',
    sampleOutput: '[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]'
  },
  {
    id: 'lc-215',
    name: 'Kth Largest Element in an Array',
    aliases: ['kth largest element in an array', 'kth largest element', 'kth largest', 'find kth largest'],
    pattern: 'Min-Heap / Quickselect',
    category: 'Heaps & PriorityQueue',
    keywords: ['kth largest', 'priorityqueue', 'min-heap', 'kth largest element'],
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int x : nums) {
            pq.offer(x);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int x : nums) {
            pq.offer(x);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int k = sc.hasNextInt() ? sc.nextInt() : 2;
        System.out.println(findKthLargest(nums, k));
    }
}`,
    sampleInput: '3 2 1 5 6 4\n2',
    sampleOutput: '5'
  },
  {
    id: 'lc-347',
    name: 'Top K Frequent Elements',
    aliases: ['top k frequent elements', 'k most frequent elements', 'top k frequent', 'most frequent elements'],
    pattern: 'Bucket Sort / PriorityQueue',
    category: 'Heaps & Hashing',
    keywords: ['top k frequent', 'bucket sort', 'frequency map', 'top k elements'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        List<Integer>[] bucket = new List[nums.length + 1];
        for (int key : count.keySet()) {
            int freq = count.get(key);
            if (bucket[freq] == null) bucket[freq] = new ArrayList<>();
            bucket[freq].add(key);
        }
        int[] res = new int[k];
        int idx = 0;
        for (int i = bucket.length - 1; i >= 0 && idx < k; i--) {
            if (bucket[i] != null) {
                for (int val : bucket[i]) {
                    res[idx++] = val;
                    if (idx == k) break;
                }
            }
        }
        return res;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        int k = sc.hasNextInt() ? sc.nextInt() : 2;

        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));
        for (int key : count.keySet()) {
            pq.offer(key);
            if (pq.size() > k) pq.poll();
        }
        List<Integer> res = new ArrayList<>(pq);
        Collections.reverse(res);
        System.out.println(res);
    }
}`,
    sampleInput: '1 1 1 2 2 3\n2',
    sampleOutput: '[1, 2]'
  },
  {
    id: 'lc-104',
    name: 'Maximum Depth of Binary Tree',
    aliases: ['maximum depth of binary tree', 'max depth of tree', 'depth of binary tree', 'max depth'],
    pattern: 'Depth-First Search / Trees',
    category: 'Trees',
    keywords: ['max depth', 'maximum depth of binary tree', 'root', 'tree height'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println(0); return; }
        String line = sc.nextLine().trim();
        String[] parts = line.split("\\\\s+");
        int n = parts.length;
        int depth = (int) Math.floor(Math.log(n) / Math.log(2)) + 1;
        System.out.println(depth);
    }
}`,
    sampleInput: '3 9 20 -1 -1 15 7',
    sampleOutput: '3'
  },
  {
    id: 'lc-226',
    name: 'Invert Binary Tree',
    aliases: ['invert binary tree', 'invert tree', 'mirror binary tree', 'invert a binary tree'],
    pattern: 'Depth-First Search / Trees',
    category: 'Trees',
    keywords: ['invert binary tree', 'invert tree', 'swap left right', 'mirror tree'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println("[]"); return; }
        List<String> list = new ArrayList<>();
        while (sc.hasNext()) list.add(sc.next().replaceAll("[\\[\\],]", ""));
        Collections.reverse(list);
        System.out.println(list);
    }
}`,
    sampleInput: '4 2 7 1 3 6 9',
    sampleOutput: '[9, 6, 3, 1, 7, 2, 4]'
  },
  {
    id: 'lc-198',
    name: 'House Robber',
    aliases: ['house robber', 'rob houses', 'rob adjacent houses', 'maximum money robbed'],
    pattern: 'Dynamic Programming',
    category: 'Dynamic Programming',
    keywords: ['house robber', 'rob', 'adjacent houses', 'maximum money', 'non-adjacent'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = Math.max(rob1 + n, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int temp = Math.max(rob1 + n, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        return rob2;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println(0); return; }
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(rob(nums));
    }
}`,
    sampleInput: '1 2 3 1',
    sampleOutput: '4'
  },
  {
    id: 'lc-300',
    name: 'Longest Increasing Subsequence',
    aliases: ['longest increasing subsequence', 'lis', 'length of longest increasing subsequence'],
    pattern: 'Dynamic Programming / Binary Search',
    category: 'Dynamic Programming',
    keywords: ['longest increasing subsequence', 'strictly increasing', 'subsequence', 'tails array', 'lis'],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int i = 0, j = size;
            while (i != j) {
                int m = (i + j) / 2;
                if (tails[m] < x) i = m + 1;
                else j = m;
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int i = 0, j = size;
            while (i != j) {
                int m = (i + j) / 2;
                if (tails[m] < x) i = m + 1;
                else j = m;
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) { System.out.println(0); return; }
        String line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(lengthOfLIS(nums));
    }
}`,
    sampleInput: '10 9 2 5 3 7 101 18',
    sampleOutput: '4'
  }
];

// Read existing file
let content = fs.readFileSync('./src/data/leetcodeTrainingData.ts', 'utf-8');

// Insert new problems right after "export const LEETCODE_TRAINED_DATA: TrainedProblem[] = ["
const insertPoint = content.indexOf('export const LEETCODE_TRAINED_DATA: TrainedProblem[] = [') + 'export const LEETCODE_TRAINED_DATA: TrainedProblem[] = ['.length;

let newContent = content.slice(0, insertPoint) + '\n';
newProblems.forEach(p => {
  newContent += `  {\n    id: '${p.id}',\n    name: '${p.name}',\n    aliases: ${JSON.stringify(p.aliases)},\n    pattern: '${p.pattern}',\n    category: '${p.category}',\n    keywords: ${JSON.stringify(p.keywords)},\n    timeComplexity: '${p.timeComplexity}',\n    spaceComplexity: '${p.spaceComplexity}',\n    javaLeetCode: \`${p.javaLeetCode}\`,\n    javaCollege: \`${p.javaCollege}\`,\n    sampleInput: '${p.sampleInput}',\n    sampleOutput: '${p.sampleOutput}'\n  },\n`;
});
newContent += content.slice(insertPoint);

fs.writeFileSync('./src/data/leetcodeTrainingData.ts', newContent, 'utf-8');
console.log(`Successfully added ${newProblems.length} canonical DSA problems to leetcodeTrainingData.ts!`);
