"use client";

const settingsNav = [
  { id: "general", label: "General", icon: "settings" },
  { id: "profile", label: "Profile", icon: "person" },
  { id: "security", label: "Security", icon: "security" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
  { id: "billing", label: "Billing", icon: "credit_card" },
  { id: "team", label: "Team", icon: "group" },
];

const adminAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24";

export default function SettingsPage() {
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
          <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-white font-bold border-r-4 border-primary bg-gradient-to-r from-primary/10 to-transparent" href="#">
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
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-headline font-bold">Settings</h2>
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
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/5">
                <nav className="space-y-1">
                  {settingsNav.map((item) => (
                    <a
                      key={item.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        item.id === "general"
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-slate-400 hover:bg-surface-container hover:text-white"
                      }`}
                      href="#"
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-9">
              <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/5 mb-6">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/10">
                  <div className="relative">
                    <img
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                      src={adminAvatar}
                    />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-on-primary text-sm">photo_camera</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Alex Chen</h3>
                    <p className="text-slate-400 text-sm">Super Admin</p>
                    <p className="text-slate-500 text-xs mt-1">alex.chen@zerotostack.com</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">First Name</label>
                    <input
                      className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all"
                      defaultValue="Alex"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Last Name</label>
                    <input
                      className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all"
                      defaultValue="Chen"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                    <input
                      className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all"
                      defaultValue="alex.chen@zerotostack.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Role</label>
                    <select className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all">
                      <option>Super Admin</option>
                      <option>Admin</option>
                      <option>Moderator</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-400 mb-2">Bio</label>
                  <textarea
                    className="w-full bg-surface-container-lowest border-none rounded-lg px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/40 transition-all h-24 resize-none"
                    defaultValue="Passionate about building world-class engineering education platforms."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button className="px-6 py-3 rounded-lg bg-surface-container text-slate-400 font-bold text-sm hover:bg-surface-container-high transition-all">
                    Cancel
                  </button>
                  <button className="px-6 py-3 rounded-lg bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all shadow-[0_0_15px_rgba(232,80,10,0.2)]">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/5 mb-6">
                <h3 className="text-lg font-bold mb-6">Security Settings</h3>
                
                <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                    </div>
                    <div>
                      <p className="font-semibold">Change Password</p>
                      <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-surface-container text-primary font-bold text-sm hover:bg-primary/10 transition-all">
                    Update
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-2xl">phone</span>
                    </div>
                    <div>
                      <p className="font-semibold">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 font-bold text-sm hover:bg-green-500/20 transition-all">
                    Enabled
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                      <span className="material-symbols-outlined text-yellow-400 text-2xl">devices</span>
                    </div>
                    <div>
                      <p className="font-semibold">Active Sessions</p>
                      <p className="text-sm text-slate-400">Manage your logged-in devices</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-surface-container text-slate-400 font-bold text-sm hover:bg-surface-container-high transition-all">
                    View All
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/5">
                <h3 className="text-lg font-bold mb-6">Danger Zone</h3>
                
                <div className="flex items-center justify-between p-4 bg-error/5 border border-error/20 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-error text-2xl">warning</span>
                    </div>
                    <div>
                      <p className="font-semibold text-error">Delete Account</p>
                      <p className="text-sm text-slate-400">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-error/10 text-error font-bold text-sm hover:bg-error/20 transition-all border border-error/30">
                    Delete
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