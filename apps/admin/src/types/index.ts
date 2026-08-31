export type UserRole =
  | 'SUPER_ADMIN'
  | 'FOCUS_COORDINATOR'
  | 'SECTION_LEADER'
  | 'EVENT_MANAGER'
  | 'CONTENT_MANAGER'
  | 'MEDIA_MANAGER'
  | 'STUDENT';

export type StudentStatus = 'ACTIVE' | 'GRADUATED' | 'ALUMNI' | 'INACTIVE' | 'SUSPENDED';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'WAITLISTED' | 'WITHDRAWN';

export type MemberRole = 'MEMBER' | 'ASSISTANT_LEADER' | 'LEADER';

export type AudienceType = 'PUBLIC' | 'MEMBERS_ONLY';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export type PrayerVisibility = 'LEADERS_ONLY' | 'PRAYER_TEAM' | 'ANONYMOUS_COMMUNITY';

export type ContentStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export type ResourceCategory =
  | 'BIBLE_STUDY'
  | 'SERMON'
  | 'WORSHIP'
  | 'BOOK'
  | 'DISCIPLESHIP'
  | 'DOCUMENT';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  studentProfile?: Student;
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  studentIdNumber: string;
  department: string;
  yearLevel: number;
  phoneNumber?: string;
  gender?: 'MALE' | 'FEMALE';
  dormInfo?: string;
  avatarUrl?: string;
  bio?: string;
  status: StudentStatus;
  academicYearId?: string;
}

export interface Section {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  coverImageUrl?: string;
  meetingSchedule?: string;
  meetingLocation?: string;
  maxMembers: number;
  status: ContentStatus;
  leaderName?: string;
  memberCount: number;
}

export interface SectionLeader {
  id: string;
  sectionId: string;
  studentId: string;
  studentName: string;
  title: string;
  termStart: string;
  termEnd?: string;
  isActive: boolean;
}

export interface SectionApplication {
  id: string;
  sectionId: string;
  sectionName: string;
  sectionIcon: string;
  studentId: string;
  studentName: string;
  studentDept: string;
  studentYear: number;
  gender: 'MALE' | 'FEMALE';
  phoneNumber: string;
  studentIdNumber?: string;
  dormInfo?: string;
  spiritualBackground?: string;
  motivation: string;
  skillsExperience?: string;
  experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERIENCED';
  availabilityDays: string[];
  status: ApplicationStatus;
  reviewerId?: string;
  reviewerNotes?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface SectionMember {
  id: string;
  sectionId: string;
  sectionName: string;
  studentId: string;
  studentName: string;
  role: MemberRole;
  joinedAt: string;
  isActive: boolean;
}

export interface Event {
  id: string;
  sectionId?: string;
  sectionName?: string;
  title: string;
  slug: string;
  description: string;
  venue: string;
  speakerName?: string;
  posterUrl?: string;
  startTime: string;
  endTime: string;
  audience: AudienceType;
  capacity?: number;
  status: ContentStatus;
}

export interface EventAttendance {
  id: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  scannedAt: string;
  status: AttendanceStatus;
}

export interface DailyWord {
  id: string;
  publishDate: string; // YYYY-MM-DD
  title: string;
  verseText: string;
  scriptureReference: string;
  reflection: string;
  prayer: string;
  challenge?: string;
  coverImageUrl?: string;
  status: ContentStatus;
}

export interface PrayerRequest {
  id: string;
  studentId?: string;
  authorName?: string;
  title: string;
  requestBody: string;
  visibility: PrayerVisibility;
  isAnswered: boolean;
  answeredTestimony?: string;
  prayedCount: number;
  createdAt: string;
}

export interface VolunteerLog {
  id: string;
  studentId: string;
  studentName: string;
  sectionId?: string;
  activityName: string;
  hoursServed: number;
  serviceDate: string;
  description?: string;
  isVerified: boolean;
  verifiedBy?: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  sectionId?: string;
  sectionName?: string;
  title: string;
  category: ResourceCategory;
  speakerAuthor?: string;
  fileUrl?: string;
  externalMediaUrl?: string;
  description?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  sectionId?: string;
  sectionName?: string;
  title: string;
  content: string;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Persona {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar: string;
  sectionSlug?: string; // If section leader
  studentProfile?: {
    id: string;
    studentIdNumber: string;
    department: string;
    yearLevel: number;
  };
}

