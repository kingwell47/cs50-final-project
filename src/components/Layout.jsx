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
      <div className='flex flex-col w-full items-center justify-center pt-4'>
        <div className='flex flex-col justify-center items-center w-90'>
          <GlobalTimer />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
