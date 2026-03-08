import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { HuntList } from './components/HuntList';
import type { HuntMark } from './data/hunts';
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
  const [tracked, setTracked]     = useState<HuntMark[]>(() => loadState().tracked);
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(loadState().completed));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      tracked,
      completed: Array.from(completed),
    }));
  }, [tracked, completed]);

  const trackedIds = new Set(tracked.map((m) => m.id));

  const handleAdd = (mark: HuntMark) => {
    if (!trackedIds.has(mark.id)) {
      setTracked((prev) => [...prev, mark]);
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
    const completedArr = Array.from(completed);
    setTracked((prev) => prev.filter((m) => !completedArr.includes(m.id)));
    setCompleted(new Set());
  };

  const handleClearAll = () => {
    setTracked([]);
    setCompleted(new Set());
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
        <SearchBar onAdd={handleAdd} trackedIds={trackedIds} />

        <section className="list-section">
          <h2 className="section-title">
            Hunt List
            {tracked.length > 0 && <span className="list-count">{tracked.length}</span>}
          </h2>
          <HuntList
            marks={tracked}
            completedIds={completed}
            onRemove={handleRemove}
            onComplete={handleComplete}
            onClearCompleted={handleClearCompleted}
            onClearAll={handleClearAll}
          />
        </section>
      </main>
    </div>
  );
}
