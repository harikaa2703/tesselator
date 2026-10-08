// Real-Time Peer-to-Peer Lab Sync Service
// Allows any student in the lab to share their verified answers and allows any other student
// using the website at the same time to copy it immediately into the college exam portal.

export interface SharedAnswer {
  id: string;
  title: string;
  pattern: string;
  author: string;
  timestamp: string;
  testsPassed: string;
  javaCode: string;
  question?: string;
}

type AnswerListener = (answers: SharedAnswer[], latest?: SharedAnswer) => void;

class LabSyncService {
  private answers: SharedAnswer[] = [];
  private listeners: Set<AnswerListener> = new Set();
  private eventSource: EventSource | null = null;
  private broadcastChannel: BroadcastChannel | null = null;
  private isConnected = false;

  constructor() {
    this.initBroadcastChannel();
    this.initSSE();
    this.fetchInitialSolutions();
  }

  private initBroadcastChannel() {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('tesselator_lab_sync');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'NEW_SOLUTION') {
            this.handleIncomingSolution(event.data.solution);
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not supported', e);
    }
  }

  private initSSE() {
    try {
      if (typeof window !== 'undefined' && 'EventSource' in window) {
        this.eventSource = new EventSource('/api/sync/stream');

        this.eventSource.onopen = () => {
          this.isConnected = true;
        };

        this.eventSource.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data.type === 'NEW_SOLUTION') {
              this.handleIncomingSolution(data.solution);
            }
          } catch (err) {
            console.error('SSE parse error', err);
          }
        };

        this.eventSource.onerror = () => {
          this.isConnected = false;
        };
      }
    } catch (e) {
      console.warn('SSE not supported', e);
    }
  }

  private async fetchInitialSolutions() {
    try {
      const res = await fetch('/api/sync/solutions');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          this.answers = data;
          this.notifyListeners();
        }
      }
    } catch {
      // Fallback local memory
    }
  }

  private handleIncomingSolution(solution: SharedAnswer) {
    // Avoid duplicate IDs
    if (!this.answers.some(a => a.id === solution.id)) {
      this.answers = [solution, ...this.answers.slice(0, 29)];
      this.notifyListeners(solution);
    }
  }

  private notifyListeners(latest?: SharedAnswer) {
    for (const listener of this.listeners) {
      listener([...this.answers], latest);
    }
  }

  // Subscribe to live answers from other students in the lab
  public subscribe(listener: AnswerListener): () => void {
    this.listeners.add(listener);
    listener([...this.answers]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Any student can post their answer for all other lab students to copy
  public async broadcastAnswer(payload: {
    title: string;
    javaCode: string;
    pattern?: string;
    author?: string;
    question?: string;
    testsPassed?: string;
  }): Promise<boolean> {
    const newAnswer: SharedAnswer = {
      id: 'sol-' + Date.now(),
      title: payload.title || 'Lab Exam Solution',
      pattern: payload.pattern || 'DSA Solution',
      author: payload.author || 'KUKKADAPU HARIKA (KMIT)',
      timestamp: 'Just now',
      testsPassed: payload.testsPassed || '5/5 Passed',
      javaCode: payload.javaCode,
      question: payload.question
    };

    // 1. Broadcast locally via BroadcastChannel
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'NEW_SOLUTION', solution: newAnswer });
    }

    // 2. Add to local list immediately
    this.handleIncomingSolution(newAnswer);

    // 3. Post to Vite server to reach all laptops on the lab network
    try {
      const res = await fetch('/api/sync/solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnswer)
      });
      return res.ok;
    } catch {
      return true; // Local channel succeeded
    }
  }

  public getAnswers(): SharedAnswer[] {
    return [...this.answers];
  }

  public isNetworkConnected(): boolean {
    return this.isConnected;
  }
}

export const labSyncService = new LabSyncService();
