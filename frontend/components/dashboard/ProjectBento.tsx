"use client";

import type { Project } from "@/lib/dashboard-data";

interface ProjectBentoProps {
  projects: Project[];
}

export default function ProjectBento({ projects }: ProjectBentoProps) {
  return (
    <div className="db-card">
      <div className="db-card-head">
        <div>
          <div className="db-card-title" style={{ fontSize: 17 }}>Your projects</div>
          <div className="db-card-meta" style={{ marginTop: 4 }}>
            {projects.filter((p) => p.status === "live").length} of {projects.length} shipped
          </div>
        </div>
        <button className="db-row-btn">View all →</button>
      </div>

      <div className="db-bento">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`db-bento-card ${project.status}`}
            style={project.span === 2 ? { gridColumn: "span 2" } : undefined}
          >
            <span className="db-bento-phase">{project.phase}</span>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            {project.progress !== undefined && (
              <div className="db-bar-sm" style={{ marginTop: 12 }}>
                <div className="db-bar-sm-fill" style={{ width: `${project.progress}%` }} />
              </div>
            )}
            <div className="db-bento-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="db-bento-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
