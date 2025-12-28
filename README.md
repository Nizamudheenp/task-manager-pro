Task Manager Pro

Full-Stack MERN + React Native Application

A complete task management application built with Node.js, Express, MongoDB, MUI, React (Web), and React Native (Expo).
The app supports authentication, task CRUD, search, filter, pagination, and works seamlessly on web and mobile using a shared backend.

Features

Authentication
User registration
User login
JWT-based authentication
Protected task routes

Tasks

Create tasks
View task list
Mark task as completed
Delete tasks

Pagination

Search by title
Filter by status (pending / completed)

Platforms

Web frontend (React + Vite + MUI)
Mobile frontend (React Native + Expo)
Shared backend (Node.js + Express)

Project Structure
task-manager-pro/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validations/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├──-client/
│   ├── src
│   │    ├── api/
│   │    ├── components/
│   │    ├── pages/  
│   │    ├── App.jsx  
│   │    ├── main.jsx 
│   ├── .env
│   ├── index.html
│   └── package.json
│
├── mobile-client/
│   ├── api/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── app.js
│   ├── .env
│   └── package.json
│
└── README.md

Tech Stack

Backend

Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Bcrypt.js
CORS

Web Frontend

React
Vite
MUI
Axios
React Router
react-toastify

Mobile Frontend

React Native
Expo
Axios
AsyncStorage
React Navigation

Setup Instructions

Run Backend
cd Backend
npm run dev

Run frontend
cd client
npm run dev


Run Web App
cd mobile-client
npx expo start -c
App runs on mobile device - Scan QR code using Expo Go app

API Documentation

Auth Routes
Method	       Endpoint	              Description

POST	       /auth/register	      Register new user
POST	       /auth/login	          Login user
Task Routes (Protected)
GET	           /tasks	              Get tasks (search, filter, pagination)
POST	       /tasks	              Create new task
PUT	           /tasks/:id	          Update task status
DELETE	       /tasks/:id	          Delete task

Nizamudheen Punnoli
Full-Stack Developer (MERN)
