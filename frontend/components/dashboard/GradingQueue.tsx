"use client";

import type { GradingItem } from "@/lib/dashboard-data";

interface GradingQueueProps {
  items: GradingItem[];
}

const STATUS_CHIP: Record<string, string> = {
  due:      "due",
  late:     "late",
  resubmit: "submitted",
  pending:  "",
};

const STATUS_LABEL: Record<string, string> = {
  due:      "Due",
  late:     "Late",
  resubmit: "Resub",
  pending:  "Q",
};

export default function GradingQueue({ items }: GradingQueueProps) {
  return (
    <div className="db-card">
      <div className="db-card-head">
        <div className="db-card-title">Grading queue</div>
        <span className="db-card-meta">{items.length} pending</span>
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} className="db-queue-row">
            <div className="db-q-avatar">{item.initials}</div>
            <div>
              <div className="db-q-name">{item.studentName}</div>
              <div className="db-q-sub">{item.assignmentTitle} · {item.module}</div>
            </div>
            <div className="db-q-time">{item.submittedAt}</div>
            <span className={`db-chip ${STATUS_CHIP[item.status]}`}>
              {STATUS_LABEL[item.status]}
            </span>
            <button className="db-row-btn">Grade</button>
          </div>
        ))}
        <button className="db-row-btn" style={{ width: "100%", padding: 10, marginTop: 8 }}>
          Open full queue →
        </button>
      </div>
    </div>
  );
}
