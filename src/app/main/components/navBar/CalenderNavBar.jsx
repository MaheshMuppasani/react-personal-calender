import React, { useEffect } from "react";
import NavInterface1 from "./NavInterface";
import NavInterface2 from "./NewEvent";
import "./navStyles.css";

const CalenderNavBar = (props) => {
  return (
    <nav className="calendar-nav border-left calender-nav px-2 py-md-1 d-flex align-items-center justify-content-between text-dark">
      <NavInterface1 />
      <NavInterface2 />
    </nav>
  );
};

export default CalenderNavBar;
