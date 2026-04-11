"use client";

const results = [
  {
    id: "RES-001",
    student: "Jordan Dorsey",
    email: "j.dorsey@example.com",
    course: "React JS Fundamentals",
    batch: "Forge Cohort 2024-A",
    score: 92,
    grade: "A",
    status: "Published",
    submittedAt: "Dec 10, 2024",
    gradedAt: "Dec 12, 2024",
  },
  {
    id: "RES-002",
    student: "Marcus Lowery",
    email: "m.lowery@tech.io",
    course: "Node.js Backend Development",
    batch: "Backend Masters Q1",
    score: 78,
    grade: "B+",
    status: "Published",
    submittedAt: "Dec 9, 2024",
    gradedAt: "Dec 11, 2024",
  },
  {
    id: "RES-003",
    student: "Sarah Connor",
    email: "s.connor@cyberdyne.com",
    course: "Database Design with PostgreSQL",
    batch: "Database Wizardry",
    score: 88,
    grade: "A-",
    status: "Published",
    submittedAt: "Dec 8, 2024",
    gradedAt: "Dec 10, 2024",
  },
  {
    id: "RES-004",
    student: "Riley Thompson",
    email: "riley.t@gmail.com",
    course: "React JS Fundamentals",
    batch: "Forge Cohort 2024-A",
    score: 65,
    grade: "C",
    status: "Pending",
    submittedAt: "Dec 14, 2024",
    gradedAt: null,
  },
  {
    id: "RES-005",
    student: "David Kim",
    email: "d.kim@engineering.dev",
    course: "DevOps & Cloud Engineering",
    batch: "DevOps Intensive",
    score: 95,
    grade: "A+",
    status: "Published",
    submittedAt: "Dec 7, 2024",
    gradedAt: "Dec 9, 2024",
  },
  {
    id: "RES-006",
    student: "Elena Rodriguez",
    email: "e.rodriguez@tech.io",
    course: "Advanced CSS & Tailwind",
    batch: "Frontend Forge Q1",
    score: 84,
    grade: "B+",
    status: "Published",
    submittedAt: "Dec 6, 2024",
    gradedAt: "Dec 8, 2024",
  },
];

const stats = [
  {
    label: "Total Submissions",
    value: "1,284",
    icon: "assignment",
    trend: "+156 this month",
  },
  {
    label: "Average Score",
    value: "78.5%",
    icon: "trending_up",
    trend: "+2.3% vs last batch",
  },
  {
    label: "Pending Review",
    value: "24",
    icon: "pending_actions",
    trend: "8 urgent",
  },
  {
    label: "High Performers",
    value: "342",
    icon: "emoji_events",
    trend: "Score 90+",
  },
];

const gradeDistribution = [
  { grade: "A+", count: 45, percentage: 12 },
  { grade: "A", count: 89, percentage: 24 },
  { grade: "A-", count: 67, percentage: 18 },
  { grade: "B+", count: 78, percentage: 21 },
  { grade: "B", count: 56, percentage: 15 },
  { grade: "C", count: 32, percentage: 8 },
  { grade: "D/F", count: 7, percentage: 2 },
];

const adminAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24";

export default function ResultsPage() {
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
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
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
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-white font-bold border-r-4 border-primary bg-gradient-to-r from-primary/10 to-transparent" href="#">
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
                placeholder="Search results, students, assignments..."
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
                src={adminAvatar}
              />
            </div>
          </div>
        </header>

        <div className="mt-16 p-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-4xl font-headline font-extrabold tracking-tight">
                Student <span className="text-primary">Results</span>
              </h2>
              <p className="text-slate-400 mt-1">Track and manage student assessment results.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-outline-variant/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">download</span>
                Export
              </button>
              <button className="bg-primary hover:bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(232,80,10,0.2)] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add</span>
                Add Result
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

          <div className="grid grid-cols-12 gap-6 mb-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5">
                <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
                  <h4 className="text-lg font-bold">Recent Submissions</h4>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full">Published: 4</span>
                    <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full">Pending: 2</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] text-slate-500 uppercase tracking-widest bg-surface-container-lowest/50">
                        <th className="px-6 py-4 font-bold">ID</th>
                        <th className="px-6 py-4 font-bold">Student</th>
                        <th className="px-6 py-4 font-bold">Course</th>
                        <th className="px-6 py-4 font-bold">Score</th>
                        <th className="px-6 py-4 font-bold">Grade</th>
                        <th className="px-6 py-4 font-bold">Submitted</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {results.map((result, index) => (
                        <tr key={index} className="hover:bg-surface-container transition-colors group">
                          <td className="px-6 py-4">
                            <span className="text-xs font-mono text-slate-400">{result.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-primary">
                                {result.student.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{result.student}</p>
                                <p className="text-[10px] text-slate-500">{result.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm text-slate-300">{result.course}</p>
                              <p className="text-[10px] text-slate-500">{result.batch}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-2 bg-surface-variant rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    result.score >= 90
                                      ? "bg-green-400"
                                      : result.score >= 70
                                      ? "bg-primary"
                                      : "bg-yellow-400"
                                  }`}
                                  style={{ width: `${result.score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold">{result.score}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-black ${
                                result.grade.startsWith("A")
                                  ? "bg-green-500/10 text-green-400"
                                  : result.grade.startsWith("B")
                                  ? "bg-primary/10 text-primary"
                                  : "bg-yellow-500/10 text-yellow-400"
                              }`}
                            >
                              {result.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-400">{result.submittedAt}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                result.status === "Published"
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-yellow-500/10 text-yellow-400"
                              }`}
                            >
                              {result.status}
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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Showing 6 of 1,284 results</p>
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
                      3
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-surface-container text-slate-400 text-sm font-medium hover:bg-surface-container-high transition-all">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/5">
                <h4 className="text-lg font-bold mb-6">Grade Distribution</h4>
                <div className="space-y-4">
                  {gradeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-10 text-sm font-bold text-slate-400">{item.grade}</span>
                      <div className="flex-1">
                        <div className="h-3 bg-surface-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="w-16 text-right text-sm text-slate-400">{item.count}</span>
                      <span className="w-12 text-right text-xs text-slate-500">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-outline-variant/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400">Pass Rate</span>
                    <span className="text-2xl font-black text-green-400">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Average Grade</span>
                    <span className="text-2xl font-black text-primary">B+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}