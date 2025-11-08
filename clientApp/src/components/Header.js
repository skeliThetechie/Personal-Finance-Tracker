import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
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
          <Tab label="Add Transaction" value="/add-transaction" component={Link} to="/add-transaction" />
          <Tab label="Logout" value="/" component={Link} to="/" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Header;