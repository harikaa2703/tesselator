import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  CheckCircle2, 
  Copy, 
  Bookmark, 
  Star, 
  Filter, 
  Users 
} from 'lucide-react';
import { clipboardService } from '../services/clipboard';

interface SharedItem {
  id: string;
  problem: string;
  pattern: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  complexity: string;
  testResult: string;
  createdBy: string;
  date: string;
  tags: string[];
  javaCode: string;
  copiedCount: number;
}

const SAMPLE_SHARED: SharedItem[] = [
  {
    id: 'sh-1',
    problem: 'N-Queens Problem',
    pattern: 'Backtracking',
    difficulty: 'Hard',
    complexity: 'O(N!)',
    testResult: '✓ 50/50 local tests passed',
    createdBy: 'Harika KMIT',
    date: 'Today',
    tags: ['Backtracking', 'Chessboard', 'Recursion'],
    copiedCount: 42,
    javaCode: `import java.util.*;

class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        backtrack(board, 0, n, res);
        return res;
    }
    private void backtrack(char[][] b, int col, int n, List<List<String>> res) {
        if (col == n) {
            List<String> list = new ArrayList<>();
            for (char[] r : b) list.add(new String(r));
            res.add(list);
            return;
        }
        for (int r = 0; r < n; r++) {
            if (isSafe(b, r, col, n)) {
                b[r][col] = 'Q';
                backtrack(b, col + 1, n, res);
                b[r][col] = '.';
            }
        }
    }
    private boolean isSafe(char[][] b, int r, int c, int n) {
        for (int j = 0; j < c; j++) if (b[r][j] == 'Q') return false;
        for (int i = r, j = c; i >= 0 && j >= 0; i--, j--) if (b[i][j] == 'Q') return false;
        for (int i = r, j = c; i < n && j >= 0; i++, j--) if (b[i][j] == 'Q') return false;
        return true;
    }
}`
  },
  {
    id: 'sh-2',
    problem: 'U3_DAA_Backtracking_AP47_Encrypt',
    pattern: 'Backtracking',
    difficulty: 'Medium',
    complexity: 'O(2^N)',
    testResult: '✓ 25/25 local tests passed',
    createdBy: 'DAA Lab Audi',
    date: '5 Oct 2026',
    tags: ['Unit-III', 'Abbreviation', 'Recursion'],
    copiedCount: 78,
    javaCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        List<String> ret = new ArrayList<>();
        backtrack(ret, s, 0, "", 0);
        Collections.sort(ret);
        System.out.println(ret);
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
}`
  },
  {
    id: 'sh-3',
    problem: 'Two Sum',
    pattern: 'HashMap',
    difficulty: 'Easy',
    complexity: 'O(N)',
    testResult: '✓ 100/100 local tests passed',
    createdBy: 'Community Verified',
    date: 'Yesterday',
    tags: ['HashMap', 'Optimal', 'LeetCode'],
    copiedCount: 156,
    javaCode: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[] { map.get(comp), i };
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`
  }
];

export const SharedSolutionsView: React.FC<{ onOpenInIDE: (code: string, title: string) => void }> = ({ onOpenInIDE }) => {
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const filtered = SAMPLE_SHARED.filter(s => {
    const matchSearch = s.problem.toLowerCase().includes(search.toLowerCase()) || s.pattern.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDifficulty === 'all' || s.difficulty === filterDifficulty;
    return matchSearch && matchDiff;
  });

  const handleCopy = async (code: string) => {
    await clipboardService.copyForCollege(code);
  };

  return (
    <div className="max-w-[1720px] mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      <div>
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>COMMUNITY & CLASSROOM REPOSITORY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          SHARED DSA SOLUTIONS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Peer solutions verified with 100% test pass rates for college lab evaluations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0e1424] border border-[#1e293b] rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search DSA solutions..."
            className="w-full bg-[#070b14] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Difficulty:</span>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="bg-[#131b2e] text-slate-200 border border-[#2b3956] rounded-lg px-3 py-1.5 font-semibold focus:outline-none"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Shared Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#0e1424] border border-[#1e293b] rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-800/40">
                  {item.pattern}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/40 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{item.testResult}</span>
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {item.problem}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>By: <strong className="text-slate-300">{item.createdBy}</strong></span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#090d16] rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 max-h-32 overflow-hidden">
                <pre className="truncate">{item.javaCode.slice(0, 160)}...</pre>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#131b2e] text-[10px] text-slate-300 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e293b] text-xs">
              <span className="text-[11px] text-slate-500 font-mono">
                Copied: {item.copiedCount} times
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(item.javaCode)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>COPY</span>
                </button>
                <button
                  onClick={() => onOpenInIDE(item.javaCode, item.problem)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                >
                  VIEW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
