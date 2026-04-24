"use client";

import "./dashboard.css";
import { usePathname } from "next/navigation";
import StudentSidebar from "@/components/dashboard/StudentSidebar";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="db-shell">
      {isAdmin ? <AdminSidebar /> : <StudentSidebar />}
      <div className="db-main">
        <div className="db-grid-bg" />
        <Topbar role={isAdmin ? "admin" : "student"} />
        <div className="db-content">{children}</div>
      </div>
    </div>
  );
}
