import React from "react";
import NavBar from "./NavBar";
import GlobalTimer from "./GlobalTimer";
import useAuthStore from "../store/authStore";

const Layout = ({ children }) => {
  const { error } = useAuthStore();
  return (
    <>
      <NavBar />
      {error && (
        <div className='toast toast-top toast-center'>
          <div className='alert alert-error'>
            <span className='text-base-content'>test</span>
          </div>
        </div>
      )}
      <div className='p-4 flex flex-col justify-center items-center'>
        <GlobalTimer />
        {children}
      </div>
    </>
  );
};

export default Layout;
