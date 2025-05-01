import React from "react";
import useAuthStore from "../store/authStore";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user && (
            <>
              <li>
                <a>{user.email}</a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </>
          )}

          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
