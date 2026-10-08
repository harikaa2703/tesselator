import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Search, 
  Trash2, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Code 
} from 'lucide-react';
import { SolutionItem } from '../types/dsa';
import { dbService } from '../services/db';
import { clipboardService } from '../services/clipboard';

interface MySolutionsViewProps {
  onLoadSolution: (solution: SolutionItem) => void;
}

export const MySolutionsView: React.FC<MySolutionsViewProps> = ({ onLoadSolution }) => {
  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    const list = await dbService.getAllSolutions();
    setSolutions(list);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this saved solution?')) {
      await dbService.deleteSolution(id);
      await loadSolutions();
    }
  };

  const handleCopy = async (code: string) => {
    await clipboardService.copyForCollege(code);
  };

  const filtered = solutions.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.pattern.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1720px] mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>OFFLINE LOCAL STORAGE (INDEXEDDB)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            MY SAVED SOLUTIONS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Your saved Java 17 solutions remain accessible offline without internet.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search saved solutions..."
            className="w-full bg-[#0e1424] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#0e1424] border border-[#1e293b] rounded-2xl text-slate-400 space-y-3">
          <Code className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No saved solutions yet.</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Solve any problem in the workspace and click the bookmark icon to save it into local IndexedDB.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((sol) => (
            <div
              key={sol.id}
              className="bg-[#0e1424] border border-[#1e293b] rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-800/40">
                    {sol.pattern}
                  </span>
                  <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ Verified</span>
                  </span>
                </div>

                <h4 className="text-base font-bold text-white tracking-tight">
                  {sol.title}
                </h4>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Time: <strong className="text-cyan-400">{sol.timeComplexity}</strong></span>
                  <span>Space: <strong className="text-indigo-400">{sol.spaceComplexity}</strong></span>
                </div>

                <div className="p-2.5 bg-[#090d16] rounded-lg border border-slate-800 max-h-32 overflow-hidden text-[11px] font-mono text-slate-400">
                  <pre className="truncate">{sol.javaCode.slice(0, 150)}...</pre>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1e293b] text-xs">
                <span className="text-[11px] text-slate-500">{sol.date}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(sol.javaCode)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>COPY</span>
                  </button>

                  <button
                    onClick={() => onLoadSolution(sol)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                  >
                    OPEN
                  </button>

                  <button
                    onClick={() => handleDelete(sol.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
