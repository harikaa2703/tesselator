import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { 
  Play, 
  CheckCircle, 
  Copy, 
  Bookmark, 
  RotateCcw, 
  Zap, 
  FileCode, 
  Code2 
} from 'lucide-react';
import { ProblemFormat } from '../types/dsa';

interface MonacoJavaEditorProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onTest: () => void;
  onCopy: () => void;
  onSave: () => void;
  onReset: () => void;
  format: ProblemFormat;
  onFormatChange: (fmt: ProblemFormat) => void;
  isRunning: boolean;
  isTesting: boolean;
}

export const MonacoJavaEditor: React.FC<MonacoJavaEditorProps> = ({
  code,
  onChange,
  onRun,
  onTest,
  onCopy,
  onSave,
  onReset,
  format,
  onFormatChange,
  isRunning,
  isTesting
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define custom dark editor theme
    monaco.editor.defineTheme('tesselator-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '818cf8', fontStyle: 'bold' },
        { token: 'string', foreground: '34d399' },
        { token: 'number', foreground: 'fbbf24' },
        { token: 'type', foreground: '38bdf8' },
        { token: 'identifier', foreground: 'e2e8f0' }
      ],
      colors: {
        'editor.background': '#0b0f1a',
        'editor.foreground': '#e2e8f0',
        'editorLineNumber.foreground': '#334155',
        'editorLineNumber.activeForeground': '#818cf8',
        'editor.selectionBackground': '#312e8155',
        'editor.lineHighlightBackground': '#131b2e44',
        'editorCursor.foreground': '#38bdf8'
      }
    });

    monaco.editor.setTheme('tesselator-dark');
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0f1a] border border-[#1e293b] rounded-xl overflow-hidden shadow-2xl">
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0e1424] border-b border-[#1e293b] gap-2">
        {/* Left: Language & Format selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/40">
            <FileCode className="w-4 h-4" />
            <span>Java 17</span>
          </div>

          {/* Format Selector */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 font-medium hidden sm:inline">Format:</span>
            <select
              value={format}
              onChange={(e) => onFormatChange(e.target.value as ProblemFormat)}
              className="bg-[#131b2e] text-slate-200 border border-[#2d3748] rounded-md px-2 py-1 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="auto">Auto Detect</option>
              <option value="leetcode">LeetCode (class Solution)</option>
              <option value="college">College Lab (public class Main)</option>
              <option value="cp">Competitive Programming</option>
            </select>
          </div>
        </div>

        {/* Right: Actions (Run, Test, Copy, Save, Reset) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onRun}
            disabled={isRunning || isTesting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold active:scale-95 transition-all disabled:opacity-50"
            title="Compile and run with sample input"
          >
            <Play className={`w-3.5 h-3.5 text-cyan-400 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Compiling...' : 'RUN'}</span>
          </button>

          <button
            onClick={onTest}
            disabled={isRunning || isTesting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-50"
            title="Execute all local validation test cases"
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Testing...' : 'TEST'}</span>
          </button>

          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold shadow-md active:scale-95 transition-all"
            title="Copy final verified Java code (Ctrl+Shift+C)"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>COPY CODE</span>
          </button>

          <button
            onClick={onSave}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Save to My Solutions"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset code template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Container */}
      <div className="flex-1 w-full min-h-[380px] lg:min-h-[500px]">
        <Editor
          height="100%"
          language="java"
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
            fontLigatures: true,
            tabSize: 4,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            formatOnType: true,
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            renderLineHighlight: 'all',
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>

      {/* Editor Footer Status */}
      <div className="px-4 py-1.5 bg-[#070b14] border-t border-[#1e293b] flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span>Java 17 (LTS) Compatible</span>
          <span>UTF-8</span>
          <span>Tab: 4 spaces</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>TESSELATOR Editor</span>
        </div>
      </div>
    </div>
  );
};
