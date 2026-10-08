import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Database, 
  ShieldCheck, 
  Wrench, 
  Cpu, 
  ChevronRight,
  AlertTriangle 
} from 'lucide-react';
import { VerificationResult } from '../types/dsa';

interface TestResultPanelProps {
  result: VerificationResult | null;
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
  onFixAndRetest: () => void;
  isFixing: boolean;
}

export const TestResultPanel: React.FC<TestResultPanelProps> = ({
  result,
  timeComplexity,
  spaceComplexity,
  edgeCases,
  onFixAndRetest,
  isFixing
}) => {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#0e1424] border border-[#1e293b] rounded-xl text-slate-400">
        <Cpu className="w-12 h-12 text-slate-600 mb-3 animate-pulse" />
        <h4 className="text-base font-bold text-slate-300 mb-1">Awaiting Test Execution</h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Click <span className="text-indigo-400 font-semibold">TEST</span> to compile and run local validation test cases.
        </p>
      </div>
    );
  }

  const passPercent = result.totalTests > 0 
    ? Math.round((result.passedTests / result.totalTests) * 100) 
    : 0;

  return (
    <div className="flex flex-col h-full bg-[#0e1424] border border-[#1e293b] rounded-xl overflow-y-auto p-4 space-y-4">
      {/* 1. Header Verification Badge */}
      <div className={`p-4 rounded-xl border ${
        result.allPassed
          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
          : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            TEST RESULT
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {result.runnerType === 'local-javac' ? '⚡ Native javac 21' : '🛡 Browser Sandbox'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {result.allPassed ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
          )}
          <span className="text-lg font-extrabold tracking-tight font-mono">
            {result.verifiedBadgeText}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className={`h-full transition-all duration-500 ${
              result.allPassed ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-rose-500'
            }`}
            style={{ width: `${passPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Compilation Status */}
      <div className="p-3 bg-[#131b2e] border border-[#1e293b] rounded-lg">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">Compilation</span>
          <span className={`font-bold flex items-center gap-1 ${
            result.compiled ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {result.compiled ? '✓ PASS' : '✗ FAILED'}
          </span>
        </div>
        <p className="mt-1 font-mono text-[11px] text-slate-300 truncate">
          {result.compilerOutput}
        </p>
      </div>

      {/* 3. Complexity Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-[#131b2e] border border-[#1e293b] rounded-lg">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>TIME COMPLEXITY</span>
          </div>
          <span className="text-base font-extrabold font-mono text-cyan-300">
            {timeComplexity}
          </span>
        </div>

        <div className="p-3 bg-[#131b2e] border border-[#1e293b] rounded-lg">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>SPACE COMPLEXITY</span>
          </div>
          <span className="text-base font-extrabold font-mono text-indigo-300">
            {spaceComplexity}
          </span>
        </div>
      </div>

      {/* 4. Edge Cases Checklist */}
      <div className="p-3.5 bg-[#131b2e] border border-[#1e293b] rounded-lg space-y-2">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          EDGE CASES VERIFIED
        </span>
        <div className="space-y-1.5">
          {edgeCases.map((ec, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{ec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Failed Test Case Diagnostic & [FIX AND RETEST] */}
      {!result.allPassed && result.failedTestDetail && (
        <div className="p-4 bg-rose-950/40 border border-rose-600/50 rounded-xl space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              TEST #{result.failedTestDetail.testNumber} FAILED
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div>
              <span className="text-slate-400">Input:</span>
              <pre className="mt-0.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-slate-200 overflow-x-auto">
                {result.failedTestDetail.input}
              </pre>
            </div>
            <div>
              <span className="text-slate-400">Expected:</span>
              <pre className="mt-0.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-emerald-400">
                {result.failedTestDetail.expected}
              </pre>
            </div>
            <div>
              <span className="text-slate-400">Actual:</span>
              <pre className="mt-0.5 p-2 bg-slate-900/80 rounded border border-slate-800 text-rose-400">
                {result.failedTestDetail.actual}
              </pre>
            </div>
            <div>
              <span className="text-slate-400">Reason:</span>
              <p className="mt-0.5 text-amber-300 font-sans text-xs">
                {result.failedTestDetail.reason}
              </p>
            </div>
          </div>

          <button
            onClick={onFixAndRetest}
            disabled={isFixing}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
          >
            <Wrench className={`w-4 h-4 ${isFixing ? 'animate-spin' : ''}`} />
            <span>{isFixing ? 'AI Auto-Debugging & Retesting...' : 'FIX AND RETEST'}</span>
          </button>
        </div>
      )}

      {/* 6. Test Suite Breakdown Accordion */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-400">TEST CASES SUMMARY</span>
        <div className="space-y-1">
          {result.results.slice(0, 8).map((test) => (
            <div
              key={test.id}
              className="flex items-center justify-between px-3 py-2 rounded bg-[#131b2e] border border-[#1e293b] text-xs font-mono"
            >
              <div className="flex items-center gap-2 truncate">
                {test.passed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                )}
                <span className="text-slate-300 truncate">{test.name}</span>
              </div>
              <span className="text-[11px] text-slate-400">{test.timeMs}ms</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
