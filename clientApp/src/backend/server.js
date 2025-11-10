import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite
const dbPromise = open({
  filename: "./personalFinance.db",
  driver: sqlite3.Database
});

// ROUTES
app.get("/api/users", async (req, res) => {
  const db = await dbPromise;
  const users = await db.all("SELECT * FROM Users");
  res.json(users);
});

app.get("/api/categories", async (req, res) => {
  const db = await dbPromise;
  const categories = await db.all("SELECT * FROM Categories");
  res.json(categories);
});

// Get transactions for a specific user
app.get("/api/transactions/user/:userId", async (req, res) => {
  const db = await dbPromise;
  const { userId } = req.params;

  try {
    const transactions = await db.all(
      `SELECT t.*, c.Name AS CategoryName 
       FROM Transactions t
       LEFT JOIN Categories c ON t.CategoryId = c.CategoryId
       WHERE t.UserId = ? 
       ORDER BY t.Date DESC`,
      [userId]
    );

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add Transactions
app.post("/api/transactions/add", async (req, res) => {
  const db = await dbPromise;
  const { userId, description, amount, category, date } = req.body;

  if (!userId || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let categoryRow = await db.get("SELECT CategoryId FROM Categories WHERE Name = ?", [category]);
    if (!categoryRow) {
      return res.status(400).json({ error: `Category '${category}' does not exist.` });
    }

    await db.run(
      `INSERT INTO Transactions (UserId, Description, Amount, CategoryId, Date)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, description || null, amount, categoryRow.CategoryId, date]
    );

    res.json({ message: "Transaction added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get summary for a specific user
app.get("/api/transactions/summary/:userId", async (req, res) => {
  const db = await dbPromise;
  const { userId } = req.params;

  try {
    const transactions = await db.all(
      `SELECT t.Amount, c.Name AS CategoryName
       FROM Transactions t
       LEFT JOIN Categories c ON t.CategoryId = c.CategoryId
       WHERE t.UserId = ?`,
      [userId]
    );

    const totalIncome = transactions
      .filter(t => t.CategoryName === "Income")
      .reduce((sum, t) => sum + t.Amount, 0);

    const totalExpenses = transactions
      .filter(t => t.CategoryName !== "Income")
      .reduce((sum, t) => sum + t.Amount, 0);

    const netBalance = totalIncome - totalExpenses;

    res.json({ totalIncome, totalExpenses, netBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));