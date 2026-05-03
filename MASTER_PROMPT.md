You are an expert full-stack developer, product designer, and AI engineer.

Build a complete production-ready web application called "Smart Election Assistant" — an AI-powered civic tech platform that guides Indian citizens through the entire election process with personalized, interactive, and accessible experiences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PROJECT IDENTITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: Smart Election Assistant
Region: India (Election Commission of India data model)
Target Users: First-time voters, students (18–25), rural/semi-urban citizens, 
              citizens unfamiliar with the election process
Goal: Make every Indian citizen feel confident, informed, and empowered to vote

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧱 TECH STACK — FOLLOW EXACTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend:
  - React.js (Vite)
  - Tailwind CSS (with custom saffron/green/blue India-themed palette)
  - React Router v6
  - Zustand (global state)
  - Framer Motion (animations)
  - i18next (English + Hindi + 3 regional languages)

Backend:
  - Node.js + Express.js
  - REST API with versioning (/api/v1/)
  - JWT authentication
  - Rate limiting + helmet security headers

Database:
  - MongoDB (Mongoose ODM)
  - Redis (sessions + real-time caching)

AI Layer:
  - Anthropic Claude API (claude-sonnet-4-20250514) for chatbot
  - Tesseract.js (OCR for document verification)
  - Google Fact Check Tools API (misinformation detection)

Integrations:
  - Google Maps API (polling booth finder)
  - Google Calendar API (reminder sync)
  - Firebase Cloud Messaging (push notifications)
  - Twilio (WhatsApp + SMS simulation)
  - Zapier Webhooks (workflow automation)

Deployment:
  - Frontend: Vercel
  - Backend: Render
  - DB: MongoDB Atlas
  - Cache: Redis Cloud

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 FOLDER STRUCTURE — GENERATE THIS EXACTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

smart-election-assistant/
├── client/                          # React frontend
│   ├── public/
│   │   └── locales/                 # i18n JSON files (en, hi, ta, te, bn)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Button, Card, Badge, Modal, Loader
│   │   │   ├── layout/              # Navbar, Sidebar, Footer, MobileNav
│   │   │   ├── onboarding/          # OnboardingWizard, StepCard, ProgressBar
│   │   │   ├── dashboard/           # DashboardHome, JourneyTracker, NextSteps
│   │   │   ├── timeline/            # ElectionTimeline, DateCard, CountdownTimer
│   │   │   ├── chatbot/             # ChatWindow, MessageBubble, QuickReplies
│   │   │   ├── eligibility/         # EligibilityChecker, ResultBanner
│   │   │   ├── simulator/           # VotingSimulator, EVMScreen, VVPATPreview
│   │   │   ├── booth-finder/        # BoothMap, BoothCard, DirectionsPanel
│   │   │   ├── candidates/          # CandidateCard, ComparisonTable, AssetChart
│   │   │   ├── documents/           # DocumentUploader, OCRResult, ChecklistPanel
│   │   │   ├── notifications/       # ReminderManager, ChannelSelector, AlertCard
│   │   │   ├── quiz/                # QuizCard, BadgeDisplay, LeaderBoard
│   │   │   ├── misinformation/      # NewsChecker, CredibilityScore, SourceList
│   │   │   ├── accessibility/       # VoiceButton, SimpleModeToggle, FontSizer
│   │   │   └── volunteer/           # VolunteerHub, OpportunityCard, PortalLinks
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Timeline.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── EligibilityCheck.jsx
│   │   │   ├── VotingSimulator.jsx
│   │   │   ├── BoothFinder.jsx
│   │   │   ├── CandidateExplorer.jsx
│   │   │   ├── DocumentHelper.jsx
│   │   │   ├── Quiz.jsx
│   │   │   ├── NewsChecker.jsx
│   │   │   ├── LiveUpdates.jsx
│   │   │   └── VolunteerHub.jsx
│   │   ├── store/                   # Zustand slices
│   │   │   ├── userStore.js
│   │   │   ├── electionStore.js
│   │   │   ├── chatStore.js
│   │   │   └── uiStore.js
│   │   ├── hooks/                   # useVoiceInput, useGeolocation, useNotifications
│   │   ├── services/                # api.js, mapService.js, notificationService.js
│   │   ├── utils/                   # eligibilityUtils, dateUtils, languageUtils
│   │   ├── i18n/                    # i18next config + language files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.local
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── electionController.js
│   │   │   ├── chatController.js
│   │   │   ├── eligibilityController.js
│   │   │   ├── boothController.js
│   │   │   ├── candidateController.js
│   │   │   ├── documentController.js
│   │   │   ├── notificationController.js
│   │   │   ├── quizController.js
│   │   │   ├── misinformationController.js
│   │   │   └── volunteerController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Election.js
│   │   │   ├── Candidate.js
│   │   │   ├── Constituency.js
│   │   │   ├── ChatHistory.js
│   │   │   ├── Reminder.js
│   │   │   ├── QuizResult.js
│   │   │   └── Document.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── election.routes.js
│   │   │   ├── chat.routes.js
│   │   │   ├── eligibility.routes.js
│   │   │   ├── booth.routes.js
│   │   │   ├── candidate.routes.js
│   │   │   ├── document.routes.js
│   │   │   ├── notification.routes.js
│   │   │   ├── quiz.routes.js
│   │   │   ├── misinformation.routes.js
│   │   │   └── volunteer.routes.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── rateLimiter.middleware.js
│   │   │   ├── upload.middleware.js    # multer
│   │   │   └── errorHandler.middleware.js
│   │   ├── services/
│   │   │   ├── claudeAI.service.js    # Claude API wrapper
│   │   │   ├── ocr.service.js         # Tesseract.js
│   │   │   ├── maps.service.js        # Google Maps
│   │   │   ├── notification.service.js # Twilio + FCM
│   │   │   ├── calendar.service.js    # Google Calendar
│   │   │   ├── factCheck.service.js   # Misinformation
│   │   │   └── zapier.service.js      # Workflow automation
│   │   ├── utils/
│   │   │   ├── eligibilityChecker.js
│   │   │   ├── timelineGenerator.js
│   │   │   └── seedData.js
│   │   ├── config/
│   │   │   ├── db.js                  # MongoDB connection
│   │   │   └── redis.js               # Redis connection
│   │   └── app.js
│   ├── .env
│   └── server.js
│
├── docker-compose.yml
├── .gitignore
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 DATABASE SCHEMAS — IMPLEMENT ALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User {
  _id, name, phone, email (optional),
  age, dob, gender,
  state, district, constituency, pincode,
  voterIdNumber (hashed), aadhaarLast4 (hashed),
  isRegistered: Boolean,
  isFirstTimeVoter: Boolean,
  preferredLanguage: enum[en, hi, ta, te, bn],
  journeyStage: enum[unaware, checking_eligibility, registering,
                     registered, voting_day, voted],
  notificationPreferences: { whatsapp, sms, email, push },
  badges: [{ id, name, earnedAt }],
  createdAt, updatedAt
}

Election {
  _id, name, type: enum[lok_sabha, vidhan_sabha, local],
  state, constituencies: [String],
  phases: [{ phaseNumber, pollingDate, states }],
  registrationDeadline, resultDate,
  notificationSentDates: [Date],
  isActive: Boolean,
  officialSource: String (ECI URL)
}

Candidate {
  _id, name, party, symbol, photoUrl,
  constituency, electionId,
  education: [{ degree, institution, year }],
  criminalCases: [{ caseNumber, court, status, offence }],
  assets: { movable, immovable, liabilities, totalAssets },
  affidavitUrl, nominationDate,
  previousWins: Number, isIncumbent: Boolean
}

ChatHistory {
  _id, userId, sessionId,
  messages: [{
    role: enum[user, assistant],
    content: String,
    language: String,
    timestamp: Date,
    intent: String      // classified by AI
  }],
  userContext: {        // snapshot at session start
    journeyStage, constituency, isRegistered
  },
  createdAt
}

Document {
  _id, userId, type: enum[aadhaar, pan, voter_id, photo, address_proof],
  fileUrl, ocrExtractedText,
  verificationStatus: enum[pending, valid, invalid, needs_review],
  missingFields: [String],
  uploadedAt
}

QuizResult {
  _id, userId, quizType, score, totalQuestions,
  answers: [{ questionId, selected, correct }],
  badge: String (if earned), completedAt
}

Reminder {
  _id, userId, electionId,
  type: enum[registration_deadline, polling_day, result_day, custom],
  message, scheduledAt,
  channels: [enum[whatsapp, sms, email, push]],
  status: enum[pending, sent, failed], sentAt
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔌 API ENDPOINTS — IMPLEMENT ALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUTH
  POST   /api/v1/auth/register
  POST   /api/v1/auth/login
  POST   /api/v1/auth/verify-otp
  GET    /api/v1/auth/me

USER
  GET    /api/v1/user/profile
  PUT    /api/v1/user/profile
  PUT    /api/v1/user/journey-stage
  GET    /api/v1/user/badges

ELECTION
  GET    /api/v1/elections?state=&type=
  GET    /api/v1/elections/:id
  GET    /api/v1/elections/:id/timeline        # returns phases + key dates
  GET    /api/v1/elections/live-updates        # polling percentages

ELIGIBILITY
  POST   /api/v1/eligibility/check            # { age, citizenship, state, dob }

CHAT
  POST   /api/v1/chat/message                 # { message, sessionId, language }
  GET    /api/v1/chat/history/:sessionId
  DELETE /api/v1/chat/history/:sessionId

BOOTH
  GET    /api/v1/booths/nearby?lat=&lng=       # Returns 5 nearest booths
  GET    /api/v1/booths/search?constituency=

CANDIDATE
  GET    /api/v1/candidates?constituency=&election=
  GET    /api/v1/candidates/:id
  POST   /api/v1/candidates/compare           # { ids: [id1, id2, id3] }

DOCUMENT
  POST   /api/v1/documents/upload             # multipart/form-data
  GET    /api/v1/documents/:id/verify
  GET    /api/v1/documents/checklist          # { type: 'registration' }

NOTIFICATION
  GET    /api/v1/notifications/upcoming
  POST   /api/v1/notifications/subscribe
  POST   /api/v1/notifications/calendar-sync  # Google Calendar
  DELETE /api/v1/notifications/:id

QUIZ
  GET    /api/v1/quiz/questions?category=
  POST   /api/v1/quiz/submit
  GET    /api/v1/quiz/leaderboard

MISINFORMATION
  POST   /api/v1/misinformation/check        # { text or url }

VOLUNTEER
  GET    /api/v1/volunteer/opportunities?state=
  POST   /api/v1/volunteer/register

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 AI CHATBOT SYSTEM PROMPT — USE EXACTLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When calling the Claude API for the chatbot, use this system prompt:

"""
You are "Chayan" (चयन), a friendly, knowledgeable, and patient AI election 
assistant for Indian citizens. Your name means "selection" — symbolising the 
power of voting.

PERSONA:
- Warm, encouraging, never condescending
- Use simple language (8th grade reading level)
- Mix Hindi words naturally when speaking to Hindi users (e.g., "aapka vote 
  bahut important hai!")
- Celebrate user milestones ("Congratulations on completing registration! 🎉")

YOUR KNOWLEDGE COVERS:
1. Election Commission of India (ECI) processes and rules
2. Voter registration via voters.eci.gov.in (Form 6 for new registration)
3. How to find Voter ID (EPIC number), check name on voter list
4. EVM (Electronic Voting Machine) and VVPAT explanation in simple terms
5. Election schedule, Model Code of Conduct, polling booth etiquette
6. Rights of voters, NOTA option, postal ballot for certain categories
7. Documents needed: Aadhaar, PAN, passport, driving licence, MNREGA card 
   (any one as proof)
8. How to report electoral fraud: 1950 helpline, cVIGIL app
9. Indian democratic structure: Lok Sabha vs Vidhan Sabha vs local elections

CONTEXT AWARENESS:
You receive a userContext object with:
  - journeyStage: current stage in the voter journey
  - constituency: user's electoral constituency  
  - isRegistered: boolean
  - language: preferred language
  - previousIntents: last 5 conversation intents

Always use this context to give SPECIFIC, PERSONALISED responses. 
Never give generic answers when context is available.

INTENT HANDLING (always classify the user's intent before responding):
- eligibility_query → check age/citizenship, give clear yes/no
- registration_query → step-by-step Form 6 process
- booth_query → direct to booth finder feature
- timeline_query → show election dates for their constituency
- document_query → list accepted documents, explain each
- evm_query → explain EVM+VVPAT in simple steps with analogy
- voting_process → walk through the 7 steps of voting day
- rights_query → explain voting rights under RPA 1951
- complaint_query → guide to 1950 helpline and cVIGIL
- general_query → answer helpfully, stay election-focused
- off_topic → gently redirect to election topics

RESPONSE FORMAT:
- Keep responses under 150 words unless a step-by-step process is requested
- Use numbered lists for processes
- Bold key terms: **Voter ID**, **Form 6**, **VVPAT**
- End with a relevant follow-up question or next action suggestion
- Never make up data — say "Please check voters.eci.gov.in for the latest info"

LANGUAGE RULES:
- If language is "hi" → respond entirely in Hindi (Devanagari script)
- If language is "en" → respond in English with occasional Hindi phrases
- If language is "ta/te/bn" → respond in that regional language
- Always match the user's language from their last message if it differs 
  from their preference

IMPORTANT: You are NOT a legal advisor. For specific legal issues, always 
direct users to the ECI helpline 1950 or nearest District Election Office.
"""

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚛️ FRONTEND COMPONENTS — IMPLEMENT ALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ONBOARDING WIZARD (5 steps, animated)
   Step 1: Welcome screen with app intro + language selector
   Step 2: Basic info (name, age, state, district)
   Step 3: Voter status ("Are you registered?")
   Step 4: Contact preferences (for reminders)
   Step 5: Personalised dashboard preview
   - Progress bar at top showing current step
   - Skip option on non-critical steps
   - Store in Zustand, persist to localStorage

2. DASHBOARD
   Layout: Top banner (next election countdown) + 3-column grid
   Cards to show:
   - Journey Tracker (visual stepper: 6 stages, current highlighted)
   - Next Action Card ("Your next step: Check your name on voter list")
   - Election Timeline (mini-version, link to full page)
   - Booth Location (map thumbnail + address)
   - Candidate Summary (2-3 candidates from their constituency)
   - Quiz Challenge (daily question for gamification)
   - Notification Status (reminders configured count)
   - Live Updates ticker (if election is active)

3. AI CHATBOT
   - Full-screen chat mode + floating bubble on other pages
   - Quick reply chips: "Am I eligible?", "How do I vote?", 
     "Find my booth", "Check my registration"
   - Language switcher in chat header
   - Voice input button (Web Speech API)
   - Text-to-speech for responses (Web Speech API)
   - Typing indicator animation while AI responds
   - Streaming responses (use SSE or chunked responses)
   - Chat history persisted to backend per session

4. ELECTION TIMELINE
   - Vertical timeline with icons for each event
   - Events: Registration opens → Registration closes → 
     Candidate nomination → Polling day → Results
   - Each event: date, days remaining, status badge
   - "Add to Calendar" button (Google Calendar API)
   - Filter by election type (Lok Sabha / State / Local)

5. VOTING SIMULATOR
   Stage 1: Arrive at polling booth (map animation)
   Stage 2: Queue and document check (show accepted docs list)
   Stage 3: Get ballot slip and mark finger with ink
   Stage 4: Go to EVM → See candidates list
   Stage 5: Press button → EVM beeps + VVPAT shows slip
   Stage 6: Slip disappears in 7 seconds
   Stage 7: "You have voted!" celebration screen
   - Animated EVM component (realistic-looking)
   - VVPAT slip animation (appears, pauses 7s, drops)
   - Progress through steps with Next/Back buttons
   - Works on mobile

6. BOOTH FINDER
   - Google Maps integration (full map view)
   - Current location detection (with permission fallback to manual)
   - Show 5 nearest booths as pins + list below map
   - Each booth card: name, address, distance, estimated travel time
   - "Get Directions" opens Google Maps app
   - Booth accessibility info (wheelchair access, etc.)

7. CANDIDATE EXPLORER
   - Search/filter by constituency, party, election
   - Candidate card: photo, name, party logo, key stats
   - "Compare" button (select up to 3 candidates)
   - Comparison table: education, criminal cases, assets, 
     previous wins, incumbent status
   - Bar chart for assets comparison
   - Source link to ECI affidavit PDF

8. DOCUMENT VERIFICATION HELPER
   - Upload zone (drag-drop or camera capture)
   - Supported: Aadhaar, PAN, Voter ID, address proof, photo
   - OCR extracts: name, DOB, address
   - Checklist shows: what was found ✓, what's missing ✗
   - Suggestions: "Your Aadhaar doesn't show DOB — use your PAN instead"
   - Privacy notice prominently displayed

9. ELIGIBILITY CHECKER
   - 4-question flow (age, citizenship, mental incapacity, criminal conviction)
   - Animated result: ELIGIBLE ✅ with next steps, 
     or NOT ELIGIBLE ❌ with explanation and appeal options
   - Share result as image (for social media)

10. GAMIFIED QUIZ
    - Categories: Voting rights, ECI history, Election process, 
      Constitution, Current election facts
    - 10 questions per quiz, 30-second timer per question
    - Earn badges: "First Vote", "Constitution Scholar", 
      "EVM Expert", "Civic Champion"
    - Leaderboard (state-level and national)
    - Streak tracking (daily engagement)

11. MISINFORMATION DETECTOR
    - Paste news URL or text content
    - AI analyzes and returns: credibility score (0-100), 
      red flags found, verified sources on same topic
    - Visual: traffic light indicator (red/yellow/green)
    - "Report to ECI" button for election misinformation

12. SMART NOTIFICATIONS
    - Notification setup wizard: select channels + events
    - Available channels: WhatsApp, SMS, Email, Browser push
    - Available events: Registration deadline, Polling day 
      (3 days before, 1 day before, day of), Results day
    - Calendar sync: sync all election dates to Google Calendar
    - Zapier webhook: trigger custom workflows on events

13. ACCESSIBILITY PANEL (always accessible via FAB button)
    - Voice mode: full speech-to-text + text-to-speech
    - Simple mode: larger fonts, shorter text, icon-first UI
    - Font size controls: 3 presets (normal/large/extra-large)
    - High contrast mode toggle
    - Screen reader optimized (ARIA labels on all interactive elements)

14. LIVE ELECTION UPDATES
    - Constituency-wise polling percentage (live during election)
    - Result trends (after polling closes)
    - Winning candidate cards with margin
    - Voter turnout comparison to previous election
    - Auto-refresh every 60 seconds during election day

15. VOLUNTEER HUB
    - Opportunity types: polling booth officer, awareness volunteer, 
      SVEEP campaign, data entry volunteer
    - Filter by state, district, type
    - "Apply" links to official NVD/ECI portals
    - Training resources and handbooks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 COMPLETE USER FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. User lands on / (Landing page)
   → Hero: "Know Your Vote. Own Your Future."
   → CTA: "Start My Voter Journey" 

2. /onboarding → 5-step wizard
   → Collects: name, age, location, voter status, language, 
     notification preferences

3. /dashboard → Personalised hub
   → Shows journey stage, next action, timeline, quick access to all features

4. User explores features:
   → Checks eligibility → Gets confirmed → Dashboard updates stage
   → Reads timeline → Adds dates to calendar
   → Uses chatbot → Gets answers in their language
   → Practices voting → Completes simulator → Earns "Ready to Vote" badge
   → Uploads docs → Gets verification checklist
   → Takes quiz → Earns badges → Checks leaderboard

5. Pre-election:
   → Receives reminder 3 days before: "Polling is on [date] — here's your booth"
   → Day before: "Don't forget to bring [doc list]"
   → Day of: "Today is polling day! Your booth is 1.2km away"

6. Post-election:
   → Live result updates for their constituency
   → "Your constituency result: [winner]"
   → "Congratulations on voting!" badge

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN SYSTEM — IMPLEMENT THIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

India-Inspired Palette (add to tailwind.config.js):
  saffron: { 50: '#FFF8EC', 500: '#FF9933', 600: '#E8882A', 900: '#7A3D05' }
  indigo:  { 50: '#EEF0FF', 500: '#1F3B8E', 600: '#172D6E', 900: '#0A1535' }
  green:   { 50: '#EDFAF0', 500: '#138808', 600: '#0F6A06', 900: '#063004' }
  navy:    '#000080'   (Ashoka Chakra color)

Typography:
  - Headings: Noto Sans (covers Hindi + regional scripts)
  - Body: Inter
  - Code: JetBrains Mono

Component Conventions:
  - All cards: rounded-2xl shadow-sm border border-gray-100
  - Primary CTA: bg-saffron-500 text-white hover:bg-saffron-600
  - Secondary CTA: border-2 border-indigo-500 text-indigo-500
  - Success states: bg-green-50 text-green-900 border-green-200
  - Info badges: bg-indigo-50 text-indigo-900
  - All icons: Lucide React
  - Page transitions: Framer Motion (fade + slide up, 300ms)
  - Mobile-first: all layouts work at 375px width
  - Bottom navigation bar on mobile (5 main tabs)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 SAMPLE DATA — SEED WITH THIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sample Election (Lok Sabha 2024):
{
  name: "General Elections 2024 — Lok Sabha",
  type: "lok_sabha",
  phases: [
    { phaseNumber: 1, pollingDate: "2024-04-19", states: ["TN", "UP", "GJ"] },
    { phaseNumber: 7, pollingDate: "2024-06-01", states: ["WB", "HP"] }
  ],
  registrationDeadline: "2024-03-09",
  resultDate: "2024-06-04",
  isActive: false
}

Sample Candidates (Mumbai North):
[
  { name: "Piyush Goyal", party: "BJP", 
    criminalCases: 0, totalAssets: 142000000 },
  { name: "Bhushan Patil", party: "INC", 
    criminalCases: 1, totalAssets: 28000000 }
]

Sample Quiz Questions:
[
  { q: "At what age can an Indian citizen vote?", 
    options: ["16","18","21","25"], correct: 1 },
  { q: "What does NOTA stand for?", 
    options: ["None Of The Above","No Other Than Abstain",
              "Not On The Agenda","None Of These Alternatives"], 
    correct: 0 },
  { q: "ECI was established in which year?",
    options: ["1947","1950","1952","1956"], correct: 1 }
]

Sample Chatbot Conversations:
User: "Am I eligible to vote if I'm 17?"
Chayan: "You need to be at least 18 years old on the qualifying date 
(January 1st of the enrollment year) to vote in India. If your 18th 
birthday is coming up, you can register in advance! 
Would you like to know how to register?"

User: "मुझे voting booth कहाँ जाना है?"
Chayan: "आपका polling booth ढूंढना बहुत आसान है! 
आप voters.eci.gov.in पर जाकर अपना EPIC number डालें, 
या हमारा Booth Finder feature use करें। 
क्या आप चाहते हैं कि मैं आपके लिए nearest booth find करूँ?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 NOTIFICATION SYSTEM — IMPLEMENT THIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WhatsApp Template Messages (via Twilio):
  "Reminder: Voter registration deadline for [ELECTION] 
   is tomorrow, [DATE]. Register at: voters.eci.gov.in. 
   Helpline: 1950"
  
  "Your polling day is [DATE]. Your booth: [BOOTH_NAME], 
   [ADDRESS]. Bring: [DOC_NAME]. Report issues: cVIGIL app"

SMS Fallback (for feature phones):
  Keep under 160 characters
  Always include ECI helpline 1950

Zapier Webhooks — trigger these events:
  - user.registered → send welcome sequence
  - election.deadline.3days → send registration reminder
  - election.polling.1day → send polling prep checklist
  - user.voted → send congratulations + share prompt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 ENVIRONMENT VARIABLES — SET UP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

server/.env:
  NODE_ENV=development
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/election-assistant
  REDIS_URL=redis://localhost:6379
  JWT_SECRET=your_super_secret_key_here
  JWT_EXPIRE=7d
  ANTHROPIC_API_KEY=your_anthropic_key
  GOOGLE_MAPS_API_KEY=your_google_maps_key
  GOOGLE_CALENDAR_CLIENT_ID=your_google_calendar_client
  GOOGLE_CALENDAR_CLIENT_SECRET=your_google_calendar_secret
  FIREBASE_SERVICE_ACCOUNT_JSON=path/to/serviceAccount.json
  TWILIO_ACCOUNT_SID=your_twilio_sid
  TWILIO_AUTH_TOKEN=your_twilio_token
  TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
  ZAPIER_WEBHOOK_URL=your_zapier_webhook
  TESSERACT_LANG=eng+hin

client/.env.local:
  VITE_API_URL=http://localhost:5000/api/v1
  VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
  VITE_FIREBASE_CONFIG={"apiKey":"..."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 LOCAL SETUP — STEP BY STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Clone the repo and install dependencies:
   cd client && npm install
   cd ../server && npm install

2. Start MongoDB locally (or use MongoDB Atlas connection string)

3. Start Redis locally (or use Redis Cloud URL)

4. Add all environment variables to .env files

5. Seed the database:
   cd server && npm run seed

6. Start both servers:
   cd server && npm run dev        # runs on :5000
   cd client && npm run dev        # runs on :5173

7. Open http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 DEPLOYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend → Vercel:
  vercel --prod
  Set VITE_API_URL to your Render backend URL

Backend → Render:
  Connect GitHub repo → select /server folder
  Set all environment variables in Render dashboard
  Build command: npm install
  Start command: node server.js

Database → MongoDB Atlas:
  Create free M0 cluster
  Whitelist 0.0.0.0/0 for Render IPs
  Add connection string to MONGODB_URI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 BONUS FEATURES — ADD IF TIME PERMITS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. AI Avatar Guide
   - Animated 2D character "Chayan" using CSS animations
   - Appears during onboarding and simulator
   - Speaks using Web Speech API (text-to-speech)

2. Offline Support (PWA)
   - Service worker for caching key pages
   - Offline fallback page
   - Cache election timeline and user profile
   - Background sync for chat messages

3. AR Booth Finder (advanced)
   - Device camera + overlay showing direction to booth
   - Uses device compass + GPS

4. WhatsApp Bot Integration
   - Users can chat with Chayan directly on WhatsApp
   - Twilio WhatsApp sandbox for demo

5. Constituency Heat Map
   - D3.js choropleth showing voter turnout by constituency
   - Color-coded by party win

6. Deepfake/Fake Video Detector (hackathon gold)
   - Upload video → analyze for deepfake indicators
   - Alert if likely manipulated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 CODE QUALITY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Write comments above every function explaining what it does
- Use async/await (no raw Promise chains)
- All API calls wrapped in try/catch with proper error messages
- Loading and error states on every component
- PropTypes or TypeScript types on all React components
- All sensitive data hashed before storage (bcryptjs)
- Input validation on all API endpoints (express-validator)
- CORS configured (only allow frontend origin)
- No console.log in production (use a logger like Winston)
- ESLint + Prettier configured