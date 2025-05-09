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

  if (loading && !user) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className='loading loading-bars loading-xl'></span>
      </div>
    );
  }

  return (
    <>
      <TimerTicker />
      <main className='w-full'>
        <Layout>
          <Routes>
            <Route
              path='/'
              element={user ? <Dashboard /> : <Navigate to='/login' />}
            />
            <Route
              path='/register'
              element={!user ? <Registration /> : <Navigate to='/' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
          </Routes>
        </Layout>
      </main>
    </>
  );
}

export default App;
