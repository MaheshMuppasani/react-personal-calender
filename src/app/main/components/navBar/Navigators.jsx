import React from "react";
import {
  navigateDatePrev,
  navigateDateNext,
} from "../../../store/actions/navigateDate";
import { syncToNavigatedDate } from "../../../store/actions/pinnedDate";
import { connect } from "react-redux";
import { syncUnsyncPinned } from "../../../store/actions/syncMiniMapTopickedDate";

const Navigators = (props) => {
  const moveToPrevMonth = (navigatedDate) => {
    props.navigateDatePrev(navigatedDate);
    props.syncToNavigatedDate("navigatedDate");
  };

  const moveToNextMonth = (navigatedDate) => {
    props.navigateDateNext(navigatedDate);
    props.syncToNavigatedDate("navigatedDate");
  };

  return (
    <div className="calender-navigators d-flex mx-1 mx-md-4">
      <button
        className="btn btn-sm px-1 nav-button"
        onClick={() => {
          moveToPrevMonth(props.navigatedDate);
          props.syncUnsyncPinned();
        }}
      >
        <i
          className="prev-month fas fa-arrow-up"
          title="Go to previous month"
        ></i>
      </button>
      <button
        className="btn btn-sm px-1 nav-button ml-1 ml-md-3"
        onClick={() => {
          moveToNextMonth(props.navigatedDate);
          props.syncUnsyncPinned();
        }}
      >
        <i
          className="next-month fas fa-arrow-down"
          title="Go to Next month"
        ></i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    navigatedDate: state.navigatedDate,
  };
};

const mapDispatchToProps = {
  navigateDatePrev,
  navigateDateNext,
  syncToNavigatedDate,
  syncUnsyncPinned,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigators);
