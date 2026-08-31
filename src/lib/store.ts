import {
  Persona,
  Section,
  DailyWord,
  Event,
  SectionApplication,
  SectionMember,
  PrayerRequest,
  VolunteerLog,
  Resource,
  Announcement,
  Notification,
  EventAttendance
} from '../types';
import {
  INITIAL_PERSONAS,
  INITIAL_SECTIONS,
  INITIAL_DAILY_WORDS,
  INITIAL_EVENTS,
  INITIAL_APPLICATIONS,
  INITIAL_MEMBERS,
  INITIAL_PRAYERS,
  INITIAL_VOLUNTEER_LOGS,
  INITIAL_RESOURCES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ATTENDANCES
} from './mock-data';

// Singleton in-memory & localStorage store
class FocusStore {
  private static instance: FocusStore;
  private isBrowser: boolean;

  public personas: Persona[] = INITIAL_PERSONAS;
  public activePersona: Persona = INITIAL_PERSONAS[0]; // Abdi by default
  public sections: Section[] = INITIAL_SECTIONS;
  public dailyWords: DailyWord[] = INITIAL_DAILY_WORDS;
  public events: Event[] = INITIAL_EVENTS;
  public applications: SectionApplication[] = INITIAL_APPLICATIONS;
  public members: SectionMember[] = INITIAL_MEMBERS;
  public prayers: PrayerRequest[] = INITIAL_PRAYERS;
  public volunteerLogs: VolunteerLog[] = INITIAL_VOLUNTEER_LOGS;
  public resources: Resource[] = INITIAL_RESOURCES;
  public announcements: Announcement[] = INITIAL_ANNOUNCEMENTS;
  public notifications: Notification[] = INITIAL_NOTIFICATIONS;
  public attendances: EventAttendance[] = INITIAL_ATTENDANCES;
  
  // Rotating live QR token for events
  public activeQRToken: { eventId: string; token: string; expiresAt: number } | null = null;

  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.isBrowser = typeof window !== 'undefined';
    if (this.isBrowser) {
      this.loadFromStorage();
    }
  }

  public static getInstance(): FocusStore {
    if (!FocusStore.instance) {
      FocusStore.instance = new FocusStore();
    }
    return FocusStore.instance;
  }

  private saveToStorage() {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem('ddu_focus_state_v1', JSON.stringify({
        activePersonaId: this.activePersona.id,
        sections: this.sections,
        dailyWords: this.dailyWords,
        events: this.events,
        applications: this.applications,
        members: this.members,
        prayers: this.prayers,
        volunteerLogs: this.volunteerLogs,
        announcements: this.announcements,
        notifications: this.notifications,
        attendances: this.attendances,
      }));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  private loadFromStorage() {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem('ddu_focus_state_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.sections) this.sections = parsed.sections;
        if (parsed.dailyWords) this.dailyWords = parsed.dailyWords;
        if (parsed.events) this.events = parsed.events;
        if (parsed.applications) this.applications = parsed.applications;
        if (parsed.members) this.members = parsed.members;
        if (parsed.prayers) this.prayers = parsed.prayers;
        if (parsed.volunteerLogs) this.volunteerLogs = parsed.volunteerLogs;
        if (parsed.announcements) this.announcements = parsed.announcements;
        if (parsed.notifications) this.notifications = parsed.notifications;
        if (parsed.attendances) this.attendances = parsed.attendances;
        if (parsed.activePersonaId) {
          const found = this.personas.find(p => p.id === parsed.activePersonaId);
          if (found) this.activePersona = found;
        }
      }
    } catch (e) {
      console.warn('Storage load failed:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.saveToStorage();
    this.listeners.forEach(l => l());
  }

  // --- ACTIONS ---

  public setPersona(personaId: string) {
    const found = this.personas.find(p => p.id === personaId);
    if (found) {
      this.activePersona = found;
      this.notify();
    }
  }

  // Daily Word with Fallback Logic
  public getTodayWord(): { word: DailyWord; isFallback: boolean } {
    // Current date format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    const match = this.dailyWords.find(w => w.publishDate === today && w.status === 'PUBLISHED');
    if (match) {
      return { word: match, isFallback: false };
    }

    // Fail-safe Fallback: find latest published word
    const published = this.dailyWords.filter(w => w.status === 'PUBLISHED');
    if (published.length > 0) {
      return { word: published[0], isFallback: true };
    }

    // Default static fallback
    return { word: INITIAL_DAILY_WORDS[0], isFallback: true };
  }

  public scheduleDailyWord(wordData: Omit<DailyWord, 'id'>) {
    const newWord: DailyWord = {
      ...wordData,
      id: `dw-${Date.now()}`,
    };
    this.dailyWords = [newWord, ...this.dailyWords];
    this.notify();
  }

  // Sections
  public addSection(sectionData: Omit<Section, 'id' | 'memberCount'>) {
    const newSection: Section = {
      ...sectionData,
      id: `sec-${Date.now()}`,
      memberCount: 0,
    };
    this.sections = [...this.sections, newSection];
    this.notify();
  }

  // Applications
  public applyToSection(params: {
    sectionId: string;
    studentName?: string;
    studentDept?: string;
    studentYear?: number;
    gender?: 'MALE' | 'FEMALE';
    phoneNumber?: string;
    studentIdNumber?: string;
    dormInfo?: string;
    spiritualBackground?: string;
    motivation: string;
    skillsExperience?: string;
    experienceLevel: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERIENCED';
    availabilityDays: string[];
  }): { success: boolean; message: string } {
    const sec = this.sections.find(s => s.id === params.sectionId);
    if (!sec) return { success: false, message: 'Section not found' };

    const student = this.activePersona.studentProfile;
    if (!student) return { success: false, message: 'Only registered students can apply.' };

    // Check if already active or pending
    const existing = this.applications.find(
      a => a.sectionId === params.sectionId && a.studentId === student.id && (a.status === 'PENDING' || a.status === 'APPROVED')
    );
    if (existing) {
      return {
        success: false,
        message: existing.status === 'APPROVED' ? 'You are already an approved member of this section.' : 'You already have a pending application for this section.'
      };
    }

    const newApp: SectionApplication = {
      id: `app-${Date.now()}`,
      sectionId: sec.id,
      sectionName: sec.name,
      sectionIcon: sec.icon,
      studentId: student.id,
      studentName: params.studentName || this.activePersona.name,
      studentDept: params.studentDept || student.department,
      studentYear: params.studentYear || student.yearLevel,
      gender: params.gender || 'MALE',
      phoneNumber: params.phoneNumber || '+251 91 000 0000',
      studentIdNumber: params.studentIdNumber || student.studentIdNumber,
      dormInfo: params.dormInfo || 'Main Campus',
      spiritualBackground: params.spiritualBackground || 'DDU Fellowship Member',
      motivation: params.motivation,
      skillsExperience: params.skillsExperience,
      experienceLevel: params.experienceLevel,
      availabilityDays: params.availabilityDays,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    this.applications = [newApp, ...this.applications];

    // Create notification for section leader / admin
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: 'user-yonas',
      title: `New Section Application: ${sec.name}`,
      message: `${this.activePersona.name} applied to join ${sec.name}.`,
      actionUrl: '/admin/applications',
      isRead: false,
      createdAt: new Date().toISOString(),
    });

    this.notify();
    return { success: true, message: `Application submitted for ${sec.name}! You will be notified once reviewed.` };
  }

  public reviewApplication(appId: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
    const app = this.applications.find(a => a.id === appId);
    if (!app) return;

    app.status = status;
    app.reviewerId = this.activePersona.studentProfile?.id || 'admin';
    app.reviewerNotes = notes || (status === 'APPROVED' ? 'Welcome to the team!' : 'Application declined at this time.');
    app.reviewedAt = new Date().toISOString();

    if (status === 'APPROVED') {
      // Add to members
      const existingMember = this.members.find(m => m.sectionId === app.sectionId && m.studentId === app.studentId);
      if (!existingMember) {
        this.members.push({
          id: `mem-${Date.now()}`,
          sectionId: app.sectionId,
          sectionName: app.sectionName,
          studentId: app.studentId,
          studentName: app.studentName,
          role: 'MEMBER',
          joinedAt: new Date().toISOString(),
          isActive: true,
        });

        // Increment count
        const sec = this.sections.find(s => s.id === app.sectionId);
        if (sec) sec.memberCount += 1;
      }

      // Notify student
      this.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: 'user-abdi', // If applicant was Abdi
        title: `${app.sectionName} Application Approved! 🎉`,
        message: `Your application to join ${app.sectionName} was approved. Welcome!`,
        actionUrl: '/student/sections',
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    } else {
      // Notify rejection
      this.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: 'user-abdi',
        title: `Application Update: ${app.sectionName}`,
        message: `Your application status: Rejected. Reason: ${app.reviewerNotes}`,
        actionUrl: '/student/sections',
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    }

    this.notify();
  }

  // Dynamic QR Attendance
  public generateEventQRToken(eventId: string): string {
    const randomNonce = Math.random().toString(36).substring(2, 8).toUpperCase();
    const token = `DDU-FOCUS-${eventId}-${Date.now()}-${randomNonce}`;
    this.activeQRToken = {
      eventId,
      token,
      expiresAt: Date.now() + 45 * 1000, // 45 seconds valid
    };
    return token;
  }

  public recordAttendanceWithToken(token: string): { success: boolean; message: string } {
    const student = this.activePersona.studentProfile;
    if (!student) return { success: false, message: 'Student profile required.' };

    // Validate token format
    const parts = token.split('-');
    if (parts.length < 3 || parts[0] !== 'DDU' || parts[1] !== 'FOCUS') {
      return { success: false, message: 'Invalid QR Code token.' };
    }

    const eventId = parts.slice(2, -2).join('-') || this.events[0].id;
    const evt = this.events.find(e => e.id === eventId) || this.events[0];

    // Check duplicate
    const alreadyAttended = this.attendances.find(
      a => a.eventId === evt.id && a.studentId === student.id
    );
    if (alreadyAttended) {
      return { success: false, message: `Attendance already recorded for "${evt.title}".` };
    }

    const record: EventAttendance = {
      id: `att-${Date.now()}`,
      eventId: evt.id,
      eventTitle: evt.title,
      studentId: student.id,
      studentName: this.activePersona.name,
      scannedAt: new Date().toISOString(),
      status: 'PRESENT',
    };

    this.attendances.unshift(record);
    this.notify();
    return { success: true, message: `Attendance successfully verified for "${evt.title}"! ✅` };
  }

  // Volunteers
  public logVolunteerHours(params: {
    activityName: string;
    hoursServed: number;
    serviceDate: string;
    sectionId?: string;
    description?: string;
  }) {
    const student = this.activePersona.studentProfile;
    if (!student) return;

    const newLog: VolunteerLog = {
      id: `vol-${Date.now()}`,
      studentId: student.id,
      studentName: this.activePersona.name,
      sectionId: params.sectionId,
      activityName: params.activityName,
      hoursServed: params.hoursServed,
      serviceDate: params.serviceDate,
      description: params.description,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    this.volunteerLogs.unshift(newLog);
    this.notify();
  }

  public verifyVolunteerLog(logId: string) {
    const log = this.volunteerLogs.find(l => l.id === logId);
    if (log) {
      log.isVerified = true;
      log.verifiedBy = `${this.activePersona.name} (${this.activePersona.title})`;
      this.notify();
    }
  }

  // Prayers
  public submitPrayerRequest(params: {
    title: string;
    requestBody: string;
    visibility: 'LEADERS_ONLY' | 'PRAYER_TEAM' | 'ANONYMOUS_COMMUNITY';
  }) {
    const newPrayer: PrayerRequest = {
      id: `pray-${Date.now()}`,
      studentId: this.activePersona.studentProfile?.id,
      authorName: params.visibility === 'ANONYMOUS_COMMUNITY' ? 'Anonymous Student' : this.activePersona.name,
      title: params.title,
      requestBody: params.requestBody,
      visibility: params.visibility,
      isAnswered: false,
      prayedCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.prayers.unshift(newPrayer);
    this.notify();
  }

  public incrementPrayerCount(prayerId: string) {
    const prayer = this.prayers.find(p => p.id === prayerId);
    if (prayer) {
      prayer.prayedCount += 1;
      this.notify();
    }
  }

  // Announcements
  public postAnnouncement(params: {
    title: string;
    content: string;
    priority: 'NORMAL' | 'HIGH' | 'URGENT';
    sectionId?: string;
  }) {
    const sec = params.sectionId ? this.sections.find(s => s.id === params.sectionId) : undefined;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      sectionId: params.sectionId,
      sectionName: sec?.name,
      title: params.title,
      content: params.content,
      priority: params.priority,
      createdAt: new Date().toISOString(),
    };
    this.announcements.unshift(newAnn);
    this.notify();
  }

  // Notifications
  public markNotificationRead(notifId: string) {
    const notif = this.notifications.find(n => n.id === notifId);
    if (notif) {
      notif.isRead = true;
      this.notify();
    }
  }

  public resetToDefaults() {
    this.personas = INITIAL_PERSONAS;
    this.activePersona = INITIAL_PERSONAS[0];
    this.sections = INITIAL_SECTIONS;
    this.dailyWords = INITIAL_DAILY_WORDS;
    this.events = INITIAL_EVENTS;
    this.applications = INITIAL_APPLICATIONS;
    this.members = INITIAL_MEMBERS;
    this.prayers = INITIAL_PRAYERS;
    this.volunteerLogs = INITIAL_VOLUNTEER_LOGS;
    this.announcements = INITIAL_ANNOUNCEMENTS;
    this.notifications = INITIAL_NOTIFICATIONS;
    this.attendances = INITIAL_ATTENDANCES;
    if (this.isBrowser) {
      localStorage.removeItem('ddu_focus_state_v1');
    }
    this.notify();
  }
}

export const store = FocusStore.getInstance();

