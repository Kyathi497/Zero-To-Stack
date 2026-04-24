"use client";

import { usePathname } from "next/navigation";

type NavItem = { label: string; icon: string; href: string; badge?: string };
type NavGroup = { group: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    group: "Learn",
    items: [
      { label: "Dashboard",    icon: "⊞", href: "/student" },
      { label: "Curriculum",   icon: "♤", href: "/student/curriculum" },
      { label: "Live Classes", icon: "▶", href: "/student/classes" },
      { label: "Assignments",  icon: "✓", href: "/student/assignments", badge: "3" },
      { label: "Recordings",   icon: "⏱", href: "/student/recordings" },
    ],
  },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="db-sidebar">
      <a href="/student" className="db-logo">
        <span className="db-logo-mark">Z</span>
        <span>Zero to <b>Stack</b></span>
      </a>

      {NAV.map((group) => (
        <div key={group.group} className="db-nav-group">
          <div className="db-nav-label">{group.group}</div>
          {group.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`db-nav-item${pathname === item.href ? " active" : ""}`}
            >
              <span className="db-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="db-nav-badge">{item.badge}</span>}
            </a>
          ))}
        </div>
      ))}

      <div className="db-sidebar-foot">
        <div className="db-user-card">
          <div className="db-avatar">AK</div>
          <div>
            <div className="db-user-name">Aarav Kumar</div>
            <div className="db-user-meta">BATCH · 2026-A</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
