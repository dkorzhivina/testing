import { useRef, useState, useLayoutEffect } from "react";
import { List } from "react-window";
import UserCard from "./UserCard";

const ROW_HEIGHT = 92;
const VIRTUAL_THRESHOLD = 8;
const LIST_HEIGHT_MAX = 500;

function RowComponent({ index, style, users }) {
  const user = users[index];
  if (!user) return null;
  return (
    <div style={style}>
      <div className="users-list__row">
        <UserCard user={user} />
      </div>
    </div>
  );
}

const hasResizeObserver = typeof ResizeObserver !== "undefined";

export default function VirtualUserList({ users, className = "" }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!hasResizeObserver || !containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth;
      const h = Math.min(users.length * ROW_HEIGHT, LIST_HEIGHT_MAX);
      setSize(s => (s.width !== w || s.height !== h ? { width: w, height: h } : s));
    });
    ro.observe(el);
    const w = el.offsetWidth;
    const h = Math.min(users.length * ROW_HEIGHT, LIST_HEIGHT_MAX);
    setSize({ width: w, height: h });
    return () => ro.disconnect();
  }, [users.length]);

  const useVirtual =
    hasResizeObserver &&
    users.length > VIRTUAL_THRESHOLD &&
    size.width > 0 &&
    size.height > 0;

  if (useVirtual) {
    return (
      <div ref={containerRef} className={className} style={{ width: "100%", minHeight: ROW_HEIGHT }}>
        <List
          rowComponent={RowComponent}
          rowProps={{ users }}
          rowCount={users.length}
          rowHeight={ROW_HEIGHT}
          style={{ height: size.height, width: size.width }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {users.map(user => (
        <div key={user.id} className="users-list__row">
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}
