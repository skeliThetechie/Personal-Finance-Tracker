import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //functionality for logout button
    const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Clear saved user
    toast.info("Logging out...");
    navigate("/"); // Redirect to login page
  };

  return (
      <>
      <AppBar
      position="sticky"
      color="inherit"
      elevation={1}
      sx={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 600, color: "#2a9b95" }}
        >
          Personal Finance Tracker
        </Typography>
        <Tabs
          value={location.pathname}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Dashboard" value="/dashboard" component={Link} to="/dashboard" />
          <Tab label="Add Transaction" value="/addTransaction" component={Link} to="/addTransaction" />
          {loggedInUser ? (
            <Tab
              label="Logout"
              value="/logout"
              onClick={handleLogout}
            />
          ) : (
            <Tab label="Login" value="/" component={Link} to="/" />
          )}
        </Tabs>
      </Toolbar>
    </AppBar></>
  );
}

export default Header;