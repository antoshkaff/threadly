# Threadly — Twitter-inspired Social Network (Next.js + FSD)

Threadly is a Twitter-inspired social app for short posts, threaded conversations and following people you care about.  
It is built with **Next.js App Router**, **Prisma/PostgreSQL**, **JWT auth with cookies**, and a **Feature-Sliced Design (FSD)** frontend architecture.

> Live stack highlights: Next.js App Router • TypeScript • Prisma • PostgreSQL • React Query • Tailwind CSS • shadcn/Radix UI • Framer Motion • Zustand • Zod • Vercel Blob • FSD

---

## ✨ Features

- **Twitter-style feed**
    - Two main feeds: **For You** and **Following** (tabs)
    - Infinite scrolling for posts (`PostInfinityList`)
    - Sticky header + sticky tabs for comfortable scrolling

- **Profiles & following**
    - Public profile pages: `@username`, avatar, bio, stats
    - Follow / unfollow logic and a “Following” feed based on subscriptions
    - SEO-friendly profile metadata (`generateMetadata` with dynamic titles)

- **Threads & replies**
    - Create posts, reply to posts, read conversations as threads
    - Separation between posts and comments in API and UI
    - Clean, mobile-first layout for reading long chains

- **Search with filters**
    - Global search page with:
        - query in URL (`useSearchParams`)
        - tabs for **All / Posts / Comments / Users**
        - filter checkboxes for post/comment/user types
    - Debounced search and loading skeletons for smooth UX

- **Auth & user session**
    - Login / register with **JWT** stored in HttpOnly cookies
    - Server helpers to read user from cookies on the server
    - Guarded areas of the app (feed, profile actions, etc.)

- **Modern UI & UX**
    - Tailwind + shadcn-style components (Tabs, Checkbox, Skeleton, Empty states, etc.)
    - Framer Motion animations for page transitions, tab content, lists
    - Dark / light theme toggle via `next-themes`
    - Responsive layouts for desktop sidebar + mobile sidebar/header

- **File storage & media**
    - Support for avatar / media via **Vercel Blob** (public blob URLs)
    - Ready to extend with image previews and richer media

---

## 🧱 Tech Stack

- **Framework**
    - Next.js (App Router)
    - React + TypeScript

- **Backend / Data**
    - Prisma ORM
    - PostgreSQL
    - Next.js Route Handlers / server components

- **Auth**
    - JWT (via `jose`)
    - HttpOnly cookies
    - Server utilities to read and validate user

- **Client Data & State**
    - @tanstack/react-query for data fetching & caching
    - Zustand for client state (user, search, filters, etc.)
    - `react-use` for hooks like debounced search

- **UI & Styling**
    - Tailwind CSS
    - shadcn / Radix UI primitives (Tabs, Checkbox, etc.)
    - Framer Motion for animations
    - Custom design system in `/shared/ui`

- **Validation & Utils**
    - Zod for schema validation
    - `clsx`, `tailwind-merge` for class handling

- **Storage & Hosting**
    - Vercel (preview & production)
    - Vercel Blob for file storage

---

### 🚀 Live Demo

[**🔗 Click here to view the live demo**](https://threadly-ten.vercel.app)

---