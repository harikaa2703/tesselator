import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Loader2, 
  WifiOff, 
  ShieldCheck, 
  Zap, 
  Play 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OfflineDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySampleProblem: () => void;
}

interface StepItem {
  name: string;
  status: 'pending' | 'running' | 'done';
}

export const OfflineDemoModal: React.FC<OfflineDemoModalProps> = ({
  isOpen,
  onClose,
  onApplySampleProblem
}) => {
  const [steps, setSteps] = useState<StepItem[]>([
    { name: 'Simulate No Internet (Network Disconnect)', status: 'pending' },
    { name: 'Load Local AI Reasoning Engine', status: 'pending' },
    { name: 'Load Local IndexedDB & Chunks', status: 'pending' },
    { name: 'Solve Sample Problem (Two Sum / N-Queens)', status: 'pending' },
    { name: 'Generate Java 17 Solution', status: 'pending' },
    { name: 'Run Sandboxed Test Cases Locally', status: 'pending' },
    { name: 'Verify College Clipboard Copy Ready', status: 'pending' }
  ]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSteps(s => s.map(step => ({ ...step, status: 'pending' })));
      setIsDone(false);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      setSteps(prev => {
        const next = [...prev];
        if (currentIndex > 0 && currentIndex <= next.length) {
          next[currentIndex - 1].status = 'done';
        }
        if (currentIndex < next.length) {
          next[currentIndex].status = 'running';
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsDone(true);
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#0e1424] border border-[#2b3956] rounded-2xl p-6 shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white font-mono">
              OFFLINE SYSTEM TEST
            </h3>
            <p className="text-xs text-slate-400">
              Simulating disconnected browser environment validation
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-2.5 p-4 bg-[#090d16] border border-[#1e293b] rounded-xl font-mono text-xs">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center justify-between py-1">
              <span className={`transition-colors ${
                step.status === 'done' ? 'text-slate-200' : step.status === 'running' ? 'text-amber-400 font-bold' : 'text-slate-500'
              }`}>
                {step.name}
              </span>
              <div className="shrink-0 pl-2">
                {step.status === 'done' && (
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ Ready</span>
                  </span>
                )}
                {step.status === 'running' && (
                  <span className="text-amber-400 flex items-center gap-1 font-semibold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Testing...</span>
                  </span>
                )}
                {step.status === 'pending' && (
                  <span className="text-slate-600">Pending</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completion Status */}
        {isDone && (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>OFFLINE MODE: FULLY READY</span>
            </div>
            <button
              onClick={() => {
                onApplySampleProblem();
                onClose();
              }}
              className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Load in IDE</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
