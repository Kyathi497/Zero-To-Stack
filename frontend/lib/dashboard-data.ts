// ── Shared ────────────────────────────────────────────────────────────────────

export type ModuleState = 'done' | 'active' | 'next' | 'locked';
export type RiskLevel   = 'green' | 'yellow' | 'red';

// ── Student ───────────────────────────────────────────────────────────────────

export interface KpiData {
  label: string;
  value: number | string;
  suffix?: string;
  subtext?: string;
  delta?: string;
  deltaPositive?: boolean;
  barPercent?: number;
  weekDots?: boolean[];
}

export interface LiveClass {
  title: string;
  module: string;
  instructor: string;
  targetDate: string;
  joinUrl: string;
  topics: string[];
  classNumber: number;
  totalClasses: number;
  durationMin: number;
}

export interface ModuleItem {
  number: number;
  title: string;
  state: ModuleState;
  progress: number;
}

export interface LearningTrack {
  modules: ModuleItem[];
  heatmap: ModuleState[];
}

export interface Assignment {
  id: string;
  title: string;
  module: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'late' | 'graded';
  grade?: number;
}

export interface Project {
  id: string;
  name: string;
  phase: string;
  description: string;
  tags: string[];
  status: 'live' | 'building' | 'planned' | 'locked';
  span?: 1 | 2;
  progress?: number;
}

export interface MentorFeedback {
  id: string;
  mentor: string;
  initials: string;
  date: string;
  subject: string;
  body: string;
  sentiment: 'positive' | 'constructive' | 'neutral';
  grade?: string | number;
}

// ── Admin ─────────────────────────────────────────────────────────────────────

export interface CohortHealth {
  onTrack: number;
  atRisk: number;
  critical: number;
  totalStudents: number;
  attendance: number;
  nps: number;
  onTrackCount: number;
}

export interface AttendancePoint {
  label: string;
  percent: number;
}

export interface StudentRow {
  id: string;
  name: string;
  initials: string;
  email: string;
  progress: number;
  currentModule: string;
  attendance: number;
  risk: RiskLevel;
  paymentDone: boolean;
}

export interface GradingItem {
  id: string;
  studentName: string;
  initials: string;
  assignmentTitle: string;
  module: string;
  submittedAt: string;
  priority: 'high' | 'normal';
  status: 'due' | 'late' | 'resubmit' | 'pending';
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'live' | 'review' | 'office-hours' | 'sync';
  enrolled?: number;
  isNow?: boolean;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  type: 'submit' | 'join' | 'complete' | 'risk' | 'schedule' | 'application' | 'grade';
}

// ── Student data ──────────────────────────────────────────────────────────────

// Target: tomorrow at 6 PM IST — use a date far enough ahead for demo
const NEXT_CLASS_DATE = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(18, 0, 0, 0);
  return d.toISOString();
})();

export const STUDENT_KPI: KpiData[] = [
  {
    label: 'Overall Progress',
    value: 37,
    suffix: '%',
    subtext: '47 / 126 hours',
    delta: '+6 this week',
    deltaPositive: true,
    barPercent: 37,
  },
  {
    label: 'Current Streak',
    value: 14,
    suffix: ' days',
    weekDots: [true, true, true, true, true, true, false],
  },
  {
    label: 'Assignments',
    value: '23',
    suffix: ' / 26',
    subtext: '3 due this week',
    delta: '88%',
    deltaPositive: true,
  },
  {
    label: 'Attendance',
    value: 96,
    suffix: '%',
    subtext: '45 / 47 live classes',
    delta: 'top 10%',
    deltaPositive: true,
    barPercent: 96,
  },
];

export const LIVE_CLASS: LiveClass = {
  title: 'React Hooks · Deep Dive',
  module: 'MODULE 08',
  instructor: 'Ravi Menon',
  targetDate: NEXT_CLASS_DATE,
  joinUrl: '#',
  topics: ['useEffect', 'useMemo', 'useCallback', 'custom hooks'],
  classNumber: 48,
  totalClasses: 63,
  durationMin: 120,
};

export const LEARNING_TRACK: LearningTrack = {
  modules: [
    { number: 1,  title: 'HTML Fundamentals',      state: 'done',   progress: 100 },
    { number: 2,  title: 'CSS Layouts',            state: 'done',   progress: 100 },
    { number: 3,  title: 'CSS Grid & Flexbox',     state: 'done',   progress: 100 },
    { number: 4,  title: 'JavaScript Basics',      state: 'done',   progress: 100 },
    { number: 5,  title: 'DOM Manipulation',        state: 'done',   progress: 100 },
    { number: 6,  title: 'Async JavaScript',       state: 'done',   progress: 100 },
    { number: 7,  title: 'React Basics',           state: 'done',   progress: 100 },
    { number: 8,  title: 'React Hooks',            state: 'active', progress: 56  },
    { number: 9,  title: 'React Router',           state: 'next',   progress: 0   },
    { number: 10, title: 'State Management',       state: 'locked', progress: 0   },
    { number: 11, title: 'Node.js & Express',      state: 'locked', progress: 0   },
    { number: 12, title: 'Databases & Prisma',     state: 'locked', progress: 0   },
    { number: 13, title: 'Auth & Security',        state: 'locked', progress: 0   },
    { number: 14, title: 'Full-Stack Capstone',    state: 'locked', progress: 0   },
  ],
  heatmap: [
    ...Array.from({ length: 16 }, () => 'done'   as ModuleState),
    ...Array.from({ length: 4  }, () => 'active' as ModuleState),
    ...Array.from({ length: 6  }, () => 'next'   as ModuleState),
    ...Array.from({ length: 16 }, () => 'locked' as ModuleState),
  ],
};

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Rebuild the portfolio grid using CSS Grid',
    module: 'Module 02',
    dueDate: 'submitted Apr 18',
    status: 'graded',
    grade: 94,
  },
  {
    id: 'a2',
    title: 'useEffect · data fetching patterns',
    module: 'Module 08',
    dueDate: 'due tomorrow, 11:59 PM',
    status: 'pending',
  },
  {
    id: 'a3',
    title: 'GitHub Finder · async state handling',
    module: 'Module 05',
    dueDate: 'due Apr 26',
    status: 'pending',
  },
  {
    id: 'a4',
    title: 'React Router · protected routes',
    module: 'Module 09',
    dueDate: 'due Apr 30',
    status: 'pending',
  },
  {
    id: 'a5',
    title: 'JS quiz app · DOM events',
    module: 'Module 05',
    dueDate: 'submitted Apr 16',
    status: 'submitted',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'GitHub Finder',
    phase: 'IN PROGRESS · PHASE 05',
    description: 'Search users, fetch repos, handle loading & error states with hooks.',
    tags: ['React', 'Axios', 'hooks'],
    status: 'building',
    span: 2,
    progress: 72,
  },
  {
    id: 'p2',
    name: 'Portfolio Page',
    phase: 'SHIPPED · PHASE 03',
    description: 'Deployed to Vercel · scored 94/100 on Lighthouse.',
    tags: ['HTML', 'CSS', 'Responsive'],
    status: 'live',
  },
  {
    id: 'p3',
    name: 'Landing Page',
    phase: 'SHIPPED · PHASE 03',
    description: 'Pixel-perfect Figma clone · custom animations on scroll.',
    tags: ['HTML', 'CSS'],
    status: 'live',
  },
  {
    id: 'p4',
    name: 'Full-Stack Capstone',
    phase: 'LOCKED · CAPSTONE',
    description: 'Unlocks after Module 13 · ships to Vercel end-to-end.',
    tags: ['React', 'Node', 'MySQL'],
    status: 'locked',
  },
];

export const MENTOR_FEEDBACK: MentorFeedback[] = [
  {
    id: 'f1',
    mentor: 'Ravi Menon',
    initials: 'RM',
    date: 'on JS Quiz App · 2h ago',
    subject: 'JS Quiz App',
    body: 'Clean event delegation. Try lifting the timer state up so the results screen can reuse it — I left inline comments on quiz.js:42.',
    sentiment: 'positive',
    grade: 94,
  },
  {
    id: 'f2',
    mentor: 'Priya Shah',
    initials: 'PS',
    date: 'on Portfolio Page · yesterday',
    subject: 'Portfolio Page',
    body: 'Great use of CSS grid. The nav breaks at 768–900px — fix the media query and you\'re shipping this.',
    sentiment: 'constructive',
    grade: 'A',
  },
];

// ── Admin data ────────────────────────────────────────────────────────────────

export const COHORT_HEALTH: CohortHealth = {
  onTrack: 152,
  atRisk: 23,
  critical: 9,
  totalStudents: 184,
  attendance: 94,
  nps: 71,
  onTrackCount: 152,
};

export const ATTENDANCE_HISTORY: AttendancePoint[] = [
  { label: '1',  percent: 96 }, { label: '2',  percent: 94 },
  { label: '3',  percent: 97 }, { label: '4',  percent: 92 },
  { label: '5',  percent: 95 }, { label: '6',  percent: 98 },
  { label: '7',  percent: 96 }, { label: '8',  percent: 93 },
  { label: '9',  percent: 95 }, { label: '10', percent: 97 },
  { label: '11', percent: 99 }, { label: '12', percent: 94 },
  { label: '13', percent: 96 }, { label: '14', percent: 98 },
];

export const STUDENT_TABLE: StudentRow[] = [
  { id: 's1', name: 'Sana Reddy',    initials: 'SR', email: 'sana@example.com',   progress: 18, currentModule: 'Module 02', attendance: 62, risk: 'red',    paymentDone: false },
  { id: 's2', name: 'Dev Iyer',      initials: 'DI', email: 'dev@example.com',    progress: 29, currentModule: 'Module 03', attendance: 78, risk: 'yellow', paymentDone: true  },
  { id: 's3', name: 'Aarav Kumar',   initials: 'AK', email: 'aarav@example.com',  progress: 37, currentModule: 'Module 08', attendance: 96, risk: 'green',  paymentDone: true  },
  { id: 's4', name: 'Meera Pillai',  initials: 'MP', email: 'meera@example.com',  progress: 41, currentModule: 'Module 08', attendance: 98, risk: 'green',  paymentDone: true  },
  { id: 's5', name: 'Nikhil Verma',  initials: 'NV', email: 'nikhil@example.com', progress: 34, currentModule: 'Module 07', attendance: 88, risk: 'green',  paymentDone: false },
  { id: 's6', name: 'Zara Khan',     initials: 'ZK', email: 'zara@example.com',   progress: 24, currentModule: 'Module 02', attendance: 71, risk: 'yellow', paymentDone: true  },
];

export const GRADING_QUEUE: GradingItem[] = [
  { id: 'g1', studentName: 'Aarav Kumar',  initials: 'AK', assignmentTitle: 'JS Quiz App',    module: 'Module 05', submittedAt: '2h ago',   priority: 'high',   status: 'due'      },
  { id: 'g2', studentName: 'Sana Reddy',   initials: 'SR', assignmentTitle: 'GitHub Finder',  module: 'M05',       submittedAt: '4h ago',   priority: 'high',   status: 'late'     },
  { id: 'g3', studentName: 'Dev Iyer',     initials: 'DI', assignmentTitle: 'CSS Layout',     module: 'M02',       submittedAt: '6h ago',   priority: 'normal', status: 'pending'  },
  { id: 'g4', studentName: 'Meera Pillai', initials: 'MP', assignmentTitle: 'Portfolio',      module: 'M03',       submittedAt: 'yesterday', priority: 'normal', status: 'resubmit' },
  { id: 'g5', studentName: 'Nikhil Verma', initials: 'NV', assignmentTitle: 'React Basics',  module: 'M07',       submittedAt: 'yesterday', priority: 'normal', status: 'pending'  },
];

export const TODAY_SCHEDULE: ScheduleItem[] = [
  { id: 'sc1', time: '2:00 PM',  title: 'Office Hours · Module 08',       subtitle: 'drop-in · 12 students RSVP · breakout rooms ready',            type: 'office-hours', enrolled: 12  },
  { id: 'sc2', time: '6:00 PM',  title: 'React Hooks · Deep Dive',        subtitle: 'useEffect · useMemo · useCallback · custom hooks · 184 enrolled', type: 'live',         enrolled: 184, isNow: true },
  { id: 'sc3', time: '8:30 PM',  title: 'Code Review · JS Quiz App',      subtitle: 'group of 8 · async · recording on',                             type: 'review',       enrolled: 8   },
  { id: 'sc4', time: '10:00 PM', title: 'Mentor Sync · Priya + team',     subtitle: 'weekly · agenda shared',                                        type: 'sync'                         },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: 'ac1', actor: 'Aarav Kumar',  action: 'submitted',   target: 'JS Quiz App',           time: '2h',   type: 'submit'      },
  { id: 'ac2', actor: 'Meera Pillai', action: 'completed',   target: 'Module 07 · React Basics', time: '3h', type: 'complete'    },
  { id: 'ac3', actor: 'Dev Iyer',     action: 'asked in',    target: '#css-layout',            time: '4h',   type: 'join'        },
  { id: 'ac4', actor: 'Sana Reddy',   action: 'missed',      target: '2nd class this week',   time: '5h',   type: 'risk'        },
  { id: 'ac5', actor: 'Class',        action: 'scheduled',   target: 'Module 08 · Hooks',     time: '6h',   type: 'schedule'    },
  { id: 'ac6', actor: '27 applications', action: 'received for', target: '2026-B',            time: '8h',   type: 'application' },
  { id: 'ac7', actor: 'Priya Shah',   action: 'graded',      target: '6 submissions',         time: 'yday', type: 'grade'       },
];
