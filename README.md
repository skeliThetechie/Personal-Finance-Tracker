# Personal-Finance-Tracker

This project is a personal finance dashboard that allows users to manage income, expenses, and view summaries and charts.
It includes a React frontend and a Node.js + SQLite backend.

⚙️ How to Run the Project

1️⃣ Run the Backend Server
Open the backend folder in the terminal and type in cd backend
To start the server type in the command: node server.js
The backend will run on http://localhost:5000

2️⃣ Run the Frontend (React App)
Open another terminal and navigate to the clientApp folder and type in cd clientApp
Install dependencies with the command: npm install
Start the React app with the command: npm start
The frontend will run on http://localhost:3000

🔗 API Connection
The frontend fetches data from the backend server running on port 5000.
Make sure the backend is running before starting the React app.

🧠 Features
-User login system (Please login using one of the following accounts below)
Username: demoUser1 
Password: password123  
(The demoUser1 account has no data added and this can be used to add data off your choice and test out the functionalities of the application)
Username: admin 
Password: admin123  
(The admin account already has data in it to view)
-Add, view, and delete transactions
-Transaction summary (Total Income, Total Expenses, Net Balance)
-Dashboard with charts and summaries

💻 Technologies
Frontend: React.js, React Router, Toastify
Backend: Node.js, Express
Database: SQLite
Styling: CSS

🧰 Notes
If ports 3000 or 5000 are busy on your machine, you can change them inside the React app or server.js file as needed.