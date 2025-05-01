import React from "react";
import NavBar from "./NavBar";
import GlobalTimer from "./GlobalTimer";
import useAuthStore from "../store/authStore";

const Layout = ({ children }) => {
  const { error } = useAuthStore();
  return (
    <>
      <NavBar />
      {error && <p>{error}</p>}
      <div className="p-4 flex flex-col justify-center items-center">
        <GlobalTimer />
        {children}
      </div>
    </>
  );
};

export default Layout;
