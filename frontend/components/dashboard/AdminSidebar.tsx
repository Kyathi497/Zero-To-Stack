"use client";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

type NavItem = { label: string; icon: string; href: string; badge?: string };
type NavGroup = { group: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    group: "Teach",
    items: [
      { label: "Overview",     icon: "⊞", href: "/admin" },
      { label: "Live Classes", icon: "▶", href: "/admin/classes" },
      { label: "Grading",      icon: "✓", href: "/admin/grading" },
      { label: "Curriculum",   icon: "⏱", href: "/admin/curriculum" },
    ],
  },
  {
    group: "Manage",
    items: [
      { label: "Students", icon: "⚇", href: "/admin/students" },
      { label: "Settings", icon: "↺", href: "/admin/settings" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <aside className="db-sidebar">
      <a href="/admin" className="db-logo">
        <span className="db-logo-mark">Z</span>
        <span>Zero to <b>Stack</b></span>
      </a>

      <div className="db-admin-badge">ADMIN CONSOLE</div>

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
          <div className="db-avatar">RM</div>
          <div>
            <div className="db-user-name">Ravi Menon</div>
            <div className="db-user-meta">LEAD INSTRUCTOR</div>
          </div>
        </div>
        <button onClick={handleLogout} className="db-logout-btn">
          <span className="db-nav-icon">⎋</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
