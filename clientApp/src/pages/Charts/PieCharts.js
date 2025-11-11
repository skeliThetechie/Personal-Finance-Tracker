import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";

const PieCharts = () => {
  const [transactions, setTransactions] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const COLORS = [
    "#FF6384", // Food & Dining
    "#36A2EB", // Transportation
    "#FFCE56", // Shopping
    "#4BC0C0", // Bills & Utilities
    "#9966FF", // Entertainment
    "#00C49F", // Income
    "#FF9F40", // Other
  ];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      toast.error("Please log in first!");
      return;
    }
    // Fetch transaction by userId from the backend
    fetch(`http://localhost:5000/api/transactions/user/${loggedInUser.UserId}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        generateExpenseData(data);
      })
      .catch(() => toast.error("Error fetching transactions"));
  }, []);

  const generateExpenseData = (transactions) => {
    const categories = [
      "Food & Dining",
      "Transportation",
      "Shopping",
      "Bills & Utilities",
      "Entertainment",
      "Income",
      "Other",
    ];

    const result = categories.map((category) => {
      const total = transactions
        .filter((t) => t.CategoryName === category)
        .reduce((sum, t) => sum + t.Amount, 0);
      return { name: category, value: total };
    });

    setExpenseData(result.filter((r) => r.value > 0)); // show only non-empty categories
  };

  return (
    <div className="login-card">
      <h2 className="App-title">Categories of Spending</h2>

      {expenseData.length === 0 ? (
        <p>No expenses to display. Please add some transactions!</p>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: \n\n${(percent * 100).toFixed(0)}%`
                }
                outerRadius={90}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PieCharts;