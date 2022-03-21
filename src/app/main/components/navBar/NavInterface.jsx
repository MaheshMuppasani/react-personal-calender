import React from "react";
import CurrentDay from "./Current-day";
import Navigators from "./Navigators";
import MiniCalender from "./MiniCalender";

const NavInterface1 = () => {
  return (
    <div className="nav-interface1 d-flex">
      <CurrentDay />
      <Navigators />
      <MiniCalender />
    </div>
  );
};

export default NavInterface1;
