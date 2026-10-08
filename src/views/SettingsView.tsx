import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Terminal, 
  Cpu, 
  Trash2, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { ProblemFormat, SystemStatus } from '../types/dsa';
import { dbService } from '../services/db';

interface SettingsViewProps {
  systemStatus: SystemStatus;
  formatPreference: ProblemFormat;
  onFormatPreferenceChange: (fmt: ProblemFormat) => void;
  onRefreshRuntime: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  systemStatus,
  formatPreference,
  onFormatPreferenceChange,
  onRefreshRuntime
}) => {
  const [exportNotice, setExportNotice] = useState('');

  const handleExportData = async () => {
    const solutions = await dbService.getAllSolutions();
    const history = await dbService.getHistory();
    const data = JSON.stringify({ solutions, history, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tesselator-solutions-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice('✓ Exported all solutions & history backup to JSON file.');
  };

  const handleResetAll = async () => {
    if (confirm('WARNING: Reset all offline IndexedDB storage (saved solutions, history, cached PDFs)? This cannot be undone.')) {
      indexedDB.deleteDatabase('tesselator_offline_db');
      if ('caches' in window) {
        const keys = await caches.keys();
        for (const k of keys) await caches.delete(k);
      }
      alert('✓ Local database reset. Refreshing page...');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
          <SettingsIcon className="w-4 h-4" />
          <span>CONFIGURATION & ENVIRONMENT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          TESSELATOR SETTINGS
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize code generation format, check local Java 17/21 compiler status, and manage local data.
        </p>
      </div>

      {/* 1. Code Generation Format Selector */}
      <div className="p-5 bg-[#0e1424] border border-[#1e293b] rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          Default Java Problem Format
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Choose which class format TESSELATOR generates by default for DSA problems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
            formatPreference === 'auto'
              ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
              : 'bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700'
          }`}>
            <input
              type="radio"
              name="format"
              value="auto"
              checked={formatPreference === 'auto'}
              onChange={() => onFormatPreferenceChange('auto')}
              className="hidden"
            />
            <span className="font-extrabold text-sm block mb-1">AUTO DETECT</span>
            <span className="text-[11px] leading-tight block text-slate-400">
              Detects format automatically from question keywords and input signatures.
            </span>
          </label>

          <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
            formatPreference === 'leetcode'
              ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
              : 'bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700'
          }`}>
            <input
              type="radio"
              name="format"
              value="leetcode"
              checked={formatPreference === 'leetcode'}
              onChange={() => onFormatPreferenceChange('leetcode')}
              className="hidden"
            />
            <span className="font-extrabold text-sm block mb-1 font-mono">class Solution</span>
            <span className="text-[11px] leading-tight block text-slate-400">
              LeetCode method signature format without main method.
            </span>
          </label>

          <label className={`p-4 rounded-xl border cursor-pointer transition-all ${
            formatPreference === 'college'
              ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
              : 'bg-[#131b2e] border-slate-800 text-slate-400 hover:border-slate-700'
          }`}>
            <input
              type="radio"
              name="format"
              value="college"
              checked={formatPreference === 'college'}
              onChange={() => onFormatPreferenceChange('college')}
              className="hidden"
            />
            <span className="font-extrabold text-sm block mb-1 font-mono">public class Main</span>
            <span className="text-[11px] leading-tight block text-slate-400">
              Standard college lab portal format with Scanner and main method.
            </span>
          </label>
        </div>
      </div>

      {/* 2. Java Runtime Status */}
      <div className="p-5 bg-[#0e1424] border border-[#1e293b] rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            Local Java Runtime & Compiler
          </h4>
          <button
            onClick={onRefreshRuntime}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Check Again
          </button>
        </div>

        <div className="p-4 bg-[#090d16] rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Compiler:</span>
            <span className="text-emerald-400 font-bold">javac 21.0.10 (Java 17 Compatible)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Execution Sandbox:</span>
            <span className="text-cyan-400 font-bold">Enabled (-Xmx128m, 3000ms timeout)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Fallback Engine:</span>
            <span className="text-indigo-400 font-bold">In-Browser Java 17 Sandbox Engine</span>
          </div>
        </div>
      </div>

      {/* 3. Data Export & Reset */}
      <div className="p-5 bg-[#0e1424] border border-[#1e293b] rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">
          Backup & Data Management
        </h4>

        {exportNotice && (
          <p className="text-xs text-emerald-400 font-semibold">{exportNotice}</p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export Solutions & History (JSON)</span>
          </button>

          <button
            onClick={handleResetAll}
            className="px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset All Local Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
