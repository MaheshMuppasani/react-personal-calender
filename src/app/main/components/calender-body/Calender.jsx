import React, { useEffect } from "react";
import WeeksPallette from "../WeeksPalette";
import CalenderGrid from "./CalenderGrid";
import { connect } from "react-redux";
import { months } from "../../constants";
import { getEvents } from "../../../store/actions/getEvents";
import LoadingIndicator from "../navBar/LoadingIndicator";

const Calender = (props) => {
  useEffect(() => {
    const { navigatedDate } = { ...props };
    props.getEvents(navigatedDate);
  }, [props.navigatedDate.month, props.navigatedDate.year]);

  return (
    <React.Fragment>
      <WeeksPallette />
      <CalenderGrid />
      <LoadingIndicator />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    systemDate: state.systemDate,
    navigatedDate: state.navigatedDate,
    pickedDate: state.pickedDate,
  };
};

const mapDispatchToProps = { getEvents };

export default connect(mapStateToProps, mapDispatchToProps)(Calender);
