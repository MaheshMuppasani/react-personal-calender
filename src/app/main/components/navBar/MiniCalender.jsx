import React, { useEffect } from "react";
import { currentDate } from "../../../store/actions/currentDate";
import { toggleMonthPicker } from "../../../store/actions/toggleMonthPicker";
import { connect } from "react-redux";
import { months } from "../../constants";
import MiniMap from "../../components/LiveCalendarNavigation/MiniMap";

const MiniCalender = (props) => {
  const renderMonth = () => {
    if (props.navigatedDate.month === undefined) {
      return months[props.systemDate.month];
    }
    return months[props.navigatedDate.month];
  };

  const renderYear = () => {
    if (props.navigatedDate.year === undefined) {
      return props.systemDate.year;
    }
    return props.navigatedDate.year;
  };

  const renderClassName = () => {
    let className =
      "month-picker position-absolute z-index-top bg-white shadow";
    return props.monthPicker.openStatus ? className + " active" : className;
  };

  return (
    <div className="mini-calender position-relative" role="button">
      <button
        className="btn btn-sm px-1 nav-button"
        onClick={() => {
          props.toggleMonthPicker();
        }}
      >
        <span className="month">{renderMonth()}</span>
        <span className="year ml-1">{renderYear()}</span>
        <i className="arrow-down fas fa-angle-down ml-2"></i>
      </button>
      <div className={renderClassName()} tabIndex="0">
        <MiniMap />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    systemDate: state.systemDate,
    navigatedDate: state.navigatedDate,
    pickedDate: state.pickedDate,
    monthPicker: state.monthPicker,
  };
};

const mapDispatchToProps = { currentDate, toggleMonthPicker };

export default connect(mapStateToProps, mapDispatchToProps)(MiniCalender);
