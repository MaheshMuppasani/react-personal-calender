import React from "react";
import { syncToSystemDate } from "../../../store/actions/navigateDate";
import { syncToNavigatedDate } from "../../../store/actions/pinnedDate";
import { connect } from "react-redux";
import {
  syncToPinnedDate,
  syncUnsyncPinned,
} from "../../../store/actions/syncMiniMapTopickedDate";
const CurrentDay = (props) => {
  return (
    <div className="current-day" role="button">
      <button
        className="btn btn-sm px-1 nav-button"
        onClick={() => {
          const date1 = new Date(
            props.systemDate.year,
            props.systemDate.month,
            props.systemDate.day
          );
          const date2 = new Date(
            props.pickedDate.year,
            props.pickedDate.month,
            props.pickedDate.day
          );
          const date3 = new Date(
            props.navigateDate.year,
            props.navigateDate.month,
            props.navigateDate.day
          );
          if (
            !(
              date1.toLocaleDateString() === date2.toLocaleDateString() &&
              date1.toLocaleDateString() === date3.toLocaleDateString()
            )
          ) {
            props.syncToSystemDate(props.systemDate);
            props.syncToNavigatedDate("browserDate");
          }
          props.syncUnsyncPinned();
        }}
      >
        <i className="today-logo fas fa-calendar-day"></i>
        <span className="today ml-1">Today</span>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    systemDate: state.systemDate,
    pickedDate: state.pickedDate,
    navigateDate: state.navigatedDate,
    miniMap: state.miniMapSyncStatus,
  };
};

const mapDispatchToProps = {
  syncToSystemDate,
  syncToNavigatedDate,
  syncToPinnedDate,
  syncUnsyncPinned,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDay);
