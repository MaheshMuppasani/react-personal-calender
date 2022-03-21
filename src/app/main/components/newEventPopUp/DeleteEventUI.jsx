import React from "react";
import { connect } from "react-redux";
import {
  cancelEventDelete,
  eventDeleteConfirmed,
} from "../../../store/actions/eventDeleteActions";
import { closeNewEvent } from "../../../store/actions/closeNewEvent";
import { getEvents } from "../../../store/actions/getEvents";
import { months } from "../../constants";
import { updateDB } from "../../../utilities/updateDB";

const DeleteEventUI = (props) => {
  let className =
    "userEventDelete position-absolute bg-white p-4 text-dark text-left";
  const renderClass = () => {
    return props.eventDelete.status ? className + " active" : className;
  };
  const handleDelete = () => {
    let { sDate, eDate, sTime, eTime, description, title } = {
      ...props.existedEventData,
    };
    const { navigatedDate, events } = { ...props };

    let [year, month, date] = sDate.split("-");
    props.closeNewEvent();
    const { data } = { ...events };
    let eventsData = data[`${year}`]
      ? data[`${year}`][`${months[parseInt(month) - 1]}`]
        ? data[`${year}`][`${months[parseInt(month) - 1]}`][`${date}`]
          ? data[`${year}`][`${months[parseInt(month) - 1]}`][`${date}`][
              `${sTime}`
            ]
            ? [
                ...data[`${year}`][`${months[parseInt(month) - 1]}`][`${date}`][
                  `${sTime}`
                ],
              ]
            : null
          : null
        : null
      : null;
    let previousData = { ...props.existedEventData };
    let existedEventsonTime = {};
    let updatedData;
    if (eventsData) {
      updatedData = [...eventsData];
    } else {
      updatedData = [];
    }
    updatedData = eventsData.filter(
      (eventsOnSameTime) => eventsOnSameTime.title !== previousData.title
    );
    existedEventsonTime[`${sTime}`] = [...updatedData];
    updateDB(
      existedEventsonTime,
      navigatedDate,
      year,
      month,
      date,
      props.getEvents
    );
  };
  return (
    <div className={renderClass()}>
      <h4>Delete event</h4>
      <p className="mb-4">Are you sure you want to delete this event?</p>
      <div className="deleteEvent-actions text-right">
        <button
          className="btn btn-sm save-button px-3 mr-3"
          onClick={(e) => {
            e.stopPropagation();
            props.eventDeleteConfirmed();
            handleDelete();
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-sm discard-button border-dark px-3"
          onClick={() => {
            props.cancelEventDelete();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventDelete: state.eventDeleteStatus,
    existedEventData: state.existedEventData,
    navigatedDate: state.navigatedDate,
    events: state.events,
  };
};

const mapDispatchToProps = {
  cancelEventDelete,
  eventDeleteConfirmed,
  closeNewEvent,
  getEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEventUI);
