"use client";

const enrolledCourses = [
  {
    title: "React JS Fundamentals",
    category: "Frontend",
    progress: 75,
    lessons: 12,
    completed: 9,
    totalTime: "4h 30m",
    instructor: "Sarah Chen",
    nextLesson: "Custom Hooks Deep Dive",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJzPfUuqDV3wOjAObH8d5W8qbG6MvxpNXCpCfyQ9Nxkzu5s7pPi0p9lwH9S6X_vBZlTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA",
  },
  {
    title: "Node.js Backend Development",
    category: "Backend",
    progress: 30,
    lessons: 18,
    completed: 5,
    totalTime: "6h 15m",
    instructor: "Marcus Rodriguez",
    nextLesson: "Express Middleware Patterns",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJzPfUuqDV3wOjAObH8d5W8qbG6MvxpNXCpCfyQ9Nxkzu5s7pPi0p9lwH9S6X_vBZlTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA",
  },
  {
    title: "Database Design with PostgreSQL",
    category: "Database",
    progress: 0,
    lessons: 15,
    completed: 0,
    totalTime: "5h 45m",
    instructor: "Elena Volkov",
    nextLesson: "ERD Fundamentals",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJzPfUuqDV3wOjAObH8d5W8qbG6MvxpNXCpCfyQ9Nxkzu5s7pPi0p9lwH9S6X_vBZlTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA",
  },
];

const upcomingSessions = [
  {
    title: "Live Q&A: React Performance",
    date: "Today",
    time: "2:00 PM - 3:30 PM",
    instructor: "Sarah Chen",
    type: "Live Session",
  },
  {
    title: "Node.js Debugging Workshop",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    instructor: "Marcus Rodriguez",
    type: "Workshop",
  },
  {
    title: "Database Normalization Deep Dive",
    date: "Dec 15",
    time: "4:00 PM - 5:30 PM",
    instructor: "Elena Volkov",
    type: "Lecture",
  },
];

const recentActivity = [
  {
    action: "Completed lesson",
    item: "React useEffect Hook",
    time: "2 hours ago",
    icon: "check_circle",
  },
  {
    action: "Submitted assignment",
    item: "API Integration Project",
    time: "5 hours ago",
    icon: "upload_file",
  },
  {
    action: "Joined live session",
    item: "TypeScript Generics Workshop",
    time: "Yesterday",
    icon: "video_camera_front",
  },
];

const userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24";

export default function DashboardPage() {
  return (
    <div className="min-h-screen font-body text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl shadow-[0_0_24px_rgba(232,80,10,0.15)] flex justify-between items-center px-8 h-20">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-black text-white italic font-headline tracking-tight">
            StackForge
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300" href="#">
            Explore
          </a>
          <a className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300" href="#">
            Courses
          </a>
          <a className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300" href="#">
            Live Sessions
          </a>
          <a className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300" href="#">
            Resources
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors cursor-pointer">
              notifications
            </span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-container rounded-full"></span>
          </div>
          <img
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-primary-container/30"
            src={userAvatar}
          />
        </div>
      </header>

      <div className="flex pt-20">
        <aside className="h-screen w-64 fixed left-0 top-20 bg-surface-container-low flex flex-col py-6 px-4 gap-4">
          <div className="px-4 mb-6">
            <h3 className="text-white font-headline font-bold text-lg">Student Hub</h3>
            <p className="text-slate-400 text-xs font-medium">Full Stack Path</p>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-4 py-3 text-white bg-primary/10 border-r-4 border-primary transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium text-sm">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">school</span>
              <span className="font-medium text-sm">My Courses</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">calendar_today</span>
              <span className="font-medium text-sm">Schedule</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">assignment</span>
              <span className="font-medium text-sm">Assignments</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">podcasts</span>
              <span className="font-medium text-sm">Live Sessions</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">verified</span>
              <span className="font-medium text-sm">Certificates</span>
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-outline-variant/15">
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-medium text-sm">Settings</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-surface-container hover:text-white transition-all ease-in-out duration-300" href="#">
              <span className="material-symbols-outlined">help</span>
              <span className="font-medium text-sm">Support</span>
            </a>
            <button className="mt-4 bg-primary/10 text-primary border border-primary/30 py-3 rounded-lg font-bold text-sm hover:bg-primary/20 transition-all">
              Join Classroom
            </button>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-white">
              Welcome back, Alex 👋
            </h1>
            <p className="text-on-surface-variant">You have 2 live sessions this week and 1 assignment due tomorrow.</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
              <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6 group hover:bg-surface-container-high transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">school</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Enrolled Courses</p>
                  <h4 className="text-3xl font-headline font-bold text-white">3</h4>
                </div>
              </div>
              <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6 group hover:bg-surface-container-high transition-all">
                <div className="w-14 h-14 rounded-lg bg-tertiary-container/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-tertiary-container text-3xl">check_circle</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Lessons Completed</p>
                  <h4 className="text-3xl font-headline font-bold text-white">14</h4>
                </div>
              </div>
              <div className="bg-surface-container p-6 rounded-xl flex items-center gap-6 group hover:bg-surface-container-high transition-all">
                <div className="w-14 h-14 rounded-lg bg-secondary-container/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary-container text-3xl">timer</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Learning Hours</p>
                  <h4 className="text-3xl font-headline font-bold text-white">16h</h4>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl relative overflow-hidden flex flex-col justify-between p-8 min-h-[300px]">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-primary/40 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">In Progress</span>
                <h2 className="text-4xl font-headline font-black text-white mt-4 max-w-md">
                  {enrolledCourses[0].title}
                </h2>
                <p className="text-slate-400 mt-2 max-w-sm">Next: {enrolledCourses[0].nextLesson}</p>
              </div>
              <div className="relative z-10 flex items-end justify-between">
                <div className="flex-1 max-w-md pr-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-white">{enrolledCourses[0].progress}% Complete</span>
                    <span className="text-sm text-slate-400">{enrolledCourses[0].completed}/{enrolledCourses[0].lessons} Lessons</span>
                  </div>
                  <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-primary shadow-[0_0_12px_#ffb59c] w-[75%]"></div>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-[0_0_24px_rgba(232,80,10,0.3)] hover:scale-105 active:scale-95 transition-all">
                  Resume Learning
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-8">
              <h3 className="text-xl font-headline font-bold text-white mb-6">My Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-surface-container rounded-xl overflow-hidden hover:bg-surface-container-high transition-colors cursor-pointer group border border-outline-variant/5"
                  >
                    <div className="aspect-video bg-surface-container-lowest relative">
                      <img
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        alt={course.title}
                        src={course.image}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">
                          {course.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-variant">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-4">by {course.instructor}</p>
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                        <span>{course.completed}/{course.lessons} lessons</span>
                        <span>{course.totalTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-400">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <h3 className="text-xl font-headline font-bold text-white">Upcoming Sessions</h3>
              <div className="flex flex-col gap-4">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={index}
                    className="bg-surface-container p-4 rounded-xl border-l-4 border-primary flex items-center justify-between hover:bg-surface-container-high transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary mb-1">{session.date} • {session.time}</span>
                      <h5 className="text-white font-bold">{session.title}</h5>
                      <p className="text-slate-400 text-sm italic">{session.instructor}</p>
                    </div>
                    <button className="bg-surface-variant p-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined">video_camera_front</span>
                    </button>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-headline font-bold text-white mt-6">Recent Activity</h3>
              <div className="flex flex-col gap-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {activity.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{activity.action}</p>
                      <p className="text-slate-400 text-xs">{activity.item}</p>
                    </div>
                    <span className="text-slate-500 text-xs">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}