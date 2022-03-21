import React, { useEffect } from "react";
import { weeks } from "../constants";

const WeeksPallette = () => {
  const renderWeeks = () => {
    return weeks.map((week) => (
      <span className="pl-1 col text-left week-pallete" key={week}>
        {week}
      </span>
    ));
  };
  return (
    <div className="weeks pb-2 pt-3 row no-gutters border-bottom">
      {renderWeeks()}
    </div>
  );
};

export default WeeksPallette;
