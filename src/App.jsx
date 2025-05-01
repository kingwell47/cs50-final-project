import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import TimerTicker from "./components/TimerTicker";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    const unsub = checkAuth();
    return () => unsub(); // clean up on unmount
  }, [checkAuth]);

  return (
    <>
      <TimerTicker />
      <main>
        {user ? (
          <>
            <p>Welcome, {user.email}</p>
          </>
        ) : (
          <p>Please login or register.</p>
        )}
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Layout>
      </main>
    </>
  );
}

export default App;
