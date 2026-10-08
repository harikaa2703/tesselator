import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { CopyFeedback } from '../services/clipboard';

export const Toast: React.FC = () => {
  const [toast, setToast] = useState<CopyFeedback | null>(null);

  useEffect(() => {
    const handleCopyEvent = (e: any) => {
      setToast(e.detail);
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('tesselator:copy', handleCopyEvent);
    return () => window.removeEventListener('tesselator:copy', handleCopyEvent);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#0e1424] border border-amber-500/50 shadow-2xl shadow-amber-500/20 text-slate-100 text-xs font-semibold">
        <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
          <Zap className="w-4 h-4 fill-current" />
        </div>
        <div>
          <p className="font-extrabold text-amber-400 font-mono tracking-tight text-[13px]">
            TESSELATOR QUICK COPY
          </p>
          <p className="text-slate-300 mt-0.5">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
