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

      try {
        const res = await fetch(`http://localhost:3000/api/transactions/summary/${loggedInUser.UserId}`);
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
    <div className="summary-card" style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px", margin: "1rem auto", textAlign: "center" }}>
      <h2>Summary</h2>
      <p><strong>Total Income:</strong> ${summary.totalIncome.toFixed(2)}</p>
      <p><strong>Total Expenses:</strong> ${summary.totalExpenses.toFixed(2)}</p>
      <p><strong>Net Balance:</strong> ${summary.netBalance.toFixed(2)}</p>
    </div>
  );
};

export default SummaryView;