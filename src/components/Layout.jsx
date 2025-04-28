import React from "react";
import NavBar from "./NavBar";
import GlobalTimer from "./GlobalTimer";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="p-4 flex flex-col justify-center items-center">
        <GlobalTimer />
        {children}
      </div>
    </>
  );
};

export default Layout;
