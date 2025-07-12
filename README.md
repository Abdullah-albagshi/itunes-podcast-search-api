# 🎧 Backend - iTunes Podcast Search API

## 🔧 التقنيات المستخدمة

- **NestJS**
- **Prisma ORM**
- **PostgreSQL** (مشغل باستخدام Docker)
- **Axios** (لجلب بيانات iTunes API)

---

## 🛠️ خطوات التنفيذ

- أنشأت مشروع Nest جديد باستخدام `@nestjs/cli`
- ربطت قاعدة البيانات باستخدام Prisma و PostgreSQL عن طريق Docker
- أنشأت موديل `itunes` لخدمة الـ API الخارجية
- بنيت نقطتين أساسيتين للتعامل مع البحث:
  - `GET /search/:name` لجلب نتائج البودكاست
  - `GET /suggested-episodes/:name` لاقتراح الحلقات بناءً على نفس البحث

---

## 📁 ملفات مهمة

- `src/itunes/itunes.service.ts` → مسؤول عن التواصل مع iTunes API
- `src/itunes/itunes.controller.ts` → يعرّف المسارات (`routes`) ويعالج الطلبات
- `src/itunes/itunes.module.ts` → يربط الخدمة بالمشروع
- `docker-compose.yml` → لتشغيل PostgreSQL بسهولة

---

## 🧪 الإعدادات البيئية (.env)

تأكد من إنشاء ملف `.env` يحتوي على التالي:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/itunes_podcast_db?schema=public
```

### 🐘 قاعدة البيانات

تم تشغيل قاعدة بيانات PostgreSQL محليًا باستخدام Docker.

#### خطوات التشغيل:

1. تأكد من وجود Docker مثبت
2. شغل قاعدة البيانات:

```bash
docker-compose up -d
```

ثم نفّذ Prisma migration:

```bash
npx prisma migrate dev
```

--

## ⚠️ التحديات

- itunes Api ماله مستند واضح 
- itunes Api البيانات الي ترجع منه متغيرة ولا يعتمد عليها بشكل موثوق
- عدم وجود تصميم مثلا من Figma يساعد في التطوير بشكل افضل

---

## 💡 اقتراح

- لو كان التكليف مكتوبًا باللغتين (العربية والإنجليزية) لكان أوضح.
