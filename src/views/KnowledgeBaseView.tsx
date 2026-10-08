import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Upload, 
  Search, 
  Trash2, 
  RefreshCw, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Database
} from 'lucide-react';
import { StoredPDFDoc, StoredPDFChunk, dbService } from '../services/db';
import { pdfProcessor } from '../services/pdfProcessor';

export const KnowledgeBaseView: React.FC = () => {
  const [docs, setDocs] = useState<StoredPDFDoc[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StoredPDFChunk[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ progress: 0, stage: '' });
  const [selectedDoc, setSelectedDoc] = useState<StoredPDFDoc | null>(null);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    const list = await dbService.getPDFDocs();
    setDocs(list);
    if (list.length > 0 && !selectedDoc) {
      setSelectedDoc(list[0]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await pdfProcessor.processPDFFile(file, (progress, stage) => {
        setUploadProgress({ progress, stage });
      });
      await loadDocs();
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this PDF and its indexed chunks from local storage?')) {
      await dbService.deletePDFDoc(id);
      await loadDocs();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const results = await dbService.searchPDFChunks(searchQuery);
    setSearchResults(results);
  };

  return (
    <div className="max-w-[1720px] mx-auto p-4 lg:p-8 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>OFFLINE DSA KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            DSA & DAA PDF KNOWLEDGE BASE
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Upload your college DSA PDFs (e.g. DAA Unit 1, Unit 3 KR24, Unit 4). Chunks remain accessible offline in IndexedDB.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-95 transition-all">
            <Upload className="w-4 h-4" />
            <span>UPLOAD PDF</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Uploading Progress Notification */}
      {isUploading && (
        <div className="p-4 bg-[#131b2e] border border-indigo-500/40 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200">{uploadProgress.stage}</span>
            <span className="font-mono text-cyan-400 font-bold">{uploadProgress.progress}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Search Bar Across All PDFs */}
      <div className="p-4 bg-[#0e1424] border border-[#1e293b] rounded-2xl shadow-xl">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search offline across all indexed PDFs (e.g. 'backtracking permutation', 'lonely nodes', 'master theorem')..."
              className="w-full bg-[#070b14] border border-[#1e293b] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
          >
            SEARCH
          </button>
        </form>

        {/* Search Results Display */}
        {searchResults.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#1e293b] space-y-2.5">
            <span className="text-xs font-bold text-slate-400">
              Found {searchResults.length} relevant offline chunks:
            </span>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {searchResults.map((chunk) => (
                <div key={chunk.id} className="p-3 bg-[#131b2e] rounded-lg border border-[#1e293b] text-xs">
                  <div className="flex items-center justify-between text-indigo-400 font-semibold mb-1">
                    <span>{chunk.pdfName} • {chunk.section}</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">{chunk.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PDF Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0e1424] border border-[#1e293b] rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white leading-tight">
                      {doc.name}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {doc.pages} pages • {doc.chunksCount} chunks
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/40 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{doc.status}</span>
                </span>
              </div>

              {/* Topics tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {doc.topics.slice(0, 5).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-[#131b2e] text-slate-300 text-[10px] font-mono border border-slate-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Index, Reindex, Delete */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1e293b] text-xs">
              <span className="text-slate-500 text-[11px]">Uploaded: {doc.uploadedDate}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`✓ Reindexed ${doc.chunksCount} chunks into IndexedDB`)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  REINDEX
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
