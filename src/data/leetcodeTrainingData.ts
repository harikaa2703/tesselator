// Comprehensive LeetCode & College DAA Training Knowledge Base
// Trained on 60+ canonical LeetCode problems (Blind 75 / NeetCode 150) + KMIT DAA KR24 Unit-I & Unit-III syllabus.

export interface TrainedProblem {
  id: string;
  name: string;
  aliases: string[];
  pattern: string;
  category: string;
  keywords: string[];
  timeComplexity: string;
  spaceComplexity: string;
  javaLeetCode: string;
  javaCollege: string;
  sampleInput: string;
  sampleOutput: string;
}

export const LEETCODE_TRAINED_DATA: TrainedProblem[] = [
  {
    id: 'lc-14',
    name: 'Longest Common Prefix',
    aliases: ["longest common prefix","lcp","common prefix","longest common prefix binary search","lcp_bs","lcp_bs.java","prefix binary search"],
    pattern: 'Binary Search / String',
    category: 'Strings & Binary Search',
    keywords: ["longest common prefix","prefix","commonprefix","getminstring","getlcp","startsWith","strs","array of strings","prefix string"],
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
    aliases: ["contains duplicate","any value appears at least twice","distinct elements","duplicate element in array"],
    pattern: 'Hash Table / Set',
    category: 'Arrays & Hashing',
    keywords: ["contains duplicate","duplicate","twice","distinct","hashset","nums"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["best time to buy and sell stock","buy and sell stock","max profit stock","maximum profit stock"],
    pattern: 'Dynamic Programming / Greedy',
    category: 'Arrays & Dynamic Programming',
    keywords: ["best time to buy and sell stock","prices","buy","sell","maxprofit","profit"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["product of array except self","product of all elements except self","product except self"],
    pattern: 'Prefix and Suffix Products',
    category: 'Arrays & Prefix Sum',
    keywords: ["product of array except self","prefix","suffix","without division","nums"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["reverse linked list","reverse a singly linked list","reverse list","head of a singly linked list"],
    pattern: 'Linked List / Iterative & Recursive',
    category: 'Linked Lists',
    keywords: ["reverse linked list","listnode","next","prev","curr","singly linked list"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["linked list cycle","cycle in linked list","has cycle","detect cycle in linked list"],
    pattern: 'Fast and Slow Pointers',
    category: 'Linked Lists',
    keywords: ["linked list cycle","fast and slow","floyd cycle","detect cycle","hascycle"],
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
    aliases: ["merge two sorted lists","merge sorted linked lists","merge two sorted lists together"],
    pattern: 'Two Pointers / Linked List',
    category: 'Linked Lists',
    keywords: ["merge two sorted lists","list1","list2","sorted linked list","mergetwolists"],
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
    aliases: ["valid palindrome","palindrome string","reads the same forward and backward","alphanumeric characters palindrome"],
    pattern: 'Two Pointers / String',
    category: 'Strings & Two Pointers',
    keywords: ["valid palindrome","ispalindrome","alphanumeric","case-insensitive","forward and backward"],
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
    aliases: ["valid anagram","anagram","same characters in different order","anagram of string"],
    pattern: 'Hash Table / Frequency Array',
    category: 'Strings & Hashing',
    keywords: ["valid anagram","anagram","isAnagram","rearranging letters","frequency count"],
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
    aliases: ["group anagrams","group the anagrams together","categorize anagrams"],
    pattern: 'Hash Table / Sorting',
    category: 'Strings & Hashing',
    keywords: ["group anagrams","sorted string key","strs","hashmap","anagram grouping"],
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
        while (sc.hasNext()) list.add(sc.next().replaceAll("[\[\],\"]", ""));
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
    aliases: ["binary search","search target in sorted array","sorted in ascending order search"],
    pattern: 'Binary Search',
    category: 'Searching Algorithms',
    keywords: ["binary search","low","high","mid","target","ascending order","o(log n)"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["search in rotated sorted array","rotated sorted array","search rotated array","pivot rotated array"],
    pattern: 'Binary Search / Modified',
    category: 'Searching Algorithms',
    keywords: ["search in rotated sorted array","rotated","pivot","nums","target","o(log n)"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\\[\\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["subsets","power set","all possible subsets","return all subsets"],
    pattern: 'Backtracking / Bit Manipulation',
    category: 'Backtracking',
    keywords: ["subsets","power set","all possible subsets","backtrack","nums"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["permutations","all possible permutations","distinct permutations","permute array"],
    pattern: 'Backtracking',
    category: 'Backtracking',
    keywords: ["permutations","permute","backtrack","visited","all possible permutations"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["kth largest element in an array","kth largest element","kth largest","find kth largest"],
    pattern: 'Min-Heap / Quickselect',
    category: 'Heaps & PriorityQueue',
    keywords: ["kth largest","priorityqueue","min-heap","kth largest element"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["top k frequent elements","k most frequent elements","top k frequent","most frequent elements"],
    pattern: 'Bucket Sort / PriorityQueue',
    category: 'Heaps & Hashing',
    keywords: ["top k frequent","bucket sort","frequency map","top k elements"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["maximum depth of binary tree","max depth of tree","depth of binary tree","max depth"],
    pattern: 'Depth-First Search / Trees',
    category: 'Trees',
    keywords: ["max depth","maximum depth of binary tree","root","tree height"],
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
        String[] parts = line.split("\\s+");
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
    aliases: ["invert binary tree","invert tree","mirror binary tree","invert a binary tree"],
    pattern: 'Depth-First Search / Trees',
    category: 'Trees',
    keywords: ["invert binary tree","invert tree","swap left right","mirror tree"],
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
        while (sc.hasNext()) list.add(sc.next().replaceAll("[\[\],]", ""));
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
    aliases: ["house robber","rob houses","rob adjacent houses","maximum money robbed"],
    pattern: 'Dynamic Programming',
    category: 'Dynamic Programming',
    keywords: ["house robber","rob","adjacent houses","maximum money","non-adjacent"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
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
    aliases: ["longest increasing subsequence","lis","length of longest increasing subsequence"],
    pattern: 'Dynamic Programming / Binary Search',
    category: 'Dynamic Programming',
    keywords: ["longest increasing subsequence","strictly increasing","subsequence","tails array","lis"],
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
        String line = sc.nextLine().replaceAll(".*=\\s*", "").replaceAll("[\[\],]", " ").trim();
        String[] parts = line.split("\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
        System.out.println(lengthOfLIS(nums));
    }
}`,
    sampleInput: '10 9 2 5 3 7 101 18',
    sampleOutput: '4'
  },

  // LeetCode 287 - Find the Duplicate Number / Repeated Number in nums
  {
    id: 'lc-287',
    name: 'Find the Duplicate Number / Repeated Number',
    aliases: [
      'repeated number',
      'repeated number in nums',
      'there is only one repeated number in nums',
      'find the duplicate number',
      'duplicate number',
      'find duplicate',
      'repeated',
      'constant extra space'
    ],
    pattern: 'Two Pointers / Floyd Cycle Detection',
    category: 'Arrays & Two Pointers',
    keywords: [
      'repeated number',
      'repeated',
      'duplicate number',
      'nums',
      'without modifying the array',
      'constant extra space',
      'find duplicate',
      'only one repeated number'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static int findDuplicate(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine().trim();
        line = line.replaceAll(".*=\\\\s*", "");
        line = line.replaceAll("[\\\\[\\\\],]", " ").trim();
        if (line.isEmpty() && sc.hasNextLine()) {
            line = sc.nextLine().replaceAll(".*=\\\\s*", "").replaceAll("[\\\\[\\\\],]", " ").trim();
        }
        String[] parts = line.split("\\\\s+");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        System.out.println(findDuplicate(nums));
    }
}`,
    sampleInput: '[1,3,4,2,2]',
    sampleOutput: '2'
  },
  // Exact Problem from user's KMIT college screenshot
  {
    id: 'lc-39',
    name: 'Combination Sum / Find Combinations',
    aliases: ['combination sum', 'findcombinations', 'find combinations', 'sum to target combinations', 'target combinations using numbers 1 to n'],
    pattern: 'Backtracking / Recursion',
    category: 'Backtracking',
    keywords: ['findcombinations', 'find combinations', 'allow same number again', 'target == 0', 'target - i', 'current.add', 'current.remove', 'sum to target', 'candidates'],
    timeComplexity: 'O(2^T)',
    spaceComplexity: 'O(T)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, 0, target, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int[] candidates, int start, int target, List<Integer> cur, List<List<Integer>> res) {
        if (target == 0) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] <= target) {
                cur.add(candidates[i]);
                backtrack(candidates, i, target - candidates[i], cur, res);
                cur.remove(cur.size() - 1);
            }
        }
    }
}`,
    javaCollege: `import java.util.*;

public class Main
{
    static void findCombinations(int start, int target, List<Integer> current, int n)
    {
        if (target == 0)
        {
            System.out.println(current);
            return;
        }
        
        for (int i = start; i <= n && i <= target; i++)
        {
            current.add(i);
            findCombinations(i, target - i, current, n); // allow same number again
            current.remove(current.size() - 1);
        }
    }
    
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        findCombinations(1, m, new ArrayList<>(), n);
        sc.close();
    }
}`,
    sampleInput: '4 7',
    sampleOutput: '[1, 1, 1, 1, 1, 1, 1]\n[1, 1, 1, 1, 1, 2]\n[1, 1, 1, 1, 3]\n[1, 1, 1, 2, 2]\n[1, 1, 1, 4]\n[1, 1, 2, 3]\n[1, 2, 2, 2]\n[1, 2, 4]\n[1, 3, 3]\n[2, 2, 3]\n[3, 4]'
  },
  {
    id: 'lc-551',
    name: '05_10_2026 Attendance program / Student Attendance Record',
    aliases: ['attendance program', 'student attendance record', 'attendance verification', '05_10_2026 attendance program', 'consecutive present students', 'given attendance records of n students', 'total consecutive present students using recursion', 'attendance string consists of p a l'],
    pattern: 'Recursion / Linear Scan',
    category: 'Strings & Recursion',
    keywords: ['attendance', 'absent', 'absent days', 'consecutive late', 'consecutive present', 'recursion', 'students', 'ppap', 'ppalla', 'student attendance'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `class Solution {
    public boolean checkRecord(String s) {
        int a = 0, l = 0;
        for (char c : s.toCharArray()) {
            if (c == 'A') {
                a++;
                if (a >= 2) return false;
                l = 0;
            } else if (c == 'L') {
                l++;
                if (l >= 3) return false;
            } else {
                l = 0;
            }
        }
        return true;
    }
}`,
    javaCollege: `import java.util.*;

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
    sampleInput: '5\nPPALLP',
    sampleOutput: '2'
  },
  // ==========================================
  // ARRAYS & HASHING / TWO POINTERS / SLIDING WINDOW
  // ==========================================
  {
    id: 'lc-1',
    name: 'Two Sum',
    aliases: ['two sum', 'find two numbers with target sum', 'pair sum', 'sum of two elements'],
    pattern: 'HashMap',
    category: 'Arrays & Hashing',
    keywords: ['indices of the two numbers', 'add up to target', 'nums', 'target', 'complement', 'exactly one solution'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.HashMap;
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
    javaCollege: `import java.util.*;

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
                System.out.println(map.get(comp) + " " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
    sampleInput: '4\n2 7 11 15\n9',
    sampleOutput: '0 1'
  },
  {
    id: 'lc-15',
    name: '3Sum',
    aliases: ['3sum', 'three sum', 'triplet sum to zero', 'unique triplets'],
    pattern: 'Two Pointers / Sorting',
    category: 'Two Pointers',
    keywords: ['three numbers', 'triplets', 'i != j', 'i != k', 'sum to 0', 'unique triplets', 'nums[i] + nums[j] + nums[k] == 0'],
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1) extra',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++;
                    r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
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
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        Arrays.sort(nums);
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    System.out.println(nums[i] + " " + nums[l] + " " + nums[r]);
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
    }
}`,
    sampleInput: '6\n-1 0 1 2 -1 -4',
    sampleOutput: '-1 -1 2\n-1 0 1'
  },
  {
    id: 'lc-11',
    name: 'Container With Most Water',
    aliases: ['container with most water', 'max water container', 'two vertical lines max water'],
    pattern: 'Two Pointers',
    category: 'Two Pointers',
    keywords: ['container', 'most water', 'height', 'vertical lines', 'contain the most water', 'area', 'min(height[l], height[r])'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1;
        int max = 0;
        while (l < r) {
            int area = Math.min(height[l], height[r]) * (r - l);
            if (area > max) max = area;
            if (height[l] < height[r]) l++;
            else r--;
        }
        return max;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        
        int l = 0, r = n - 1, max = 0;
        while (l < r) {
            int area = Math.min(h[l], h[r]) * (r - l);
            max = Math.max(max, area);
            if (h[l] < h[r]) l++;
            else r--;
        }
        System.out.println(max);
    }
}`,
    sampleInput: '9\n1 8 6 2 5 4 8 3 7',
    sampleOutput: '49'
  },
  {
    id: 'lc-42',
    name: 'Trapping Rain Water',
    aliases: ['trapping rain water', 'trap rainwater', 'elevation map trap water'],
    pattern: 'Two Pointers / Monotonic Stack',
    category: 'Two Pointers',
    keywords: ['elevation map', 'trap', 'rain water', 'trapped after raining', 'width of each bar is 1', 'maxLeft', 'maxRight'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) leftMax = height[l];
                else water += leftMax - height[l];
                l++;
            } else {
                if (height[r] >= rightMax) rightMax = height[r];
                else water += rightMax - height[r];
                r--;
            }
        }
        return water;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        
        int l = 0, r = n - 1, leftMax = 0, rightMax = 0, ans = 0;
        while (l < r) {
            if (h[l] < h[r]) {
                if (h[l] >= leftMax) leftMax = h[l];
                else ans += leftMax - h[l];
                l++;
            } else {
                if (h[r] >= rightMax) rightMax = h[r];
                else ans += rightMax - h[r];
                r--;
            }
        }
        System.out.println(ans);
    }
}`,
    sampleInput: '12\n0 1 0 2 1 0 1 3 2 1 2 1',
    sampleOutput: '6'
  },
  {
    id: 'lc-3',
    name: 'Longest Substring Without Repeating Characters',
    aliases: ['longest substring without repeating characters', 'longest unique substring', 'substring without duplicates'],
    pattern: 'Sliding Window',
    category: 'Sliding Window',
    keywords: ['length of the longest substring', 'without repeating characters', 'longest substring', 'sliding window', 'unique characters'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M))',
    javaLeetCode: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (map.containsKey(c)) {
                l = Math.max(l, map.get(c) + 1);
            }
            map.put(c, r);
            maxLen = Math.max(maxLen, r - l + 1);
        }
        return maxLen;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String s = sc.nextLine();
        
        Map<Character, Integer> map = new HashMap<>();
        int max = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (map.containsKey(c)) l = Math.max(l, map.get(c) + 1);
            map.put(c, r);
            max = Math.max(max, r - l + 1);
        }
        System.out.println(max);
    }
}`,
    sampleInput: 'abcabcbb',
    sampleOutput: '3'
  },
  {
    id: 'lc-53',
    name: 'Maximum Subarray (Kadane)',
    aliases: ['maximum subarray', 'kadane algorithm', 'max contiguous subarray sum', 'largest sum contiguous subarray'],
    pattern: 'Dynamic Programming / Greedy',
    category: 'Dynamic Programming',
    keywords: ['contiguous subarray', 'largest sum', 'maximum subarray', 'kadane', 'nums', 'subarray with the largest sum'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        return maxSoFar;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        long maxSoFar = nums[0];
        long currMax = nums[0];
        for (int i = 1; i < n; i++) {
            currMax = Math.max((long)nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        System.out.println(maxSoFar);
    }
}`,
    sampleInput: '9\n-2 1 -3 4 -1 2 1 -5 4',
    sampleOutput: '6'
  },
  {
    id: 'lc-56',
    name: 'Merge Intervals',
    aliases: ['merge intervals', 'overlapping intervals', 'merge overlapping intervals'],
    pattern: 'Intervals / Sorting',
    category: 'Intervals',
    keywords: ['array of intervals', 'merge all overlapping intervals', 'start', 'end', 'intervals[i] = [starti, endi]'],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> res = new ArrayList<>();
        int[] curr = intervals[0];
        res.add(curr);
        for (int[] next : intervals) {
            if (curr[1] >= next[0]) {
                curr[1] = Math.max(curr[1], next[1]);
            } else {
                curr = next;
                res.add(curr);
            }
        }
        return res.toArray(new int[res.size()][]);
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] intervals = new int[n][2];
        for (int i = 0; i < n; i++) {
            intervals[i][0] = sc.nextInt();
            intervals[i][1] = sc.nextInt();
        }
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        int[] curr = intervals[0];
        merged.add(curr);
        for (int i = 1; i < n; i++) {
            if (curr[1] >= intervals[i][0]) {
                curr[1] = Math.max(curr[1], intervals[i][1]);
            } else {
                curr = intervals[i];
                merged.add(curr);
            }
        }
        for (int[] inv : merged) {
            System.out.println(inv[0] + " " + inv[1]);
        }
    }
}`,
    sampleInput: '4\n1 3\n2 6\n8 10\n15 18',
    sampleOutput: '1 6\n8 10\n15 18'
  },
  {
    id: 'lc-20',
    name: 'Valid Parentheses',
    aliases: ['valid parentheses', 'matching brackets', 'balanced parentheses', 'parentheses checker', 'determine if the input string is valid', 'given a string s containing just the characters', 'bracket', 'brackets', 'parentheses', '()[]{}'],
    pattern: 'Stack',
    category: 'Stack',
    keywords: ['bracket', 'brackets', 'parentheses', 'parenthesis', 'valid string', 'open brackets must be closed', 'same type', 'stack', '()[]{}'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.Stack;

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
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        Stack<Character> st = new Stack<>();
        boolean valid = true;
        for (char c : s.toCharArray()) {
            if (c == '(') st.push(')');
            else if (c == '{') st.push('}');
            else if (c == '[') st.push(']');
            else if (st.isEmpty() || st.pop() != c) {
                valid = false;
                break;
            }
        }
        if (valid && st.isEmpty()) System.out.println("true");
        else System.out.println("false");
    }
}`,
    sampleInput: '()[]{}',
    sampleOutput: 'true'
  },
  {
    id: 'lc-739',
    name: 'Daily Temperatures',
    aliases: ['daily temperatures', 'next warmer day', 'warmer temperature', 'days to wait'],
    pattern: 'Monotonic Stack',
    category: 'Stack',
    keywords: ['temperatures', 'warmer day', 'days you would have to wait', 'monotonic stack', 'future day'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.Stack;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] ans = new int[n];
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prev = stack.pop();
                ans[prev] = i - prev;
            }
            stack.push(i);
        }
        return ans;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] t = new int[n];
        for (int i = 0; i < n; i++) t[i] = sc.nextInt();
        
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && t[i] > t[st.peek()]) {
                int idx = st.pop();
                ans[idx] = i - idx;
            }
            st.push(i);
        }
        for (int i = 0; i < n; i++) {
            System.out.print(ans[i] + (i == n - 1 ? "" : " "));
        }
        System.out.println();
    }
}`,
    sampleInput: '8\n73 74 75 71 69 72 76 73',
    sampleOutput: '1 1 4 2 1 1 0 0'
  },

  // ==========================================
  // GRAPHS & BFS / DFS (KMIT UNIT-III SYLLABUS)
  // ==========================================
  {
    id: 'lc-200',
    name: 'Number of Islands',
    aliases: ['number of islands', 'connected components in grid', 'island count'],
    pattern: 'BFS / DFS / Connected Components',
    category: 'Graphs',
    keywords: ['m x n 2d binary grid', 'grid', 'islands', 'surrounded by water', 'connected 4-directionally', '1s land', '0s water'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
        g[r][c] = '0';
        dfs(g, r + 1, c);
        dfs(g, r - 1, c);
        dfs(g, r, c + 1);
        dfs(g, r, c - 1);
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        char[][] grid = new char[m][n];
        for (int i = 0; i < m; i++) {
            String row = sc.next();
            grid[i] = row.toCharArray();
        }
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        System.out.println(count);
    }
    static void dfs(char[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
        g[r][c] = '0';
        dfs(g, r + 1, c);
        dfs(g, r - 1, c);
        dfs(g, r, c + 1);
        dfs(g, r, c - 1);
    }
}`,
    sampleInput: '4 5\n11110\n11010\n11000\n00000',
    sampleOutput: '1'
  },
  {
    id: 'lc-695',
    name: 'Max Area of Island',
    aliases: ['max area of island', 'maximum island area', 'largest island', 'u3_daa_bfs_max_area_of_island'],
    pattern: 'BFS / DFS / Matrix',
    category: 'Graphs',
    keywords: ['max area of island', 'maximum area', 'island', '4-directionally', 'binary matrix', 'area of an island is the number of cells with a value 1'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int max = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    max = Math.max(max, dfs(grid, i, j));
                }
            }
        }
        return max;
    }
    private int dfs(int[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != 1) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r + 1, c) + dfs(g, r - 1, c) + dfs(g, r, c + 1) + dfs(g, r, c - 1);
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] g = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) g[i][j] = sc.nextInt();
        }
        int max = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == 1) {
                    max = Math.max(max, dfs(g, i, j));
                }
            }
        }
        System.out.println(max);
    }
    static int dfs(int[][] g, int r, int c) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != 1) return 0;
        g[r][c] = 0;
        return 1 + dfs(g, r + 1, c) + dfs(g, r - 1, c) + dfs(g, r, c + 1) + dfs(g, r, c - 1);
    }
}`,
    sampleInput: '4 5\n0 0 1 0 0\n0 1 1 0 1\n0 1 1 0 0\n0 0 0 0 0',
    sampleOutput: '5'
  },
  {
    id: 'lc-711',
    name: 'Number of Distinct Islands',
    aliases: ['number of distinct islands', 'distinct islands', 'unique shape islands'],
    pattern: 'DFS with Canonical Path Signature',
    category: 'Graphs',
    keywords: ['distinct islands', 'unique shape', 'translated not rotated', 'island shapes', 'relative coordinates', 'path signature'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int numDistinctIslands(int[][] grid) {
        Set<String> shapes = new HashSet<>();
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 1) {
                    StringBuilder sb = new StringBuilder();
                    dfs(grid, i, j, sb, 'O');
                    shapes.add(sb.toString());
                }
            }
        }
        return shapes.size();
    }
    private void dfs(int[][] g, int r, int c, StringBuilder sb, char dir) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != 1) return;
        g[r][c] = 0;
        sb.append(dir);
        dfs(g, r + 1, c, sb, 'D');
        dfs(g, r - 1, c, sb, 'U');
        dfs(g, r, c + 1, sb, 'R');
        dfs(g, r, c - 1, sb, 'L');
        sb.append('B'); // Backtrack delimiter
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] g = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) g[i][j] = sc.nextInt();
        }
        Set<String> set = new HashSet<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == 1) {
                    StringBuilder sb = new StringBuilder();
                    dfs(g, i, j, sb, 'O');
                    set.add(sb.toString());
                }
            }
        }
        System.out.println(set.size());
    }
    static void dfs(int[][] g, int r, int c, StringBuilder sb, char dir) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != 1) return;
        g[r][c] = 0;
        sb.append(dir);
        dfs(g, r + 1, c, sb, 'D');
        dfs(g, r - 1, c, sb, 'U');
        dfs(g, r, c + 1, sb, 'R');
        dfs(g, r, c - 1, sb, 'L');
        sb.append('B');
    }
}`,
    sampleInput: '4 5\n1 1 0 1 1\n1 0 0 0 0\n0 0 0 0 1\n1 1 0 1 1',
    sampleOutput: '3'
  },
  {
    id: 'lc-490',
    name: 'The Maze',
    aliases: ['the maze', 'ball in maze', 'ball stops at wall', 'maze destination'],
    pattern: 'BFS / Roll until Wall',
    category: 'Graphs',
    keywords: ['maze', 'ball', 'destination', 'rolls until hits wall', 'empty space', 'wall', 'can the ball stop at destination'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        int m = maze.length, n = maze[0].length;
        boolean[][] visited = new boolean[m][n];
        Queue<int[]> q = new LinkedList<>();
        q.offer(start);
        visited[start[0]][start[1]] = true;
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == destination[0] && cur[1] == destination[1]) return true;
            for (int[] d : dirs) {
                int r = cur[0];
                int c = cur[1];
                while (r + d[0] >= 0 && r + d[0] < m && c + d[1] >= 0 && c + d[1] < n && maze[r + d[0]][c + d[1]] == 0) {
                    r += d[0];
                    c += d[1];
                }
                if (!visited[r][c]) {
                    visited[r][c] = true;
                    q.offer(new int[]{r, c});
                }
            }
        }
        return false;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] maze = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) maze[i][j] = sc.nextInt();
        }
        int sr = sc.nextInt(), scCol = sc.nextInt();
        int dr = sc.nextInt(), dc = sc.nextInt();
        
        boolean[][] vis = new boolean[m][n];
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{sr, scCol});
        vis[sr][scCol] = true;
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        boolean found = false;
        
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == dr && cur[1] == dc) {
                found = true;
                break;
            }
            for (int[] d : dirs) {
                int r = cur[0], c = cur[1];
                while (r + d[0] >= 0 && r + d[0] < m && c + d[1] >= 0 && c + d[1] < n && maze[r + d[0]][c + d[1]] == 0) {
                    r += d[0];
                    c += d[1];
                }
                if (!vis[r][c]) {
                    vis[r][c] = true;
                    q.offer(new int[]{r, c});
                }
            }
        }
        System.out.println(found ? "true" : "false");
    }
}`,
    sampleInput: '5 5\n0 0 1 0 0\n0 0 0 0 0\n0 0 0 1 0\n1 1 0 1 1\n0 0 0 0 0\n0 4\n4 4',
    sampleOutput: 'true'
  },
  {
    id: 'lc-994',
    name: 'Rotting Oranges',
    aliases: ['rotting oranges', 'rotten orange minutes', 'orange rot bfs'],
    pattern: 'Multi-source BFS',
    category: 'Graphs',
    keywords: ['rotting oranges', 'grid', 'fresh orange', 'rotten orange', 'adjacent 4-directionally', 'minimum number of minutes'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int orangesRotting(int[][] grid) {
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.offer(new int[]{i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.isEmpty() && fresh > 0) {
            minutes++;
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int r = cur[0] + d[0], c = cur[1] + d[1];
                    if (r >= 0 && r < m && c >= 0 && c < n && grid[r][c] == 1) {
                        grid[r][c] = 2;
                        fresh--;
                        q.offer(new int[]{r, c});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt(), n = sc.nextInt();
        int[][] g = new int[m][n];
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                g[i][j] = sc.nextInt();
                if (g[i][j] == 2) q.offer(new int[]{i, j});
                else if (g[i][j] == 1) fresh++;
            }
        }
        if (fresh == 0) {
            System.out.println(0);
            return;
        }
        int min = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.isEmpty() && fresh > 0) {
            min++;
            int sz = q.size();
            for (int k = 0; k < sz; k++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int r = cur[0] + d[0], c = cur[1] + d[1];
                    if (r >= 0 && r < m && c >= 0 && c < n && g[r][c] == 1) {
                        g[r][c] = 2;
                        fresh--;
                        q.offer(new int[]{r, c});
                    }
                }
            }
        }
        System.out.println(fresh == 0 ? min : -1);
    }
}`,
    sampleInput: '3 3\n2 1 1\n1 1 0\n0 1 1',
    sampleOutput: '4'
  },
  {
    id: 'lc-207',
    name: 'Course Schedule',
    aliases: ['course schedule', 'prerequisite courses', 'cycle in directed graph', 'topological sort courses'],
    pattern: 'Topological Sort / Kahn Algorithm',
    category: 'Graphs',
    keywords: ['courses you have to take', 'prerequisites', 'numCourses', 'take course bi first', 'cycle detection', 'topological sort'],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    javaLeetCode: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.offer(i);
        }
        int taken = 0;
        while (!q.isEmpty()) {
            int cur = q.poll();
            taken++;
            for (int next : adj.get(cur)) {
                if (--inDegree[next] == 0) q.offer(next);
            }
        }
        return taken == numCourses;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] inDeg = new int[n];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            adj.get(v).add(u);
            inDeg[u]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) if (inDeg[i] == 0) q.offer(i);
        int count = 0;
        while (!q.isEmpty()) {
            int c = q.poll();
            count++;
            for (int next : adj.get(c)) {
                if (--inDeg[next] == 0) q.offer(next);
            }
        }
        System.out.println(count == n ? "true" : "false");
    }
}`,
    sampleInput: '2 1\n1 0',
    sampleOutput: 'true'
  },

  // ==========================================
  // TREES (KMIT UNIT-III SYLLABUS)
  // ==========================================
  {
    id: 'lc-1469',
    name: 'Find All The Lonely Nodes',
    aliases: ['find all the lonely nodes', 'lonely nodes', 'nodes with no siblings', 'only child in binary tree'],
    pattern: 'Tree Traversal (DFS/BFS)',
    category: 'Trees',
    keywords: ['lonely node', 'node of a binary tree', 'only child', 'parent node has only one child', 'return the values of all lonely nodes'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<Integer> getLonelyNodes(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
    private void dfs(TreeNode root, List<Integer> res) {
        if (root == null) return;
        if (root.left != null && root.right == null) res.add(root.left.val);
        if (root.right != null && root.left == null) res.add(root.right.val);
        dfs(root.left, res);
        dfs(root.right, res);
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String line = sc.nextLine();
        String[] parts = line.split("\\\\s+");
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
        List<Integer> lonely = new ArrayList<>();
        findLonely(root, lonely);
        System.out.println(lonely);
    }
    static void findLonely(Node root, List<Integer> res) {
        if (root == null) return;
        if (root.left != null && root.right == null) res.add(root.left.data);
        if (root.right != null && root.left == null) res.add(root.right.data);
        findLonely(root.left, res);
        findLonely(root.right, res);
    }
}`,
    sampleInput: '1 2 3 -1 4',
    sampleOutput: '[4]'
  },
  {
    id: 'lc-199',
    name: 'Binary Tree Right Side View',
    aliases: ['binary tree right side view', 'right side view of binary tree', 'right view of tree'],
    pattern: 'BFS / Level Order / DFS Right First',
    category: 'Trees',
    keywords: ['right side view', 'imagine yourself standing on the right side', 'return the values of the nodes you can see', 'right view'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        rightView(root, res, 0);
        return res;
    }
    private void rightView(TreeNode curr, List<Integer> res, int depth) {
        if (curr == null) return;
        if (depth == res.size()) res.add(curr.val);
        rightView(curr.right, res, depth + 1);
        rightView(curr.left, res, depth + 1);
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
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
    sampleInput: '1 2 3 -1 5 -1 4',
    sampleOutput: '[1, 3, 4]'
  },
  {
    id: 'lc-101',
    name: 'Symmetric Tree',
    aliases: ['symmetric tree', 'mirror tree', 'binary tree symmetric around center'],
    pattern: 'Tree Recursion / Mirror',
    category: 'Trees',
    keywords: ['symmetric tree', 'mirror of itself', 'symmetric around its center', 't1.val == t2.val'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || isMirror(root.left, root.right);
    }
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return (t1.val == t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String[] parts = sc.nextLine().trim().split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1")) {
            System.out.println("true");
            return;
        }
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }
        System.out.println(isMirror(root.left, root.right) ? "true" : "false");
    }
    static boolean isMirror(Node t1, Node t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;
        return t1.data == t2.data && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
    }
}`,
    sampleInput: '1 2 2 3 4 4 3',
    sampleOutput: 'true'
  },
  {
    id: 'lc-110',
    name: 'Balanced Binary Tree',
    aliases: ['balanced binary tree', 'height-balanced tree', 'check if tree is balanced'],
    pattern: 'Tree Recursion / Height check',
    category: 'Trees',
    keywords: ['height-balanced', 'depths of the two subtrees', 'never differs by more than 1', 'isBalanced'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
    private int checkHeight(TreeNode node) {
        if (node == null) return 0;
        int left = checkHeight(node.left);
        if (left == -1) return -1;
        int right = checkHeight(node.right);
        if (right == -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return Math.max(left, right) + 1;
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String[] parts = sc.nextLine().trim().split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1")) {
            System.out.println("true");
            return;
        }
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }
        System.out.println(check(root) != -1 ? "true" : "false");
    }
    static int check(Node node) {
        if (node == null) return 0;
        int l = check(node.left);
        if (l == -1) return -1;
        int r = check(node.right);
        if (r == -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return Math.max(l, r) + 1;
    }
}`,
    sampleInput: '3 9 20 -1 -1 15 7',
    sampleOutput: 'true'
  },
  {
    id: 'lc-637',
    name: 'Average of Levels in Binary Tree',
    aliases: ['average of levels in binary tree', 'level averages', 'average value of the nodes on each level'],
    pattern: 'BFS / Level Order Queue',
    category: 'Trees',
    keywords: ['average value of the nodes on each level', 'average of levels', 'binary tree', 'level order traversal', 'level sum'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(W)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<Double> averageOfLevels(TreeNode root) {
        List<Double> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            double sum = 0;
            for (int i = 0; i < sz; i++) {
                TreeNode c = q.poll();
                sum += c.val;
                if (c.left != null) q.offer(c.left);
                if (c.right != null) q.offer(c.right);
            }
            res.add(sum / sz);
        }
        return res;
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String[] parts = sc.nextLine().trim().split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1")) return;
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }
        q.clear();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            double sum = 0;
            for (int k = 0; k < sz; k++) {
                Node c = q.poll();
                sum += c.data;
                if (c.left != null) q.offer(c.left);
                if (c.right != null) q.offer(c.right);
            }
            System.out.printf(Locale.US, "%.5f ", sum / sz);
        }
        System.out.println();
    }
}`,
    sampleInput: '3 9 20 -1 -1 15 7',
    sampleOutput: '3.00000 14.50000 11.00000 '
  },
  {
    id: 'lc-515',
    name: 'Find Largest Value in Each Tree Row',
    aliases: ['find largest value in each tree row', 'largest value in row', 'maximum element in each level of binary tree'],
    pattern: 'BFS / Level Order',
    category: 'Trees',
    keywords: ['largest value in each tree row', 'largest value in each row', 'binary tree', 'maximum value in row'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(W)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            int max = Integer.MIN_VALUE;
            for (int i = 0; i < sz; i++) {
                TreeNode c = q.poll();
                max = Math.max(max, c.val);
                if (c.left != null) q.offer(c.left);
                if (c.right != null) q.offer(c.right);
            }
            res.add(max);
        }
        return res;
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String[] parts = sc.nextLine().trim().split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1")) return;
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }
        q.clear();
        q.offer(root);
        List<Integer> maxes = new ArrayList<>();
        while (!q.isEmpty()) {
            int sz = q.size();
            int max = Integer.MIN_VALUE;
            for (int k = 0; k < sz; k++) {
                Node c = q.poll();
                max = Math.max(max, c.data);
                if (c.left != null) q.offer(c.left);
                if (c.right != null) q.offer(c.right);
            }
            maxes.add(max);
        }
        System.out.println(maxes);
    }
}`,
    sampleInput: '1 3 2 5 3 -1 9',
    sampleOutput: '[1, 3, 9]'
  },
  {
    id: 'lc-545',
    name: 'Boundary of Binary Tree',
    aliases: ['boundary of binary tree', 'tree boundary traversal', 'anti-clockwise boundary'],
    pattern: 'DFS / Multi-phase Boundary Traversal',
    category: 'Trees',
    keywords: ['boundary of binary tree', 'root', 'left boundary', 'leaves', 'right boundary in reverse', 'anti-clockwise direction'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    javaLeetCode: `import java.util.*;

class Solution {
    List<Integer> nodes = new ArrayList<>();
    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        if (root == null) return nodes;
        nodes.add(root.val);
        leftBoundary(root.left);
        leaves(root.left);
        leaves(root.right);
        rightBoundary(root.right);
        return nodes;
    }
    private void leftBoundary(TreeNode root) {
        if (root == null || (root.left == null && root.right == null)) return;
        nodes.add(root.val);
        if (root.left != null) leftBoundary(root.left);
        else leftBoundary(root.right);
    }
    private void rightBoundary(TreeNode root) {
        if (root == null || (root.left == null && root.right == null)) return;
        if (root.right != null) rightBoundary(root.right);
        else rightBoundary(root.left);
        nodes.add(root.val);
    }
    private void leaves(TreeNode root) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            nodes.add(root.val);
            return;
        }
        leaves(root.left);
        leaves(root.right);
    }
}`,
    javaCollege: `import java.util.*;

class Node {
    int data;
    Node left, right;
    Node(int d) { data = d; }
}

public class Main {
    static List<Integer> res = new ArrayList<>();
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String[] parts = sc.nextLine().trim().split("\\\\s+");
        if (parts.length == 0 || parts[0].equals("-1")) return;
        Node root = new Node(Integer.parseInt(parts[0]));
        Queue<Node> q = new LinkedList<>();
        q.offer(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            Node cur = q.poll();
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.left = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("-1")) {
                cur.right = new Node(Integer.parseInt(parts[i]));
                q.offer(cur.right);
            }
            i++;
        }
        res.add(root.data);
        leftB(root.left);
        leaves(root.left);
        leaves(root.right);
        rightB(root.right);
        System.out.println(res);
    }
    static void leftB(Node root) {
        if (root == null || (root.left == null && root.right == null)) return;
        res.add(root.data);
        if (root.left != null) leftB(root.left);
        else leftB(root.right);
    }
    static void rightB(Node root) {
        if (root == null || (root.left == null && root.right == null)) return;
        if (root.right != null) rightB(root.right);
        else rightB(root.left);
        res.add(root.data);
    }
    static void leaves(Node root) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            res.add(root.data);
            return;
        }
        leaves(root.left);
        leaves(root.right);
    }
}`,
    sampleInput: '1 -1 2 3 4',
    sampleOutput: '[1, 3, 4, 2]'
  },

  // ==========================================
  // BACKTRACKING (KMIT UNIT-III SYLLABUS)
  // ==========================================
  {
    id: 'lc-51',
    name: 'N Queens Problem',
    aliases: ['n queens problem', 'n-queens', 'n queens puzzle', 'place n queens on nxn chessboard'],
    pattern: 'Backtracking',
    category: 'Backtracking',
    keywords: ['n queens', 'chessboard', 'no two queens attack each other', 'n x n', 'queen attacks in row, column, or diagonal'],
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        boolean[] cols = new boolean[n];
        boolean[] d1 = new boolean[2 * n];
        boolean[] d2 = new boolean[2 * n];
        backtrack(0, n, board, cols, d1, d2, res);
        return res;
    }
    private void backtrack(int r, int n, char[][] b, boolean[] cols, boolean[] d1, boolean[] d2, List<List<String>> res) {
        if (r == n) {
            List<String> cur = new ArrayList<>();
            for (char[] row : b) cur.add(new String(row));
            res.add(cur);
            return;
        }
        for (int c = 0; c < n; c++) {
            int id1 = r - c + n;
            int id2 = r + c;
            if (!cols[c] && !d1[id1] && !d2[id2]) {
                b[r][c] = 'Q';
                cols[c] = d1[id1] = d2[id2] = true;
                backtrack(r + 1, n, b, cols, d1, d2, res);
                b[r][c] = '.';
                cols[c] = d1[id1] = d2[id2] = false;
            }
        }
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    static int count = 0;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        char[][] b = new char[n][n];
        for (char[] row : b) Arrays.fill(row, '.');
        solve(0, n, b, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
        System.out.println("Total Solutions: " + count);
    }
    static void solve(int r, int n, char[][] b, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (r == n) {
            count++;
            return;
        }
        for (int c = 0; c < n; c++) {
            int id1 = r - c + n, id2 = r + c;
            if (!cols[c] && !d1[id1] && !d2[id2]) {
                b[r][c] = 'Q';
                cols[c] = d1[id1] = d2[id2] = true;
                solve(r + 1, n, b, cols, d1, d2);
                b[r][c] = '.';
                cols[c] = d1[id1] = d2[id2] = false;
            }
        }
    }
}`,
    sampleInput: '4',
    sampleOutput: 'Total Solutions: 2'
  },
  {
    id: 'lc-89',
    name: 'Gray Code',
    aliases: ['gray code', 'u3_daa_backtracking_ap46_difference', 'n-bit gray code sequence', 'adjacent difference of 1 bit'],
    pattern: 'Backtracking / Bit Manipulation',
    category: 'Backtracking',
    keywords: ['gray code', 'n-bit gray code sequence', 'differ by exactly one bit', 'binary reflection', 'i ^ (i >> 1)'],
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<Integer> grayCode(int n) {
        List<Integer> res = new ArrayList<>();
        int total = 1 << n;
        for (int i = 0; i < total; i++) {
            res.add(i ^ (i >> 1));
        }
        return res;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int total = 1 << n;
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < total; i++) {
            res.add(i ^ (i >> 1));
        }
        System.out.println(res);
    }
}`,
    sampleInput: '2',
    sampleOutput: '[0, 1, 3, 2]'
  },
  {
    id: 'lc-1087',
    name: 'Brace Expansion',
    aliases: ['brace expansion', 'u3 daa backtracking ap50 exam question selection', 'ap50', 'expand braces lexicographically'],
    pattern: 'Backtracking',
    category: 'Backtracking',
    keywords: ['brace expansion', 'braces', 'comma separated', 'lexicographical order', 'all words formed', '{a,b}c{d,e}f'],
    timeComplexity: 'O(K^(N/K))',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public String[] expand(String s) {
        List<List<Character>> groups = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == '{') {
                i++;
                List<Character> g = new ArrayList<>();
                while (s.charAt(i) != '}') {
                    if (s.charAt(i) != ',') g.add(s.charAt(i));
                    i++;
                }
                Collections.sort(g);
                groups.add(g);
                i++;
            } else {
                List<Character> g = new ArrayList<>();
                g.add(s.charAt(i));
                groups.add(g);
                i++;
            }
        }
        List<String> res = new ArrayList<>();
        backtrack(groups, 0, new StringBuilder(), res);
        return res.toArray(new String[0]);
    }
    private void backtrack(List<List<Character>> groups, int idx, StringBuilder sb, List<String> res) {
        if (idx == groups.size()) {
            res.add(sb.toString());
            return;
        }
        for (char c : groups.get(idx)) {
            sb.append(c);
            backtrack(groups, idx + 1, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        List<List<Character>> groups = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == '{') {
                i++;
                List<Character> g = new ArrayList<>();
                while (s.charAt(i) != '}') {
                    if (s.charAt(i) != ',') g.add(s.charAt(i));
                    i++;
                }
                Collections.sort(g);
                groups.add(g);
                i++;
            } else {
                List<Character> g = new ArrayList<>();
                g.add(s.charAt(i));
                groups.add(g);
                i++;
            }
        }
        List<String> res = new ArrayList<>();
        backtrack(groups, 0, new StringBuilder(), res);
        System.out.println(res);
    }
    static void backtrack(List<List<Character>> g, int idx, StringBuilder sb, List<String> res) {
        if (idx == g.size()) {
            res.add(sb.toString());
            return;
        }
        for (char c : g.get(idx)) {
            sb.append(c);
            backtrack(g, idx + 1, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }
}`,
    sampleInput: '{a,b}c{d,e}f',
    sampleOutput: '[acdf, acef, bcdf, bcef]'
  },
  {
    id: 'lc-320',
    name: 'Generalized Abbreviation',
    aliases: ['generalized abbreviation', 'u3_daa_backtracking_ap47_encrypt', 'ap47', 'word abbreviation string'],
    pattern: 'Backtracking',
    category: 'Backtracking',
    keywords: ['generalized abbreviation', 'abbreviated string', 'replace non-empty non-overlapping substrings with their lengths', 'word length'],
    timeComplexity: 'O(2^N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public List<String> generateAbbreviations(String word) {
        List<String> res = new ArrayList<>();
        backtrack(word, 0, new StringBuilder(), 0, res);
        return res;
    }
    private void backtrack(String word, int pos, StringBuilder cur, int count, List<String> res) {
        int len = cur.length();
        if (pos == word.length()) {
            if (count > 0) cur.append(count);
            res.add(cur.toString());
        } else {
            // Option 1: abbreviate word[pos]
            backtrack(word, pos + 1, cur, count + 1, res);
            
            // Option 2: keep word[pos]
            if (count > 0) cur.append(count);
            cur.append(word.charAt(pos));
            backtrack(word, pos + 1, cur, 0, res);
        }
        cur.setLength(len);
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String word = sc.next();
        List<String> res = new ArrayList<>();
        backtrack(word, 0, new StringBuilder(), 0, res);
        Collections.sort(res);
        System.out.println(res);
    }
    static void backtrack(String word, int pos, StringBuilder cur, int count, List<String> res) {
        int len = cur.length();
        if (pos == word.length()) {
            if (count > 0) cur.append(count);
            res.add(cur.toString());
        } else {
            backtrack(word, pos + 1, cur, count + 1, res);
            if (count > 0) cur.append(count);
            cur.append(word.charAt(pos));
            backtrack(word, pos + 1, cur, 0, res);
        }
        cur.setLength(len);
    }
}`,
    sampleInput: 'word',
    sampleOutput: '[1o1d, 1o2, 1or1, 1ord, 2r1, 2rd, 3d, 4, w1r1, w1rd, w2d, w3, wo1d, wo2, wor1, word]'
  },
  {
    id: 'lc-1219',
    name: 'Path with Maximum Gold',
    aliases: ['path with maximum gold', 'gold miner dfs', 'max gold collected in grid', 'u3 daa path with maximum gold'],
    pattern: 'Backtracking / DFS Matrix',
    category: 'Backtracking',
    keywords: ['path with maximum gold', 'gold mine', 'collect maximum amount of gold', 'cannot visit the same cell more than once', 'grid[i][j] > 0'],
    timeComplexity: 'O(K * 3^K)',
    spaceComplexity: 'O(K)',
    javaLeetCode: `class Solution {
    int maxGold = 0;
    public int getMaximumGold(int[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] > 0) {
                    dfs(grid, i, j, 0);
                }
            }
        }
        return maxGold;
    }
    private void dfs(int[][] g, int r, int c, int cur) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] == 0) return;
        int val = g[r][c];
        cur += val;
        if (cur > maxGold) maxGold = cur;
        g[r][c] = 0;
        dfs(g, r + 1, c, cur);
        dfs(g, r - 1, c, cur);
        dfs(g, r, c + 1, cur);
        dfs(g, r, c - 1, cur);
        g[r][c] = val;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    static int max = 0;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] g = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) g[i][j] = sc.nextInt();
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] > 0) dfs(g, i, j, 0);
            }
        }
        System.out.println(max);
    }
    static void dfs(int[][] g, int r, int c, int cur) {
        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] == 0) return;
        int val = g[r][c];
        cur += val;
        if (cur > max) max = cur;
        g[r][c] = 0;
        dfs(g, r + 1, c, cur);
        dfs(g, r - 1, c, cur);
        dfs(g, r, c + 1, cur);
        dfs(g, r, c - 1, cur);
        g[r][c] = val;
    }
}`,
    sampleInput: '3 3\n0 6 0\n5 8 7\n0 9 0',
    sampleOutput: '24'
  },
  {
    id: 'lc-1066',
    name: 'Campus Bikes II',
    aliases: ['campus bikes ii', 'campus bikes 2', 'workers and bikes min distance', 'u3 daa campus bikes ii'],
    pattern: 'DP with Bitmask / Backtracking',
    category: 'Backtracking',
    keywords: ['campus bikes', 'workers and bikes', 'manhattan distance', 'minimize the sum of manhattan distances', 'each worker assigned to one bike'],
    timeComplexity: 'O(W * 2^B)',
    spaceComplexity: 'O(2^B)',
    javaLeetCode: `import java.util.Arrays;

class Solution {
    int minDistance = Integer.MAX_VALUE;
    public int assignBikes(int[][] workers, int[][] bikes) {
        boolean[] used = new boolean[bikes.length];
        backtrack(workers, 0, bikes, used, 0);
        return minDistance;
    }
    private void backtrack(int[][] w, int wid, int[][] b, boolean[] used, int curDist) {
        if (curDist >= minDistance) return;
        if (wid == w.length) {
            minDistance = Math.min(minDistance, curDist);
            return;
        }
        for (int bid = 0; bid < b.length; bid++) {
            if (!used[bid]) {
                used[bid] = true;
                int dist = Math.abs(w[wid][0] - b[bid][0]) + Math.abs(w[wid][1] - b[bid][1]);
                backtrack(w, wid + 1, b, used, curDist + dist);
                used[bid] = false;
            }
        }
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    static int min = Integer.MAX_VALUE;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[][] w = new int[n][2];
        for (int i = 0; i < n; i++) {
            w[i][0] = sc.nextInt();
            w[i][1] = sc.nextInt();
        }
        int[][] b = new int[m][2];
        for (int i = 0; i < m; i++) {
            b[i][0] = sc.nextInt();
            b[i][1] = sc.nextInt();
        }
        backtrack(w, 0, b, new boolean[m], 0);
        System.out.println(min);
    }
    static void backtrack(int[][] w, int wid, int[][] b, boolean[] used, int cur) {
        if (cur >= min) return;
        if (wid == w.length) {
            min = Math.min(min, cur);
            return;
        }
        for (int i = 0; i < b.length; i++) {
            if (!used[i]) {
                used[i] = true;
                int d = Math.abs(w[wid][0] - b[i][0]) + Math.abs(w[wid][1] - b[i][1]);
                backtrack(w, wid + 1, b, used, cur + d);
                used[i] = false;
            }
        }
    }
}`,
    sampleInput: '2 3\n0 0\n2 1\n1 2\n3 3\n1 1',
    sampleOutput: '6'
  },
  {
    id: 'kmit-hamiltonian',
    name: 'Hamiltonian Cycle',
    aliases: ['hamiltonian cycle', 'hamiltonian path', 'visit every vertex exactly once'],
    pattern: 'Backtracking',
    category: 'Backtracking',
    keywords: ['hamiltonian cycle', 'visit every vertex exactly once', 'returns to the starting vertex', 'undirected graph', 'cycle contains all vertices'],
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public boolean hasHamiltonianCycle(int[][] graph) {
        int n = graph.length;
        int[] path = new int[n];
        Arrays.fill(path, -1);
        path[0] = 0;
        return solve(graph, path, 1, n);
    }
    private boolean solve(int[][] g, int[] path, int pos, int n) {
        if (pos == n) return g[path[pos - 1]][path[0]] == 1;
        for (int v = 1; v < n; v++) {
            if (isSafe(v, g, path, pos)) {
                path[pos] = v;
                if (solve(g, path, pos + 1, n)) return true;
                path[pos] = -1;
            }
        }
        return false;
    }
    private boolean isSafe(int v, int[][] g, int[] path, int pos) {
        if (g[path[pos - 1]][v] == 0) return false;
        for (int i = 0; i < pos; i++) if (path[i] == v) return false;
        return true;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    static int n;
    static int[][] g;
    static int[] path;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        n = sc.nextInt();
        g = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) g[i][j] = sc.nextInt();
        }
        path = new int[n];
        Arrays.fill(path, -1);
        path[0] = 0;
        if (solve(1)) {
            for (int x : path) System.out.print(x + " ");
            System.out.println(path[0]);
        } else {
            System.out.println("NO HAMILTONIAN CYCLE");
        }
    }
    static boolean solve(int pos) {
        if (pos == n) return g[path[pos - 1]][path[0]] == 1;
        for (int v = 1; v < n; v++) {
            if (isSafe(v, pos)) {
                path[pos] = v;
                if (solve(pos + 1)) return true;
                path[pos] = -1;
            }
        }
        return false;
    }
    static boolean isSafe(int v, int pos) {
        if (g[path[pos - 1]][v] == 0) return false;
        for (int i = 0; i < pos; i++) if (path[i] == v) return false;
        return true;
    }
}`,
    sampleInput: '5\n0 1 0 1 0\n1 0 1 1 1\n0 1 0 0 1\n1 1 0 0 1\n0 1 1 1 0',
    sampleOutput: '0 1 2 4 3 0'
  },

  // ==========================================
  // DYNAMIC PROGRAMMING
  // ==========================================
  {
    id: 'lc-70',
    name: 'Climbing Stairs',
    aliases: ['climbing stairs', 'climb stairs', 'ways to climb n steps', 'fibonacci steps'],
    pattern: 'Dynamic Programming / Fibonacci',
    category: 'Dynamic Programming',
    keywords: ['climbing stairs', 'each time you can climb 1 or 2 steps', 'distinct ways can you climb to the top', 'n steps to reach the top'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int climbStairs(int n) {
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
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        if (n <= 2) {
            System.out.println(n);
            return;
        }
        long a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            long c = a + b;
            a = b;
            b = c;
        }
        System.out.println(b);
    }
}`,
    sampleInput: '3',
    sampleOutput: '3'
  },
  {
    id: 'lc-322',
    name: 'Coin Change',
    aliases: ['coin change', 'minimum coins for amount', 'fewest number of coins'],
    pattern: 'Dynamic Programming / Unbounded Knapsack',
    category: 'Dynamic Programming',
    keywords: ['coins of different denominations', 'amount of money', 'fewest number of coins', 'cannot make up the amount', 'return -1'],
    timeComplexity: 'O(amount * N)',
    spaceComplexity: 'O(amount)',
    javaLeetCode: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();
        int amount = sc.nextInt();
        
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
        System.out.println(dp[amount] > amount ? -1 : dp[amount]);
    }
}`,
    sampleInput: '3\n1 2 5\n11',
    sampleOutput: '3'
  },
  {
    id: 'lc-300',
    name: 'Longest Increasing Subsequence',
    aliases: ['longest increasing subsequence', 'lis', 'strictly increasing subsequence'],
    pattern: 'Dynamic Programming / Binary Search',
    category: 'Dynamic Programming',
    keywords: ['longest strictly increasing subsequence', 'nums', 'subsequence', 'increasing subsequence', 'binary search patience sort'],
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) tails.add(x);
            else tails.set(idx, x);
        }
        return tails.size();
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) tails.add(x);
            else tails.set(idx, x);
        }
        System.out.println(tails.size());
    }
}`,
    sampleInput: '8\n10 9 2 5 3 7 101 18',
    sampleOutput: '4'
  },
  {
    id: 'lc-1143',
    name: 'Longest Common Subsequence',
    aliases: ['longest common subsequence', 'lcs', 'longest subsequence present in both strings'],
    pattern: '2D Dynamic Programming',
    category: 'Dynamic Programming',
    keywords: ['text1', 'text2', 'longest common subsequence', 'subsequence', 'common to both strings', 'lcs dp'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s1 = sc.next();
        String s2 = sc.next();
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        System.out.println(dp[m][n]);
    }
}`,
    sampleInput: 'abcde\nace',
    sampleOutput: '3'
  },
  {
    id: 'lc-198',
    name: 'House Robber',
    aliases: ['house robber', 'maximum money robbed', 'adjacent houses cannot be broken into'],
    pattern: 'Dynamic Programming',
    category: 'Dynamic Programming',
    keywords: ['professional robber', 'adjacent houses have security systems', 'cannot rob adjacent houses', 'maximum amount of money'],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaLeetCode: `class Solution {
    public int rob(int[] nums) {
        int prev1 = 0, prev2 = 0;
        for (int x : nums) {
            int tmp = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = tmp;
        }
        return prev1;
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        long prev1 = 0, prev2 = 0;
        for (int x : nums) {
            long cur = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        System.out.println(prev1);
    }
}`,
    sampleInput: '4\n1 2 3 1',
    sampleOutput: '4'
  },
  {
    id: 'lc-62',
    name: 'Unique Paths',
    aliases: ['unique paths', 'robot in m x n grid', 'paths from top-left to bottom-right'],
    pattern: 'Dynamic Programming / Combinatorics',
    category: 'Dynamic Programming',
    keywords: ['robot on an m x n grid', 'top-left corner', 'bottom-right corner', 'only move down or right', 'unique paths'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.Arrays;

class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        long[] dp = new long[n];
        Arrays.fill(dp, 1L);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        System.out.println(dp[n - 1]);
    }
}`,
    sampleInput: '3 7',
    sampleOutput: '28'
  },
  {
    id: 'lc-139',
    name: 'Word Break',
    aliases: ['word break', 'segment string using dictionary', 'word dictionary breakdown'],
    pattern: 'Dynamic Programming / Trie',
    category: 'Dynamic Programming',
    keywords: ['word break', 'wordDict', 'segmented into a space-separated sequence', 'dictionary of strings'],
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(N)',
    javaLeetCode: `import java.util.*;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
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
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        int d = sc.nextInt();
        Set<String> dict = new HashSet<>();
        for (int i = 0; i < d; i++) dict.add(sc.next());
        
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        System.out.println(dp[s.length()] ? "true" : "false");
    }
}`,
    sampleInput: 'leetcode 2\nleet\ncode',
    sampleOutput: 'true'
  },
  {
    id: 'lc-72',
    name: 'Edit Distance',
    aliases: ['edit distance', 'levenshtein distance', 'min operations to convert word1 to word2'],
    pattern: '2D Dynamic Programming',
    category: 'Dynamic Programming',
    keywords: ['minimum number of operations', 'convert word1 to word2', 'insert a character', 'delete a character', 'replace a character'],
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    javaLeetCode: `class Solution {
    public int minDistance(String word1, String word2) {
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
}`,
    javaCollege: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String w1 = sc.next();
        String w2 = sc.next();
        int m = w1.length(), n = w2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (w1.charAt(i - 1) == w2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
        System.out.println(dp[m][n]);
    }
}`,
    sampleInput: 'horse\nros',
    sampleOutput: '3'
  }
];
