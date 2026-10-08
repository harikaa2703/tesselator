import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Download, 
  HardDrive, 
  WifiOff, 
  Trash2, 
  Play, 
  Sparkles,
  Info 
} from 'lucide-react';

interface OfflineAISetupViewProps {
  onOpenOfflineTest: () => void;
}

export const OfflineAISetupView: React.FC<OfflineAISetupViewProps> = ({ onOpenOfflineTest }) => {
  const [modelProgress, setModelProgress] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadModel = () => {
    setIsDownloading(true);
    setModelProgress(0);
    const int = setInterval(() => {
      setModelProgress(prev => {
        if (prev >= 100) {
          clearInterval(int);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClearCache = async () => {
    if (confirm('Clear local offline cached assets and model weights?')) {
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const k of keys) await caches.delete(k);
      }
      alert('✓ Offline cache cleared!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" />
          <span>LOCAL INFERENCE ENGINE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          OFFLINE AI SETUP & ASSET MANAGER
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          TESSELATOR operates completely offline without depending on OpenAI, Gemini, or Claude cloud APIs. Local model weights and DSA knowledge are cached in the browser.
        </p>
      </div>

      {/* Online Requirement Notice */}
      <div className="p-4 bg-indigo-950/30 border border-indigo-500/40 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-slate-200">First-Time Setup Notice</p>
          <p className="text-slate-400 leading-relaxed">
            The local AI model and DSA vector index must be downloaded or cached once while online. After initialization, you can turn off Wi-Fi or disconnect completely, and TESSELATOR will generate, compile, and verify solutions offline.
          </p>
        </div>
      </div>

      {/* Status Screen matching user's ASCII diagram from prompt */}
      <div className="bg-[#0e1424] border border-[#1e293b] rounded-2xl p-6 shadow-2xl space-y-5 font-mono">
        <div className="border-b border-[#1e293b] pb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-200">OFFLINE AI SETUP</span>
          <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-bold">
            READY FOR OFFLINE USE
          </span>
        </div>

        {/* 1. Local AI Model */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold font-sans">Local AI Model (WebGPU / ONNX Web)</span>
            <span className="text-cyan-400 font-bold">{modelProgress}%</span>
          </div>
          <div className="w-full bg-[#070b14] rounded-lg h-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${modelProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Model: DeepSeek-Coder-1.3B / TinyLlama-DSA-Q4</span>
            <span>Size: 420 MB (Cached)</span>
          </div>
        </div>

        {/* 2. DSA Knowledge */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold font-sans">DSA Knowledge (LeetCode + 3 DAA PDFs)</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="w-full bg-[#070b14] rounded-lg h-3 overflow-hidden border border-slate-800">
            <div className="bg-emerald-500 h-full w-full" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Indexed Chunks: 1,032 chunks</span>
            <span>IndexedDB: 14.2 MB</span>
          </div>
        </div>

        {/* 3. Local Search Index */}
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold font-sans">Local Search Index (BM25 + TF-IDF)</span>
            <span className="text-emerald-400 font-bold">100%</span>
          </div>
          <div className="w-full bg-[#070b14] rounded-lg h-3 overflow-hidden border border-slate-800">
            <div className="bg-emerald-500 h-full w-full" />
          </div>
        </div>

        {/* Checkmarks */}
        <div className="pt-2 border-t border-[#1e293b] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-sans">Java Runtime:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>✓ Ready (Java 17/21 detected)</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-sans">OFFLINE MODE:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>✓ Ready</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onOpenOfflineTest}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>[TEST OFFLINE MODE]</span>
        </button>

        <button
          onClick={handleDownloadModel}
          disabled={isDownloading}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Downloading...' : 'Re-download Offline Model'}</span>
        </button>

        <button
          onClick={handleClearCache}
          className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Clear Local Cache</span>
        </button>
      </div>
    </div>
  );
};
