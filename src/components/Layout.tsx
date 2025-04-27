import React from "react";
import NavBar from "./NavBar";
import Pomodoro from "./Pomodoro";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="flex flex-col md:flex-row md:w-full justify-around items-center lg:h-full gap-10 py-10 ">
        <Pomodoro />
        {children}
      </div>
    </div>
  );
};

export default Layout;
