import React from "react";
import { connect } from "react-redux";
import CalenderNavBar from "../components/navBar/CalenderNavBar";
import MainFrameBody from "../components/MainFrameBody";

const CalenderMainFrame = (props) => {
  const renderMainContentClass = () => {
    let className = "flex-grow-1 calender-right-pane";
    return props.miniMap.openStatus ? className + " active" : className;
  };
  return (
    <div className={renderMainContentClass()}>
      <CalenderNavBar />
      <MainFrameBody />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    miniMap: state.miniMapStatus,
  };
};

export default connect(mapStateToProps, null)(CalenderMainFrame);
