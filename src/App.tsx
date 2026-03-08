import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { HuntList } from './components/HuntList';
import type { HuntMark } from './data/hunts';
import './App.css';

const STORAGE_KEY = 'ff14-hunt-tracker-v1';

function loadTracked(): HuntMark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTracked(marks: HuntMark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(marks));
}

export default function App() {
  const [tracked, setTracked] = useState<HuntMark[]>(loadTracked);

  useEffect(() => {
    saveTracked(tracked);
  }, [tracked]);

  const trackedIds = new Set(tracked.map((m) => m.id));

  const handleAdd = (mark: HuntMark) => {
    if (!trackedIds.has(mark.id)) {
      setTracked((prev) => [...prev, mark]);
    }
  };

  const handleRemove = (id: string) => {
    setTracked((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClear = () => {
    setTracked([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">
            <span className="title-icon">⚔</span>
            FF14 Hunt Tracker
          </h1>
          <p className="app-subtitle">
            Track hunt marks across all expansions
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="search-section">
          <SearchBar onAdd={handleAdd} tracked={trackedIds} />
        </section>

        <section className="list-section">
          <h2 className="section-title">
            Hunt List
            {tracked.length > 0 && (
              <span className="list-count">{tracked.length}</span>
            )}
          </h2>
          <HuntList
            marks={tracked}
            onRemove={handleRemove}
            onClear={handleClear}
          />
        </section>
      </main>
    </div>
  );
}
