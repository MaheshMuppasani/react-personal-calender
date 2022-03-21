import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-theme">
      <div className="w-25 text-left d-flex">
        <a
          href="/"
          className="navbar-brand acs-logo text-white text-decoration-none"
        >
          ACS solutions
        </a>
      </div>

      <div className="ml-3 w-50">
        <form className="form-inline mx-2 w-100">
          <input
            className="form-control mr-sm-2 rounded-0 border-bottom-0 nav-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
