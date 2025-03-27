# MERN Authentication System with Nodemailer, Twilio, and Redis

## ✨ Project Overview
This is a **MERN stack-based authentication system** that provides secure user authentication using:
- **Nodemailer** for email verification
- **Twilio** for mobile OTP verification
- **Redis** for temporary data storage and session management
- **Worker Process** for handling email sending asynchronously

## 🛠️ Features
✅ User Registration with Email Verification (via Nodemailer)  
✅ Mobile Number Verification using OTP (via Twilio)  
✅ Secure Password Hashing  
✅ JWT-based Authentication & Authorization  
✅ Redis for Caching and Session Management  
✅ Background Worker for Email Sending  
✅ User Login with Email/Mobile & Password  
✅ Forgot Password & Reset via OTP/Email  

## 🏢 Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Email Service**: Nodemailer with SMTP
- **SMS Service**: Twilio
- **Cache & Storage**: Redis
- **Worker Processing**: BullMQ & Redis

## 🔧 Installation & Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Jhadevloper4035/Mern_Authentication.git
cd Mern_Authentication
```
### 2️⃣ Install dependencies
```sh
# Install server dependencies
cd backend
npm install

# Install client dependencies
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the `backend` folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4️⃣ Start the Development Server
```sh
# Run Redis server (if not running already)
redis-server

# Start Backend
cd backend
npm start
```

### 5️⃣ Start the Email Worker
The worker runs as a separate process to handle email sending in the background.
```sh
# Run the worker process
cd backend
node worker.js
```

## 🔥 API Endpoints
### Authentication Routes (`/api/auth`)

#### **Login using Email**
- `POST /api/auth/email/send-otp` - Send OTP to email
- `POST /api/auth/email/register` - Register user via email
- `POST /api/auth/email-password/login` - Login using email & password
- `POST /api/auth/email-forgot/send-otp` - Send OTP for password reset
- `POST /api/auth/email-forgot/verify-otp` - Verify OTP for password reset

#### **Login using Mobile Number**
- `POST /api/auth/sms/send-otp` - Send OTP to mobile
- `POST /api/auth/sms/login` - Login using mobile OTP

#### **User Management**
- `GET /api/auth/allusers` - Get all users (Admin only)

## 🚀 Deployment
- **Backend**: Deploy using Render, Heroku, or AWS EC2
- **Database**: MongoDB Atlas (for cloud storage)
- **Redis**: Use Redis Cloud or local server
- **Worker**: Deploy separately on the same or different server

## 📚 License
This project is licensed under the MIT License.

---

🔥 **Developed by Navroj Kumar Jha** | Happy Coding! 😊

