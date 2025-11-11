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
    // Fetch transaction by userId from the backend
    fetch(`http://localhost:5000/api/transactions/user/${loggedInUser.UserId}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => toast.error("Error fetching transactions"));
  }, []);

   // Delete a transaction
  const handleDelete = async (transactionId) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${transactionId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete transaction");

      setTransactions((prev) => prev.filter((t) => t.TransactionId !== transactionId));
      toast.success("Transaction deleted successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
      <div className="login-card">
        <h2 className="App-title">Your Transactions</h2>

        {transactions.length === 0 ? (
            <p>No expenses to display. Please add some transactions!</p>
        ) : (
        <div className="transactions-table-container">
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
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t.TransactionId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsView;