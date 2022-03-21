import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Calender from "../components/calender-body/Calender";
import NewEventPopUp from "../components/newEventPopUp/EventPopUp";
import EventsSidePane from "../components/calender-events-pane/EventsSidePane";
import { toggleSideBar } from "../../store/actions/toggleSideBar";
import { closeNewEvent } from "../../store/actions/closeNewEvent";

const MainFrameBody = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    if (
      window.innerWidth < 1200 &&
      props.eventsPane.openflag &&
      windowWidth > 1200
    ) {
      props.toggleSideBar();
    }
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  });
  const renderClassName = () => {
    let className = "newEvent-overlay";
    return props.newEvent.status_open || props.existedEvent.status_open
      ? className + " active"
      : className;
  };

  const renderCalenderClass = () => {
    let className = "mainFrame-calender";
    return props.eventsPane.openflag ? className : className + " active";
  };

  const renderEventsPaneClass = () => {
    let className = "bg-white flex-grow-1 events-sidepane border-left";
    return props.eventsPane.openflag ? className + " active" : className;
  };

  const renderOverlayClass = () => {
    let className = "eventsPane-overlay";
    return props.eventsPane.openflag ? className + " active" : className;
  };
  return (
    <div className="d-flex calender-main position-relative">
      <div className={renderCalenderClass()}>
        <div className="calender h-100">
          <Calender />
        </div>

        <div
          className={renderClassName()}
          onClick={() => {
            props.closeNewEvent();
          }}
        >
          <NewEventPopUp />
        </div>
      </div>
      <div
        className={renderOverlayClass()}
        onClick={() => {
          props.toggleSideBar();
        }}
      >
        <div
          className={renderEventsPaneClass()}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <EventsSidePane />
        </div>
      </div>
      <div
        className="appLevel-expander position-absolute border bg-white events-toggler"
        onClick={() => {
          props.toggleSideBar();
        }}
      >
        <span className="px-2 clickable-expander">
          <i className="far fa-caret-square-down my-2 pane-expander-icon"></i>
        </span>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    newEvent: state.newEventUI,
    existedEvent: state.existedEventUI,
    eventsPane: state.eventsPaneStatus,
  };
};
const mapDispatchToProps = { toggleSideBar, closeNewEvent };
export default connect(mapStateToProps, mapDispatchToProps)(MainFrameBody);
