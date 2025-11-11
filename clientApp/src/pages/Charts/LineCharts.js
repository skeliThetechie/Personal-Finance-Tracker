import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";

const LineCharts = () => {
  const [transactions, setTransactions] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      toast.error("Please log in first!");
      return;
    }

    fetch(`http://localhost:5000/api/transactions/user/${loggedInUser.UserId}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        generateLineData(data);
      })
      .catch(() => toast.error("Error fetching transactions"));
  }, []);

  const generateLineData = (transactions) => {
    // Filter out Income, only keep expenses
    const expenses = transactions.filter((t) => t.CategoryName !== "Income");

    // Group by date
    const grouped = {};
    expenses.forEach((t) => {
      if (!grouped[t.Date]) grouped[t.Date] = 0;
      grouped[t.Date] += t.Amount;
    });

    // Convert to array and sort by date
    const result = Object.keys(grouped)
      .map((date) => ({ date, amount: grouped[date] }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setLineData(result);
  };

  return (
    <div className="login-card">
      <h3 className="App-title">Expenses Over Time</h3>
      {lineData.length === 0 ? (
        <p>No expenses to display. Please add some transactions!</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#FF6384" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineCharts;