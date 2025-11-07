import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <div className="login-card">
        <h1 className="App-title">Personal Finance Tracker</h1>
          <ToastContainer position="top-center" autoClose={2000} />
          <Login/>
      </div>
    </div>
  );
}

export default App;
