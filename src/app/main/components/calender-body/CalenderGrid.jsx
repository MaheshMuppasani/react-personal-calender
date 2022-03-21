import React, { Component, useRef } from "react";
import GridCell from "./GridCell";
import { connect } from "react-redux";
import { months } from "../../constants";
import { gridCells } from "../../controls";

const CalenderGrid = (props) => {
  const renderGrid = () => {
    const { navigatedDate, systemDate } = { ...props };
    const currentMonth = {
      week_end: {
        day: navigatedDate.endDate.day,
        week: navigatedDate.endDate.week,
      },
      week_start: {
        day: 1,
        week:
          navigatedDate.prevMonthEndDate.week < 6
            ? navigatedDate.prevMonthEndDate.week + 1
            : 0,
      },
      previous: {
        day: navigatedDate.prevMonthEndDate.day,
        week: navigatedDate.prevMonthEndDate.week,
      },
    };
    const style = {
      color: "#c1bdbd",
    };

    const array = [];
    for (
      var i = 1, j = currentMonth.previous.day - currentMonth.previous.week + 1;
      j <= currentMonth.previous.day;
      j++, i++
    ) {
      array.push(
        <GridCell
          events={props.eventsData}
          ref={gridCells[i - 1]}
          tense="past"
          key={i.toString()}
          value={`${j < 10 ? `0${j}` : `${j}`}`}
          style={style}
          className={""}
        />
      );
    }

    for (
      j = currentMonth.week_start.day;
      j <= currentMonth.week_end.day;
      j++, i++
    ) {
      array.push(
        <GridCell
          events={props.eventsData}
          ref={gridCells[i - 1]}
          tense="present"
          key={i.toString()}
          value={`${j < 10 ? `0${j}` : `${j}`}`}
          month={j === 1 ? months[navigatedDate.month].slice(0, 3) : null}
          style={null}
          className={
            systemDate.day === j &&
            navigatedDate.month === systemDate.month &&
            systemDate.year === navigatedDate.year
              ? " dayIsToday-main"
              : ""
          }
        />
      );
    }
    for (j = 1; i <= 42; i++, j++) {
      array.push(
        <GridCell
          events={props.eventsData}
          ref={gridCells[i - 1]}
          tense="future"
          key={i.toString()}
          value={`${j < 10 ? `0${j}` : `${j}`}`}
          month={
            j === 1
              ? navigatedDate.month <= 10
                ? months[navigatedDate.month + 1].slice(0, 3)
                : months[0].slice(0, 3)
              : null
          }
          className={""}
          style={style}
        />
      );
    }
    return array;
  };
  return (
    <div className="grid-container">
      <div className="days-grid h-100">{renderGrid()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventsData: state.events,
    systemDate: state.systemDate,
    navigatedDate: state.navigatedDate,
  };
};

export default connect(mapStateToProps, null)(CalenderGrid);
