# Digital Form Management System 📋

A full-stack web application for managing digital forms workflows — submission, review, and approval — built as a final academic project.

---

## Overview

The system allows students to submit digital forms and staff members to review, approve, or reject them through a role-based interface. The project was deployed to a live environment via Vercel.

🔗 **Live Demo:** [sce-final-project-2024-1.onrender.com](https://sce-final-project-2024-1.onrender.com/)

---

## Features

- **Authentication** — Secure login and registration with email confirmation
- **Role-Based Authorization** — Separate interfaces for students and staff
- **Digital Forms Workflow** — Submit, review, and approve forms
- **Rich Text Editor** — Built-in editor for form content (Syncfusion)
- **Request Management** — Students can track and manage their submitted requests
- **Multi-Language Support** — Hebrew and English UI
- **Email Notifications** — Automated confirmation emails on registration and actions
- **Search & Filter** — Search across form tables

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, HTML, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Deployment | Render |
| Email | Nodemailer |
| Auth | JWT |

---

## Team

Built by a team of 2 developers:
- **Itai Damri** — Frontend development (student UI, navigation, text editor, action panels) and backend features (email confirmation system, JWT token handling)
- **[Mark (MarkOS5623)](https://github.com/MarkOS5623)** — Backend architecture (Node.js/Express, MongoDB), authentication, document signing, form management, staff UI, testing, and deployment

---

## Getting Started

```bash
git clone https://github.com/MarkOS5623/SCE-Final-Project-2024.git

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Run
npm start
```
