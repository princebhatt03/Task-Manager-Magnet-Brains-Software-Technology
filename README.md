# Task Manager Web Application
This project has been developed as part of a **job interview task at Jai Japnaam Technology**. It demonstrates the ability to build a full-stack web application using the MERN stack, including features such as user authentication, task management with CRUD operations, priority-based task categorization, and a responsive, animated frontend design. The application showcases practical skills in React, Node.js, Express, MongoDB, Tailwind CSS, and modern development workflows.
A full-stack **Task Management Web Application** built with **MERN stack** (MongoDB, Express.js, React, Node.js). This project allows users to **create, update, delete, and manage tasks** with priorities, due dates, and status tracking.  

---

## 🌐 Live Demo

[View Live on Netlify](https://task-manager-job-task.netlify.app)

---

## 🛠 Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS
- Vite App (for build tool)
- Framer Motion (for animations)  
- React Hot Toast (for notifications)  
- Axios (for API requests)  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB 
- Mongoose  
- JWT Authentication  

**Other Tools:**  
- VS Code  
- Postman (for testing API)  
- Render (for backend hosting)
- Netlify (for frontend hosting)
- MongoDB ATLAS (for Database Hosting)

---

## 📦 Features

- User authentication (Register/Login) with JWT token.  
- Create tasks with **title, description, priority, and due date**.  
- Update task status (**Pending / Completed**) with confirmation.  
- Edit tasks (navigate to `/edit-task` page).  
- Delete tasks with confirmation modal.  
- Filter tasks by priority and status.  
- Responsive dashboard for desktop and mobile.  
- Fully animated UI with Framer Motion.  
- Notifications with React Hot Toast.  

---

## 🔑 Environment Variables

### 🔒 Backend: `backend/.env`
```env
PORT=3000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```
### 🎯 Frontend: `frontend/.env`
```env
VITE_BACKEND_URL=your_backend_url
```
## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone REPOSITORY_LINK
cd APP_NAME
```
### 2️⃣ Backend Setup
```
cd backend
npm install
nodemon or npx nodemon
Backend will run on http://localhost:5000 (or your configured PORT).
```
### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
Frontend will run on http://localhost:5173 (or your Vite configured port).
```
### 📂 Project Structure
```
task-manager/
│
├─ backend/
│   ├─ models/
│   │   └─ task.model.js
│   ├─ routes/
│   │   └─ task.routes.js
│   ├─ middleware/
│   │   └─ auth.js
│   ├─ server.js
│   └─ .env
│
├─ frontend/
│   ├─ src/
│   │   ├─ pages/
│   │   │   ├─ Home.jsx
│   │   │   ├─ Dashboard.jsx
│   │   │   ├─ Task.jsx
│   │   │   └─ Edittask.jsx
│   │   ├─ components/
│   │   │   ├─ Header.jsx
│   │   │   ├─ Footer.jsx
│   │   │   └─ AddTaskButton.jsx
│   │   ├─ App.jsx
│   │   └─ main.jsx
│   └─ package.json
│
└─ README.md
```
### ⚙️ API Endpoints
```
| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| POST   | `/api/users/register`   | Register a new user              |
| POST   | `/api/users/login`      | User login and get JWT token     |
| GET    | `/api/tasks`            | Get all tasks for logged-in user |
| POST   | `/api/tasks`            | Create a new task                |
| PATCH  | `/api/tasks/:id`        | Update a task                    |
| PATCH  | `/api/tasks/:id/toggle` | Toggle task status               |
| DELETE | `/api/tasks/:id`        | Delete a task                    |
```
### Screenshots of Page

1️⃣
<img width="1357" height="628" alt="s1" src="https://github.com/user-attachments/assets/af176dd3-1190-4d27-9abc-2aaa602ccdfe" />

2️⃣
<img width="1349" height="637" alt="s2" src="https://github.com/user-attachments/assets/28cb570e-8d34-4f33-9ef2-939748f7813b" />

### Screen Recording

https://github.com/user-attachments/assets/6ebdb530-c462-490d-bfc8-314d5c42b899

### 🧑‍💻 Developer

Prince Bhatt
---
📧 Email: princebhatt316@gmail.com

🌐 Portfolio: [Prince Bhatt](https://princebhatt03.github.io/Portfolio)

💼 GitHub: [princebhatt03](https://github.com/princebhatt03)

💬 LinkedIn: [Prince Bhatt](https://www.linkedin.com/in/prince-bhatt-0958a725a/)

--- 
📄 License

This project is created as a Task for Job Interview
 
✨Thank you for connecting...
