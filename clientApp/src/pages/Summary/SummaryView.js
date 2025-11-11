import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SummaryView = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      //Fetch summarries of transactions by userId from the backend
      try {
        const res = await fetch(`http://localhost:5000/api/transactions/summary/${loggedInUser.UserId}`);
        if (!res.ok) throw new Error("Failed to fetch summary");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="login-card">
      <h2 className="App-title">Summary</h2>
      <div className="summary-stats">
        <div className="summary-item">
          <span className="summary-label">Total Income:</span>
          <span className="summary-value income">${summary.totalIncome.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Expenses:</span>
          <span className="summary-value expenses">${summary.totalExpenses.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Net Balance:</span>
          <span className="summary-value balance">${summary.netBalance.toFixed(2)}</span>
        </div>
        
      </div>
    </div>
  );
};

export default SummaryView;