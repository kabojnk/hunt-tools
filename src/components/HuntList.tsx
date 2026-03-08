import { useState } from 'react';
import type { HuntMark, Expansion } from '../data/hunts';

type GroupBy = 'zone' | 'expansion' | 'rank';

interface Props {
  marks: HuntMark[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

const EXP_ORDER: Expansion[] = ['ARR', 'HW', 'SB', 'ShB', 'EW', 'DT'];
const EXP_FULL: Record<Expansion, string> = {
  ARR: 'A Realm Reborn',
  HW: 'Heavensward',
  SB: 'Stormblood',
  ShB: 'Shadowbringers',
  EW: 'Endwalker',
  DT: 'Dawntrail',
};
const RANK_ORDER = ['B', 'A', 'S', 'SS'];

function groupMarks(marks: HuntMark[], by: GroupBy): [string, HuntMark[]][] {
  const map = new Map<string, HuntMark[]>();

  if (by === 'expansion') {
    for (const exp of EXP_ORDER) {
      const items = marks.filter((m) => m.expansion === exp);
      if (items.length) map.set(EXP_FULL[exp], items);
    }
  } else if (by === 'rank') {
    for (const rank of RANK_ORDER) {
      const items = marks.filter((m) => m.rank === rank);
      if (items.length) map.set(`${rank}-Rank`, items);
    }
  } else {
    // Group by zone, sorted by expansion order then zone name
    const sorted = [...marks].sort((a, b) => {
      const ei = EXP_ORDER.indexOf(a.expansion) - EXP_ORDER.indexOf(b.expansion);
      if (ei !== 0) return ei;
      return a.zone.localeCompare(b.zone);
    });
    for (const mark of sorted) {
      const key = `${mark.zone} (${mark.expansion})`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(mark);
    }
  }

  return Array.from(map.entries());
}

export function HuntList({ marks, onRemove, onClear }: Props) {
  const [groupBy, setGroupBy] = useState<GroupBy>('zone');

  if (marks.length === 0) {
    return (
      <div className="hunt-list-empty">
        <p>No hunts tracked yet.</p>
        <p>Search for a mark above to add it to your list.</p>
      </div>
    );
  }

  const groups = groupMarks(marks, groupBy);

  return (
    <div className="hunt-list">
      <div className="hunt-list-toolbar">
        <div className="group-toggle">
          <span>Group by:</span>
          {(['zone', 'expansion', 'rank'] as GroupBy[]).map((g) => (
            <button
              key={g}
              className={`group-btn ${groupBy === g ? 'group-btn--active' : ''}`}
              onClick={() => setGroupBy(g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
        <button className="clear-btn" onClick={onClear}>
          Clear all ({marks.length})
        </button>
      </div>

      {groups.map(([groupName, groupMarks]) => (
        <div key={groupName} className="hunt-group">
          <h3 className="hunt-group-header">{groupName}</h3>
          <ul className="hunt-group-list">
            {groupMarks.map((mark) => (
              <li key={mark.id} className="hunt-item">
                <span className={`rank-badge rank-${mark.rank}`}>{mark.rank}</span>
                <span className="hunt-item-name">{mark.name}</span>
                <span className="hunt-item-meta">
                  {mark.zone}
                  <span className={`exp-badge exp-${mark.expansion}`}>{mark.expansion}</span>
                </span>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(mark.id)}
                  aria-label={`Remove ${mark.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
