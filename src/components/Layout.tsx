import React from "react";
import NavBar from "./NavBar";
import Pomodoro from "./Pomodoro";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Pomodoro />
      {children}
    </>
  );
};

export default Layout;
