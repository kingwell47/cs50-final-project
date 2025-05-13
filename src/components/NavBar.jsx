import React from "react";
import useAuthStore from "../store/authStore";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">HabiTrack</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user && (
            <>
              <li className="invisible md:visible">
                <a>{user.email}</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
