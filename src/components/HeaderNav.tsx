import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import tesselatorLogo from '../assets/tesselator_logo.png';

interface HeaderNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  online: boolean;
  syncing: boolean;
  onRefresh: () => void;
  onQuickCopy?: () => void;
  hasVerifiedCode?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentView,
  onNavigate
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#091834] border-b border-[#0d274c] shadow-md select-none font-sans">
      <div className="w-full px-4 sm:px-6 h-[54px] flex items-center justify-between gap-4">
        
        {/* Left Side: Exact Logo Box & Navigation Links */}
        <div className="flex items-center gap-5 sm:gap-7">
          
          {/* Logo Box: White container with thin crisp border & flame-slashed TESSELATOR */}
          <div 
            onClick={() => onNavigate('dashboard')} 
            className="flex items-center justify-center cursor-pointer select-none shrink-0"
            title="TESSELATOR"
          >
            <img
              src={tesselatorLogo}
              alt="TESSELATOR"
              className="h-[36px] w-auto block"
            />
          </div>

          {/* Navigation Links (Exact from screenshot) */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-white">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 transition-colors relative ${
                currentView === 'dashboard' 
                  ? 'text-white font-bold border-b-2 border-[#1a73e8]' 
                  : 'text-slate-200 hover:text-white hover:bg-[#002654]/50'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('solve')}
              className={`px-3 py-1.5 transition-colors ${
                currentView === 'solve' 
                  ? 'text-white font-bold border-b-2 border-[#1a73e8]' 
                  : 'text-slate-200 hover:text-white hover:bg-[#002654]/50'
              }`}
            >
              Assignments
            </button>

            <button
              onClick={() => onNavigate('completed')}
              className={`px-3 py-1.5 transition-colors ${
                currentView === 'completed' 
                  ? 'text-white font-bold border-b-2 border-[#1a73e8]' 
                  : 'text-slate-200 hover:text-white hover:bg-[#002654]/50'
              }`}
            >
              Completed Tasks
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className={`px-3 py-1.5 transition-colors ${
                currentView === 'reports'
                  ? 'text-white font-bold border-b-2 border-[#1a73e8]'
                  : 'text-slate-200 hover:text-white hover:bg-[#002654]/50'
              }`}
            >
              Reports
            </button>

            <button
              onClick={() => onNavigate('api-reference')}
              className="px-3 py-1.5 text-slate-200 hover:text-white hover:bg-[#002654]/50 transition-colors"
            >
              API Reference
            </button>

            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-3 py-1.5 transition-colors ${
                currentView === 'knowledge' 
                  ? 'text-white font-bold border-b-2 border-[#1a73e8]' 
                  : 'text-slate-200 hover:text-white hover:bg-[#002654]/50'
              }`}
            >
              Study Material
            </button>

            <button
              onClick={() => onNavigate('feedback')}
              className="px-3 py-1.5 text-slate-200 hover:text-white hover:bg-[#002654]/50 transition-colors"
            >
              Feedback
            </button>

            <button
              onClick={() => alert('Change Password (KMIT Portal)')}
              className="px-3 py-1.5 text-slate-200 hover:text-white hover:bg-[#002654]/50 transition-colors"
            >
              change password
            </button>

            <button
              onClick={() => alert('Academic Calendar 2026-27')}
              className="px-3 py-1.5 text-slate-200 hover:text-white hover:bg-[#002654]/50 transition-colors"
            >
              Calendar
            </button>

            {/* More Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="px-3 py-1.5 text-slate-200 hover:text-white hover:bg-[#002654]/50 flex items-center gap-1 transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showMoreMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-[#0a1c38] border border-[#1b3a63] rounded shadow-2xl py-1 z-50 text-xs">
                  <button
                    onClick={() => { onNavigate('solve'); setShowMoreMenu(false); }}
                    className="w-full text-left px-4 py-2 text-slate-200 hover:bg-[#002654] hover:text-white"
                  >
                    100+ Line IDE Solver
                  </button>
                  <button
                    onClick={() => { onNavigate('my-solutions'); setShowMoreMenu(false); }}
                    className="w-full text-left px-4 py-2 text-slate-200 hover:bg-[#002654] hover:text-white"
                  >
                    Saved Exam Solutions
                  </button>
                  <button
                    onClick={() => { onNavigate('settings'); setShowMoreMenu(false); }}
                    className="w-full text-left px-4 py-2 text-slate-200 hover:bg-[#002654] hover:text-white"
                  >
                    Settings & Formats
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Red Log out link (Exact from screenshot) */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span 
              onClick={() => alert('Logged in as KUKKADAPU HARIKA (KMIT) • Local Intranet Session Active')}
              className="text-[#f53d2d] hover:underline cursor-pointer text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap"
            >
              Log out (KUKKADAPU HARIKA KMIT)
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-[#051126] border-t border-[#0d274c] overflow-x-auto text-xs text-white">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className={`px-2.5 py-1 rounded ${currentView === 'dashboard' ? 'bg-[#002654] font-bold' : ''}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => onNavigate('solve')} 
          className={`px-2.5 py-1 rounded ${currentView === 'solve' ? 'bg-[#002654] font-bold' : ''}`}
        >
          Assignments
        </button>
        <button 
          onClick={() => onNavigate('completed')} 
          className={`px-2.5 py-1 rounded ${currentView === 'completed' ? 'bg-[#002654] font-bold' : ''}`}
        >
          Completed
        </button>
        <button 
          onClick={() => onNavigate('knowledge')} 
          className={`px-2.5 py-1 rounded ${currentView === 'knowledge' ? 'bg-[#002654] font-bold' : ''}`}
        >
          Study Material
        </button>
      </div>
    </header>
  );
};
