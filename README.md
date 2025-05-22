# 🏫 School Management API

This is a simple School Management API built using **Node.js**, **Express.js**, and **MySQL**. It allows you to:

- Add new schools to the database.
- Retrieve a list of schools.
- Optionally sort schools based on proximity to the user’s location using latitude and longitude.

## 🚀 Features

- RESTful API endpoints.
- Haversine formula for distance calculation between coordinates.
- Clean, modular codebase.
- Ready for deployment on Render.
- Works with remote MySQL databases (e.g., freesqldatabase.com).

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime.
- **Express.js** – Web framework for Node.js.
- **MySQL** – Relational database.
- **dotenv** – Manage environment variables securely.
- **body-parser** – Middleware to parse incoming request bodies.

---

## 🗂️ Project Structure

*├── config
*│ └── db.js # MySQL DB connection
*├── controllers
*│ └── schoolController.js # Logic for handling school APIs
*├── routes
*│ └── schoolRoutes.js # API routes
*├── app.js # Main Express app
*├── .env # Environment variables (not pushed to Git)
*├── .gitignore # Files/folders to ignore in Git
*└── README.md # Project documentation

---

📮 API Endpoints

*➕ Add School
*Endpoint: POST /addSchool
*Payload:
*{
  "name": "ABC Public School",
  "address": "123 Main Street",
  "latitude": 22.5726,
  "longitude": 88.3639
}
*Response:
*{
  "message": "School added successfully"
}

---


📍 List Schools
*Endpoint: GET /listSchools
*Query Parameters (optional):

*latitude – Your current latitude.

*longitude – Your current longitude.

*Examples:

*List all schools:  GET /listSchools

*List schools by proximity: GET /listSchools?latitude=22.5726&longitude=88.3639

*Response:
*{
  "count": 3,
  "schools": [
    {
      "id": 1,
      "name": "ABC Public School",
      "address": "123 Main Street",
      "latitude": 22.5726,
      "longitude": 88.3639,
      "distance": 0
    }
  ]
}

