"use client";

const certificates = [
  {
    id: "CERT-001",
    student: "Jordan Dorsey",
    email: "j.dorsey@example.com",
    course: "React JS Fundamentals",
    issuedAt: "Dec 15, 2024",
    expiresAt: "Never",
    status: "Active",
    credentialId: "ZTS-2024-REF-0892",
  },
  {
    id: "CERT-002",
    student: "Sarah Connor",
    email: "s.connor@cyberdyne.com",
    course: "Node.js Backend Development",
    issuedAt: "Dec 10, 2024",
    expiresAt: "Never",
    status: "Active",
    credentialId: "ZTS-2024-BND-1245",
  },
  {
    id: "CERT-003",
    student: "Marcus Lowery",
    email: "m.lowery@tech.io",
    course: "Database Design with PostgreSQL",
    issuedAt: "Dec 8, 2024",
    expiresAt: "Dec 8, 2026",
    status: "Active",
    credentialId: "ZTS-2024-DBS-0678",
  },
  {
    id: "CERT-004",
    student: "David Kim",
    email: "d.kim@engineering.dev",
    course: "Full Stack Development",
    issuedAt: "Nov 28, 2024",
    expiresAt: "Never",
    status: "Active",
    credentialId: "ZTS-2024-FST-0456",
  },
  {
    id: "CERT-005",
    student: "Riley Thompson",
    email: "riley.t@gmail.com",
    course: "DevOps & Cloud Engineering",
    issuedAt: "Nov 20, 2024",
    expiresAt: "Nov 20, 2025",
    status: "Expired",
    credentialId: "ZTS-2024-DOP-0234",
  },
  {
    id: "CERT-006",
    student: "Elena Rodriguez",
    email: "e.rodriguez@tech.io",
    course: "Advanced CSS & Tailwind",
    issuedAt: "Dec 1, 2024",
    expiresAt: "Never",
    status: "Active",
    credentialId: "ZTS-2024-CSS-0899",
  },
];

const stats = [
  {
    label: "Total Issued",
    value: "2,847",
    icon: "workspace_premium",
    trend: "+124 this month",
  },
  {
    label: "Active Certificates",
    value: "2,612",
    icon: "verified",
    trend: "98.5% of total",
  },
  {
    label: "Expired",
    value: "235",
    icon: "hourglass_empty",
    trend: "8.2% renewal rate",
  },
  {
    label: "Pending Verification",
    value: "18",
    icon: "pending",
    trend: "3 urgent",
  },
];

const recentIssued = [
  {
    student: "Alex Rivera",
    course: "React JS Fundamentals",
    issuedAt: "2 hours ago",
    credentialId: "ZTS-2024-REF-0893",
  },
  {
    student: "Chris Martinez",
    course: "Node.js Backend Development",
    issuedAt: "5 hours ago",
    credentialId: "ZTS-2024-BND-1246",
  },
  {
    student: "Taylor Swift",
    course: "Database Design with PostgreSQL",
    issuedAt: "Yesterday",
    credentialId: "ZTS-2024-DBS-0679",
  },
  {
    student: "Jordan Lee",
    course: "Full Stack Development",
    issuedAt: "Yesterday",
    credentialId: "ZTS-2024-FST-0457",
  },
];

const adminAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24";

export default function CertificatesPage() {
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
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 font-medium hover:text-white hover:bg-surface-container transition-all duration-300" href="#">
            <span className="material-symbols-outlined">assignment</span>
            <span>Results</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-white font-bold border-r-4 border-primary bg-gradient-to-r from-primary/10 to-transparent" href="#">
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
                placeholder="Search certificates, students, credentials..."
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
                Certificate <span className="text-primary">Management</span>
              </h2>
              <p className="text-slate-400 mt-1">Issue and manage student certificates.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-surface-container hover:bg-surface-container-high text-on-surface px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-outline-variant/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">download</span>
                Export
              </button>
              <button className="bg-primary hover:bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(232,80,10,0.2)] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add</span>
                Issue Certificate
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

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5">
                <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
                  <h4 className="text-lg font-bold">All Certificates</h4>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full">Active: 5</span>
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full">Expired: 1</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] text-slate-500 uppercase tracking-widest bg-surface-container-lowest/50">
                        <th className="px-6 py-4 font-bold">Credential ID</th>
                        <th className="px-6 py-4 font-bold">Student</th>
                        <th className="px-6 py-4 font-bold">Course</th>
                        <th className="px-6 py-4 font-bold">Issued</th>
                        <th className="px-6 py-4 font-bold">Expires</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {certificates.map((cert, index) => (
                        <tr key={index} className="hover:bg-surface-container transition-colors group">
                          <td className="px-6 py-4">
                            <span className="text-xs font-mono text-slate-400">{cert.credentialId}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-black text-primary">
                                {cert.student.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{cert.student}</p>
                                <p className="text-[10px] text-slate-500">{cert.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-300">{cert.course}</td>
                          <td className="px-6 py-4 text-sm text-slate-400">{cert.issuedAt}</td>
                          <td className="px-6 py-4">
                            <span className={`text-sm ${cert.expiresAt === "Never" ? "text-green-400" : "text-slate-400"}`}>
                              {cert.expiresAt}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                cert.status === "Active"
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {cert.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 rounded-lg bg-surface-container hover:bg-primary/20 text-slate-400 hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-lg">visibility</span>
                              </button>
                              <button className="p-2 rounded-lg bg-surface-container hover:bg-primary/20 text-slate-400 hover:text-primary transition-all">
                                <span className="material-symbols-outlined text-lg">download</span>
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
                  <p className="text-sm text-slate-500">Showing 6 of 2,847 certificates</p>
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
              <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/5 mb-6">
                <h4 className="text-lg font-bold mb-6">Recently Issued</h4>
                <div className="space-y-4">
                  {recentIssued.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container transition-all">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.student}</p>
                        <p className="text-xs text-slate-400">{item.course}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{item.issuedAt}</p>
                      </div>
                      <button className="p-2 rounded-lg bg-surface-container hover:bg-primary/20 text-slate-400 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/5">
                <h4 className="text-lg font-bold mb-6">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-surface-container hover:bg-surface-container-high p-4 rounded-xl flex items-center gap-4 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">autorenew</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">Bulk Issue</p>
                      <p className="text-xs text-slate-400">Issue certificates for a batch</p>
                    </div>
                  </button>
                  <button className="w-full bg-surface-container hover:bg-surface-container-high p-4 rounded-xl flex items-center gap-4 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary">sync</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">Renew Expired</p>
                      <p className="text-xs text-slate-400">Process renewal requests</p>
                    </div>
                  </button>
                  <button className="w-full bg-surface-container hover:bg-surface-container-high p-4 rounded-xl flex items-center gap-4 transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-400">download</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">Export All</p>
                      <p className="text-xs text-slate-400">Download certificate records</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}