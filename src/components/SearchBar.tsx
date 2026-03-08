import { useState, useRef, useEffect, useCallback } from 'react';
import { HUNT_MARKS, type HuntMark, type Rank, type MarkType, type Expansion } from '../data/hunts';

interface Props {
  onAdd: (mark: HuntMark) => void;
  trackedIds: Set<string>;
}

const ELITE_RANKS: Rank[]   = ['S', 'A', 'B'];
const REGULAR_RANKS: Rank[] = ['Lv1', 'Lv2', 'Lv3'];
const EXPANSIONS: Expansion[] = ['ARR', 'HW', 'SB', 'ShB', 'EW', 'DT'];

const RANK_LABEL: Record<string, string> = {
  S: 'S', A: 'A', B: 'B', SS: 'SS',
  Lv1: 'Lv1/Jr', Lv2: 'Lv2/Mid', Lv3: 'Lv3/Sr',
};

function applyFilters(
  query: string,
  typeFilter: MarkType | null,
  rankFilters: Set<Rank>,
  expFilters: Set<Expansion>,
): HuntMark[] {
  const q = query.toLowerCase().trim();
  return HUNT_MARKS.filter((m) => {
    if (typeFilter && m.type !== typeFilter) return false;
    if (rankFilters.size > 0 && !rankFilters.has(m.rank)) return false;
    if (expFilters.size > 0 && !expFilters.has(m.expansion)) return false;
    if (!q) return rankFilters.size > 0 || expFilters.size > 0 || typeFilter !== null;
    return (
      m.name.toLowerCase().includes(q) ||
      m.zone.toLowerCase().includes(q) ||
      m.region.toLowerCase().includes(q)
    );
  // When filters are active the result set is already narrow — show all of them.
  // For unfiltered text search, cap at 14 to keep the dropdown manageable.
  }).slice(0, rankFilters.size > 0 || expFilters.size > 0 || typeFilter !== null ? 200 : 14);
}

export function SearchBar({ onAdd, trackedIds }: Props) {
  const [query, setQuery]             = useState('');
  const [results, setResults]         = useState<HuntMark[]>([]);
  const [activeIdx, setActiveIdx]     = useState(-1);
  const [open, setOpen]               = useState(false);
  const [typeFilter, setTypeFilter]   = useState<MarkType | null>(null);
  const [rankFilters, setRankFilters] = useState<Set<Rank>>(new Set());
  const [expFilters, setExpFilters]   = useState<Set<Expansion>>(new Set());

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);

  const runSearch = useCallback((q: string, tf: MarkType | null, rf: Set<Rank>, ef: Set<Expansion>) => {
    const res = applyFilters(q, tf, rf, ef);
    setResults(res);
    setOpen(res.length > 0);
    setActiveIdx(-1);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    runSearch(val, typeFilter, rankFilters, expFilters);
  };

  const toggleType = (t: MarkType) => {
    const next = typeFilter === t ? null : t;
    setTypeFilter(next);
    runSearch(query, next, rankFilters, expFilters);
  };

  const toggleRank = (r: Rank) => {
    const next = new Set(rankFilters);
    next.has(r) ? next.delete(r) : next.add(r);
    setRankFilters(next);
    runSearch(query, typeFilter, next, expFilters);
  };

  const toggleExp = (e: Expansion) => {
    const next = new Set(expFilters);
    next.has(e) ? next.delete(e) : next.add(e);
    setExpFilters(next);
    runSearch(query, typeFilter, rankFilters, next);
  };

  const addMark = useCallback((mark: HuntMark) => {
    onAdd(mark);
    setQuery('');
    setResults([]);
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  }, [onAdd]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const idx = activeIdx >= 0 ? activeIdx : 0;
      if (results[idx]) addMark(results[idx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!inputRef.current?.closest('.search-wrapper')?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (activeIdx >= 0 && listRef.current) {
      (listRef.current.children[activeIdx] as HTMLElement)?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIdx]);

  const visibleRanks = typeFilter === 'elite'
    ? ELITE_RANKS
    : typeFilter === 'regular'
      ? REGULAR_RANKS
      : [...ELITE_RANKS, ...REGULAR_RANKS];

  return (
    <div className="search-wrapper">
      <div className="search-input-row">
        <span className="search-icon">⚲</span>
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          placeholder="Search by monster name, zone, expansion, or rank…"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-label">Type:</span>
          <button className={`chip chip-elite ${typeFilter === 'elite' ? 'chip--active' : ''}`} onClick={() => toggleType('elite')}>Elite (A/B/S)</button>
          <button className={`chip chip-regular ${typeFilter === 'regular' ? 'chip--active' : ''}`} onClick={() => toggleType('regular')}>Regular (Daily Bills)</button>
        </div>
        <div className="filter-group">
          <span className="filter-label">Rank:</span>
          {visibleRanks.map((r) => (
            <button key={r} className={`chip chip-rank rank-chip-${r} ${rankFilters.has(r) ? 'chip--active' : ''}`} onClick={() => toggleRank(r)}>
              {RANK_LABEL[r]}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-label">Expansion:</span>
          {EXPANSIONS.map((e) => (
            <button key={e} className={`chip chip-exp exp-chip-${e} ${expFilters.has(e) ? 'chip--active' : ''}`} onClick={() => toggleExp(e)}>
              {e}
            </button>
          ))}
        </div>
      </div>

      {open && (
        <ul className="search-dropdown" ref={listRef} role="listbox">
          {results.length === 0 ? (
            <li className="search-no-results">No marks found</li>
          ) : results.map((mark, i) => {
            const isTracked = trackedIds.has(mark.id);
            return (
              <li
                key={mark.id}
                role="option"
                aria-selected={i === activeIdx}
                className={['search-item', i === activeIdx ? 'search-item--active' : '', isTracked ? 'search-item--tracked' : ''].join(' ')}
                onMouseDown={() => addMark(mark)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className={`rank-badge rank-${mark.rank}`}>{RANK_LABEL[mark.rank]}</span>
                <span className="search-item-name">{mark.name}</span>
                <span className="search-item-zone">{mark.zone}</span>
                <span className={`exp-badge exp-${mark.expansion}`}>{mark.expansion}</span>
                {isTracked && <span className="tracked-check">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
