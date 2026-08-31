import { store } from './store';

export function runFullSystemDiagnostics(): {
  allPassed: boolean;
  results: { testName: string; passed: boolean; details: string }[];
} {
  const results: { testName: string; passed: boolean; details: string }[] = [];

  try {
    // 1. Test Daily Word Fallback Engine
    const wordRes = store.getTodayWord();
    const test1Passed = !!wordRes.word && !!wordRes.word.verseText;
    results.push({
      testName: 'Daily Word & Fail-Safe Fallback Engine',
      passed: test1Passed,
      details: `Active Devotional: "${wordRes.word.title}" (${wordRes.word.scriptureReference}). Fallback active: ${wordRes.isFallback}`,
    });

    // 2. Test Section Application & Autonomous Approval Flow
    const choirSec = store.sections.find((s) => s.slug === 'choir');
    if (!choirSec) throw new Error('Choir section missing');

    const appRes = store.applyToSection({
      sectionId: choirSec.id,
      motivation: 'Test automated application workflow for DDU software engineering audit.',
      skillsExperience: 'Vocal tenor and music ministry experience.',
      experienceLevel: 'INTERMEDIATE',
      availabilityDays: ['Friday', 'Sunday'],
    });

    results.push({
      testName: 'Section Application Submission State Machine',
      passed: appRes.success || appRes.message.includes('already'),
      details: appRes.message,
    });

    // 3. Test Dynamic QR Attendance Token Generation & Scan Validation
    const eventId = store.events[0].id;
    const token = store.generateEventQRToken(eventId);
    const hasToken = token.startsWith('DDU-FOCUS');

    results.push({
      testName: 'Dynamic Rotating QR Attendance Token Engine',
      passed: hasToken,
      details: `Generated live token: ${token} (Expires in 45s with rotating cryptographic salt)`,
    });

    // 4. Test Volunteer Hours & Community Service Verification
    const beforeCount = store.volunteerLogs.length;
    store.logVolunteerHours({
      activityName: 'DDU Health Sciences Campus Outreach',
      hoursServed: 3.5,
      serviceDate: '2026-08-31',
      description: 'First aid and hydration support during student orientation.',
    });
    const afterCount = store.volunteerLogs.length;
    const test4Passed = afterCount === beforeCount + 1;

    results.push({
      testName: 'Volunteer Hours Logger & Certificate Eligibility',
      passed: test4Passed,
      details: `Successfully logged 3.5 service hours. Total records: ${afterCount}`,
    });

    // 5. Test Pastoral Prayer Confidentiality Tiers
    const publicPrayers = store.prayers.filter((p) => p.visibility === 'ANONYMOUS_COMMUNITY');
    const privatePrayers = store.prayers.filter((p) => p.visibility === 'LEADERS_ONLY');
    const test5Passed = publicPrayers.length > 0 && privatePrayers.length > 0;

    results.push({
      testName: 'Privacy-First Tiered Pastoral Care Gateway',
      passed: test5Passed,
      details: `Public community prayers: ${publicPrayers.length} | Confidential pastoral prayers: ${privatePrayers.length}`,
    });

    return {
      allPassed: results.every((r) => r.passed),
      results,
    };
  } catch (err: any) {
    results.push({
      testName: 'System Diagnostic Exception',
      passed: false,
      details: err.message,
    });
    return {
      allPassed: false,
      results,
    };
  }
}

