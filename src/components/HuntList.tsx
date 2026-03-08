import type { HuntMark, Expansion } from '../data/hunts';

type GroupBy = 'zone' | 'expansion' | 'rank';

interface Props {
  marks: HuntMark[];
  completedIds: Set<string>;
  groupBy: string;
  onGroupByChange: (g: string) => void;
  onRemove: (id: string) => void;
  onComplete: (id: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
}

const EXP_ORDER: Expansion[] = ['ARR', 'HW', 'SB', 'ShB', 'EW', 'DT'];
const EXP_FULL: Record<Expansion, string> = {
  ARR: 'A Realm Reborn', HW: 'Heavensward', SB: 'Stormblood',
  ShB: 'Shadowbringers', EW: 'Endwalker', DT: 'Dawntrail',
};
const RANK_ORDER = ['S', 'SS', 'A', 'B', 'Lv3', 'Lv2', 'Lv1'];
const RANK_LABEL: Record<string, string> = {
  S: 'S', A: 'A', B: 'B', SS: 'SS',
  Lv1: 'Lv1/Jr', Lv2: 'Lv2/Mid', Lv3: 'Lv3/Sr',
};

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
      if (items.length) map.set(`${RANK_LABEL[rank]} Rank`, items);
    }
  } else {
    const sorted = [...marks].sort((a, b) => {
      const ei = EXP_ORDER.indexOf(a.expansion) - EXP_ORDER.indexOf(b.expansion);
      return ei !== 0 ? ei : a.zone.localeCompare(b.zone);
    });
    for (const mark of sorted) {
      const key = `${mark.zone} · ${mark.expansion}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(mark);
    }
  }
  return Array.from(map.entries());
}

export function HuntList({ marks, completedIds, groupBy, onGroupByChange, onRemove, onComplete, onClearCompleted, onClearAll }: Props) {
  const setGroupBy = (g: GroupBy) => onGroupByChange(g);

  const doneCount    = marks.filter((m) => completedIds.has(m.id)).length;
  const sCount       = marks.filter((m) => m.rank === 'S' || m.rank === 'SS').length;
  const aCount       = marks.filter((m) => m.rank === 'A').length;
  const bCount       = marks.filter((m) => m.rank === 'B').length;
  const regularCount = marks.filter((m) => m.type === 'regular').length;

  if (marks.length === 0) {
    return (
      <div className="hunt-list-empty">
        <p>No hunts tracked yet.</p>
        <p>Search for a mark above to add it to your list.</p>
      </div>
    );
  }

  const safeGroupBy: GroupBy = (['zone', 'expansion', 'rank'] as GroupBy[]).includes(groupBy as GroupBy) ? (groupBy as GroupBy) : 'zone';
  const groups = groupMarks(marks, safeGroupBy);

  return (
    <div className="hunt-list">
      {/* Stats bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-value">{marks.length}</span>
          <span className="stat-label">TOTAL</span>
        </div>
        <div className="stat-card stat-done">
          <span className="stat-value">{doneCount}</span>
          <span className="stat-label">DONE</span>
        </div>
        <div className="stat-card stat-s">
          <span className="stat-value">{sCount}</span>
          <span className="stat-label">S RANK</span>
        </div>
        <div className="stat-card stat-a">
          <span className="stat-value">{aCount}</span>
          <span className="stat-label">A RANK</span>
        </div>
        <div className="stat-card stat-b">
          <span className="stat-value">{bCount}</span>
          <span className="stat-label">B RANK</span>
        </div>
        <div className="stat-card stat-regular">
          <span className="stat-value">{regularCount}</span>
          <span className="stat-label">REGULAR</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="hunt-list-toolbar">
        <div className="group-toggle">
          {(['zone', 'expansion', 'rank'] as GroupBy[]).map((g) => (
            <button
              key={g}
              className={`group-btn ${groupBy === g ? 'group-btn--active' : ''}`}
              onClick={() => setGroupBy(g)}
            >
              Group by {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
        <div className="toolbar-actions">
          {doneCount > 0 && (
            <button className="clear-done-btn" onClick={onClearCompleted}>
              Clear Completed ({doneCount})
            </button>
          )}
          <button className="clear-btn" onClick={onClearAll}>
            Clear All
          </button>
        </div>
      </div>

      {/* Groups */}
      {groups.map(([groupName, groupMarks]) => (
        <div key={groupName} className="hunt-group">
          <h3 className="hunt-group-header">{groupName}</h3>
          <ul className="hunt-group-list">
            {groupMarks.map((mark) => {
              const done = completedIds.has(mark.id);
              return (
                <li key={mark.id} className={`hunt-item ${done ? 'hunt-item--done' : ''}`}>
                  <span className={`rank-badge rank-${mark.rank}`}>{RANK_LABEL[mark.rank]}</span>
                  <div className="hunt-item-body">
                    <span className="hunt-item-name">{mark.name}</span>
                    <span className="hunt-item-meta">
                      {mark.zone}
                      {' · '}
                      <span className={`exp-badge exp-${mark.expansion}`}>{EXP_FULL[mark.expansion]}</span>
                      {mark.billCount != null && (
                        <span className="bill-count">· Daily Bill ×{mark.billCount}</span>
                      )}
                    </span>
                  </div>
                  <div className="hunt-item-actions">
                    <button
                      className={`complete-btn ${done ? 'complete-btn--done' : ''}`}
                      onClick={() => onComplete(mark.id)}
                      aria-label={done ? `Undo ${mark.name}` : `Complete ${mark.name}`}
                      title={done ? 'Mark incomplete' : 'Mark complete'}
                    >✓</button>
                    <button
                      className="remove-btn"
                      onClick={() => onRemove(mark.id)}
                      aria-label={`Remove ${mark.name}`}
                    >×</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
