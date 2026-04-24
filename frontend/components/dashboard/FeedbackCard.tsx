"use client";

import type { MentorFeedback } from "@/lib/dashboard-data";

interface FeedbackCardProps {
  feedback: MentorFeedback[];
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <div className="db-card">
      <div className="db-card-head">
        <div className="db-card-title" style={{ fontSize: 17 }}>Recent feedback</div>
        <span className="db-card-meta">from mentors</span>
      </div>
      <div className="db-feedback-list">
        {feedback.map((item) => (
          <div key={item.id} className="db-feedback-card">
            <div className="db-feedback-header">
              <div className="db-avatar alt" style={{ width: 32, height: 32, fontSize: 12 }}>
                {item.initials}
              </div>
              <div>
                <div className="db-feedback-name">{item.mentor}</div>
                <div className="db-feedback-date">{item.date}</div>
              </div>
              {item.grade !== undefined && (
                <span className="db-chip ok" style={{ marginLeft: "auto" }}>{item.grade}</span>
              )}
            </div>
            <p className="db-feedback-body">{item.body}</p>
          </div>
        ))}
        <button className="db-row-btn" style={{ padding: 10, textAlign: "center", width: "100%" }}>
          Open all feedback →
        </button>
      </div>
    </div>
  );
}
