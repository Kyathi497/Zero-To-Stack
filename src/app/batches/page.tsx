"use client";

const batches = [
  {
    id: "BATCH-001",
    name: "Forge Cohort 2024-A",
    course: "Full Stack Development",
    startDate: "Jan 15, 2024",
    endDate: "Apr 15, 2024",
    students: 32,
    maxStudents: 40,
    status: "Active",
    progress: 68,
    instructor: "Sarah Chen",
  },
  {
    id: "BATCH-002",
    name: "Backend Masters Q1",
    course: "Node.js Backend Development",
    startDate: "Feb 1, 2024",
    endDate: "May 1, 2024",
    students: 28,
    maxStudents: 35,
    status: "Active",
    progress: 45,
    instructor: "Marcus Rodriguez",
  },
  {
    id: "BATCH-003",
    name: "React Bootcamp Spring",
    course: "React JS Fundamentals",
    startDate: "Mar 1, 2024",
    endDate: "Jun 1, 2024",
    students: 25,
    maxStudents: 30,
    status: "Active",
    progress: 22,
    instructor: "Elena Volkov",
  },
  {
    id: "BATCH-004",
    name: "DevOps Intensive",
    course: "DevOps & Cloud Engineering",
    startDate: "Apr 1, 2024",
    endDate: "Jul 1, 2024",
    students: 20,
    maxStudents: 25,
    status: "Upcoming",
    progress: 0,
    instructor: "David Kim",
  },
  {
    id: "BATCH-005",
    name: "Database Wizardry",
    course: "PostgreSQL & Database Design",
    startDate: "Jan 10, 2024",
    endDate: "Mar 10, 2024",
    students: 35,
    maxStudents: 35,
    status: "Completed",
    progress: 100,
    instructor: "Elena Volkov",
  },
  {
    id: "BATCH-006",
    name: "Frontend Forge Q1",
    course: "Advanced CSS & Tailwind",
    startDate: "Feb 15, 2024",
    endDate: "Apr 15, 2024",
    students: 18,
    maxStudents: 30,
    status: "Active",
    progress: 55,
    instructor: "Sarah Chen",
  },
];

const stats = [
  {
    label: "Total Batches",
    value: "12",
    icon: "folder",
    trend: "+2 this month",
  },
  {
    label: "Active Students",
    value: "847",
    icon: "group",
    trend: "+124 this month",
  },
  {
    label: "Upcoming Batches",
    value: "3",
    icon: "schedule",
    trend: "Next starts in 5 days",
  },
  {
    label: "Completion Rate",
    value: "94%",
    icon: "trending_up",
    trend: "+2% vs last quarter",
  },
];

export default function BatchesPage() {
  return (
    <div className="min-h-screen font-body text-on-surface">
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 px-4 gap-4 z-50">
        <div className="mb-8 px-4">
          <h1 className="text-2xl font-black tracking-tight text-primary">Zero to Stack</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">
            Admin Console
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">school</span>
            <span>Courses</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-white font-bold border-r-4 border-primary bg-gradient-to-r from-primary/10 to-transparent" href="#">
            <span className="material-symbols-outlined">group</span>
            <span>Batches</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">person</span>
            <span>Students</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">podcasts</span>
            <span>Sessions</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">assignment</span>
            <span>Results</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">verified</span>
            <span>Certificates</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">campaign</span>
            <span>Announcements</span>
          </a>
        </nav>

        <div className="mt-auto space-y-1 pt-6 border-t border-outline-variant/15">
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </aside>

      <main className="ml-64 min-h-screen">
        <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/15 flex items-center justify-between px-8">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                search
              </span>
              <input
                className="w-full bg-surface-container-lowest border-none rounded-full py-2 pl-10 pr-4 text-on-surface placeholder:text-slate-600 focus:ring-2 focus:ring-primary/40 transition-all text-sm"
                placeholder="Search batches, students, courses..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors cursor-pointer">
              notifications
            </span>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/15 cursor-pointer active:opacity-80">
              <div className="text-right">
                <p className="font-bold text-primary text-sm">Alex Chen</p>
                <p className="text-[10px] text-slate-500">Super Admin</p>
              </div>
              <img
                alt="Administrator Profile"
                className="w-9 h-9 rounded-full object-cover border border-primary/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24"
              />
            </div>
          </div>
        </header>

        <div className="mt-16 p-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-4xl font-headline font-extrabold tracking-tight">
                Batch <span className="text-primary">Management</span>
              </h2>
              <p className="text-slate-400 mt-1">Manage student cohorts and track batch performance.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-outline-variant/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                Filter
              </button>
              <button className="bg-primary hover:bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(232,80,10,0.2)] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add</span>
                Create Batch
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-5xl text-primary">
                    {stat.icon}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black mt-2">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-3 text-green-400 text-xs font-medium">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5">
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h4 className="text-lg font-bold">All Batches</h4>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">Active: 4</span>
                <span className="px-3 py-1 bg-surface-container text-slate-400 text-xs font-bold rounded-full">Upcoming: 1</span>
                <span className="px-3 py-1 bg-surface-container text-slate-400 text-xs font-bold rounded-full">Completed: 1</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] text-slate-500 uppercase tracking-widest bg-surface-container-lowest/50">
                    <th className="px-6 py-4 font-bold">Batch ID</th>
                    <th className="px-6 py-4 font-bold">Batch Name</th>
                    <th className="px-6 py-4 font-bold">Course</th>
                    <th className="px-6 py-4 font-bold">Instructor</th>
                    <th className="px-6 py-4 font-bold">Students</th>
                    <th className="px-6 py-4 font-bold">Duration</th>
                    <th className="px-6 py-4 font-bold">Progress</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {batches.map((batch, index) => (
                    <tr key={index} className="hover:bg-surface-container transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-slate-400">{batch.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-xs font-black text-primary">
                            {batch.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="text-sm font-semibold">{batch.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{batch.course}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-[8px] font-bold text-tertiary">
                            {batch.instructor.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-sm text-slate-300">{batch.instructor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{batch.students}</span>
                          <span className="text-slate-500 text-xs">/ {batch.maxStudents}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <span className="text-slate-400">{batch.startDate}</span>
                          <span className="text-slate-600 mx-1">→</span>
                          <span className="text-slate-400">{batch.endDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-surface-variant rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${batch.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-400">{batch.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            batch.status === "Active"
                              ? "bg-green-500/10 text-green-400"
                              : batch.status === "Upcoming"
                              ? "bg-tertiary-container/10 text-tertiary-container"
                              : "bg-slate-500/10 text-slate-400"
                          }`}
                        >
                          {batch.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg bg-surface-container hover:bg-primary/20 text-slate-400 hover:text-primary transition-all">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </button>
                          <button className="p-2 rounded-lg bg-surface-container hover:bg-primary/20 text-slate-400 hover:text-primary transition-all">
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button className="p-2 rounded-lg bg-surface-container hover:bg-error/20 text-slate-400 hover:text-error transition-all">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between">
              <p className="text-sm text-slate-500">Showing 6 of 12 batches</p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-surface-container text-slate-400 text-sm font-medium hover:bg-surface-container-high transition-all">
                  Previous
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-bold">
                  1
                </button>
                <button className="px-4 py-2 rounded-lg bg-surface-container text-slate-400 text-sm font-medium hover:bg-surface-container-high transition-all">
                  2
                </button>
                <button className="px-4 py-2 rounded-lg bg-surface-container text-slate-400 text-sm font-medium hover:bg-surface-container-high transition-all">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}