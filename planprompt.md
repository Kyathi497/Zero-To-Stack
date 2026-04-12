# 📚 Educational Platform - College Development Course

## Project Overview

A full-stack educational platform for teaching web development to college students with secure payment integration, course access control, video management, and progress tracking dashboard.

**Tech Stack Target:** MERN (MongoDB, Express, React, Node.js) or equivalent
**Primary Users:** College students, instructor (you)
**Deployment:** Production-ready with real payment processing

---

## 🎯 Core Features & Requirements

### 1️⃣ Payment Gateway Integration

**Feature:** Complete payment checkout for course access eligibility

**Recommended Gateway:** **Paytm Payment Gateway** - No setup fees, no annual maintenance fees, supports UPI (free charges), credit/debit cards, and net banking. Trusted by educational platforms like PhysicsWallah

**Alternative Options (in priority order):**
- PhonePe Payment Gateway: Zero setup fee, zero annual maintenance fee, standard plan free with no hidden charges
- Cashfree: 1.6% flat fee for new merchants (limited offer until April 2026), supports 180+ payment methods, instant settlement

**Implementation Requirements:**
- Secure checkout page with amount display
- Support for UPI (primary), Cards, Net Banking
- Real-time payment verification
- Webhook integration for payment status updates
- Error handling for failed transactions
- Refund processing capability
- Payment receipt generation (email/download)

**Success Criteria:**
- Payment marked as completed in database
- Student automatically gains course eligibility
- Email confirmation sent to student
- Dashboard reflects payment status

**Database Schema:**
```
payments: {
  _id, 
  studentId, 
  amount, 
  transactionId,
  status (pending/completed/failed),
  paymentMethod,
  timestamp,
  courseName
}

students: {
  _id,
  name,
  email,
  paymentStatus (true/false),
  paymentDate,
  enrollmentDate
}
```

---

### 2️⃣ Google Meet Integration for Live Classes

**Feature:** Restricted access to Google Meet links - only paid students can join classes

**Implementation Requirements:**
- Create scheduled classes with Google Meet links
- Store meeting links securely (backend, not frontend)
- Verify student payment status before revealing link
- Send meeting link 15 minutes before class (automatic email)
- Display meeting link only to eligible students on dashboard
- Prevent paid students from sharing links (terms of service)
- Recording link for those who miss class

**Access Control Logic:**
```
IF student.paymentStatus === true AND class.startTime <= now <= class.endTime + buffer:
  SHOW meeting link
ELSE:
  SHOW message "Upgrade your account to join live classes"
```

**Additional Features:**
- Class schedule calendar view
- Countdown timer before class
- Attendance tracking (optional - manual or API integration)
- Class notes/materials downloadable only for paid students
- FAQ section for Meet link issues

**Database Schema:**
```
classes: {
  _id,
  courseName,
  classNumber,
  topic,
  date,
  startTime,
  endTime,
  meetLink (encrypted),
  recordingLink,
  materials: [fileIds],
  attendees: [studentIds],
  status (scheduled/live/completed)
}

accessLog: {
  _id,
  studentId,
  classId,
  accessTime,
  accessGranted (true/false)
}
```

---

### 3️⃣ Student Progress Dashboard

**Feature:** Syllabus completion tracking updated by instructor

**Dashboard Components:**

#### For Students:
- **Overall Progress:** Visual percentage bar showing syllabus completion
- **Module Breakdown:** 
  - List all course modules
  - Each module shows: completion %, classes attended/total
- **Class Calendar:** Upcoming and past classes with recording links
- **Stats Panel:**
  - Classes attended
  - Current streak (consecutive days of learning)
- **Personal Goals:** Student can set targets (e.g., complete X modules by date)

#### For Instructor (Admin Dashboard):
- **Class Management:**
  - Schedule new classes
  - Add/edit/delete class materials
  - Mark classes as completed
  - View attendance list

- **Syllabus Management:**
  - Define modules and topics
  - Set completion percentages for each
  - Update overall course completion status
  - Mark modules/topics as completed (this auto-updates student dashboards)

- **Progress Tracking:**
  - View all students' progress
  - Filter by completion %, payment status, activity
  - Individual student detailed view
  - Export progress reports (CSV/PDF)
  - Identify students falling behind (alert system)

- **Notifications:**
  - Send class reminders to students
  - Send automated progress updates
  - Alert students who are inactive

**Update Logic (Instructor Updates Syllabus):**
```
WHEN instructor marks "Module 2" as completed:
  - Update syllabus.modules[Module 2].completed = true
  - Recalculate overall progress percentage for ALL students
  - Trigger notification to all students: "Module 2 is now covered! Check your progress"
  - Log update in audit trail

Progress % = (Completed Modules Count / Total Modules Count) * 100
```

**Database Schema:**
```
courses: {
  _id,
  courseName,
  description,
  startDate,
  endDate,
  totalModules,
  modules: [
    {
      moduleNumber,
      title,
      description,
      topics: [topicNames],
      videosRequired: [videoIds],
      classesRequired: [classIds],
      completed (true/false),
      completionDate,
      estimatedHours
    }
  ],
  createdBy (instructorId),
  createdDate,
  lastUpdated
}

studentProgress: {
  _id,
  studentId,
  courseId,
  enrollmentDate,
  completionPercentage,
  modulesCompleted: [moduleIds],
  classesAttended: [classIds],
  lastActivityDate,
  streakDays,
  personalGoals: [
    {
      goalName,
      deadline,
      targetCompletion,
      status (pending/on-track/completed/behind)
    }
  ],
  lastUpdatedBy (instructor)
}

courseUpdates: {
  _id,
  courseId,
  updateType (module-completed/syllabus-updated/class-added),
  description,
  changes: {},
  updatedBy (instructorId),
  updatedDate,
  notificationSentTo (studentIds)
}

auditLog: {
  _id,
  action (payment-verified/class-scheduled/module-completed),
  performedBy (instructorId),
  affectedStudent (studentId - optional),
  details: {},
  timestamp
}
```

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control: Student, Instructor/Admin
- Secure password hashing (bcrypt)
- Email verification on signup
- Session management (token refresh)
- Logout with token blacklisting

---

## 📋 Database Decisions

**Primary Database:** MongoDB (document-flexible, good for evolving requirements)

**Collections:**
- users (students + instructors)
- courses
- classes
- payments
- studentProgress
- courseUpdates
- auditLog

---

## 🛡️ Security Requirements

- All payment data handled server-side only
- HTTPS enforced
- Environment variables for sensitive config
- Input validation and sanitization
- CORS properly configured
- Rate limiting on payment endpoints
- Meet links never exposed to unpaid students
- Database queries parameterized (prevent injection)
- Payment webhook signature verification

---

## 📱 UI/UX Standards

- Mobile-responsive design
- Clean, minimal dashboard interface
- Clear progress visualization (charts, progress bars)
- Intuitive navigation
- Loading states and error messages
- Accessibility (WCAG 2.1 AA standard)

---

## 🚀 Development Phases

**Phase 1 (MVP):** Payment + Student Auth + Basic Dashboard
**Phase 2:** Google Meet Integration + Class Scheduling
**Phase 3:** Advanced Analytics + Progress Tracking
**Phase 4:** Automated Notifications + Reporting

---

## 📝 Future Enhancements (On Your Signal)

- Quizzes and assessments
- Student certificates
- Discussion forums
- Peer-to-peer code review
- Analytics dashboards with insights
- Email digest of progress
- Mobile app version
- Live chat support
- Student community/social features

---

## ⚙️ Important Notes

1. **Payment Gateway Choice:** Start with **Paytm** for simplicity and zero initial costs
2. **Video Hosting:** Consider AWS S3 (pay-as-you-go, secure) or Google Cloud Storage
3. **Email Service:** Use SendGrid/Mailgun for transactional emails
4. **Instructor Control:** Keep syllabus updates simple - mark module complete, auto-notify students
5. **Testing:** Thorough testing with payment gateway sandbox before going live
6. **GDPR/Data Privacy:** Ensure compliance with local privacy laws and student data protection

---

## 📞 Communication Protocol

- Ask for clarification if requirements conflict
- Propose solutions for undefined aspects
- Suggest best practices based on similar platforms
- Request confirmation before major architectural decisions
- Share progress regularly with visual mockups/prototypes

---

## Code Quality Standards

- ESLint configured (no console logs in production)
- Prettier for consistent formatting
- Git commit messages: conventional commits
- Comments for complex logic
- Error handling on all async operations
- Validation schemas (Joi/Zod) for API inputs
- Unit tests for critical functions (auth, payments, progress calc)

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database backups setup
- [ ] Payment gateway in production mode
- [ ] HTTPS/SSL certificate
- [ ] Monitoring and logging setup
- [ ] Error tracking (Sentry/LogRocket)
- [ ] Performance optimization (CDN for videos)
- [ ] Database indexes created
- [ ] API rate limiting active
- [ ] Automated backups scheduled

---

*Last Updated: April 2026*
*Current Phase: Planning & Architecture*