import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import TimerTicker from "./components/TimerTicker";
import GlobalTimer from "./components/GlobalTimer";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <TimerTicker />
      <main>
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
