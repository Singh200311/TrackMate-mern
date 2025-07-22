# 💸 TrackMate – Expense Management System

**TrackMate**<img width="945" height="468" alt="image" src="https://github.com/user-attachments/assets/f0a2c91f-679e-4143-9b8d-af14f2f72188" />
<img width="938" height="473" alt="image" src="https://github.com/user-attachments/assets/d2226ad8-c32e-4daa-b1a4-aeb3fd264b40" />
<img width="940" height="464" alt="image" src="https://github.com/user-attachments/assets/4e1d7d71-5866-4854-b3dd-a71085152728" />
 is a full-stack **MERN** (MongoDB, Express, React, Node.js) application designed to help users **track, manage, and analyze** their personal income and expenses. It provides a clean, responsive UI and advanced analytics, enabling better **financial planning and budget management**.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Register and login using secure credentials
  - JWT token stored in localStorage for session persistence

- 💼 **Transaction Management**
  - Add, edit, delete income/expense entries
  - Select category, type, amount, and date

- 📅 **Smart Filters**
  - Filter transactions by:
    - Last 7 / 30 days or custom range
    - Type: income or expense
    - Frequency: daily/weekly/monthly

- 📊 **Advanced Analytics Dashboard**
  - Income vs Expense donut charts
  - Category-wise progress bars
  - 💡 **NEW:** Budget vs Expense Pie Chart Visualization
    - Set monthly budget and see how much you've spent
    - Instantly understand your remaining budget
    - Helps in real-world overspending control and savings tracking

- 📱 **Modern UI/UX**
  - Fully responsive with **Ant Design**
  - Clean and intuitive layout

- 💾 **Persistent Data Storage**
  - MongoDB with Mongoose ODM
  - Real-time backend validations

---

## ✅ Real-World Use Case Solved

**Problem:**
> Users often lose track of how much they’ve spent and whether they’re within their monthly budget.

**Solution:**
> Our **budget vs expense** tracking system provides a real-time visual of how your expenses compare to your set budget using a pie chart — this helps users make smarter decisions and avoid overspending.

---

## ⚙️ Technologies Used

### 🖥️ Frontend:
- React
- Ant Design
- Axios
- Recharts (v2.5.0)
- React Router

### 🌐 Backend:
- Node.js
- Express.js
- Mongoose
- JWT Authentication
- MongoDB Atlas

### 🛠 Utilities:
- dotenv
- Moment.js
- Morgan (Logger)
- concurrently (for dev)

---

## 📁 Project Structure

```bash
.
├── client/             # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── controllers/        # Express route handlers
├── models/             # Mongoose schemas
├── routes/             # Backend API routes
├── config/             # MongoDB connection config
├── .env                # Environment variables
├── server.js           # Express server entry point
├── package.json        # Project manifest
└── README.md
