
export enum UserRole {
  Visitor = 'Visitor',
  Parent = 'Parent/Guardian',
  Admin = 'Admin/Coach',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  prefersPushNotifications?: boolean;
  telegramId?: string;
  whatsappNumber?: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  parentId: string;
  packageId: string;
  photoUrl: string;
}

export interface Package {
  id: string;
  name: string;
  lessonsPerMonth: number;
  price: number;
  description: string;
}

export enum LessonStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Declined = 'Declined',
  Completed = 'Completed',
}

export interface Lesson {
  id: string;
  date: string;
  timeSlot: string;
  studentId: string;
  coachId: string;
  status: LessonStatus;
}

export interface Sponsor {
  id: string;
  name:string;
  logoUrl: string;
  website: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  posterUrl?: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  uploadDate: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  subscribed: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  timestamp: string;
  content: string;
  read: boolean;
}

export interface Conversation {
  contactId: string;
  contactName: string;
  contactAvatar: string;
  messages: Message[];
}

export enum SwingAnalysisStatus {
  Pending = 'Pending',
  Reviewed = 'Reviewed',
}

export interface SwingAnalysisRequest {
  id: string;
  studentId: string;
  studentNotes: string;
  submissionDate: string;
  status: SwingAnalysisStatus;
  coachFeedback?: string;
  aiAnalysis?: string;
  reviewDate?: string;
}