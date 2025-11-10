import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Login from "./pages/Login";
import TransactionsForm from "./pages/Transactions/TransactionsForm";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import TransactionsView from "./pages/Transactions/TransactionsView";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

    // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setLoggedInUser(savedUser);
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
    toast.success("Successfully Logged In!");
    navigate("/dashboard"); // Redirect to Dashboard page
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    toast.info("Logging out...");
    navigate("/"); // Redirect to login page
  };
    return (
        <>
            {!hideHeader && <Header />}
            <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/addTransaction" element={<TransactionsForm />} />
        <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} />} />
      </Routes>
        </>
    );
}

export default App;
