import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/Login";
import TransactionsForm from "./pages/Transactions/TransactionsForm";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";
    return (
    <>
      {!hideHeader && <Header />}
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/addTransaction" element={<TransactionsForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
