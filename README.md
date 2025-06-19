# 🔐 Secure Web Application Project (Node.js + MongoDB)

This project is part of a 3-week web security learning journey. It starts with building an intentionally vulnerable Node.js application and gradually transforms it into a secure web application by fixing common vulnerabilities like **XSS**, **SQL Injection**, and **weak password storage**.

---

## 📅 Overview: Weekly Learning Objectives

| Week | Focus Area                           |
|------|--------------------------------------|
| 1    | Build vulnerable app (XSS, SQLi, etc.) |
| 2    | Secure app with bcrypt, validation   |
| 3    | Logging, HTTPS, Pentesting, Checklist |

---

## 🧰 Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- EJS Template Engine
- bcrypt for hashing passwords
- validator for input sanitization
- winston for logging
- OpenSSL for HTTPS (optional)
- Nmap for basic penetration testing

---

## 🚀 Getting Started (Step-by-Step)

### 📦 1. Clone the Project

```bash
git clone https://github.com/AbubakarSharif-47/securiewebapplication_ID863.git
cd secure-node-app


## 📁 Project Structure

/project-root
├── app.js
├── logger.js
├── server.key (optional, for HTTPS)
├── server.cert (optional, for HTTPS)
├── package.json
├── views/
│ ├── index.ejs
│ ├── login.ejs
│ ├── register.ejs
│ ├── success.ejs
│ └── checklist.ejs
├── public/
│ └── style.css
├── security.log



