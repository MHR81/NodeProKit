# 🚀 NodeProKit - Professional Backend Base Project

پروژه بیس حرفه‌ای و تمیز Node.js + Express با تمام تکنولوژی‌های مورد نیاز برای ساخت API‌های تولیدی.

A clean, professional, and production-ready Node.js + Express backend template with modern technologies and best practices.

---

## ✨ ویژگی‌ها / Features

| ویژگی | توضیح |
|------|------|
| 🔐 **JWT Authentication** | احراز هویت با توکن‌های دسترسی و تازه‌سازی |
| 🛡️ **Role-Based Access** | کنترل دسترسی بر اساس نقش کاربر |
| 📧 **OTP System** | سیستم احراز هویت دو مرحله‌ای با کد یکبار‌مصرف |
| ☁️ **Cloudinary Integration** | آپلود و مدیریت فایل‌ها در ابر |
| 💾 **MongoDB** | پایگاه داده NoSQL قدرتمند |
| 🔄 **Rate Limiting** | محدودیت درخواست‌ها برای امنیت |
| 🛡️ **Security** | Helmet.js، CORS، input validation |
| 📊 **Logging** | ثبت‌وقایع با Winston logger |
| 🗂️ **MVC Architecture** | ساختار تمیز و سازمان‌یافته |
| 🌍 **RESTful API** | استاندارد REST کامل |
| 📝 **Swagger Docs** | مستندات API تفاعلی |
| 🐳 **Docker Ready** | آماده برای کانتینرسازی |

---

## 📁 ساختار پروژه / Project Structure

```
NodeProKit/
├── src/                          # پوشه اصلی کد
│   ├── server.js                 # نقطه ورودی سرور
│   ├── app.js                    # تنظیمات Express
│   │
│   ├── config/                   # تنظیمات
│   │   ├── env.js                # متغیرهای محیطی
│   │   └── db.js                 # اتصال MongoDB
│   │
│   ├── modules/                  # ماژول‌های اصلی
│   │   ├── auth/                 # احراز هویت
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.model.js
│   │   │   └── auth.routes.js
│   │   │
│   │   ├── user/                 # مدیریت کاربران
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── otp/                  # سیستم OTP
│   │   │   ├── otp.controller.js
│   │   │   ├── otp.model.js
│   │   │   └── otp.routes.js
│   │   │
│   │   ├── file/                 # مدیریت فایل‌ها
│   │   │   ├── file.controller.js
│   │   │   ├── file.model.js
│   │   │   └── file.routes.js
│   │   │
│   │   └── admin/                # مدیریت admin
│   │       ├── admin.controller.js
│   │       └── admin.routes.js
│   │
│   ├── middlewares/              # middleware های درخواست
│   │   ├── auth.middleware.js    # بررسی احراز هویت
│   │   ├── role.middleware.js    # بررسی نقش
│   │   ├── error.middleware.js   # مدیریت خطاها
│   │   └── rateLimit.middleware.js # محدود‌کننده درخواست‌ها
│   │
│   ├── utils/                    # توابع کمکی
│   │   ├── cloudinary.js         # تنظیمات Cloudinary
│   │   ├── hash.js               # رمزگذاری رمز عبور
│   │   ├── jwt.js                # مدیریت توکن‌ها
│   │   ├── logger.js             # سیستم logging
│   │   ├── otp.js                # مدیریت OTP
│   │   └── response.js           # فرمت کردن response‌ها
│   │
│   ├── constants/                # ثابت‌های پروژه
│   │   └── index.js
│   │
│   ├── routes/                   # مسیریابی اصلی
│   │   └── index.js
│   │
│   └── docs/                     # مستندات
│       └── swagger.yaml          # تعریف Swagger
│
├── .env                          # متغیرهای محیطی
├── .env.example                  # مثال متغیرهای محیطی
├── package.json                  # وابستگی‌ها
├── docker-compose.yml            # تنظیمات Docker
├── Dockerfile                    # فایل Docker
└── README.md                     # این فایل
```

---

## 🎯 شروع سریع / Getting Started

### 1️⃣ نصب وابستگی‌ها / Install Dependencies

```bash
npm install
```

### 2️⃣ تنظیم متغیرهای محیطی / Setup Environment

```bash
cp .env.example .env
```

سپس فایل `.env` را ویرایش کنید:

```env
# سرور
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# JWT
JWT_ACCESS_SECRET=your-access-secret-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-characters
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# OTP
OTP_EXPIRE_TIME=120000  # 2 دقیقه به میلی‌ثانیه

# Cloudinary
CLOUDINARY_URL=cloudinary://key:secret@cloud_name

# CORS
CLIENT_URL=http://localhost:3000
```

### 3️⃣ اجرای سرور / Start Server

```bash
# توسعه (با Hot Reload)
npm run dev

# تولید
npm start
```

سرور در `http://localhost:5000` باز خواهد شد.

---

## 🛠️ دستورات دستیار / Available Commands

```bash
npm start        # شروع سرور تولید
npm run dev      # شروع سرور توسعه (با nodemon)
npm run seed     # پر کردن پایگاه‌داده با داده‌های نمونه
npm test         # اجرای تست‌ها
npm run lint     # بررسی کیفیت کد
```

---

## 📡 نحوه استفاده / Usage Guide

### 🔐 احراز هویت / Authentication

#### 1. ثبت‌نام / Register

```
POST /api/auth/register
```

**مرحله 1:** درخواست OTP

```json
{
  "phone": "+989123456789",
  "password": "SecurePassword123!",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "phone": "+989123456789"
  },
  "message": "OTP sent successfully. Verify it to complete registration"
}
```

#### 2. تایید OTP / Verify OTP

```
POST /api/auth/verify-otp
```

**مرحله 2:** تکمیل ثبت‌نام

```json
{
  "phone": "+989123456789",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011"
  },
  "message": "Registered successfully"
}
```

#### 3. ورود / Login

```
POST /api/auth/login
```

```json
{
  "phone": "+989123456789",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Login successful"
}
```

#### 4. فراموشی رمز / Forgot Password

```
POST /api/auth/forgot-password
```

```json
{
  "phone": "+989123456789"
}
```

سپس OTP را تایید کنید:

```
POST /api/auth/reset-password
```

```json
{
  "phone": "+989123456789",
  "code": "123456",
  "newPassword": "NewPassword123!"
}
```

### 📦 آپلود فایل / File Upload

```
POST /api/files
Headers: Authorization: Bearer <access_token>
Body: multipart/form-data {file}
```

### 👤 مدیریت پروفایل / Profile Management

```
GET /api/users/me
Headers: Authorization: Bearer <access_token>
```

```
PUT /api/users/me
Headers: Authorization: Bearer <access_token>
Body: {email, phone, password}
```

### 👨‍💼 مدیریت کاربران (فقط Admin) / User Management

```
GET /api/users
Headers: Authorization: Bearer <access_token>

GET /api/users/:id
Headers: Authorization: Bearer <access_token>

PUT /api/users/:id
Headers: Authorization: Bearer <access_token>

DELETE /api/users/:id
Headers: Authorization: Bearer <access_token>
```

---

## 🔧 تنظیمات اصلی / Configuration

### Cloudinary

تنظیمات Cloudinary در فایل `src/utils/cloudinary.js` انجام می‌شود.

فقط یک متغیر محیطی الزم است:

```env
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### Rate Limiting

محدودیت درخواست‌ها در فایل `src/middlewares/rateLimit.middleware.js`:

- **OTP Requests**: 3 درخواست در 5 دقیقه
- **OTP Verification**: 5 تلاش غلط برای یک کد

### JWT Configuration

```env
JWT_ACCESS_EXPIRE=15m           # مدت دسترسی: 15 دقیقه
JWT_REFRESH_EXPIRE=7d           # مدت تازه‌سازی: 7 روز
```

---

## 🔐 امنیت / Security

✅ **رمزگذاری پسورد** - bcrypt با salt

✅ **JWT Tokens** - احراز هویت secure

✅ **Rate Limiting** - محافظت از brute force

✅ **OTP System** - احراز هویت دو مرحله‌ای

✅ **Helmet.js** - HTTP header security

✅ **CORS Protection** - کنترل منابع

✅ **Input Validation** - بررسی اعتبار ورودی‌ها

✅ **Password Hashing** - ذخیره secure پسورد

✅ **Error Handling** - مخفی کردن جزئیات خطا

✅ **Role-Based Access** - کنترل دسترسی

---

## 📊 مدل‌های داده / Data Models

### User Model

```javascript
{
  _id: ObjectId,
  email: String,
  phone: String,
  password: String (hashed),
  role: String (user | admin),
  createdAt: Date,
  updatedAt: Date
}
```

### OTP Model

```javascript
{
  _id: ObjectId,
  phone: String,
  code: String,
  expiresAt: Date,
  attempts: Number,
  verified: Boolean,
  pendingData: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### File Model

```javascript
{
  _id: ObjectId,
  filename: String,
  url: String,
  publicId: String,
  uploadedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📦 وابستگی‌های اصلی / Main Dependencies

| نام | نسخه | توضیح |
|-----|------|------|
| **express** | 4.x | فریم‌ورک وب |
| **mongoose** | 8.x | ODM برای MongoDB |
| **jsonwebtoken** | 9.x | مدیریت JWT |
| **bcryptjs** | 2.x | رمزگذاری پسورد |
| **cloudinary** | 1.x | آپلود فایل |
| **multer** | 1.x | مدیریت upload |
| **dotenv** | 16.x | متغیرهای محیطی |
| **helmet** | 7.x | امنیت HTTP |
| **cors** | 2.x | CORS middleware |
| **winston** | 3.x | logging |

---

## 🐳 Docker Deployment

### استفاده از Docker Compose

```bash
# شروع سرویس‌ها
docker-compose up -d

# مشاهده log‌ها
docker-compose logs -f app

# متوقف کردن سرویس‌ها
docker-compose down
```

### ساخت دستی Docker

```bash
# ساخت image
docker build -t nodeprokit .

# اجرای container
docker run -p 5000:5000 --env-file .env nodeprokit
```

---

## ✅ چک‌لیست استقرار / Deployment Checklist

- [ ] تغییر `JWT_SECRET` و `JWT_REFRESH_SECRET`
- [ ] تغییر اطلاعات Cloudinary
- [ ] تنظیم MongoDB تولید
- [ ] فعال‌کردن HTTPS
- [ ] تنظیم CORS برای دامنه‌های تولید
- [ ] فعال‌کردن Rate Limiting در تولید
- [ ] تنظیم logging و monitoring
- [ ] بکاپ‌گیری از پایگاه‌داده
- [ ] آزمون تمام endpoints
- [ ] تنظیم CI/CD pipeline

---

## 📝 فایل‌های مهم / Important Files

| فایل | توضیح |
|------|------|
| `src/app.js` | تنظیمات اصلی Express |
| `src/server.js` | نقطه ورودی |
| `src/config/env.js` | تنظیمات متغیرهای محیطی |
| `src/config/db.js` | اتصال MongoDB |
| `src/middlewares/` | میدلویرها |
| `src/modules/*/auth.routes.js` | تعریف مسیرها |
| `docs/swagger.yaml` | مستندات API |

---

## 🔗 منابع مفید / Useful Resources

- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Guide](https://jwt.io)
- [Cloudinary Upload API](https://cloudinary.com/documentation/upload_widget)
- [Mongoose ODM](https://mongoosejs.com)
- [Helmet Security](https://helmetjs.github.io)
- [Multer File Upload](https://github.com/expressjs/multer)
- [Winston Logger](https://github.com/winstonjs/winston)

---

## 💡 نکات مهم / Important Notes

✅ توکن احراز هویت در request body ارسال **نمی‌شود**

✅ توکن در Header `Authorization: Bearer <token>` ارسال می‌شود

✅ OTP 2 دقیقه منقضی می‌شود

✅ حداکثر 5 تلاش غلط برای OTP مجاز است

✅ پسورد حداقل 8 کاراکتر باید باشد

✅ شماره تلفن باید یکتا باشد

✅ فایل‌های آپلود شده در Cloudinary ذخیره می‌شوند

✅ درخواست‌های ناموفق خودکار log می‌شوند

---

## 🚨 رفع خطاهای معمول / Common Issues

**خطا: `Cannot find module`**
```bash
# حل: وابستگی‌ها را دوباره نصب کنید
npm install
```

**خطا: `MONGO_URI is not defined`**
```bash
# حل: فایل .env را تنظیم کنید
cp .env.example .env
# سپس MONGO_URI را پر کنید
```

**خطا: `Rate limit exceeded`**
```bash
# حل: منتظر کنید یا rate limit را برای توسعه غیرفعال کنید
```

**خطا: `OTP expired`**
```bash
# حل: OTP جدیدی درخواست کنید
```

---

## 📄 مجوز / License

این پروژه متن‌باز است و برای یادگیری و استفاده در تولید کاملاً آزاد است.

This project is open source and free to use for learning and production purposes.

---

## 👨‍💻 نویسنده / Author

👨‍💻 MHR81


ساخته‌شده با ❤️ برای توسعه‌دهندگان Node.js

Built with ❤️ for Node.js developers

---

**آخرین بروزرسانی:** 17 دسامبر 2025

**Last Updated:** December 17, 2025
