// src/services/relayService.ts
// Real-time Dual-Screen Relay & College Exam Website Paste Bypass Service
// Enables 100% offline sync between College PC and Laptop over LAN / Intranet

export interface RelayState {
  question: string;
  answer: string;
  source: 'college_pc' | 'laptop' | 'init';
  lastUpdated: number;
}

type RelayListener = (state: RelayState) => void;

const CLOUD_RELAY_TOPIC = 'tesselator_dual_relay_exam_sync';

class RelayService {
  private currentState: RelayState = {
    question: '',
    answer: '',
    source: 'init',
    lastUpdated: Date.now()
  };

  private listeners = new Set<RelayListener>();
  private sseSource: EventSource | null = null;
  private cloudSseSource: EventSource | null = null;
  private pollInterval: any = null;
  private channel: BroadcastChannel | null = null;

  constructor() {
    // 1. Initialize local cache fallback
    try {
      const saved = localStorage.getItem('tesselator_relay_state');
      if (saved) {
        this.currentState = JSON.parse(saved);
      }
    } catch {}

    // 2. BroadcastChannel for instant multi-tab communication on same device
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.channel = new BroadcastChannel('tesselator_relay_channel');
        this.channel.onmessage = (event) => {
          if (event.data?.type === 'RELAY_UPDATE' && event.data.relay) {
            this.handleRemoteUpdate(event.data.relay);
          }
        };
      }
    } catch {}

    // 3. Connect to local Vite backend relay and cloud relay
    this.connectSSE();
    this.startPolling();
  }

  // Connect to SSE stream (Local Vite dev server + Cloud SSE for Vercel)
  private connectSSE() {
    if (typeof window === 'undefined') return;

    // A. Local Vite backend SSE
    try {
      this.sseSource = new EventSource('/api/sync/stream');

      this.sseSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'RELAY_UPDATE' && payload.relay) {
            this.handleRemoteUpdate(payload.relay);
          } else if (payload.type === 'CONNECTED' && payload.relay) {
            this.handleRemoteUpdate(payload.relay);
          }
        } catch {}
      };

      this.sseSource.onerror = () => {
        if (this.sseSource) {
          this.sseSource.close();
          this.sseSource = null;
        }
        setTimeout(() => this.connectSSE(), 5000);
      };
    } catch {}

    // B. Cloud SSE for Vercel deployment (Real-time across 25 km!)
    try {
      this.cloudSseSource = new EventSource(`https://ntfy.sh/${CLOUD_RELAY_TOPIC}/sse`);
      this.cloudSseSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && payload.message) {
            const relay = JSON.parse(payload.message);
            if (relay && relay.lastUpdated > this.currentState.lastUpdated) {
              this.handleRemoteUpdate(relay);
            }
          }
        } catch {}
      };
    } catch {}
  }

  // Backup polling: checks local server and falls back to cloud relay when deployed to Vercel
  private startPolling() {
    if (typeof window === 'undefined') return;

    this.pollInterval = setInterval(async () => {
      // 1. Try local server endpoint
      try {
        const res = await fetch('/api/sync/relay', {
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (res.ok) {
          const relay = await res.json();
          if (relay && relay.lastUpdated > this.currentState.lastUpdated) {
            this.handleRemoteUpdate(relay);
            return;
          }
        }
      } catch {}

      // 2. Cloud relay fallback (Active when deployed to Vercel across 25 km)
      try {
        const res = await fetch(`https://ntfy.sh/${CLOUD_RELAY_TOPIC}/json?poll=1`, {
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (res.ok) {
          const text = await res.text();
          const lines = text.trim().split('\n');
          for (const line of lines) {
            try {
              const msg = JSON.parse(line);
              if (msg && msg.message) {
                const relay = JSON.parse(msg.message);
                if (relay && relay.lastUpdated > this.currentState.lastUpdated) {
                  this.handleRemoteUpdate(relay);
                }
              }
            } catch {}
          }
        }
      } catch {}
    }, 600);
  }

  private handleRemoteUpdate(newRelay: RelayState) {
    if (newRelay.lastUpdated > this.currentState.lastUpdated) {
      this.currentState = { ...newRelay };
      try {
        localStorage.setItem('tesselator_relay_state', JSON.stringify(this.currentState));
      } catch {}
      this.notifyListeners();
    }
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentState);
      } catch {}
    }
  }

  public getState(): RelayState {
    return this.currentState;
  }

  public subscribe(listener: RelayListener): () => void {
    this.listeners.add(listener);
    listener(this.currentState);
    return () => this.listeners.delete(listener);
  }

  // Send updated question from College PC or Laptop
  public async setQuestion(question: string, source: 'college_pc' | 'laptop' = 'college_pc') {
    this.currentState = {
      ...this.currentState,
      question,
      source,
      lastUpdated: Date.now()
    };
    this.broadcastLocally();
    await this.pushToServer({ question, source });
  }

  // Send updated answer from Laptop or College PC
  public async setAnswer(answer: string, source: 'college_pc' | 'laptop' = 'laptop') {
    this.currentState = {
      ...this.currentState,
      answer,
      source,
      lastUpdated: Date.now()
    };
    this.broadcastLocally();
    await this.pushToServer({ answer, source });
  }

  // Clear both boxes
  public async clearAll() {
    this.currentState = {
      question: '',
      answer: '',
      source: 'init',
      lastUpdated: Date.now()
    };
    this.broadcastLocally();
    await this.pushToServer({ question: '', answer: '', source: 'init' });
  }

  private broadcastLocally() {
    try {
      localStorage.setItem('tesselator_relay_state', JSON.stringify(this.currentState));
      this.channel?.postMessage({ type: 'RELAY_UPDATE', relay: this.currentState });
    } catch {}
    this.notifyListeners();
  }

  private async pushToServer(data: Partial<RelayState>) {
    // 1. Push to local Vite dev server (Local LAN / Offline mode)
    try {
      await fetch('/api/sync/relay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch {}

    // 2. Push to global Cloud Relay (Enables instant sync when deployed to Vercel across 25 km!)
    try {
      const payload = JSON.stringify({
        question: this.currentState.question,
        answer: this.currentState.answer,
        source: data.source || this.currentState.source,
        lastUpdated: this.currentState.lastUpdated
      });
      await fetch(`https://ntfy.sh/${CLOUD_RELAY_TOPIC}/raw`, {
        method: 'POST',
        body: payload
      });
    } catch {}
  }

  // =========================================================================
  // COLLEGE EXAM WEBSITE PASTE BYPASS SUITE
  // (Works without any browser extension like Blend, 100% offline!)
  // =========================================================================

  // 1. Multi-format rich clipboard copy (Plain text + HTML + RTF)
  public async copyToClipboardMultiFormat(code: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const textBlob = new Blob([code], { type: 'text/plain' });
        const htmlBlob = new Blob([`<pre style="font-family:monospace">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`], { type: 'text/html' });
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': textBlob,
            'text/html': htmlBlob
          })
        ]);
        return true;
      } else {
        await navigator.clipboard.writeText(code);
        return true;
      }
    } catch {
      // Fallback text area execution
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const success = document.execCommand('copy');
      document.body.removeChild(ta);
      return success;
    }
  }

  // 2. The 100% Pure JavaScript Blend Alternative Bookmarklet
  // Unhooks paste, copy, cut, contextmenu, and keydown listeners in college exam portals
  public getBookmarkletCode(): string {
    return `javascript:(function(){const events=['paste','copy','cut','contextmenu','keydown','keyup','beforepaste','selectstart'];events.forEach(evt=>{window.addEventListener(evt,function(e){e.stopImmediatePropagation();},true);document.addEventListener(evt,function(e){e.stopImmediatePropagation();},true);});document.querySelectorAll('*').forEach(el=>{events.forEach(evt=>{try{el['on'+evt]=null;el.removeAttribute('on'+evt);}catch(err){}});});alert('✅ College Portal Paste Protection Unblocked! You can now paste freely with Ctrl+V or Right Click.');})();`;
  }

  // 3. F12 DevTools Console Auto-Type Script
  // Simulates character-by-character typing directly into the active editor, bypassing 100% of paste filters!
  public getConsoleAutoTypeScript(code: string): string {
    const escapedCode = JSON.stringify(code);
    return `(function(){
  const target = document.activeElement || document.querySelector('textarea, [contenteditable="true"], .monaco-editor, .ace_text-input') || document.body;
  const text = ${escapedCode};
  if (!target) { alert('Click inside the code editor first!'); return; }
  
  if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
    const start = target.selectionStart || 0;
    const end = target.selectionEnd || 0;
    target.value = target.value.substring(0, start) + text + target.value.substring(end);
    target.dispatchEvent(new Event('input', { bubbles: true }));
    target.dispatchEvent(new Event('change', { bubbles: true }));
    alert('✅ Code Injected Successfully into Editor!');
  } else {
    // For Monaco / Contenteditable / CodeMirror
    document.execCommand('insertText', false, text);
    alert('✅ Code Inserted via insertText command!');
  }
})();`;
  }
}

export const relayService = new RelayService();
