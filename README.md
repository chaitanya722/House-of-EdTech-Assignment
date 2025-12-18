# House of EdTech Assignment

A full-stack, secure, and user-friendly **Task Management CRUD application** built using **Next.js 16 (App Router)**, **TypeScript**, **PostgreSQL**, and **Prisma** as part of the **House of EdTech technical assignment**.

The application demonstrates modern full-stack development practices including authentication, authorization, server actions, database relations, and optional AI-powered enhancements.

---

## Live Demo

 **Live URL:** *Add your Vercel deployment link here*

 **GitHub Repository:** https://github.com/chaitanya722/House-of-EdTech-Assignment.git

---

##  Problem Statement

Develop a full-stack CRUD application that:

* Uses modern Next.js architecture
* Implements secure authentication & authorization
* Handles real-world production concerns
* Optionally leverages AI for enhanced user experience

This project is designed for individual users to manage their tasks efficiently in a secure, scalable, and intuitive way.

---

## 🛠 Tech Stack

### Frontend

* **Next.js 16 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Server Components & Client Components**

### Backend (Built into Next.js)

* **Server Actions** (for secure mutations)
* **API Routes** (for auth & AI)
* **NextAuth (Credentials Provider)**

### Database

* **PostgreSQL**
* **Prisma ORM**

### AI (Optional Add-on)

* **OpenAI API** – AI Task Description Generator

### Deployment

* **Vercel** (Hosting)
* **Neon** (PostgreSQL Database)

---

##  Features

###  Authentication & Authorization

* User registration & login
* Secure password hashing using **bcrypt**
* Protected routes using server-side session checks
* User-scoped data access (users can only see/manage their own tasks)

### Task Management (CRUD)

* Create tasks with title, description, priority, and status
* View all tasks in a personalized dashboard
* Edit task details
* Toggle task status (TODO / DONE)
* Delete tasks with confirmation

###  AI Task Description Generator (Optional)

* Generate task descriptions and priority suggestions using AI
* AI is implemented as an **optional productivity enhancement**
* Graceful fallback when AI quota is unavailable

###  UI & UX

* Clean, responsive UI
* Accessible forms and layouts
* Empty states and confirmations
* Persistent footer with author details

---

##  Application Architecture

This project follows a **modern full-stack Next.js architecture**:

* **Server Components** for data fetching and page rendering
* **Server Actions** for secure database mutations
* **API Routes** for authentication and AI integration
* **Prisma ORM** for database access

There is **no separate backend server** (e.g., Express). The backend logic is co-located within the Next.js application, following industry best practices.

---

##  Project Structure

```
app/
 ├── api/                # API routes (auth, register, AI)
 ├── dashboard/          # Protected dashboard
 ├── tasks/              # Create & edit tasks
 ├── layout.tsx          # Root layout + footer
 └── page.tsx            # Landing / entry page

lib/
 ├── prisma.ts           # Prisma client
 └── auth.ts             # NextAuth configuration

prisma/
 └── schema.prisma       # Database schema
```

---

##  Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-key   # Optional
```

---

## ▶️ Running the Project Locally

```bash
# Install dependencies
npm install

# Run Prisma migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

The application is deployed using:

* **Vercel** for hosting
* **Neon** for managed PostgreSQL

Production database migrations are applied using:

```bash
npx prisma migrate deploy
```

---

## AI Usage Explanation

AI is used as an **optional add-on feature** to enhance productivity by generating task descriptions and suggesting priorities based on the task title.

If the AI service is unavailable or quota is exceeded, the application gracefully falls back to default suggestions, ensuring uninterrupted functionality.

---

## Author

**Chaitanya Pawar**

