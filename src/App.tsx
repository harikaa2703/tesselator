import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { labSyncService } from './services/labSync';
import { Toast } from './components/Toast';
import { DashboardView } from './views/DashboardView';
import { SolveView } from './views/SolveView';
import { AssignmentsView } from './views/AssignmentsView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';
import { OfflineAISetupView } from './views/OfflineAISetupView';
import { MySolutionsView } from './views/MySolutionsView';
import { SharedSolutionsView } from './views/SharedSolutionsView';
import { CompletedTasksView } from './views/CompletedTasksView';
import { SettingsView } from './views/SettingsView';
import { CollegeAssignment } from './data/kmitDAAData';
import { DSAProblem } from './data/problems';
import { SolutionItem, ProblemFormat, SystemStatus } from './types/dsa';
import { javaRunner } from './services/javaRunner';
import { clipboardService } from './services/clipboard';
import { dsaSolver } from './services/dsaSolver';
import { ReportsView } from './views/ReportsView';

export function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('attempt') || hash.includes('openmodal') || path.includes('attempt')) {
        return 'solve';
      }
      if (hash.includes('report') || path.includes('report')) {
        return 'reports';
      }
    }
    return 'dashboard';
  });
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [formatPreference, setFormatPreference] = useState<ProblemFormat>('college');

  // Active Problem / Solution State in IDE
  const [activeProblem, setActiveProblem] = useState<{
    title: string;
    question: string;
    javaCode: string;
    pattern: string;
    format: ProblemFormat;
    tests: any[];
  }>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('tesselator_active_assignment') : null;
      if (saved) {
        const assignment = JSON.parse(saved);
        return {
          title: assignment.title,
          question: assignment.description + (assignment.constraints?.length > 0 ? '\n\nConstraints:\n' + assignment.constraints.join('\n') : ''),
          javaCode: assignment.verifiedSolution,
          pattern: assignment.pattern,
          format: 'college',
          tests: assignment.tests || []
        };
      }
    } catch {}
    return {
      title: '05_10_2026 Attendance program',
      question: 'Given attendance records of N students, verify present status and compute total consecutive present students using recursion.',
      javaCode: `import java.util.*;

public class Main {
    // Recursive function to compute maximum consecutive present ('P') students
    public static int maxConsecutivePresent(String s, int index, int currentStreak, int maxStreak) {
        if (index >= s.length()) return Math.max(maxStreak, currentStreak);
        if (s.charAt(index) == 'P') {
            return maxConsecutivePresent(s, index + 1, currentStreak + 1, Math.max(maxStreak, currentStreak + 1));
        } else {
            return maxConsecutivePresent(s, index + 1, 0, maxStreak);
        }
    }

    // Recursive function to count presence
    public static int countChar(String s, int index, char target) {
        if (index >= s.length()) return 0;
        return (s.charAt(index) == target ? 1 : 0) + countChar(s, index + 1, target);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        int n = sc.hasNextInt() ? sc.nextInt() : 0;
        String s = sc.hasNext() ? sc.next() : "";
        if (s.isEmpty() && n > 0) s = String.valueOf(n);

        int consecutive = maxConsecutivePresent(s, 0, 0, 0);
        System.out.println(consecutive);
    }
}`,
      pattern: 'Recursion',
      format: 'college',
      tests: [
        { id: 1, name: 'Sample Attendance PPALLP', input: '5\nPPALLP', expected: '2', category: 'normal' },
        { id: 2, name: 'All Present', input: '5\nPPPPP', expected: '5', category: 'normal' }
      ]
    };
  });

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    online: navigator.onLine,
    syncing: false,
    javaRuntimeAvailable: true,
    javaVersion: 'javac 21.0.10',
    javaStatusText: 'Java Runtime: ✓ Java 21/17 detected locally',
    offlineAIReady: true,
    dsaKnowledgeReady: true,
    localTestingReady: true,
    pwaReady: true,
    totalIndexedChunks: 1032,
    totalSavedSolutions: 7
  });

  // Track Online / Offline network status changes
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      setSyncing(true);
      setTimeout(() => {
        setSyncing(false);
      }, 1500);
    };

    const handleOffline = () => {
      setOnline(false);
      setSyncing(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Detect Java runtime
    javaRunner.detectLocalJava().then(info => {
      setSystemStatus(prev => ({
        ...prev,
        javaRuntimeAvailable: info.available,
        javaVersion: info.javacVersion,
        javaStatusText: info.statusText
      }));
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle any #attempt or #openModal navigation directly into the Attempt Dashboard page
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash.includes('attempt') || hash.includes('openmodal') || path.includes('attempt')) {
        try {
          const saved = localStorage.getItem('tesselator_active_assignment');
          if (saved) {
            const assignment = JSON.parse(saved);
            setActiveProblem({
              title: assignment.title,
              question: assignment.description + (assignment.constraints?.length > 0 ? '\n\nConstraints:\n' + assignment.constraints.join('\n') : ''),
              javaCode: assignment.verifiedSolution,
              pattern: assignment.pattern,
              format: 'college',
              tests: assignment.tests || []
            });
          }
        } catch {}
        setCurrentView('solve');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleRefresh = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 600);
  };

  // When user clicks ATTEMPT on a college lab assignment
  const handleSelectAssignment = (assignment: CollegeAssignment) => {
    try {
      localStorage.setItem('tesselator_active_assignment', JSON.stringify(assignment));
    } catch {}
    setActiveProblem({
      title: assignment.title,
      question: assignment.description + (assignment.constraints.length > 0 ? '\n\nConstraints:\n' + assignment.constraints.join('\n') : ''),
      javaCode: assignment.verifiedSolution,
      pattern: assignment.pattern,
      format: 'college',
      tests: assignment.tests
    });
    setCurrentView('solve');
  };

  // When user selects a LeetCode problem
  const handleSelectProblem = (prob: DSAProblem) => {
    setActiveProblem({
      title: prob.title,
      question: prob.description + '\n\nConstraints:\n' + prob.constraints.join('\n'),
      javaCode: prob.javaSolutionLeetCode,
      pattern: prob.pattern,
      format: 'leetcode',
      tests: prob.tests
    });
    setCurrentView('solve');
  };

  // Quick Solve from dashboard input
  const handleQuickSolve = async (question: string, format: ProblemFormat = 'college') => {
    try {
      const solution = await dsaSolver.solveProblem(question, format);
      setActiveProblem({
        title: solution.title,
        question,
        javaCode: solution.javaCode,
        pattern: solution.pattern,
        format,
        tests: solution.tests
      });
    } catch {
      setActiveProblem({
        title: 'Exam Lab Question',
        question,
        javaCode: '',
        pattern: 'Recursion',
        format,
        tests: []
      });
    }
    setCurrentView('solve');
  };

  // Load saved solution
  const handleLoadSavedSolution = (sol: SolutionItem) => {
    setActiveProblem({
      title: sol.title,
      question: sol.question,
      javaCode: sol.javaCode,
      pattern: sol.pattern,
      format: sol.format,
      tests: sol.tests
    });
    setCurrentView('solve');
  };

  // Open shared in IDE
  const handleOpenSharedInIDE = (code: string, title: string) => {
    setActiveProblem(prev => ({
      ...prev,
      title,
      javaCode: code
    }));
    setCurrentView('solve');
  };

  // Trigger quick copy directly to clipboard
  const handleQuickCopyClick = () => {
    if (activeProblem.javaCode) {
      clipboardService.copyForCollege(activeProblem.javaCode);
    }
  };

  // Listen to real-time live answers shared by other students across the lab network
  const [labPeerNotice, setLabPeerNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = labSyncService.subscribe((_answers, latest) => {
      if (latest && latest.author !== 'You') {
        setLabPeerNotice(`🔔 Live Lab Update: Solution for "${latest.title}" is ready!`);
        setTimeout(() => setLabPeerNotice(null), 5000);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#eceff3] text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Real-time peer alert banner */}
      {labPeerNotice && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-1.5 flex items-center justify-between font-semibold shadow-md animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>{labPeerNotice}</span>
          </div>
          <button 
            onClick={() => setCurrentView('solve')}
            className="bg-white text-emerald-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow hover:bg-emerald-50 transition-colors uppercase"
          >
            View & Copy Code
          </button>
        </div>
      )}

      {/* Top Portal Header Bar matching user's college portal screenshot (hidden during attempt) */}
      {currentView !== 'solve' && (
        <HeaderNav
          currentView={currentView}
          onNavigate={setCurrentView}
          online={online}
          syncing={syncing}
          onRefresh={handleRefresh}
          onQuickCopy={handleQuickCopyClick}
          hasVerifiedCode={Boolean(activeProblem.javaCode)}
        />
      )}

      {/* 3. Main Content Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {currentView === 'dashboard' && (
          <DashboardView
            onSelectAssignment={handleSelectAssignment}
            onQuickSolve={handleQuickSolve}
            systemStatus={systemStatus}
            onOpenOfflineTest={() => setCurrentView('solve')}
          />
        )}

        {currentView === 'solve' && (
          <SolveView
            key={activeProblem.title}
            initialTitle={activeProblem.title}
            initialQuestion={activeProblem.question}
            initialJavaCode={activeProblem.javaCode}
            initialPattern={activeProblem.pattern}
            initialFormat={activeProblem.format}
            initialTests={activeProblem.tests}
            onBackToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'reports' && (
          <ReportsView onBackToDashboard={() => setCurrentView('dashboard')} />
        )}

        {currentView === 'api-reference' && (
          <div className="max-w-4xl mx-auto p-8 text-slate-700 space-y-4">
            <h3 className="text-xl font-bold">Java 17 Standard Library API Reference</h3>
            <div className="bg-white p-4 rounded border border-slate-300 text-xs font-mono space-y-2">
              <p><strong>java.util.Scanner:</strong> sc.nextInt(), sc.next(), sc.nextLine(), sc.hasNextInt()</p>
              <p><strong>java.util.HashMap:</strong> map.put(k, v), map.get(k), map.containsKey(k)</p>
              <p><strong>java.util.ArrayList:</strong> list.add(x), list.get(i), list.size()</p>
              <p><strong>java.util.Queue / LinkedList:</strong> q.offer(x), q.poll(), q.isEmpty()</p>
              <p><strong>java.util.Stack:</strong> st.push(x), st.pop(), st.peek(), st.isEmpty()</p>
              <p><strong>java.util.Arrays:</strong> Arrays.sort(arr), Arrays.fill(arr, val)</p>
            </div>
          </div>
        )}

        {currentView === 'feedback' && (
          <div className="max-w-4xl mx-auto p-8 text-center text-slate-700 space-y-2">
            <h3 className="text-xl font-bold">Laboratory Feedback</h3>
            <p className="text-sm text-slate-500">TESSELATOR Offline DAA Assistant is operating normally on KMIT Local Intranet.</p>
          </div>
        )}

        {currentView === 'assignments' && (
          <AssignmentsView
            onSelectAssignment={handleSelectAssignment}
            onSelectProblem={handleSelectProblem}
          />
        )}

        {currentView === 'completed' && (
          <CompletedTasksView
            onOpenProblem={(title) => {
              const matched = activeProblem.title === title;
              if (!matched) {
                setActiveProblem(prev => ({ ...prev, title }));
              }
              setCurrentView('solve');
            }}
          />
        )}

        {currentView === 'knowledge' && (
          <KnowledgeBaseView />
        )}

        {currentView === 'offline-ai' && (
          <OfflineAISetupView
            onOpenOfflineTest={() => setCurrentView('solve')}
          />
        )}

        {currentView === 'my-solutions' && (
          <MySolutionsView
            onLoadSolution={handleLoadSavedSolution}
          />
        )}

        {currentView === 'shared' && (
          <SharedSolutionsView
            onOpenInIDE={handleOpenSharedInIDE}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            systemStatus={systemStatus}
            formatPreference={formatPreference}
            onFormatPreferenceChange={setFormatPreference}
            onRefreshRuntime={() => {
              javaRunner.detectLocalJava().then(info => {
                setSystemStatus(prev => ({
                  ...prev,
                  javaRuntimeAvailable: info.available,
                  javaVersion: info.javacVersion,
                  javaStatusText: info.statusText
                }));
              });
            }}
          />
        )}
      </main>

      {/* Global Toast for Copy and Sync feedback */}
      <Toast />
    </div>
  );
}

export default App;
