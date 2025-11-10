import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TransactionsView = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      toast.error("Please log in first!");
      return;
    }

    fetch(`http://localhost:3000/api/transactions/user/${loggedInUser.UserId}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => toast.error("Error fetching transactions"));
  }, []);

  return (
    <div className="App">
      <div className="login-card">
        <h2 className="App-title">Your Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions found. </p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.TransactionId}>
                  <td>{t.Date}</td>
                  <td>{t.Description || ""}</td>
                  <td>{t.CategoryName}</td>
                  <td>{t.Amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionsView;