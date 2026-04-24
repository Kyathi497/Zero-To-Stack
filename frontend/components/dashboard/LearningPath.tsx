"use client";

import type { LearningTrack } from "@/lib/dashboard-data";
import ModuleHeatmap from "./ModuleHeatmap";

interface LearningPathProps {
  track: LearningTrack;
}

const TRACK_COLORS: Record<string, React.CSSProperties> = {
  done:   { background: "rgba(139,233,163,.08)", color: "var(--green)",   borderColor: "rgba(139,233,163,.25)" },
  active: { background: "rgba(232,80,10,.1)",    color: "var(--orange)",  borderColor: "rgba(232,80,10,.3)"   },
  next:   { background: "rgba(155,181,255,.08)", color: "var(--blue)",    borderColor: "rgba(155,181,255,.3)" },
  locked: { background: "rgba(255,255,255,.04)", color: "var(--text-dim)", borderColor: "var(--line)"         },
};

export default function LearningPath({ track }: LearningPathProps) {
  const doneCount   = track.modules.filter((m) => m.state === "done").length;
  const totalCount  = track.modules.length;
  const overallPct  = Math.round((doneCount / totalCount) * 100);

  const frontendMods = track.modules.slice(0, 9);
  const backendMods  = track.modules.slice(9);
  const frontendPct  = Math.round(
    (frontendMods.filter((m) => m.state === "done").length / frontendMods.length) * 100
  );

  return (
    <div className="db-card" style={{ padding: 26 }}>
      <div className="db-progress-head">
        <div>
          <div className="db-card-title" style={{ fontSize: 17 }}>Your learning path</div>
          <div className="db-card-meta" style={{ marginTop: 4 }}>
            {totalCount} modules · 63 classes · 2 tracks
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="db-big-pct">{overallPct}%</div>
          <div className="db-card-meta" style={{ marginTop: 4 }}>complete</div>
        </div>
      </div>

      <div className="db-tracks">
        <div className="db-track-row">
          <span className="db-track-badge">TRACK 01 · FRONTEND</span>
          <div>
            <div className="db-track-name">Frontend Track</div>
            <div className="db-track-sub">JavaScript Projects · Module {doneCount} of {frontendMods.length}</div>
            <div className="db-bar-sm" style={{ marginTop: 8 }}>
              <div className="db-bar-sm-fill" style={{ width: `${frontendPct}%` }} />
            </div>
          </div>
          <div className="db-track-pct">{frontendPct}%</div>
        </div>

        <div className="db-track-row">
          <span className="db-track-badge" style={{ background: "rgba(155,181,255,.08)", color: "var(--blue)", borderColor: "rgba(155,181,255,.3)" }}>
            TRACK 02 · BACKEND
          </span>
          <div>
            <div className="db-track-name">Backend Track</div>
            <div className="db-track-sub">Not started · Unlocks after Module 09</div>
            <div className="db-bar-sm" style={{ marginTop: 8 }}>
              <div className="db-bar-sm-fill" style={{ width: "0%" }} />
            </div>
          </div>
          <div className="db-track-pct">0%</div>
        </div>
      </div>

      <ModuleHeatmap cells={track.heatmap} />
    </div>
  );
}
