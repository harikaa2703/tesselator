import React from 'react';
import { 
  X, 
  Zap, 
  Copy, 
  Check, 
  FileCode, 
  Terminal, 
  ExternalLink 
} from 'lucide-react';
import { clipboardService } from '../services/clipboard';

interface QuickCopyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  javaCode: string;
  sampleInput: string;
  sampleOutput: string;
}

export const QuickCopyModal: React.FC<QuickCopyModalProps> = ({
  isOpen,
  onClose,
  title,
  pattern,
  timeComplexity,
  spaceComplexity,
  javaCode,
  sampleInput,
  sampleOutput
}) => {
  const [copiedType, setCopiedType] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    await clipboardService.copyForCollege(javaCode);
    setCopiedType('code');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyFull = async () => {
    await clipboardService.copyFullSolution(title, pattern, timeComplexity, spaceComplexity, javaCode);
    setCopiedType('full');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyIO = async () => {
    await clipboardService.copyInputOutput(sampleInput, sampleOutput);
    setCopiedType('io');
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#0e1424] border border-[#2b3956] rounded-2xl p-6 shadow-2xl shadow-indigo-950/50 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-mono tracking-tight">
              TESSELATOR QUICK COPY
            </h3>
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
              <span>✓</span> Verified Java 17 code ready for college lab
            </p>
          </div>
        </div>

        {/* Problem Snapshot */}
        <div className="p-3 bg-[#131b2e] border border-[#1e293b] rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Problem:</span>{' '}
            <strong className="text-slate-200">{title}</strong>
          </div>
          <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800/50">
            {pattern}
          </span>
        </div>

        {/* Big Action: [⚡ COPY FOR COLLEGE] */}
        <button
          onClick={handleCopyCode}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all"
        >
          {copiedType === 'code' ? (
            <>
              <Check className="w-5 h-5 text-emerald-950 stroke-[3]" />
              <span>✓ JAVA CODE COPIED TO CLIPBOARD!</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-current" />
              <span>⚡ COPY FOR COLLEGE</span>
            </>
          )}
        </button>

        {/* Workflow Guide */}
        <div className="p-4 bg-[#090d16] border border-[#1e293b] rounded-xl space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-400">
            <span>Shortcut:</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-bold">
              Ctrl + Shift + C
            </kbd>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Then paste using:</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold">
              Ctrl + V
            </kbd>
          </div>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800 font-sans">
            No browser extension required. Copies clean, compilable Java 17 code directly to system clipboard.
          </p>
        </div>

        {/* Alternative Copy Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleCopyFull}
            className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>{copiedType === 'full' ? '✓ Copied Full' : 'COPY FULL ANSWER'}</span>
          </button>

          <button
            onClick={handleCopyIO}
            className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>{copiedType === 'io' ? '✓ Copied I/O' : 'COPY INPUT/OUTPUT'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
