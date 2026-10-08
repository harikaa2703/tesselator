import { SolutionItem, HistoryItem } from '../types/dsa';
import { PREINDEXED_PDFS } from '../data/defaultPDFs';

const DB_NAME = 'tesselator_offline_db';
const DB_VERSION = 1;

export interface StoredPDFChunk {
  id: string;
  pdfId: string;
  pdfName: string;
  pageNumber: number;
  section: string;
  text: string;
  keywords: string[];
}

export interface StoredPDFDoc {
  id: string;
  name: string;
  pages: number;
  chunksCount: number;
  topics: string[];
  status: 'Indexed' | 'Ready' | 'Processing';
  uploadedDate: string;
}

class TesselatorDB {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private initDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
        const db = (e.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains('solutions')) {
          const solStore = db.createObjectStore('solutions', { keyPath: 'id' });
          solStore.createIndex('title', 'title', { unique: false });
          solStore.createIndex('pattern', 'pattern', { unique: false });
          solStore.createIndex('date', 'date', { unique: false });
        }

        if (!db.objectStoreNames.contains('history')) {
          const histStore = db.createObjectStore('history', { keyPath: 'id' });
          histStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains('pdf_docs')) {
          db.createObjectStore('pdf_docs', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('pdf_chunks')) {
          const chunkStore = db.createObjectStore('pdf_chunks', { keyPath: 'id' });
          chunkStore.createIndex('pdfId', 'pdfId', { unique: false });
        }

        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = async () => {
        const db = request.result;
        // Seed default PDF documents if empty
        await this.seedDefaultsIfEmpty(db);
        resolve(db);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  private async seedDefaultsIfEmpty(db: IDBDatabase) {
    const tx = db.transaction(['pdf_docs', 'pdf_chunks'], 'readwrite');
    const docStore = tx.objectStore('pdf_docs');
    const countReq = docStore.count();

    countReq.onsuccess = () => {
      if (countReq.result === 0) {
        const chunkStore = tx.objectStore('pdf_chunks');
        for (const doc of PREINDEXED_PDFS) {
          docStore.put({
            id: doc.id,
            name: doc.name,
            pages: doc.pages,
            chunksCount: doc.chunksCount,
            topics: doc.topics,
            status: doc.status,
            uploadedDate: doc.uploadedDate
          });

          for (const chunk of doc.sampleChunks) {
            chunkStore.put({
              id: chunk.id,
              pdfId: doc.id,
              pdfName: doc.name,
              pageNumber: 1,
              section: chunk.section,
              text: chunk.text,
              keywords: chunk.keywords
            });
          }
        }
      }
    };
  }

  // --- Solutions ---
  async saveSolution(solution: SolutionItem): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('solutions', 'readwrite');
      tx.objectStore('solutions').put(solution);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getAllSolutions(): Promise<SolutionItem[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('solutions', 'readonly');
      const req = tx.objectStore('solutions').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async deleteSolution(id: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('solutions', 'readwrite');
      tx.objectStore('solutions').delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // --- History ---
  async addHistory(item: HistoryItem): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('history', 'readwrite');
      tx.objectStore('history').put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async getHistory(): Promise<HistoryItem[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('history', 'readonly');
      const req = tx.objectStore('history').getAll();
      req.onsuccess = () => {
        const list = req.result || [];
        list.sort((a, b) => b.timestamp - a.timestamp);
        resolve(list);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async clearHistory(): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('history', 'readwrite');
      tx.objectStore('history').clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // --- PDF Documents & Chunks ---
  async getPDFDocs(): Promise<StoredPDFDoc[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('pdf_docs', 'readonly');
      const req = tx.objectStore('pdf_docs').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async addPDFDoc(doc: StoredPDFDoc, chunks: StoredPDFChunk[]): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['pdf_docs', 'pdf_chunks'], 'readwrite');
      tx.objectStore('pdf_docs').put(doc);
      const chunkStore = tx.objectStore('pdf_chunks');
      for (const chunk of chunks) {
        chunkStore.put(chunk);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async deletePDFDoc(id: string): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(['pdf_docs', 'pdf_chunks'], 'readwrite');
      tx.objectStore('pdf_docs').delete(id);
      
      const chunkStore = tx.objectStore('pdf_chunks');
      const req = chunkStore.getAll();
      req.onsuccess = () => {
        const chunks = req.result || [];
        for (const c of chunks) {
          if (c.pdfId === id) {
            chunkStore.delete(c.id);
          }
        }
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async searchPDFChunks(query: string): Promise<StoredPDFChunk[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('pdf_chunks', 'readonly');
      const req = tx.objectStore('pdf_chunks').getAll();
      req.onsuccess = () => {
        const all = (req.result || []) as StoredPDFChunk[];
        if (!query.trim()) {
          resolve(all.slice(0, 10));
          return;
        }

        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        const scored = all.map(chunk => {
          let score = 0;
          const content = (chunk.text + ' ' + chunk.section + ' ' + chunk.keywords.join(' ')).toLowerCase();
          for (const t of terms) {
            if (content.includes(t)) score += 2;
            if (chunk.section.toLowerCase().includes(t)) score += 3;
            if (chunk.keywords.some(k => k.toLowerCase().includes(t))) score += 4;
          }
          return { chunk, score };
        });

        const filtered = scored
          .filter(s => s.score > 0)
          .sort((a, b) => b.score - a.score)
          .map(s => s.chunk);

        resolve(filtered);
      };
      req.onerror = () => reject(req.error);
    });
  }

  // --- Settings ---
  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    const db = await this.initDB();
    return new Promise((resolve) => {
      const tx = db.transaction('settings', 'readonly');
      const req = tx.objectStore('settings').get(key);
      req.onsuccess = () => {
        resolve(req.result ? req.result.value : defaultValue);
      };
      req.onerror = () => resolve(defaultValue);
    });
  }

  async setSetting(key: string, value: any): Promise<void> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('settings', 'readwrite');
      tx.objectStore('settings').put({ key, value });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}

export const dbService = new TesselatorDB();
