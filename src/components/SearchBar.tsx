import { useState, useRef, useEffect, useCallback } from 'react';
import { HUNT_MARKS, type HuntMark } from '../data/hunts';

interface Props {
  onAdd: (mark: HuntMark) => void;
  tracked: Set<string>;
}

const RANK_LABEL: Record<string, string> = { B: 'B', A: 'A', S: 'S', SS: 'SS' };
const EXP_LABEL: Record<string, string> = {
  ARR: 'ARR', HW: 'HW', SB: 'SB', ShB: 'ShB', EW: 'EW', DT: 'DT',
};

function search(query: string): HuntMark[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return HUNT_MARKS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.zone.toLowerCase().includes(q) ||
      m.region.toLowerCase().includes(q) ||
      m.expansion.toLowerCase().includes(q) ||
      m.rank.toLowerCase().includes(q)
  ).slice(0, 12);
}

export function SearchBar({ onAdd, tracked }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HuntMark[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    const res = search(val);
    setResults(res);
    setOpen(res.length > 0);
    setActiveIdx(-1);
  }, []);

  const addMark = useCallback((mark: HuntMark) => {
    onAdd(mark);
    setQuery('');
    setResults([]);
    setOpen(false);
    setActiveIdx(-1);
    inputRef.current?.focus();
  }, [onAdd]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) return;
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
      setActiveIdx(-1);
    }
  }, [open, results, activeIdx, addMark]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !inputRef.current?.parentElement?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (activeIdx >= 0 && listRef.current) {
      const item = listRef.current.children[activeIdx] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIdx]);

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => results.length > 0 && setOpen(true)}
        placeholder="Search hunts by name, zone, region, rank…"
        autoComplete="off"
        spellCheck={false}
      />
      {open && (
        <ul className="search-dropdown" ref={listRef} role="listbox">
          {results.map((mark, i) => {
            const isTracked = tracked.has(mark.id);
            return (
              <li
                key={mark.id}
                role="option"
                aria-selected={i === activeIdx}
                className={[
                  'search-item',
                  i === activeIdx ? 'search-item--active' : '',
                  isTracked ? 'search-item--tracked' : '',
                ].join(' ')}
                onMouseDown={() => addMark(mark)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className={`rank-badge rank-${mark.rank}`}>
                  {RANK_LABEL[mark.rank]}
                </span>
                <span className="search-item-name">{mark.name}</span>
                <span className="search-item-zone">{mark.zone}</span>
                <span className={`exp-badge exp-${mark.expansion}`}>
                  {EXP_LABEL[mark.expansion]}
                </span>
                {isTracked && <span className="check-mark">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
