import { User, UserRole, Student, Package, Lesson, LessonStatus, Sponsor, Event, GalleryItem, TeamMember, Conversation, Message, SwingAnalysisRequest, SwingAnalysisStatus } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Onboarding', path: '/onboarding' },
  { name: 'Contact', path: '/contact' },
];

export const MOCK_USERS: User[] = [
  { id: 'user_parent_1', name: 'Jane Doe', email: 'jane.doe@example.com', role: UserRole.Parent, phone: '123-456-7890', prefersPushNotifications: true, whatsappNumber: '+11234567890' },
  { id: 'user_parent_2', name: 'Carlos Gomez', email: 'carlos.gomez@example.com', role: UserRole.Parent, phone: '555-123-4567', prefersPushNotifications: false },
  { id: 'user_coach_1', name: 'Coach David', email: 'coach.david@tyga.com', role: UserRole.Admin, phone: '987-654-3210', telegramId: '@CoachDavid_TYGA' },
];

export const MOCK_USER: User = MOCK_USERS.find(u => u.role === UserRole.Parent)!;
export const MOCK_COACH: User = MOCK_USERS.find(u => u.role === UserRole.Admin)!;


export const MOCK_PACKAGES: Package[] = [
  { id: 'pkg1', name: 'Starter', lessonsPerMonth: 4, price: 1500, description: 'Perfect for beginners, focusing on fundamentals.' },
  { id: 'pkg2', name: 'Competitor', lessonsPerMonth: 8, price: 2800, description: 'For dedicated players aiming for tournaments.' },
  { id: 'pkg3', name: 'Elite', lessonsPerMonth: 12, price: 4000, description: 'Intensive training for future professionals.' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 'stu1', name: 'Leo Doe', age: 12, grade: '7th', parentId: 'user_parent_1', packageId: 'pkg2', photoUrl: 'https://picsum.photos/seed/leo/200' },
  { id: 'stu2', name: 'Mia Doe', age: 9, grade: '4th', parentId: 'user_parent_1', packageId: 'pkg1', photoUrl: 'https://picsum.photos/seed/mia/200' },
  { id: 'stu3', name: 'Sofia Gomez', age: 14, grade: '9th', parentId: 'user_parent_2', packageId: 'pkg3', photoUrl: 'https://picsum.photos/seed/sofia/200' },
];

export const MOCK_LESSONS: Lesson[] = [
    { id: 'les1', date: '2024-07-28', timeSlot: '10:00 AM', studentId: 'stu1', coachId: 'user_coach_1', status: LessonStatus.Approved },
    { id: 'les2', date: '2024-07-29', timeSlot: '02:00 PM', studentId: 'stu2', coachId: 'user_coach_1', status: LessonStatus.Pending },
    { id: 'les3', date: '2024-07-25', timeSlot: '11:00 AM', studentId: 'stu3', coachId: 'user_coach_1', status: LessonStatus.Completed },
];

export const MOCK_SPONSORS: Sponsor[] = [
  { id: 'sp1', name: 'Zodwa Khoza Foundation', logoUrl: '/sponsors/sponsor1.png', website: '#' },
  { id: 'sp2', name: 'City of Johannesburg', logoUrl: '/sponsors/sponsor2.jpg', website: '#' },
  { id: 'sp3', name: 'Pay it Forward Jozi', logoUrl: '/sponsors/sponsor3.png', website: '#' },
  { id: 'sp4', name: 'Dept of Sports & Recreation', logoUrl: '/sponsors/sponsor4.jpeg', website: '#' },
  { id: 'sp5', name: 'Johannesburg Country Club', logoUrl: '/sponsors/sponsor5.jpeg', website: '#' },
];

export const MOCK_EVENTS: Event[] = [
  { 
    id: 'evt1', 
    title: 'Weekly Lessons', 
    date: 'Ongoing Enrollment', 
    imageUrl: '/events/weekly-lessons.jpeg', 
    posterUrl: '/events/weekly-lessons.jpeg',
    description: `Our training program is tailored to school-going students' needs and interests. We incorporate technology into every session, with facilities including:
    - Putting Green
    - Driving Range Nets
    - Digital Tracking and Analysis using launch monitors and swing trackers
    
    Our custom app allows parents, coaches, and students to manage competition preparation, goals, communication, and video analysis. Parents can remotely view communications between the student and coach, and manage payments and donations.` 
  },
  { 
    id: 'evt2', 
    title: 'Golf Day', 
    date: 'August 15, 2025', 
    imageUrl: '/events/golf-day.png', 
    posterUrl: '/events/golf-day.png',
    description: `Join us for our annual Golf Day — a day of friendly competition, clinics, and community. We host this event in partnership with local schools and organizations to promote golf and raise funds for youth development.
    
    The day's activities include:
    - Golf clinics and introductory sessions
    - Putting and chipping competitions with exciting prizes
    - A showcase of our students' talents
    - Networking with partners and sponsors
    - The winner receives a golfing scholarship and a prize donated to their school
    
    This is our flagship fundraising and awareness event. Come be part of something transformative.` 
  },
  { 
    id: 'evt3', 
    title: 'TYGA Launch', 
    date: 'January 20, 2026', 
    imageUrl: '/events/tyga-poster.png', 
    posterUrl: '/events/tyga-poster.png',
    description: `Celebrating the launch of the Thipe Youth Golf Academy! This landmark event marks a new chapter in our mission to introduce golf in township schools and develop young leaders through sport.
    
    The event will feature:
    - A keynote address from our founder, Dennis Ndau
    - Announcements of new programs and partnerships with key organizations
    - A formal introduction of our coaching staff and leadership team
    - An exclusive workshop on discipline, focus, and career planning
    
    Our launch reinforces our commitment to youth development, equipping students with life skills that are transferable to any career path. Be part of the moment we tee off our future.` 
  },
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 'gal1', imageUrl: '/gallery/gallery-1.jpeg', caption: 'TYGA in action on the course.', uploadDate: '2025-06-25' },
  { id: 'gal2', imageUrl: '/gallery/gallery-2.jpeg', caption: 'Young golfers taking aim.', uploadDate: '2025-06-25' },
  { id: 'gal3', imageUrl: '/gallery/gallery-3.jpeg', caption: 'Practice makes perfect.', uploadDate: '2025-06-25' },
  { id: 'gal4', imageUrl: '/gallery/gallery-4.jpeg', caption: 'Learning the fundamentals.', uploadDate: '2025-06-25' },
  { id: 'gal5', imageUrl: '/gallery/gallery-5.jpeg', caption: 'Team TYGA on the green.', uploadDate: '2025-06-25' },
  { id: 'gal6', imageUrl: '/gallery/gallery-6.jpeg', caption: 'Focused swing practice.', uploadDate: '2025-06-25' },
  { id: 'gal7', imageUrl: '/gallery/gallery-7.jpeg', caption: 'Junior golf development.', uploadDate: '2025-06-25' },
  { id: 'gal8', imageUrl: '/gallery/gallery-8.jpeg', caption: 'Coaching session in progress.', uploadDate: '2025-06-25' },
  { id: 'gal9', imageUrl: '/gallery/gallery-9.jpeg', caption: 'On the fairway together.', uploadDate: '2025-06-25' },
  { id: 'gal10', imageUrl: '/gallery/gallery-10.jpeg', caption: 'Building future champions.', uploadDate: '2025-06-25' },
  { id: 'gal11', imageUrl: '/gallery/gallery-11.jpeg', caption: 'Group training day.', uploadDate: '2025-06-25' },
  { id: 'gal12', imageUrl: '/gallery/gallery-12.jpeg', caption: 'Mastering the short game.', uploadDate: '2025-06-25' },
  { id: 'gal13', imageUrl: '/gallery/gallery-13.jpeg', caption: 'Putting practice session.', uploadDate: '2025-06-25' },
  { id: 'gal14', imageUrl: '/gallery/gallery-14.jpeg', caption: 'TYGA students and coaches.', uploadDate: '2025-06-25' },
  { id: 'gal15', imageUrl: '/gallery/gallery-15.jpeg', caption: 'Swing analysis in action.', uploadDate: '2025-06-25' },
  { id: 'gal16', imageUrl: '/gallery/gallery-16.jpeg', caption: 'Community and camaraderie.', uploadDate: '2025-06-25' },
  { id: 'gal17', imageUrl: '/gallery/gallery-17.jpeg', caption: 'Learning together on the course.', uploadDate: '2025-06-25' },
  { id: 'gal18', imageUrl: '/gallery/gallery-18.jpeg', caption: 'Golf skills development.', uploadDate: '2025-06-25' },
  { id: 'gal19', imageUrl: '/gallery/gallery-19.jpeg', caption: 'Youth golf league action.', uploadDate: '2025-06-25' },
  { id: 'gal20', imageUrl: '/gallery/gallery-20.jpeg', caption: 'Team photo session.', uploadDate: '2025-06-25' },
  { id: 'gal21', imageUrl: '/gallery/gallery-21.jpeg', caption: 'TYGA training facility.', uploadDate: '2025-06-25' },
  { id: 'gal22', imageUrl: '/gallery/gallery-22.jpeg', caption: 'Celebrating progress together.', uploadDate: '2025-06-25' },
];

export const MOCK_TEAM: TeamMember[] = [
    { id: 'team1', name: 'Dennis Ndau', role: 'Founder', bio: 'Founder of TYGA, dedicated to empowering youth through golf and creating life-changing opportunities for the next generation.', photoUrl: '/team/dennis-ndau.png' },
    { id: 'team2', name: 'Tshiya Ngatane', role: 'Program Director', bio: 'Passionate about youth development and ensuring every student reaches their full potential on and off the course.', photoUrl: '/team/tshiya-ngatane.png' },
    { id: 'team3', name: 'Siphiwo Kobese', role: 'Head Coach', bio: 'Experienced golf professional committed to developing young talent through technical excellence and mental fortitude.', photoUrl: '/team/siphiwo-kobese.png' },
    { id: 'team4', name: 'Bonang Nkiti', role: 'Operations Manager', bio: 'Ensuring the academy runs smoothly and creates a welcoming environment for all students, parents, and partners.', photoUrl: '/team/bonang-nkiti.png' },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    contactId: 'user_coach_1',
    contactName: 'Coach David',
    contactAvatar: 'https://picsum.photos/seed/team3/200',
    messages: [
      { id: 'msg1', senderId: 'user_parent_1', recipientId: 'user_coach_1', timestamp: '2024-07-27T10:00:00Z', content: 'Hi Coach, how is Leo progressing?', read: true },
      { id: 'msg2', senderId: 'user_coach_1', recipientId: 'user_parent_1', timestamp: '2024-07-27T10:05:00Z', content: 'Hi Jane! Leo is doing great. His swing is getting more consistent. We are working on his short game this week.', read: true },
      { id: 'msg3', senderId: 'user_parent_1', recipientId: 'user_coach_1', timestamp: '2024-07-27T10:06:00Z', content: "That's wonderful to hear! He seems to be enjoying it a lot. By the way, I submitted a video for a swing analysis: [swing:swing1]", read: false },
    ],
  },
  {
    contactId: 'user_parent_2',
    contactName: 'Carlos Gomez',
    contactAvatar: 'https://picsum.photos/seed/parent2/200',
    messages: [
      { id: 'msg4', senderId: 'user_parent_2', recipientId: 'user_coach_1', timestamp: '2024-07-26T14:00:00Z', content: "Hello Coach, I have a question about Sofia's schedule for next month.", read: true },
      { id: 'msg5', senderId: 'user_coach_1', recipientId: 'user_parent_2', timestamp: '2024-07-26T14:10:00Z', content: "Hi Carlos, of course. We can discuss it. Let me check the calendar. I see her last lesson was: [lesson:les3]", read: true },
    ]
  }
];

export const MOCK_SWING_ANALYSIS_REQUESTS: SwingAnalysisRequest[] = [
  {
    id: 'swing1',
    studentId: 'stu1', // Leo Doe
    studentNotes: "I keep slicing the ball with my driver. I'm trying to keep my left arm straight but it's not working.",
    submissionDate: '2024-07-27T09:00:00Z',
    status: SwingAnalysisStatus.Pending,
  },
  {
    id: 'swing2',
    studentId: 'stu3', // Sofia Gomez
    studentNotes: "My putting is inconsistent. I'm not sure about my grip pressure.",
    submissionDate: '2024-07-25T11:30:00Z',
    status: SwingAnalysisStatus.Reviewed,
    coachFeedback: `
**AI Swing Analysis:**
Great job focusing on the details of your short game, Sofia! Grip pressure is a key element that even the pros work on constantly.

**Potential Strengths:**
By thinking about your grip, you're already ahead of the game. This shows great awareness and a desire to improve the finer points of your putting stroke.

**Areas for Improvement:**
Often, inconsistent putting comes from too much tension in the hands and arms. We want a light but firm grip. Think of holding a small bird – you don't want it to fly away, but you don't want to squeeze it. This allows the putter to swing naturally.

**Drills to Practice:**
1.  **The Fingertip Drill:** Try gripping the putter just with your fingertips. This will force you to use a lighter pressure. Hit a few short putts this way to feel the difference.
2.  **Scale of 1-10:** On a scale of 1 (barely holding on) to 10 (white knuckles), try to maintain a consistent grip pressure of about 4 or 5 throughout your entire stroke.
    `,
    reviewDate: '2024-07-26T15:00:00Z',
  },
];