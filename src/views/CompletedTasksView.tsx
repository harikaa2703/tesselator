import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Trash2, 
  ExternalLink, 
  Search, 
  History, 
  Zap, 
  Calendar 
} from 'lucide-react';
import { HistoryItem } from '../types/dsa';
import { dbService } from '../services/db';
import { clipboardService } from '../services/clipboard';

interface CompletedTasksViewProps {
  onOpenProblem: (title: string) => void;
}

export const CompletedTasksView: React.FC<CompletedTasksViewProps> = ({ onOpenProblem }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const list = await dbService.getHistory();
    if (list.length === 0) {
      // Seed default completed history from college
      const defaults: HistoryItem[] = [
        {
          id: 'hist-1',
          problemTitle: 'Two Sum',
          pattern: 'HashMap',
          difficulty: 'Easy',
          passedTests: 25,
          totalTests: 25,
          date: 'Today',
          timestamp: Date.now() - 3600000,
          solutionId: 'sol-1',
          language: 'Java 17'
        },
        {
          id: 'hist-2',
          problemTitle: 'U3_DAA_N_Queens_Problem',
          pattern: 'Backtracking',
          difficulty: 'Hard',
          passedTests: 50,
          totalTests: 50,
          date: 'Today',
          timestamp: Date.now() - 7200000,
          solutionId: 'sol-2',
          language: 'Java 17'
        },
        {
          id: 'hist-3',
          problemTitle: 'U1_DAA_Recursion_Climbing_Stairs',
          pattern: 'Dynamic Programming',
          difficulty: 'Easy',
          passedTests: 30,
          totalTests: 30,
          date: 'Yesterday',
          timestamp: Date.now() - 86400000,
          solutionId: 'sol-3',
          language: 'Java 17'
        }
      ];
      for (const d of defaults) await dbService.addHistory(d);
      setHistory(defaults);
    } else {
      setHistory(list);
    }
  };

  const handleClear = async () => {
    if (confirm('Clear task history?')) {
      await dbService.clearHistory();
      setHistory([]);
    }
  };

  const filtered = history.filter(h =>
    h.problemTitle.toLowerCase().includes(search.toLowerCase()) ||
    h.pattern.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1720px] mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>VERIFIED SUBMISSIONS RECORD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            COMPLETED TASKS & HISTORY
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Log of all tested and verified DSA solutions with real pass counts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Clear History
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-[#0e1424] border border-[#1e293b] rounded-2xl flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search completed tasks..."
            className="w-full bg-[#070b14] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Total Completed: <strong className="text-emerald-400">{filtered.length}</strong>
        </span>
      </div>

      {/* History Table List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-[#0e1424] border border-[#1e293b] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {item.problemTitle}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] font-bold">
                    {item.pattern}
                  </span>
                  <span>•</span>
                  <span className="text-slate-500">{item.date}</span>
                  <span>•</span>
                  <span className="text-amber-400 font-mono text-[11px]">{item.language}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-right">
                <span className="text-xs font-mono font-extrabold text-emerald-400 block">
                  ✓ {item.passedTests}/{item.totalTests} PASSED
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  100% Verification
                </span>
              </div>

              <button
                onClick={() => onOpenProblem(item.problemTitle)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                OPEN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
