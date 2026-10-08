export interface CopyFeedback {
  success: boolean;
  message: string;
  type: 'code' | 'full' | 'io';
}

export class ClipboardService {
  /**
   * Copies ONLY the final verified Java code to clipboard
   */
  async copyForCollege(code: string): Promise<boolean> {
    if (!code) return false;
    try {
      await navigator.clipboard.writeText(code);
      this.notifyCopy({
        success: true,
        message: '⚡ Java code copied! Ready to Ctrl+V into College Portal',
        type: 'code'
      });
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback
      return this.fallbackCopy(code);
    }
  }

  /**
   * Copies full solution with pattern, complexity, and Java code
   */
  async copyFullSolution(
    title: string,
    pattern: string,
    timeComp: string,
    spaceComp: string,
    code: string
  ): Promise<boolean> {
    const text = `// TESSELATOR VERIFIED DSA SOLUTION
// Problem: ${title}
// Pattern: ${pattern}
// Time Complexity: ${timeComp}
// Space Complexity: ${spaceComp}

${code}`;

    try {
      await navigator.clipboard.writeText(text);
      this.notifyCopy({
        success: true,
        message: '✓ Full solution with metadata copied!',
        type: 'full'
      });
      return true;
    } catch {
      return this.fallbackCopy(text);
    }
  }

  /**
   * Copies sample input & output test cases
   */
  async copyInputOutput(sampleInput: string, sampleOutput: string): Promise<boolean> {
    const text = `Input:
${sampleInput}

Output:
${sampleOutput}`;

    try {
      await navigator.clipboard.writeText(text);
      this.notifyCopy({
        success: true,
        message: '✓ Test cases copied!',
        type: 'io'
      });
      return true;
    } catch {
      return this.fallbackCopy(text);
    }
  }

  private fallbackCopy(text: string): boolean {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.notifyCopy({
        success: true,
        message: '⚡ Java code copied! (Clipboard fallback)',
        type: 'code'
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  private notifyCopy(feedback: CopyFeedback) {
    window.dispatchEvent(new CustomEvent('tesselator:copy', { detail: feedback }));
  }
}

export const clipboardService = new ClipboardService();
