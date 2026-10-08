import React from 'react';
import { Scale, Check, X, Info } from 'lucide-react';
import { ConstraintAnalysisResult } from '../types/dsa';

interface ConstraintAnalysisPanelProps {
  analysis: ConstraintAnalysisResult;
}

export const ConstraintAnalysisPanel: React.FC<ConstraintAnalysisPanelProps> = ({ analysis }) => {
  return (
    <div className="p-4 bg-[#111728] border border-[#1e293b] rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            CONSTRAINT ANALYSIS
          </h4>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
          {analysis.primaryVariable} ≤ {analysis.maxValueStr}
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {analysis.recommendation}
      </p>

      {/* Chosen Complexity Banner */}
      <div className="flex items-center justify-between p-2.5 bg-[#090d16] rounded-lg border border-slate-800 text-xs">
        <span className="text-slate-400 font-medium">Chosen Complexity:</span>
        <span className="font-mono font-extrabold text-cyan-400 text-sm">
          {analysis.chosenComplexity}
        </span>
      </div>

      {/* Viable vs Unviable Approaches */}
      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
        <div className="space-y-1">
          <span className="text-slate-400 font-semibold text-[10px] uppercase">Viable Approaches</span>
          {analysis.viableApproaches.map((app, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-emerald-400">
              <Check className="w-3 h-3 shrink-0" />
              <span className="truncate">{app}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          <span className="text-slate-400 font-semibold text-[10px] uppercase">Unviable / TLE</span>
          {analysis.unviableApproaches.map((app, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-rose-400">
              <X className="w-3 h-3 shrink-0" />
              <span className="truncate">{app}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
