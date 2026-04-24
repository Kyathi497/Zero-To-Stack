"use client";

import type { Assignment } from "@/lib/dashboard-data";

interface AssignmentListProps {
  items: Assignment[];
}

function statusChip(a: Assignment) {
  if (a.status === "graded")    return <span className="db-chip ok">Graded {a.grade}</span>;
  if (a.status === "submitted") return <span className="db-chip submitted">In review</span>;
  if (a.status === "late")      return <span className="db-chip late">Late</span>;
  const text = a.dueDate.includes("tomorrow") ? "Due 23h" : a.dueDate.includes("Apr 26") ? "Due 3d" : "Planned";
  const cls  = text === "Planned" ? "" : "due";
  return <span className={`db-chip ${cls}`}>{text}</span>;
}

export default function AssignmentList({ items }: AssignmentListProps) {
  return (
    <div className="db-card">
      <div className="db-card-head">
        <div className="db-card-title">Assignments</div>
        <span className="db-card-meta">{items.filter((i) => i.status === "pending").length} due soon</span>
      </div>
      <div className="db-list">
        {items.map((item) => {
          const done = item.status === "graded";
          return (
            <div key={item.id} className="db-list-row">
              <div className={`db-check${done ? " done" : ""}`}>{done ? "✓" : ""}</div>
              <div>
                <div className={`db-row-title${done ? " done" : ""}`}>{item.title}</div>
                <div className="db-row-meta">{item.module} · {item.dueDate}</div>
              </div>
              {statusChip(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
