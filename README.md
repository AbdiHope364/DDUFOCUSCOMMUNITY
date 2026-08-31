# DDU FOCUS Student Fellowship Management & Community Platform
> **Dire Dawa University (DDU) — Department of Software Engineering**

---

## 📖 Overview
**DDU FOCUS** is a digital fellowship management and student engagement platform built for the Fellowship of Christian University Students at Dire Dawa University. The platform unifies public fellowship outreach, dynamic student ministry section management, automated daily devotionals, QR-based attendance tracking, and comprehensive leadership handover workflows into a single system.

---

## 📁 Repository Structure & Documentation

* **[`DDU_FOCUS_SRS_DOCUMENT.md`](./DDU_FOCUS_SRS_DOCUMENT.md)**: Complete Software Requirements Specification (SRS), containing:
  * Executive Summary & Problem Definition
  * Granular Role-Based Access Control (RBAC) Matrix (Super Admin $\leftrightarrow$ Section Leader $\leftrightarrow$ Student)
  * Functional Requirements (FR-1 through FR-15)
  * Non-Functional Requirements (Performance, Security, Reliability, Fallbacks)
  * Formal Use Cases (Application Workflow, QR Attendance, Daily Word Fallback)
  * Relational Database DDL & Indices
  * Full REST API Endpoint Matrix
  * Visual Mermaid Diagrams (Architecture, ERD, Sequence, Activity)
  * Ready-to-paste AI prompts for PlantUML / draw.io
* **[`prisma/schema.prisma`](./prisma/schema.prisma)**: Complete Prisma ORM data model configured for PostgreSQL.

---

## 🚀 Core Features Matrix

| Feature Module | Key Capability |
| :--- | :--- |
| **Dynamic Sections** | Expandable ministries (Choir, EVAN, LAD, SISTA, Facility, Charity) with custom schedules and rosters. |
| **Section Application Workflow** | Student applies $\rightarrow$ Section Leader reviews $\rightarrow$ Approved member added to section roster with auto-notifications. |
| **"Daily FOCUS" Spotlight** | Automated 365-day devotional scheduler with East Africa Time (`UTC+3`) auto-switch and fail-safe fallback. |
| **Smart Event & QR Attendance** | Dynamic rotating QR attendance tokens (45s expiry) with live scan validation and deduplication. |
| **Privacy-First Pastoral Care** | Multi-tier prayer requests (`LEADERS_ONLY`, `PRAYER_TEAM`, `ANONYMOUS_COMMUNITY`) with "Prayed for You" counters. |
| **FOCUS Journey & Volunteers** | Milestone checklist and verified volunteer hours logging for Community Service certificates. |
| **Academic Year Continuity** | Seamless annual leadership handover without code changes or data loss. |

---

## 🛠 Tech Stack
* **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, Canvas-Confetti, QRCode.react.
* **Backend:** Next.js Server Components, Route Handlers, Prisma ORM.
* **Database & Cache:** PostgreSQL 15+, Prisma.

---

## 🏁 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open `http://localhost:3000` to interact with the platform.
