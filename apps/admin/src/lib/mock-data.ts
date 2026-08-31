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

export const INITIAL_PERSONAS: Persona[] = [
  {
    id: 'user-abdi',
    name: 'Abdi Tesfaye',
    email: 'abdi.tesfaye@ddu.edu.et',
    role: 'STUDENT',
    title: '4th Year Software Engineering Student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentProfile: {
      id: 'stu-abdi',
      studentIdNumber: 'DDU/R/1042/15',
      department: 'Software Engineering',
      yearLevel: 4,
    }
  },
  {
    id: 'user-bethelhem',
    name: 'Bethelhem Girma',
    email: 'bethelhem.g@ddu.edu.et',
    role: 'SECTION_LEADER',
    title: 'Choir Ministry Leader',
    sectionSlug: 'choir',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    studentProfile: {
      id: 'stu-bethelhem',
      studentIdNumber: 'DDU/R/0812/14',
      department: 'Civil Engineering',
      yearLevel: 5,
    }
  },
  {
    id: 'user-dawit',
    name: 'Dawit Bekele',
    email: 'dawit.bekele@ddu.edu.et',
    role: 'SECTION_LEADER',
    title: 'EVAN Outreach Leader',
    sectionSlug: 'evan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    studentProfile: {
      id: 'stu-dawit',
      studentIdNumber: 'DDU/R/0920/14',
      department: 'Electrical Engineering',
      yearLevel: 5,
    }
  },
  {
    id: 'user-sara',
    name: 'Sara Hailu',
    email: 'sara.hailu@ddu.edu.et',
    role: 'SECTION_LEADER',
    title: 'Charity & Service Leader',
    sectionSlug: 'charity',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    studentProfile: {
      id: 'stu-sara',
      studentIdNumber: 'DDU/R/1105/15',
      department: 'Public Health',
      yearLevel: 4,
    }
  },
  {
    id: 'user-yonas',
    name: 'Yonas Solomon',
    email: 'yonas.solomon@ddu.edu.et',
    role: 'SUPER_ADMIN',
    title: 'DDU FOCUS Executive Coordinator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    studentProfile: {
      id: 'stu-yonas',
      studentIdNumber: 'DDU/R/0510/13',
      department: 'Medicine & Health Sciences',
      yearLevel: 6,
    }
  }
];

export const INITIAL_SECTIONS: Section[] = [
  {
    id: 'sec-choir',
    name: 'Choir Ministry',
    slug: 'choir',
    description: 'Leading the campus in worship, choral excellence, and spiritual music ministering to student souls.',
    icon: 'Music',
    coverImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    meetingSchedule: 'Fridays at 6:00 PM & Sundays at 2:00 PM',
    meetingLocation: 'Hall B / Main Fellowship Sanctuary',
    maxMembers: 60,
    status: 'PUBLISHED',
    leaderName: 'Bethelhem Girma',
    memberCount: 32,
  },
  {
    id: 'sec-evan',
    name: 'EVAN Team',
    slug: 'evan',
    description: 'Passionate campus evangelism, dorm outreach, one-on-one student discipleship, and spiritual conversations.',
    icon: 'BookOpen',
    coverImageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    meetingSchedule: 'Tuesdays at 5:30 PM & Saturdays at 9:00 AM',
    meetingLocation: 'DDU Stadium Pavillion & Dorm Quad',
    maxMembers: 50,
    status: 'PUBLISHED',
    leaderName: 'Dawit Bekele',
    memberCount: 25,
  },
  {
    id: 'sec-lad',
    name: 'LAD (Brothers Fellowship)',
    slug: 'lad',
    description: 'Building godly young men of integrity, brotherhood, spiritual discipline, and campus leadership.',
    icon: 'Shield',
    coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    meetingSchedule: 'Wednesdays at 6:00 PM',
    meetingLocation: 'Block 43, Room 102',
    maxMembers: 45,
    status: 'PUBLISHED',
    leaderName: 'Natnael Kebede',
    memberCount: 28,
  },
  {
    id: 'sec-sista',
    name: 'SISTA (Sisters Fellowship)',
    slug: 'sista',
    description: 'Empowering young women in faith, virtue, prayer, mutual encouragement, and campus support.',
    icon: 'HeartHandshake',
    coverImageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80',
    meetingSchedule: 'Thursdays at 5:30 PM',
    meetingLocation: 'Block 21, Seminar Room',
    maxMembers: 45,
    status: 'PUBLISHED',
    leaderName: 'Hanna Mekonnen',
    memberCount: 31,
  },
  {
    id: 'sec-facility',
    name: 'Facility & Technical Service',
    slug: 'facility',
    description: 'Ensuring seamless worship experiences through venue preparation, acoustics, projection, and logistics.',
    icon: 'Settings',
    coverImageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    meetingSchedule: 'Fridays at 4:30 PM (Pre-fellowship setup)',
    meetingLocation: 'Main Fellowship Hall & Audio Booth',
    maxMembers: 30,
    status: 'PUBLISHED',
    leaderName: 'Eyob Tadesse',
    memberCount: 18,
  },
  {
    id: 'sec-charity',
    name: 'Charity & Social Responsibility',
    slug: 'charity',
    description: 'Serving vulnerable university students, local Dire Dawa community outreaches, hospital visits, and donation drives.',
    icon: 'Heart',
    coverImageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    meetingSchedule: 'Saturdays at 2:30 PM',
    meetingLocation: 'Student Union Lounge',
    maxMembers: 50,
    status: 'PUBLISHED',
    leaderName: 'Sara Hailu',
    memberCount: 40,
  }
];

export const INITIAL_DAILY_WORDS: DailyWord[] = [
  {
    id: 'dw-today',
    publishDate: '2026-08-31',
    title: 'BE STRONG & COURAGEOUS',
    verseText: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
    scriptureReference: 'Joshua 1:9 (NIV)',
    reflection: 'As university students navigating intense academics, future uncertainties, and campus pressures, fear can easily cloud our vision. God reminds Joshua—and each of us at DDU—that courage is not the absence of obstacles, but the assurance of His unfailing presence. When you step into lecture halls, labs, or exam halls, you do not walk alone.',
    prayer: 'Heavenly Father, grant me the courage to stand firm in my faith amidst campus challenges. Remind me today that your strength is made perfect in my weakness. Empower me to be a beacon of hope to fellow students. Amen.',
    challenge: 'Encourage at least one fellow classmate or dorm roommate today with a word of life and hope.',
    coverImageUrl: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&auto=format&fit=crop&q=80',
    status: 'PUBLISHED'
  },
  {
    id: 'dw-tomorrow',
    publishDate: '2026-09-01',
    title: 'THE POWER OF FAITH',
    verseText: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    scriptureReference: 'Hebrews 11:1 (NIV)',
    reflection: 'Faith anchors our heart when our human understanding is limited. Trusting God with your semester, your projects, and your future career is where true peace begins.',
    prayer: 'Lord, increase my faith. Help me fix my eyes not on temporary circumstances, but on Your eternal promises. In Jesus’ name, Amen.',
    challenge: 'Spend 10 quiet minutes in morning prayer dedicating your academic semester to God.',
    status: 'SCHEDULED'
  },
  {
    id: 'dw-day3',
    publishDate: '2026-09-02',
    title: 'UNFAILING LOVE',
    verseText: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
    scriptureReference: '1 Corinthians 13:4 (NIV)',
    reflection: 'True Christian community at DDU is built when we put others first. Love is visible in our patience with roommates and kindness to struggling peers.',
    prayer: 'Lord Jesus, fill my heart with Your agape love. Let Your compassion flow through my words and actions today. Amen.',
    challenge: 'Perform a secret act of service or kindness for someone in your dormitory block.',
    status: 'SCHEDULED'
  },
  {
    id: 'dw-fallback',
    publishDate: '2026-08-30',
    title: 'WALKING IN WISDOM',
    verseText: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    scriptureReference: 'Proverbs 3:5-6 (NIV)',
    reflection: 'Wisdom begins with surrender. When we acknowledge God in our studies and daily choices, He directs our footsteps into purposeful growth.',
    prayer: 'Lord, guide my thoughts, decisions, and interactions today. Direct my path according to Your divine will. Amen.',
    challenge: 'Share a scripture verse that blessed you with a friend today.',
    status: 'PUBLISHED'
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'evt-friday-fellowship',
    title: 'General Campus Fellowship: "Living with Divine Purpose"',
    slug: 'general-fellowship-friday',
    description: 'Join hundreds of DDU students for powerful praise & worship, inspiring scripture preaching, and warm Christian fellowship.',
    venue: 'Main University Auditorium (Old Hall)',
    speakerName: 'Pastor Yohannes Alemayehu',
    startTime: '2026-09-04T17:00:00+03:00',
    endTime: '2026-09-04T19:30:00+03:00',
    audience: 'PUBLIC',
    capacity: 450,
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    status: 'PUBLISHED'
  },
  {
    id: 'evt-choir-practice',
    sectionId: 'sec-choir',
    sectionName: 'Choir Ministry',
    title: 'Choir Intensive Vocal Rehearsal & Worship Prep',
    slug: 'choir-rehearsal-friday',
    description: 'Closed intensive vocal practice for approved Choir members preparing Sunday service anthems.',
    venue: 'Hall B - Music Sanctuary',
    speakerName: 'Bethelhem Girma (Choir Lead)',
    startTime: '2026-09-04T18:00:00+03:00',
    endTime: '2026-09-04T20:00:00+03:00',
    audience: 'MEMBERS_ONLY',
    capacity: 60,
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
    status: 'PUBLISHED'
  },
  {
    id: 'evt-evan-outreach',
    sectionId: 'sec-evan',
    sectionName: 'EVAN Team',
    title: 'Campus Dorm-to-Dorm Outreach & Prayer Walk',
    slug: 'campus-dorm-outreach',
    description: 'Sharing gospel tracts, engaging students in friendly spiritual discussions, and praying for semester exams.',
    venue: 'Block 20 & 40 Courtyard',
    speakerName: 'Dawit Bekele',
    startTime: '2026-09-05T09:00:00+03:00',
    endTime: '2026-09-05T12:00:00+03:00',
    audience: 'PUBLIC',
    capacity: 100,
    posterUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    status: 'PUBLISHED'
  },
  {
    id: 'evt-charity-visit',
    sectionId: 'sec-charity',
    sectionName: 'Charity & Social Responsibility',
    title: 'Dire Dawa Children Center Hope Outreach',
    slug: 'children-center-visit',
    description: 'Community service visit providing school supplies, tutoring, singing, and joy to local children.',
    venue: 'Sabian Children Center, Dire Dawa',
    speakerName: 'Sara Hailu',
    startTime: '2026-09-06T14:00:00+03:00',
    endTime: '2026-09-06T18:00:00+03:00',
    audience: 'PUBLIC',
    capacity: 40,
    posterUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    status: 'PUBLISHED'
  }
];

export const INITIAL_APPLICATIONS: SectionApplication[] = [
  {
    id: 'app-abdi-choir',
    sectionId: 'sec-choir',
    sectionName: 'Choir Ministry',
    sectionIcon: 'Music',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    studentDept: 'Software Engineering',
    studentYear: 4,
    gender: 'MALE',
    phoneNumber: '+251 91 102 3456',
    studentIdNumber: 'DDU/R/1042/15',
    dormInfo: 'Block 43, Room 204',
    spiritualBackground: 'Active member of youth worship team since 2022',
    motivation: 'I have a deep passion for worship music and singing tenor. I want to serve the Lord with my voice in campus fellowship.',
    skillsExperience: '3 years singing in local youth choir; basic keyboard understanding.',
    experienceLevel: 'INTERMEDIATE',
    availabilityDays: ['Friday', 'Sunday'],
    status: 'APPROVED',
    reviewerId: 'stu-bethelhem',
    reviewerNotes: 'Welcome to the Choir family, Abdi! Vocal audition passed.',
    reviewedAt: '2026-08-25T14:30:00+03:00',
    createdAt: '2026-08-24T10:15:00+03:00'
  },
  {
    id: 'app-abdi-charity',
    sectionId: 'sec-charity',
    sectionName: 'Charity & Social Responsibility',
    sectionIcon: 'Heart',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    studentDept: 'Software Engineering',
    studentYear: 4,
    gender: 'MALE',
    phoneNumber: '+251 91 102 3456',
    studentIdNumber: 'DDU/R/1042/15',
    dormInfo: 'Block 43, Room 204',
    spiritualBackground: 'DDU FOCUS member for 3 years',
    motivation: 'I want to participate actively in community outreach and help coordinate donation drives for needy students on campus.',
    skillsExperience: 'Organized food support in high school; logistics coordinator.',
    experienceLevel: 'INTERMEDIATE',
    availabilityDays: ['Saturday'],
    status: 'PENDING',
    createdAt: '2026-08-30T16:20:00+03:00'
  },
  {
    id: 'app-kalkidan-evan',
    sectionId: 'sec-evan',
    sectionName: 'EVAN Team',
    sectionIcon: 'BookOpen',
    studentId: 'stu-kalkidan',
    studentName: 'Kalkidan Assefa',
    studentDept: 'Mechanical Engineering',
    studentYear: 3,
    gender: 'FEMALE',
    phoneNumber: '+251 92 334 5566',
    studentIdNumber: 'DDU/R/1820/16',
    dormInfo: 'Block 21, Room 108',
    spiritualBackground: 'Fresh from high school fellowship discipleship',
    motivation: 'I want to learn how to effectively share the gospel with my classmates and overcome fear in evangelism.',
    skillsExperience: 'Attended basic discipleship class.',
    experienceLevel: 'BEGINNER',
    availabilityDays: ['Tuesday', 'Saturday'],
    status: 'PENDING',
    createdAt: '2026-08-31T11:00:00+03:00'
  }
];

export const INITIAL_MEMBERS: SectionMember[] = [
  {
    id: 'mem-abdi-choir',
    sectionId: 'sec-choir',
    sectionName: 'Choir Ministry',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    role: 'MEMBER',
    joinedAt: '2026-08-25T14:30:00+03:00',
    isActive: true
  },
  {
    id: 'mem-bethelhem-choir',
    sectionId: 'sec-choir',
    sectionName: 'Choir Ministry',
    studentId: 'stu-bethelhem',
    studentName: 'Bethelhem Girma',
    role: 'LEADER',
    joinedAt: '2025-09-01T08:00:00+03:00',
    isActive: true
  }
];

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pray-1',
    studentId: 'stu-abdi',
    authorName: 'Abdi Tesfaye',
    title: 'Pray for Graduation Project & Spiritual Clarity',
    requestBody: 'Please join me in prayer for divine wisdom as our team builds our final semester software capstone project and for job opportunities post-graduation.',
    visibility: 'ANONYMOUS_COMMUNITY',
    isAnswered: false,
    prayedCount: 18,
    createdAt: '2026-08-29T10:00:00+03:00'
  },
  {
    id: 'pray-2',
    studentId: 'stu-anonymous-1',
    authorName: 'A DDU Student',
    title: 'Healing for My Family Back Home',
    requestBody: 'Requesting prayer for my mother who is undergoing surgery in Addis Ababa. Praying for peace of mind while I focus on exams.',
    visibility: 'ANONYMOUS_COMMUNITY',
    isAnswered: false,
    prayedCount: 34,
    createdAt: '2026-08-30T14:15:00+03:00'
  },
  {
    id: 'pray-3',
    studentId: 'stu-abdi',
    authorName: 'Abdi Tesfaye',
    title: 'Personal Pastoral Counseling & Guidance',
    requestBody: 'Confidential request for pastoral leaders regarding family struggles and staying focused in Christian walk on campus.',
    visibility: 'LEADERS_ONLY',
    isAnswered: false,
    prayedCount: 3,
    createdAt: '2026-08-28T09:00:00+03:00'
  }
];

export const INITIAL_VOLUNTEER_LOGS: VolunteerLog[] = [
  {
    id: 'vol-1',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    sectionId: 'sec-charity',
    activityName: 'Campus Clean-up & Tree Planting Initiative',
    hoursServed: 4.5,
    serviceDate: '2026-08-20',
    description: 'Participated in fellowship environmental stewardship day, cleaning dorm surroundings and planting 15 trees.',
    isVerified: true,
    verifiedBy: 'Sara Hailu (Charity Leader)',
    createdAt: '2026-08-21T10:00:00+03:00'
  },
  {
    id: 'vol-2',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    sectionId: 'sec-charity',
    activityName: 'Freshman Orientation Book & Supply Distribution',
    hoursServed: 5.0,
    serviceDate: '2026-08-26',
    description: 'Helped welcome incoming 1st-year students, distributed study Bibles, notebooks, and campus direction maps.',
    isVerified: true,
    verifiedBy: 'Sara Hailu (Charity Leader)',
    createdAt: '2026-08-27T12:00:00+03:00'
  },
  {
    id: 'vol-3',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    sectionId: 'sec-facility',
    activityName: 'Annual Conference Sound & Stage Setup',
    hoursServed: 3.5,
    serviceDate: '2026-08-30',
    description: 'Assisted audio technicians with cable management, mixer calibration, and chair arrangement.',
    isVerified: false,
    createdAt: '2026-08-31T09:00:00+03:00'
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Discipleship Foundations: Walking with Christ on Campus',
    category: 'DISCIPLESHIP',
    speakerAuthor: 'DDU FOCUS Pastoral Council',
    fileUrl: '#',
    description: 'A 6-week structured foundational guide for university students seeking deep root in spiritual disciplines.',
    createdAt: '2026-08-15'
  },
  {
    id: 'res-2',
    title: 'Overcoming Academic Anxiety & Finding Rest in God',
    category: 'SERMON',
    speakerAuthor: 'Dr. Samuel Bekele',
    externalMediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Audio & video recording of the semester opening sermon addressing mental health, study habits, and faith.',
    createdAt: '2026-08-22'
  },
  {
    id: 'res-3',
    title: 'Inductive Bible Study Guide: The Book of Philippians',
    category: 'BIBLE_STUDY',
    speakerAuthor: 'EVAN Team Discipleship Wing',
    fileUrl: '#',
    description: 'Verse-by-verse inductive study manual designed for small group dorm Bible studies.',
    createdAt: '2026-08-28'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Welcome to the New Academic Semester 2026/2027!',
    content: 'DDU FOCUS warmly welcomes all returning and fresh students. General Friday fellowship resumes this Friday at 5:00 PM in the Main Hall.',
    priority: 'HIGH',
    createdAt: '2026-08-30T08:00:00+03:00'
  },
  {
    id: 'ann-2',
    sectionId: 'sec-choir',
    sectionName: 'Choir Ministry',
    title: 'Choir: Vocal Rehearsal Schedule Update',
    content: 'Please note that this Friday’s practice starts promptly at 6:00 PM. Please bring your lyric notebooks.',
    priority: 'NORMAL',
    createdAt: '2026-08-31T12:00:00+03:00'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-abdi',
    title: 'Choir Application Approved! 🎉',
    message: 'Congratulations! Your application to join Choir Ministry has been approved by Bethelhem Girma.',
    actionUrl: '/student/sections',
    isRead: false,
    createdAt: '2026-08-25T14:30:00+03:00'
  },
  {
    id: 'notif-2',
    userId: 'user-abdi',
    title: 'Volunteer Hours Verified ✅',
    message: 'Your 5.0 service hours for Freshman Supply Distribution have been verified by Sara Hailu.',
    actionUrl: '/student/volunteers',
    isRead: true,
    createdAt: '2026-08-27T12:00:00+03:00'
  }
];

export const INITIAL_ATTENDANCES: EventAttendance[] = [
  {
    id: 'att-1',
    eventId: 'evt-friday-fellowship',
    eventTitle: 'General Campus Fellowship: "Living with Divine Purpose"',
    studentId: 'stu-abdi',
    studentName: 'Abdi Tesfaye',
    scannedAt: '2026-08-28T17:12:00+03:00',
    status: 'PRESENT'
  }
];

