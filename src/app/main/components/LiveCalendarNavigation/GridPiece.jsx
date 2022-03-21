import React from "react";
import { returnElaboratedDate } from "../../../store/actions/navigateDate";
import { gridCells } from "../../controls";

const GridPiece = (props) => {
  const isInBetween = (value, min, max) => {
    return min <= value && value <= max;
  };
  const getMonth = (selectedDate) => {
    switch (props.tense) {
      case "past": {
        if (selectedDate.month === 0) {
          return { month: 11, year: selectedDate.year - 1 };
        }
        return { month: selectedDate.month - 1, year: selectedDate.year };
      }
      case "present": {
        return { month: selectedDate.month, year: selectedDate.year };
      }
      case "future": {
        if (selectedDate.month === 11) {
          return { month: 0, year: selectedDate.year + 1 };
        }
        return { month: selectedDate.month + 1, year: selectedDate.year };
      }
      default: {
        return { month: selectedDate.month, year: selectedDate.year };
      }
    }
  };
  const mainCellfocus = () => {
    if (props.tense === "present") {
      gridCells[props.gridNumber - 1].current.focus();
    } else if (props.tense === "future") {
      if (
        Math.ceil(props.gridNumber / 7) === 6 &&
        isInBetween(props.gridNumber - props.value, 35, 42)
      ) {
        gridCells[props.gridNumber - 29 - 7].current.focus();
      } else {
        gridCells[props.gridNumber - 29].current.focus();
      }
    } else {
      if (isInBetween(Math.abs(props.gridNumber - props.value), 29, 30)) {
        gridCells[(props.gridNumber % 7) + 28 - 1 + 7].current.focus();
      } else {
        gridCells[(props.gridNumber % 7) + 28 - 1].current.focus();
      }
    }
  };
  const setPinnedDateHelper = () => {
    const { month, year } = getMonth(props.pickedDate);
    const exactPinned = returnElaboratedDate(
      new Date(year, month, props.value)
    );
    const selectedDate = { ...exactPinned.payload };
    props.setPinnedDate(selectedDate, props.tense);
  };
  const closeMiniMap = () => {
    if (window.innerWidth < 1080) {
      props.closeMiniMap();
    }
  };
  return (
    <span
      tabIndex="0"
      className={`mini-grid-piece p-1` + props.className}
      onClick={() => {
        mainCellfocus();
        setPinnedDateHelper();
        closeMiniMap();
      }}
    >
      {props.value}
    </span>
  );
};

export default GridPiece;
