import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pomodoro from "./components/Pomodoro";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import TimerTicker from "./components/TimerTicker";
import GlobalTimer from "./components/GlobalTimer";

function App() {
  return (
    <BrowserRouter>
      <TimerTicker />
      <main>
        <h1>Hello World</h1>
        <GlobalTimer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
