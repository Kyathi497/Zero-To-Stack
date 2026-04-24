"use client";

import type { StudentRow } from "@/lib/dashboard-data";

interface StudentTableProps {
  students: StudentRow[];
}

export default function StudentTable({ students }: StudentTableProps) {
  return (
    <div className="db-card" style={{ padding: 18 }}>
      <div className="db-card-head" style={{ padding: "4px 6px" }}>
        <div className="db-card-title">Students</div>
        <span className="db-card-meta">{students.length} enrolled</span>
      </div>

      <div className="db-table-wrap">
        <div className="db-t-head" style={{ gridTemplateColumns: "36px 1fr 120px 100px 90px 60px" }}>
          <div />
          <div>Student</div>
          <div>Progress</div>
          <div>Attendance</div>
          <div>Payment</div>
          <div />
        </div>

        {students.map((s) => (
          <div key={s.id} className="db-t-row" style={{ gridTemplateColumns: "36px 1fr 120px 100px 90px 60px" }}>
            <div className="db-avatar alt" style={{ width: 32, height: 32, fontSize: 12 }}>
              {s.initials}
            </div>
            <div className="db-student-cell" style={{ display: "block" }}>
              <div className="db-student-name">{s.name}</div>
              <div className="db-student-email">{s.email}</div>
            </div>
            <div>
              <div className="db-minibar">
                <i className="db-minibar-fill" style={{ width: `${s.progress}%` }} />
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)", marginTop: 4 }}>
                {s.progress}% · {s.currentModule}
              </div>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12 }}>{s.attendance}%</div>
            <div>
              <span
                className="db-risk-badge"
                style={{
                  background: s.paymentDone ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  color:      s.paymentDone ? "#22c55e" : "#ef4444",
                  border:     `1px solid ${s.paymentDone ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                }}
              >
                {s.paymentDone ? "✓ Paid" : "✗ Due"}
              </span>
            </div>
            <button className="db-row-btn">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
