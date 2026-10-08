export type Language = 'java';

export type ProblemFormat = 'auto' | 'leetcode' | 'college' | 'cp';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  id: number;
  name?: string;
  input: string;
  expected: string;
  category: 'normal' | 'boundary' | 'edge' | 'duplicate' | 'empty' | 'large' | 'negative' | 'sorted';
  description?: string;
}

export interface TestExecutionResult {
  id: number;
  name: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  timeMs: number;
  category: string;
  reason?: string;
}

export interface VerificationResult {
  compiled: boolean;
  compilerOutput: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  allPassed: boolean;
  results: TestExecutionResult[];
  failedTestDetail?: {
    testNumber: number;
    input: string;
    expected: string;
    actual: string;
    reason: string;
  };
  executionTimeTotalMs: number;
  memoryEstimateKb: number;
  attemptsCount: number;
  verifiedBadgeText: string;
  timestamp: number;
  runnerType: 'local-javac' | 'browser-sandbox';
}

export interface ConstraintAnalysisResult {
  rawConstraints: string[];
  primaryVariable: string;
  maxValueStr: string;
  maxValueNumeric: number;
  chosenComplexity: string;
  spaceComplexity: string;
  recommendation: string;
  viableApproaches: string[];
  unviableApproaches: string[];
}

export interface DSAPatternInfo {
  name: string;
  category: string;
  description: string;
  recognitionSignals: string[];
  timeComplexity: string;
  spaceComplexity: string;
  edgeCases: string[];
  javaTemplate: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  slug: string;
  pattern: string;
  difficulty: Difficulty;
  question: string;
  javaCode: string;
  format: ProblemFormat;
  timeComplexity: string;
  spaceComplexity: string;
  constraintAnalysis: ConstraintAnalysisResult;
  edgeCasesVerified: string[];
  testResults: VerificationResult;
  tests: TestCase[];
  date: string;
  tags: string[];
  isFavorite?: boolean;
  notes?: string;
  createdBy?: string;
  copiedCount?: number;
}

export interface HistoryItem {
  id: string;
  problemTitle: string;
  pattern: string;
  difficulty: Difficulty;
  passedTests: number;
  totalTests: number;
  date: string;
  timestamp: number;
  solutionId: string;
  language: string;
}

export interface SystemStatus {
  online: boolean;
  syncing: boolean;
  javaRuntimeAvailable: boolean;
  javaVersion: string;
  javaStatusText: string;
  offlineAIReady: boolean;
  dsaKnowledgeReady: boolean;
  localTestingReady: boolean;
  pwaReady: boolean;
  totalIndexedChunks: number;
  totalSavedSolutions: number;
}

export interface SelfCorrectionAttempt {
  attemptNumber: number;
  code: string;
  passedTests: number;
  totalTests: number;
  diagnosis?: string;
  failedReason?: string;
  fixApplied?: string;
  success: boolean;
}
