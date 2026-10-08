// src/views/ReportsView.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  ClipboardPaste, 
  MousePointer
} from 'lucide-react';
import { relayService, RelayState } from '../services/relayService';
import { dsaSolver } from '../services/dsaSolver';

interface ReportsViewProps {
  onBackToDashboard?: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [autoSolve, setAutoSolve] = useState(true);
  const [copiedTake, setCopiedTake] = useState(false);
  const [activeMode, setActiveMode] = useState<'both' | 'college' | 'laptop'>('both');

  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  // Subscribe to real-time relay updates from the local server
  useEffect(() => {

    const unsubscribe = relayService.subscribe((relay: RelayState) => {
      setQuestion(prev => (prev !== relay.question ? relay.question : prev));
      setAnswer(prev => (prev !== relay.answer ? relay.answer : prev));

      // If a question was posted from college PC and autoSolve is ON, solve automatically
      if (relay.question && relay.question.length > 5 && !relay.answer && autoSolve) {
        handleAutoSolveQuestion(relay.question);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [autoSolve]);

  const handleAutoSolveQuestion = async (queryText: string) => {
    setIsSolving(true);
    try {
      const res = await dsaSolver.solveProblem(queryText, 'college');
      if (res && res.javaCode) {
        setAnswer(res.javaCode);
        await relayService.setAnswer(res.javaCode, 'laptop');
      }
    } catch (err) {
      console.error('Auto solve failed:', err);
    } finally {
      setIsSolving(false);
    }
  };

  // When user edits question in Box 1
  const handleQuestionChange = async (val: string) => {
    setQuestion(val);
    await relayService.setQuestion(val, 'college_pc');

    if (autoSolve && val.trim().length > 10) {
      // Debounce auto-solve
      const timer = setTimeout(() => {
        handleAutoSolveQuestion(val);
      }, 800);
      return () => clearTimeout(timer);
    }
  };

  // When user edits answer in Box 2
  const handleAnswerChange = async (val: string) => {
    setAnswer(val);
    await relayService.setAnswer(val, 'laptop');
  };

  // Manual solve button
  const handleManualSolve = async () => {
    if (!question.trim()) {
      questionRef.current?.focus();
      return;
    }
    await handleAutoSolveQuestion(question);
  };

  // Paste question from clipboard
  const handlePasteQuestion = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleQuestionChange(text);
      }
    } catch {
      questionRef.current?.focus();
    }
  };

  // Multi-format Copy for College Exam Portal (Bypasses naive clipboard filters)
  const handleTakeCopy = async () => {
    if (!answer) return;
    const ok = await relayService.copyToClipboardMultiFormat(answer);
    if (ok) {
      setCopiedTake(true);
      setTimeout(() => setCopiedTake(false), 2500);
    }
  };

  // Setup drag event for Drag & Drop bypass handle
  const handleDragStart = (e: React.DragEvent) => {
    if (!answer) return;
    e.dataTransfer.setData('text/plain', answer);
    e.dataTransfer.setData('text', answer);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto font-sans text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full space-y-6">

        {/* 1. TOP HEADER WITH 1 2 3 VIEW SELECTOR ONLY */}
        <div className="border border-slate-300 rounded bg-[#f8fafc] px-4 py-2.5 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Reports
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={autoSolve}
                onChange={(e) => setAutoSolve(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 focus:ring-0 cursor-pointer"
              />
              <span>Auto-Solve</span>
            </label>

            {/* 1, 2, 3 View Buttons */}
            <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded border border-slate-300">
              <button
                onClick={() => setActiveMode('both')}
                className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs transition-all ${
                  activeMode === 'both' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="1: Dual Split View (Both Boxes)"
              >
                1
              </button>
              <button
                onClick={() => setActiveMode('college')}
                className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs transition-all ${
                  activeMode === 'college' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="2: Box 1 Only (Question Input)"
              >
                2
              </button>
              <button
                onClick={() => setActiveMode('laptop')}
                className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs transition-all ${
                  activeMode === 'laptop' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="3: Box 2 Only (Answer Output)"
              >
                3
              </button>
            </div>
          </div>
        </div>

        {/* 3. DUAL TERMINAL WORKSPACE (BOX 1 & BOX 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[520px]">

          {/* ======================================================== */}
          {/* BOX 1: FIRST BOX (QUESTION INPUT FROM COLLEGE COMPUTER)  */}
          {/* ======================================================== */}
          {(activeMode === 'both' || activeMode === 'college') && (
            <div className="flex flex-col border border-slate-300 rounded bg-white shadow-sm overflow-hidden">
              
              {/* Header Bar */}
              <div className="bg-[#f1f5f9] border-b border-slate-300 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-800 font-mono">
                    BOX 1: QUESTION INPUT (College PC)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePasteQuestion}
                    className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>Paste</span>
                  </button>

                  <button
                    onClick={handleManualSolve}
                    disabled={isSolving || !question.trim()}
                    className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold rounded text-xs flex items-center gap-1 shadow-xs transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isSolving ? 'Solving...' : 'give'}</span>
                  </button>
                </div>
              </div>

              {/* Textarea Area */}
              <div className="flex-1 p-3 bg-white flex flex-col">
                <textarea
                  ref={questionRef}
                  value={question}
                  onChange={(e) => handleQuestionChange(e.target.value)}
                  placeholder="Paste your exam question here on your college computer...&#10;&#10;e.g.&#10;Given an array of positive integers, determine whether it can be partitioned into two subsets with equal sum.&#10;&#10;Sample Input:&#10;4&#10;1 5 11 5&#10;&#10;Sample Output:&#10;true"
                  className="w-full flex-1 min-h-[420px] p-3 bg-slate-50/60 border border-slate-200 rounded text-xs font-mono text-slate-900 leading-relaxed placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 resize-none shadow-inner"
                  spellCheck={false}
                />
              </div>

              {/* Footer info bar */}
              <div className="bg-[#f8fafc] border-t border-slate-200 px-4 py-2 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>Characters: {question.length}</span>
                <span>Type or paste here &bull; Syncs live to Box 2 on Laptop</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* BOX 2: SECOND BOX (ANSWER / VERIFIED JAVA SOLUTION)      */}
          {/* ======================================================== */}
          {(activeMode === 'both' || activeMode === 'laptop') && (
            <div className="flex flex-col border border-slate-300 rounded bg-white shadow-sm overflow-hidden">
              
              {/* Header Bar with BYPASS ACTIONS */}
              <div className="bg-[#f1f5f9] border-b border-slate-300 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-800 font-mono">
                    BOX 2: ANSWER / JAVA 17 (College Ready)
                  </span>
                </div>

                {/* ACTION BUTTONS: Take, Drag & Drop, Unblock */}
                <div className="flex items-center gap-2">
                  {/* Native Mouse Drag & Drop handle (Bypasses onpaste completely) */}
                  <div
                    draggable={!!answer}
                    onDragStart={handleDragStart}
                    className={`px-2.5 py-1 rounded text-xs font-bold font-mono border flex items-center gap-1.5 cursor-grab active:cursor-grabbing select-none transition-all ${
                      answer 
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-xs' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    }`}
                    title="Drag this badge straight into your college code editor window to bypass Ctrl+V blocking!"
                  >
                    <MousePointer className="w-3.5 h-3.5 text-amber-700" />
                    <span>🎯 Drag to College Editor</span>
                  </div>

                  {/* Primary 'take' button (White button for college exam portal) */}
                  <button
                    onClick={handleTakeCopy}
                    disabled={!answer}
                    className="px-3.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-extrabold text-xs uppercase tracking-wider rounded shadow-xs active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-40"
                    title="Copy code for college website"
                  >
                    {copiedTake ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-700" />}
                    <span>{copiedTake ? 'COPIED!' : 'take'}</span>
                  </button>
                </div>
              </div>

              {/* Code Editor Area */}
              <div className="flex-1 p-3 bg-white flex flex-col">
                <textarea
                  ref={answerRef}
                  value={answer}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Solution code will automatically appear here when question is received...&#10;&#10;You can also type, paste, or tweak the Java code directly here on the laptop, and it will immediately display in this Box 2 on your college computer!"
                  className="w-full flex-1 min-h-[420px] p-3 bg-slate-50/60 border border-slate-200 rounded text-xs font-mono text-slate-900 leading-relaxed placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 resize-none shadow-inner"
                  style={{
                    fontFamily: "Consolas, 'Courier New', monospace",
                    tabSize: 4,
                    whiteSpace: 'pre'
                  }}
                  spellCheck={false}
                />
              </div>

              {/* Footer Bar with line count and Alt+X hint */}
              <div className="bg-[#f8fafc] border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-500">
                  Lines: {answer ? answer.split('\n').length : 0} &bull; Java 17
                </span>

                <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  College Portal: Press <strong>Alt + X</strong> (or Ctrl+V) to paste
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
