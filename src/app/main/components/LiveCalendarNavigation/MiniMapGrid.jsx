import React from "react";
import { months } from "../../constants";
import GridPiece from "./GridPiece";

const MiniMapGrid = (props) => {
  const renderGrid = () => {
    const { pickedDate, systemDate } = { ...props };
    const patchedDate = { ...pickedDate };
    const currentMonth = {
      week_end: {
        day: patchedDate.endDate.day,
        week: patchedDate.endDate.week,
      },
      week_start: {
        day: 1,
        week:
          patchedDate.prevMonthEndDate.week < 6
            ? patchedDate.prevMonthEndDate.week + 1
            : 0,
      },
      previous: {
        day: patchedDate.prevMonthEndDate.day,
        week: patchedDate.prevMonthEndDate.week,
      },
    };
    const array = [];
    for (
      var i = 1, j = currentMonth.previous.day - currentMonth.previous.week + 1;
      j <= currentMonth.previous.day;
      j++, i++
    ) {
      array.push(
        <GridPiece
          {...props}
          gridNumber={i}
          tense="past"
          key={i.toString()}
          value={j}
        />
      );
    }
    for (
      j = currentMonth.week_start.day;
      j <= currentMonth.week_end.day;
      j++, i++
    ) {
      array.push(
        <GridPiece
          {...props}
          gridNumber={i}
          tense="present"
          key={i.toString()}
          value={j}
          month={j === 1 ? months[patchedDate.month].slice(0, 3) : null}
          className={
            systemDate.day === j &&
            patchedDate.month === systemDate.month &&
            systemDate.year === patchedDate.year
              ? " dayIsToday"
              : pickedDate.day === j
              ? " day-selected"
              : ""
          }
        />
      );
    }
    for (j = 1; i <= 42; i++, j++) {
      array.push(
        <GridPiece
          {...props}
          gridNumber={i}
          tense="future"
          key={i.toString()}
          value={j}
        />
      );
    }
    return array;
  };
  return <div className="mini-grid">{renderGrid()}</div>;
};

export default MiniMapGrid;
