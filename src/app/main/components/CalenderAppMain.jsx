import React, { useEffect } from "react";
import { connect } from "react-redux";
import CalenderLeftPane from "../components/CalenderLeftPane";
import CalenderMainFrame from "../components/CalenderMainFrame";
import { currentDate } from "../../store/actions/currentDate";
import { syncUnsyncPinned } from "../../store/actions/syncMiniMapTopickedDate";
import { reInitPickedDate } from "../../store/actions/pinnedDate";
import { syncToSystemDate } from "../../store/actions/navigateDate";

const CalenderAppMain = (props) => {
  const reInializeAppDates = () => {
    props.currentDate();
    const localDate = { ...currentDate().payload };
    props.syncToSystemDate(localDate);
    props.reInitPickedDate(localDate);
    props.syncUnsyncPinned();
  };
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const localDate = new Date();
      if (props.systemDate.day !== localDate.getDate()) {
        reInializeAppDates();
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <div className="d-flex main-container">
      <CalenderLeftPane />
      <CalenderMainFrame />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    systemDate: state.systemDate,
  };
};
const mapDispatchToProps = {
  currentDate,
  syncUnsyncPinned,
  syncToSystemDate,
  reInitPickedDate,
};

//export default CalenderAppMain;
export default connect(mapStateToProps, mapDispatchToProps)(CalenderAppMain);
