import React from "react";
import NavBar from "./NavBar";
import Pomodoro from "./Pomodoro";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <NavBar />
      <Pomodoro />
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
};

export default Layout;
