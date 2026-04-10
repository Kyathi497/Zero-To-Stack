"use client";

const courses = [
  {
    title: "React Fundamentals",
    progress: 75,
    lessons: 12,
    completed: 9,
    totalTime: "4h 30m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJzPfUuqDV3wOjAObH8d5W8qbG6MvxpNXCpCfyQ9Nxkzu5s7pPi0p9lwH9S6X_vBZlTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA",
  },
  {
    title: "Node.js Backend Development",
    progress: 30,
    lessons: 18,
    completed: 5,
    totalTime: "6h 15m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJzPfUuqDV3wOjAObH8d5W8qbG6MvxpNXCpCfyQ9Nxkzu5s7pPi0p9lwH9S6X_vBZlTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA",
  },
  {
    title: "Database Design with PostgreSQL",
    progress: 0,
    lessons: 15,
    completed: 0,
    totalTime: "5h 45m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmAQHpMuBwCcDsDpTLkCnsQnJsX9y1GqCjV4jvCmElP-NP3vpT40Zk5iIyWP_z1PHVoNJlPhI5nGAyRRKZzP_pHy-WU4JIkzdSriYAwxOCeRUP_N3OQSKG_RUvKaDuXqvADvRwFC1k3d01Xpv7a1rCXTdPwzTJzPfUuqDV3wOjAObH8d5W8qbG6MvxpNXCpCfyQ9Nxkzu5s7pPi0p9lwH9S6X_vBZlTJQUClBeCmPcIMA_mbql86k-5Q_7cnUNMZ9UYyCiAkm0DFA",
  },
];

const userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuDIi0DQxGIrx3KmDlv3IasWRJzExl7YlMk7_LY5lUQUI0jpDiywMbLjULadk5Ac-Dm0dToi1WxRP1G9Y06ryoBMVnZ5Bz9nWhl5JV04QfME8TyfxW1_1L4Lbug0JuKbn1LnuC-hS7KaPkfDnP9NkB5vNOmqlkCBmzcQHp9dVPNK4R7Esy4cr-W96QBqb0I99tnZfjjrEBrt69lM0capYAQeyQrKJ90V3rQbtLb-BAMPA0sESOShxhQol05k0CAOrCM3TRmlPMAtr24";

export default function DashboardPage() {
  return (
    <div className="min-h-screen font-body text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl bg-surface-container-low shadow-[0_0_24px_rgba(232,80,10,0.15)] flex justify-between items-center px-8 h-20">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black text-white italic font-headline tracking-tight">
            StackForge
          </span>
          <nav className="hidden md:flex items-center gap-6">
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Explore
            </a>
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Courses
            </a>
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Live Sessions
            </a>
            <a
              className="text-slate-400 font-headline font-bold tracking-tight hover:text-orange-400 transition-all duration-300"
              href="#"
            >
              Resources
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-400 hover:text-orange-400 transition-all">
            notifications
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/20">
            <img
              alt="User avatar"
              className="w-full h-full object-cover"
              src={userAvatar}
            />
          </div>
          <button className="bg-primary-container text-white font-headline font-bold px-6 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300">
            Get Started
          </button>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold font-headline tracking-tight mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-slate-400">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-low rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">school</span>
              <span className="text-3xl font-black text-white">3</span>
            </div>
            <p className="text-slate-400 text-sm">Active Courses</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
              <span className="text-3xl font-black text-white">14</span>
            </div>
            <p className="text-slate-400 text-sm">Lessons Completed</p>
          </div>
          <div className="bg-surface-container-low rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">timer</span>
              <span className="text-3xl font-black text-white">16h</span>
            </div>
            <p className="text-slate-400 text-sm">Total Learning Time</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold font-headline mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container-high transition-colors cursor-pointer group"
              >
                <div className="aspect-video bg-surface-container-lowest relative">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    alt={course.title}
                    src={course.image}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-variant">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>
                      {course.completed}/{course.lessons} lessons
                    </span>
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
        </section>

        <section>
          <h2 className="text-2xl font-bold font-headline mb-6">Recommended for You</h2>
          <div className="bg-surface-container-low rounded-xl p-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-400">code</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Advanced TypeScript Patterns</h3>
                <p className="text-slate-400 text-sm mb-2">
                  Master generics, conditional types, and advanced type manipulation
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    8h 20m
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">bar_chart</span>
                    Intermediate
                  </span>
                </div>
              </div>
              <button className="bg-primary-container text-white font-bold px-6 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all">
                Start
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
