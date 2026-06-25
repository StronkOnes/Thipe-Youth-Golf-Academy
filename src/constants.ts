import { User, UserRole, Student, Package, Lesson, LessonStatus, Sponsor, Event, GalleryItem, TeamMember, Conversation, Message, SwingAnalysisRequest, SwingAnalysisStatus } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sponsors', path: '/sponsors' },
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
  { id: 'sp1', name: 'GolfPro Gear', logoUrl: 'https://i.imgur.com/L12sE1g.png', website: '#' },
  { id: 'sp2', name: 'Greenway Fields', logoUrl: 'https://i.imgur.com/kS5kLdU.png', website: '#' },
  { id: 'sp3', name: 'Champion Drinks', logoUrl: 'https://i.imgur.com/k1x1s2z.png', website: '#' },
  { id: 'sp4', name: 'Future Sports Foundation', logoUrl: 'https://i.imgur.com/8QpW5gR.png', website: '#' },
];

export const MOCK_EVENTS: Event[] = [
  { 
    id: 'evt1', 
    title: 'Weekly Lessons', 
    date: 'Ongoing Enrollment', 
    imageUrl: 'https://images.unsplash.com/photo-1622447036420-a63953e34b7f?q=80&w=1740&auto=format&fit=crop', 
    posterUrl: 'https://images.unsplash.com/photo-1587174486929-2348216c52a3?q=80&w=1740&auto=format&fit=crop',
    description: `Our weekly lessons form the core of the TYGA experience. We provide structured, year-round training that focuses on consistent improvement and a deep love for the game.
    
    Each session is designed to build upon the last, ensuring a steady progression of skills. Our expert coaches work with small groups to provide personalized feedback and attention. The curriculum covers all aspects of golf, including:
    - Full Swing Mechanics
    - Short Game (Putting, Chipping, Pitching)
    - Course Management and Strategy
    - Rules and Etiquette
    - Mental Fortitude and Focus
    
    We believe that greatness is built one swing at a time. Our program is perfect for young golfers of all skill levels who are committed to learning and growing in a supportive, professional environment. Join us to build a foundation for a lifetime of success, both on and off the course.` 
  },
  { 
    id: 'evt2', 
    title: '2025 Open Day', 
    date: 'August 15, 2025', 
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1740&auto=format&fit=crop', 
    posterUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1740&auto=format&fit=crop',
    description: `Join us for a fun-filled day of golf, clinics, and meeting the coaches. Open to all aspiring young golfers, our 2025 Open Day is a fantastic opportunity for prospective students and their parents to experience the TYGA culture.
    
    Tour our state-of-the-art facilities at the Zodwa Khoza Centre and participate in introductory sessions led by our head coaches. The day's activities include:
    - Free introductory golf clinics
    - Putting and chipping competitions with exciting prizes
    - A showcase of our current students' talents
    - An information session about our programs and curriculum for the upcoming year
    - A free sausage sizzle for all attendees!
    
    This is the perfect chance to see what makes TYGA a special place for youth development. Come and discover how we are shaping the next generation of champions.` 
  },
  { 
    id: 'evt3', 
    title: '2026 TYGA Launch', 
    date: 'January 20, 2026', 
    imageUrl: 'https://images.unsplash.com/photo-1562713697-a745fb33635a?q=80&w=1740&auto=format&fit=crop', 
    posterUrl: 'https://images.unsplash.com/photo-1610623349760-536f0386013a?q=80&w=1762&auto=format&fit=crop',
    description: `Celebrating the official launch and expansion of the Thipe Youth Golf Academy! This landmark event marks a new chapter in our commitment to youth empowerment through golf.
    
    We will be joined by special guests, community leaders, and our sponsors to commemorate this milestone. The event will feature:
    - A keynote address from our founder, Johnathan Smith
    - Announcements of new programs and partnerships
    - A formal introduction of our coaching staff and leadership team
    - An exclusive workshop for our students on discipline, focus, and career planning beyond golf, with guest speakers from various professional fields.
    
    The launch event reinforces our dedication to holistic development, equipping our students with valuable life skills that are transferable to any career path they choose. Be part of the moment we tee off our future.` 
  },
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 'gal1', imageUrl: 'https://images.unsplash.com/photo-1593807318451-0375d045d58c?q=80&w=1740&auto=format&fit=crop', caption: 'Focused on the perfect putt.', uploadDate: '2024-07-10' },
  { id: 'gal2', imageUrl: 'https://images.unsplash.com/photo-1622447036398-383c5144f808?q=80&w=1740&auto=format&fit=crop', caption: 'Sharing a laugh on the fairway.', uploadDate: '2024-07-09' },
  { id: 'gal3', imageUrl: 'https://images.unsplash.com/photo-1556708599-22a38b4a20b7?q=80&w=1740&auto=format&fit=crop', caption: 'Power and precision in every swing.', uploadDate: '2024-07-08' },
  { id: 'gal4', imageUrl: 'https://images.unsplash.com/photo-1500932382256-54a7b0a726ee?q=80&w=1740&auto=format&fit=crop', caption: 'Learning the fundamentals from day one.', uploadDate: '2024-07-07' },
  { id: 'gal5', imageUrl: 'https://images.unsplash.com/photo-1616588252277-c3b04badf329?q=80&w=1740&auto=format&fit=crop', caption: 'Guidance from a coach makes all the difference.', uploadDate: '2024-07-06' },
  { id: 'gal6', imageUrl: 'https://images.unsplash.com/photo-1575429323133-c75b8e4e7e4a?q=80&w=1740&auto=format&fit=crop', caption: 'Our future champions in the making.', uploadDate: '2024-07-05' },
];

export const MOCK_TEAM: TeamMember[] = [
    { id: 'team1', name: 'Johnathan Smith', role: 'Founder & Head Coach', bio: 'A former professional golfer with a passion for youth development, Johnathan founded TYGA to create pathways to success for the next generation.', photoUrl: 'https://picsum.photos/seed/team1/400' },
    { id: 'team2', name: 'Maria Garcia', role: 'Operations Director', bio: 'Maria brings over 15 years of experience in non-profit management, ensuring TYGA runs smoothly and achieves its strategic goals.', photoUrl: 'https://picsum.photos/seed/team2/400' },
    { id: 'team3', name: 'David Chen', role: 'Senior Coach', bio: 'David is a certified coach specializing in biomechanics and mental fortitude, helping students unlock their full potential on and off the course.', photoUrl: 'https://picsum.photos/seed/team3/400' },
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