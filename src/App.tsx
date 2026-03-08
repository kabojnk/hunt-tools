import { useState, useEffect, useRef } from 'react';
import { SearchBar } from './components/SearchBar';
import { HuntList } from './components/HuntList';
import type { HuntMark } from './data/hunts';
import { decodeShareHash, copyShareUrl } from './utils/share';
import './App.css';

const STORAGE_KEY = 'ff14-hunt-tracker-v2';

interface StoredState {
  tracked: HuntMark[];
  completed: string[];
}

function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { tracked: [], completed: [] };
  } catch {
    return { tracked: [], completed: [] };
  }
}

export default function App() {
  const [tracked, setTracked]         = useState<HuntMark[]>(() => loadState().tracked);
  const [completed, setCompleted]     = useState<Set<string>>(() => new Set(loadState().completed));
  const [groupBy, setGroupBy]         = useState('zone');
  const [toast, setToast]             = useState<string | null>(null);
  const [sharedBanner, setSharedBanner] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from URL hash on mount
  useEffect(() => {
    const result = decodeShareHash(window.location.hash);
    if (result && result.marks.length > 0) {
      setTracked(result.marks);
      setCompleted(new Set());
      setGroupBy(result.groupBy);
      setSharedBanner(true);
      // Clean the hash from the URL without a page reload
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tracked,
      completed: Array.from(completed),
    }));
  }, [tracked, completed]);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  const trackedIds = new Set(tracked.map((m) => m.id));

  const handleAdd = (mark: HuntMark) => {
    if (!trackedIds.has(mark.id)) {
      setTracked((prev) => [...prev, mark]);
      setSharedBanner(false);
    }
  };

  const handleRemove = (id: string) => {
    setTracked((prev) => prev.filter((m) => m.id !== id));
    setCompleted((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const handleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleClearCompleted = () => {
    const done = Array.from(completed);
    setTracked((prev) => prev.filter((m) => !done.includes(m.id)));
    setCompleted(new Set());
  };

  const handleClearAll = () => {
    setTracked([]);
    setCompleted(new Set());
  };

  const handleShare = () => {
    if (tracked.length === 0) {
      showToast('Add some hunts first!');
      return;
    }
    copyShareUrl(tracked, groupBy);
    showToast('Share link copied to clipboard!');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">
            <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
              <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" stroke="#d4a843" strokeWidth="2" fill="rgba(212,168,67,0.1)"/>
              <polygon points="20,8 32,15 32,25 20,32 8,25 8,15" stroke="#d4a843" strokeWidth="1.5" fill="rgba(212,168,67,0.08)"/>
              <circle cx="20" cy="20" r="4" fill="#d4a843"/>
            </svg>
          </div>
          <div>
            <h1 className="app-title">FF14 Hunt Tracker</h1>
            <p className="app-subtitle">Elite &amp; Regular Marks · All Expansions · A/B/S + Daily Bill Marks</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {sharedBanner && (
          <div className="shared-banner">
            <span>📋 Loaded a shared hunt list ({tracked.length} marks)</span>
            <button className="shared-banner-dismiss" onClick={() => setSharedBanner(false)}>×</button>
          </div>
        )}

        <SearchBar onAdd={handleAdd} trackedIds={trackedIds} />

        <section className="list-section">
          <div className="list-section-header">
            <h2 className="section-title">
              Hunt List
              {tracked.length > 0 && <span className="list-count">{tracked.length}</span>}
            </h2>
            {tracked.length > 0 && (
              <button className="share-btn" onClick={handleShare} title="Copy share link">
                <ShareIcon /> Share List
              </button>
            )}
          </div>
          <HuntList
            marks={tracked}
            completedIds={completed}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            onRemove={handleRemove}
            onComplete={handleComplete}
            onClearCompleted={handleClearCompleted}
            onClearAll={handleClearAll}
          />
        </section>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
