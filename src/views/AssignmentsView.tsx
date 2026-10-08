import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { KMIT_COLLEGE_ASSIGNMENTS, CollegeAssignment } from '../data/kmitDAAData';
import { DSA_PROBLEMS_CATALOG, DSAProblem } from '../data/problems';

interface AssignmentsViewProps {
  onSelectAssignment: (assignment: CollegeAssignment) => void;
  onSelectProblem: (problem: DSAProblem) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  onSelectAssignment,
  onSelectProblem
}) => {
  const [activeTab, setActiveTab] = useState<'college' | 'leetcode'>('college');
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');

  const filteredCollege = KMIT_COLLEGE_ASSIGNMENTS.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.topic.toLowerCase().includes(search.toLowerCase());
    const matchUnit = selectedUnit === 'all' || a.unit === selectedUnit;
    return matchSearch && matchUnit;
  });

  const filteredLeetCode = DSA_PROBLEMS_CATALOG.filter(p => {
    return p.title.toLowerCase().includes(search.toLowerCase()) || p.pattern.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-[1720px] mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ASSIGNMENTS & PROBLEM CATALOG
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official DAA Laboratory Tasks (KR24 Syllabus) and Standard LeetCode Interview Problems.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-[#0e1424] border border-[#1e293b] rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('college')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'college' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            KMIT DAA Labs ({KMIT_COLLEGE_ASSIGNMENTS.length})
          </button>
          <button
            onClick={() => setActiveTab('leetcode')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'leetcode' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            LeetCode Problems ({DSA_PROBLEMS_CATALOG.length})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0e1424] border border-[#1e293b] rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems, patterns, or topics..."
            className="w-full bg-[#070b14] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {activeTab === 'college' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Filter Unit:</span>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="bg-[#131b2e] text-slate-200 border border-[#2b3956] rounded-lg px-3 py-1.5 font-semibold focus:outline-none"
            >
              <option value="all">All Units</option>
              <option value="Unit-I">Unit-I (Recursion, D&C, Asymptotics)</option>
              <option value="Unit-III">Unit-III (BFS, DFS, Trees, Backtracking)</option>
            </select>
          </div>
        )}
      </div>

      {/* College Assignments List */}
      {activeTab === 'college' && (
        <div className="space-y-3.5">
          {filteredCollege.map((item) => (
            <div
              key={item.id}
              className="bg-[#eceff3] dark:bg-[#0e1424] border border-slate-300 dark:border-[#1e293b] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-36 sm:w-44 bg-[#1e2229] rounded-lg overflow-hidden border border-[#2b303c] shrink-0 text-center shadow-md">
                  <div className="py-2.5 px-2 text-[11px] font-bold text-slate-200 font-mono border-b border-[#2b303c]">
                    {item.code}
                  </div>
                  <div className="py-1 bg-[#12151b] text-[10px] font-extrabold tracking-widest text-slate-300 uppercase">
                    {item.labSection}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-800/40">
                      {item.unit}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Topic: <strong className="text-slate-300">{item.topic}</strong> • Pattern: <strong className="text-cyan-400">{item.pattern}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectAssignment(item)}
                className="px-8 py-2.5 rounded-lg bg-[#e05e36] hover:bg-[#c94d26] text-white font-extrabold text-sm tracking-wider uppercase shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>ATTEMPT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* LeetCode Problems Grid */}
      {activeTab === 'leetcode' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredLeetCode.map((prob) => (
            <div
              key={prob.id}
              className="p-5 bg-[#0e1424] border border-[#1e293b] rounded-2xl flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    prob.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' :
                    prob.difficulty === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' :
                    'bg-rose-950 text-rose-400 border border-rose-800/40'
                  }`}>
                    {prob.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-bold border border-indigo-800/40">
                    {prob.pattern}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white tracking-tight">
                  {prob.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {prob.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1e293b] text-xs">
                <span className="font-mono text-[11px] text-cyan-400 font-bold">{prob.timeComplexity}</span>
                <button
                  onClick={() => onSelectProblem(prob)}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  SOLVE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
