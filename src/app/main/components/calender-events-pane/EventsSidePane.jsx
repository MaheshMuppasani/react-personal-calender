import React from "react";
import { connect } from "react-redux";
import { weeks, months } from "../../constants";
import { renderEvents } from "../../../utilities/renderEvents";
import { openEditableEvent } from "../../../store/actions/openNewEvent";
import { copyExistedEvent } from "../../../store/actions/copyExistedEvent";
import EmptyEventCover from "./EmptyEventCover";
import { toggleSideBar } from "../../../store/actions/toggleSideBar";

const EventsSidePane = (props) => {
  const renderWeek = () => {
    return props.pinnedDate.week !== 0
      ? weeks[props.pinnedDate.week - 1].slice(0, 3)
      : "Sun";
  };

  const localRenderEvents = () => {
    const allEvents = renderEvents(
      props.pinnedDate.year,
      props.events,
      months[props.pinnedDate.month],
      props.pinnedDate.day,
      Infinity,
      props.copyExistedEvent,
      props.openEditableEvent,
      "primaryWrapper",
      props.toggleSideBar
    );
    return allEvents.length === 0 ? <EmptyEventCover /> : allEvents;
  };

  return (
    <div className="text-dark position-relative h-100">
      <div className="AEP-header px-2 pt-3 pb-1 bg-white">
        <div className=" mb-0 text-left bg-white">
          {renderWeek()}
          {", "}
          {months[props.pinnedDate.month].slice(0, 3)} {props.pinnedDate.day}
        </div>
      </div>
      <div className="AEP-body bg-white position-relative">
        {localRenderEvents()}
      </div>
      <div className="AEP-footer position-absolute">
        <div className="footer-container border-top text-left">
          <span
            className="p-2 clickable-expander events-toggler"
            onClick={() => {
              props.toggleSideBar();
            }}
          >
            <i className="far fa-caret-square-down my-2 pane-expander-icon"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pinnedDate: state.pickedDate,
    events: state.events,
  };
};

const mapDispatchToProps = {
  openEditableEvent,
  copyExistedEvent,
  toggleSideBar,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsSidePane);
