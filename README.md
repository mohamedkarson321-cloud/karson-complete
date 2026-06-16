# KARSON — AI-Powered Software Development Platform

> Production-ready SaaS platform built with Next.js 15, Prisma, PostgreSQL, and NextAuth.

---

## 🚀 Quick Start (تشغيل سريع)

### المتطلبات (Requirements)

| Tool | Version |
|------|---------|
| Node.js | 18.17+ |
| npm | 9+ |
| PostgreSQL | 14+ |
| Git | Latest |

---

## 📁 أين تحط الكود؟ (Where to put the code)

**الكود كله موجود في فولدر اسمه `karson`.**
اتبع الخطوات دي:

### الخطوة 1 — نسخ الفولدر

```
karson/                     ← الفولدر الرئيسي
├── app/                    ← كل الصفحات
├── components/             ← الـ Components
├── lib/                    ← Auth + Prisma + Utils
├── prisma/                 ← Database Schema + Seed
├── types/                  ← TypeScript Types
├── middleware.ts           ← Security Middleware
├── next.config.ts          ← Next.js Config
├── tailwind.config.ts      ← Tailwind Config
├── tsconfig.json           ← TypeScript Config
├── package.json            ← Dependencies
├── .env.example            ← Variables Template
└── vercel.json             ← Deployment Config
```

افتح الـ Terminal وروح لمكان تحب تحط فيه المشروع:

```bash
# مثلا على Desktop
cd ~/Desktop

# أو في Documents
cd ~/Documents
```

---

## ⚡ تعليمات التشغيل خطوة بخطوة

### الخطوة 1 — إعداد الـ Database (PostgreSQL)

**Option A: Local PostgreSQL**
```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from: https://www.postgresql.org/download/windows/
```

بعد التثبيت، اعمل database جديدة:
```bash
psql -U postgres
CREATE DATABASE karson_db;
\q
```

**Option B: Neon (Free Cloud PostgreSQL — أسهل)**
1. روح على [neon.tech](https://neon.tech) وعمل حساب مجاني
2. اعمل project جديد
3. انسخ الـ Connection String

---

### الخطوة 2 — تثبيت المشروع

```bash
# 1. روح لفولدر المشروع
cd karson

# 2. ثبت الـ packages
npm install

# 3. انسخ ملف الـ Environment Variables
cp .env.example .env.local
```

---

### الخطوة 3 — ملء الـ Environment Variables

افتح ملف `.env.local` وملي القيم دي (دي الأساسية):

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database — حط connection string بتاع الـ PostgreSQL
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/karson_db?schema=public

# NextAuth Secret — شغل الأمر ده في Terminal وانسخ النتيجة:
# openssl rand -base64 32
AUTH_SECRET=your-secret-here

NEXTAUTH_URL=http://localhost:3000

# Google OAuth (اختياري للتطوير)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth (اختياري للتطوير)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

> **ملاحظة:** للتطوير المحلي، بس محتاج `DATABASE_URL` و `AUTH_SECRET` يشتغل المشروع.

---

### الخطوة 4 — إعداد الـ Database

```bash
# إنشاء الـ Tables في الـ Database
npm run db:push

# أو لو عايز Migrations (Recommended للـ Production)
npm run db:migrate

# إضافة بيانات تجريبية (مهمة!)
npm run db:seed
```

بعد الـ Seed هيطلعلك:
```
✅ Admin user created: admin@karson.ai
✅ Demo client created: client@example.com
🎉 Database seeded successfully!
─────────────────────────────────────
Admin:  admin@karson.ai  / Admin@123456
Client: client@example.com / Client@123456
─────────────────────────────────────
```

---

### الخطوة 5 — تشغيل المشروع

```bash
npm run dev
```

افتح المتصفح على: **http://localhost:3000** 🎉

---

## 🗺️ الصفحات والـ Routes

| الصفحة | الـ URL |
|---------|---------|
| الرئيسية | `http://localhost:3000` |
| About | `http://localhost:3000/about` |
| Services | `http://localhost:3000/services` |
| Portfolio | `http://localhost:3000/portfolio` |
| Blog | `http://localhost:3000/blog` |
| Pricing | `http://localhost:3000/pricing` |
| Contact | `http://localhost:3000/contact` |
| Careers | `http://localhost:3000/careers` |
| Login | `http://localhost:3000/login` |
| Register | `http://localhost:3000/register` |
| Client Dashboard | `http://localhost:3000/dashboard` |
| Admin Dashboard | `http://localhost:3000/admin` |

---

## 🔐 تسجيل الدخول للتجربة

**Admin (كل الصلاحيات):**
- Email: `admin@karson.ai`
- Password: `Admin@123456`

**Client (Dashboard العميل):**
- Email: `client@example.com`
- Password: `Client@123456`

---

## 🌐 نشر على Vercel (Production)

### الطريقة 1 — Vercel CLI (الأسرع)

```bash
# تثبيت Vercel CLI
npm install -g vercel

# Deploy
vercel

# اتبع الـ instructions وحدد:
# - Project name: karson
# - Framework: Next.js
```

### الطريقة 2 — Vercel Dashboard

1. روح على [vercel.com](https://vercel.com) وعمل حساب
2. اضغط **"Add New Project"**
3. Import من GitHub (ارفع الكود على GitHub الأول)
4. **Environment Variables** — أضف كل المتغيرات من `.env.example`
5. اضغط **Deploy** ✅

### Environment Variables على Vercel

في Vercel Dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_APP_URL     = https://your-domain.vercel.app
DATABASE_URL            = [Neon or Supabase connection string]
AUTH_SECRET             = [openssl rand -base64 32]
NEXTAUTH_URL            = https://your-domain.vercel.app
GOOGLE_CLIENT_ID        = [from Google Console]
GOOGLE_CLIENT_SECRET    = [from Google Console]
GITHUB_CLIENT_ID        = [from GitHub Settings]
GITHUB_CLIENT_SECRET    = [from GitHub Settings]
```

---

## 🗄️ Database في Production

**نوصي بـ Neon (مجاني):**
1. [neon.tech](https://neon.tech) → New Project
2. Copy Connection String
3. الصق في `DATABASE_URL` في Vercel

**أو Supabase:**
1. [supabase.com](https://supabase.com) → New Project
2. Settings → Database → Connection String
3. الصق في `DATABASE_URL`

---

## 🔑 إعداد Google OAuth (اختياري)

1. روح على [console.cloud.google.com](https://console.cloud.google.com)
2. APIs & Services → Credentials → Create OAuth Client ID
3. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (للتطوير)
   - `https://your-domain.com/api/auth/callback/google` (للـ Production)
4. انسخ Client ID و Client Secret للـ `.env.local`

## 🔑 إعداد GitHub OAuth (اختياري)

1. روح على [github.com/settings/applications/new](https://github.com/settings/applications/new)
2. Homepage URL: `http://localhost:3000`
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Generate Client Secret وانسخه للـ `.env.local`

---

## 📊 Prisma Commands

```bash
# عرض الـ Database في UI
npm run db:studio

# بعد أي تغيير في schema.prisma
npm run db:generate   # Update Prisma Client
npm run db:push       # Push schema to DB (development)
npm run db:migrate    # Create migration file (production)
npm run db:seed       # إضافة بيانات تجريبية
```

---

## 🛠️ أوامر المشروع

```bash
npm run dev          # تشغيل في Development mode
npm run build        # Build للـ Production
npm run start        # تشغيل Production build
npm run lint         # فحص الكود
npm run type-check   # فحص TypeScript
```

---

## 📁 هيكل الملفات الكامل

```
karson/
├── app/
│   ├── (marketing)/          ← الصفحات العامة
│   │   ├── page.tsx          ← الرئيسية
│   │   ├── about/            ← عن الشركة
│   │   ├── services/         ← الخدمات
│   │   ├── portfolio/        ← الأعمال
│   │   ├── blog/             ← المدونة
│   │   ├── pricing/          ← الأسعار
│   │   ├── contact/          ← التواصل
│   │   ├── careers/          ← الوظائف
│   │   └── legal/            ← السياسات
│   ├── (auth)/               ← صفحات الدخول
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          ← لوحات التحكم
│   │   ├── dashboard/        ← Client Dashboard
│   │   └── admin/            ← Admin Dashboard
│   ├── api/                  ← API Routes
│   │   ├── auth/             ← NextAuth + Register
│   │   ├── contact/          ← Contact Form
│   │   ├── blog/             ← Blog CRUD
│   │   ├── users/            ← User Management
│   │   ├── projects/         ← Projects CRUD
│   │   ├── notifications/    ← Notifications
│   │   └── subscribe/        ← Newsletter
│   ├── globals.css           ← Global Styles
│   ├── layout.tsx            ← Root Layout
│   ├── sitemap.ts            ← SEO Sitemap
│   └── robots.ts             ← Robots.txt
├── components/
│   ├── ui/                   ← UI Components
│   ├── layout/               ← Header + Footer
│   ├── sections/             ← Homepage Sections
│   ├── providers/            ← Context Providers
│   └── dashboard/            ← Dashboard Components
├── lib/
│   ├── auth.ts               ← NextAuth Config
│   ├── prisma.ts             ← Database Client
│   ├── utils.ts              ← Helper Functions
│   └── validations/          ← Zod Schemas
├── prisma/
│   ├── schema.prisma         ← Database Schema
│   └── seed.ts               ← Seed Data
├── types/
│   └── index.ts              ← TypeScript Types
├── middleware.ts             ← Auth + Security Middleware
├── next.config.ts            ← Next.js Config
├── tailwind.config.ts        ← Tailwind Config
├── tsconfig.json             ← TypeScript Config
├── package.json              ← Dependencies
├── vercel.json               ← Deployment Config
└── .env.example              ← Environment Template
```

---

## 🆘 مشاكل شائعة وحلها

### ❌ Error: Can't connect to database
```bash
# تأكد إن PostgreSQL شغال
brew services start postgresql@15  # macOS

# تأكد من الـ Connection String في .env.local
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/karson_db
```

### ❌ Error: AUTH_SECRET not set
```bash
# اعمل secret جديد
openssl rand -base64 32
# وحطه في .env.local كـ AUTH_SECRET
```

### ❌ Error: Prisma Client not generated
```bash
npm run db:generate
```

### ❌ Port 3000 already in use
```bash
# شغل على port تاني
npm run dev -- --port 3001
```

### ❌ Type errors في TypeScript
```bash
npm run type-check
# شوف الـ errors وصلحها أو
npm run build --no-lint  # مؤقتاً
```

---

## 🔒 Security Features

- ✅ Rate Limiting (API routes)
- ✅ CSRF Protection
- ✅ Security Headers (XSS, HSTS, CSP)
- ✅ JWT Authentication
- ✅ RBAC (Role-Based Access Control)
- ✅ Input Validation (Zod)
- ✅ SQL Injection Prevention (Prisma)
- ✅ Password Hashing (bcrypt, 12 rounds)

---

## 📞 Support

- Email: hello@karson.ai
- Docs: https://docs.karson.ai

---

Built with ❤️ by the KARSON Engineering Team
