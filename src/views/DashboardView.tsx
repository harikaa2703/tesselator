import React from 'react';
import { Clock } from 'lucide-react';
import { KMIT_COLLEGE_ASSIGNMENTS, CollegeAssignment } from '../data/kmitDAAData';

import { ProblemFormat, SystemStatus } from '../types/dsa';

interface DashboardViewProps {
  onSelectAssignment: (assignment: CollegeAssignment) => void;
  onQuickSolve?: (question: string, format: ProblemFormat) => void;
  systemStatus?: SystemStatus;
  onOpenOfflineTest?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectAssignment }) => {
  const handleAttemptClick = (e: React.MouseEvent, assignment: CollegeAssignment) => {
    e.preventDefault();
    try {
      localStorage.setItem('tesselator_active_assignment', JSON.stringify(assignment));
    } catch {}
    if (onSelectAssignment) {
      onSelectAssignment(assignment);
    }
  };

  return (
    <div className="min-h-screen bg-[#eceff3] text-slate-800 pb-20 font-sans selection:bg-amber-200">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 pt-3 space-y-3">
        
        {/* Top Control Bar: Solid Orange Refresh on Right (Exact 1:1 from user's screenshot) */}
        <div className="flex items-center justify-end pb-1 pt-1">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-1.5 rounded-sm bg-[#e05e36] hover:bg-[#c94d26] text-white font-bold text-xs shadow transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Assignment Cards List (Exact 1:1 match with user's screenshot) */}
        <div className="space-y-3">
          {KMIT_COLLEGE_ASSIGNMENTS.map((assignment) => (
            <div
              key={assignment.id}
              className="bg-white border border-[#d6dbe1] rounded-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:border-slate-400 transition-all"
            >
              {/* Left Box: Charcoal Top + Dark Bottom Badge */}
              <div className="flex items-center gap-5">
                <div className="w-44 sm:w-48 bg-[#2a2e35] rounded-sm overflow-hidden shrink-0 text-center shadow-inner">
                  {/* Top Section: DAA-3-1-AUDI-2026_27 */}
                  <div className="py-2.5 px-2 text-[12px] font-bold text-white font-mono tracking-tight border-b border-[#3e434d]">
                    {assignment.code}
                  </div>
                  {/* Bottom Section: LAB */}
                  <div className="py-1 bg-[#1a1c20] text-[11px] font-black tracking-widest text-white uppercase">
                    {assignment.labSection}
                  </div>
                </div>

                {/* Middle: Title */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={(e) => handleAttemptClick(e, assignment)}
                    className="text-left text-lg sm:text-xl font-bold text-[#1f2937] tracking-tight hover:text-indigo-600 cursor-pointer transition-colors block"
                  >
                    {assignment.title}
                  </button>
                  <p className="text-xs text-slate-500 font-medium hidden sm:block">
                    Topic: <span className="text-slate-700">{assignment.topic}</span>
                  </p>
                </div>
              </div>

              {/* Right Side: Status, Timestamp & Solid Orange ATTEMPT Button */}
              <div className="flex flex-col sm:items-end justify-center gap-1.5 shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f53d2d]">
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-[#f53d2d] bg-transparent inline-block"></span>
                  <span>Started</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{assignment.timestamp}</span>
                </div>

                {/* The ATTEMPT Button */}
                <button
                  type="button"
                  onClick={(e) => handleAttemptClick(e, assignment)}
                  className="mt-1 w-full sm:w-auto px-8 py-2 rounded-sm bg-[#e05e36] hover:bg-[#c94d26] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all text-center inline-block"
                >
                  ATTEMPT
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Bottom-Right Help Button (?) from user screenshot */}
      <div className="fixed bottom-5 right-5 z-30">
        <button
          onClick={() => alert('KMIT DAA Laboratory Portal')}
          className="w-8 h-8 rounded-full bg-[#d1d5db] hover:bg-[#9ca3af] text-slate-700 flex items-center justify-center font-bold text-sm shadow-md transition-colors"
          title="Help"
        >
          ?
        </button>
      </div>

    </div>
  );
};
