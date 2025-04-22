import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
