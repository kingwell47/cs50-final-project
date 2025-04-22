import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import History from "./pages/History";

function App() {
  return (
    <>
      <div>
        <h1>Hello World</h1>
        <p>Some Navbar</p>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
