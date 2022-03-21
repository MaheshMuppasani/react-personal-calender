import React, { useEffect } from "react";
import { connect } from "react-redux";
import { closeNewEvent } from "../../../store/actions/closeNewEvent";
import { cancelEventDelete } from "../../../store/actions/eventDeleteActions";
import { Form, Field } from "react-final-form";
import { months } from "../../constants";
import { getEvents } from "../../../store/actions/getEvents";
import PopupFooter1 from "./popupFooter1";
import PopupFooter2 from "./popupFooter2";
import DeleteEventUI from "./DeleteEventUI";
import { updateDB } from "../../../utilities/updateDB";

const EventPopUp = (props) => {
  useEffect(() => {
    if (inputTitleRef.current) {
      inputTitleRef.current.focus();
    }
  });
  const formref = React.createRef();
  const inputTitleRef = React.createRef();
  let formHandle;
  let formReset;
  let formPristine, formSubmitting;
  let className = "NewEventPopup rounded-bottom";
  const endDateRef = React.createRef();
  const endTimeRef = React.createRef();
  const renderFooter = () => {
    return props.newEvent.status_open || props.existedEvent.edited ? (
      <PopupFooter1
        formReset={() => {
          formReset();
        }}
        closeNewEvent={props.closeNewEvent}
        formHandle={() => {
          formHandle();
        }}
      />
    ) : (
      <PopupFooter2 closeNewEvent={props.closeNewEvent} />
    );
  };

  const renderClassName = () => {
    return props.newEvent.status_open || props.existedEvent.status_open
      ? className + " active"
      : className;
  };

  const minDateProvide = () => {
    let { year, month, day } = { ...props.systemDate };
    month += 1;
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${
      day < 10 ? `0${day}` : `${day}`
    }`;
  };

  const onSubmit = async (e) => {
    let { sDate, eDate, sTime, eTime, description, title } = {
      ...e,
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
    let newEventObject = {
      sDate: "",
      eDate: "",
      sTime: "",
      eTime: "",
      description: "",
      title: "",
    };
    newEventObject = { ...e };
    let previousData = { ...props.existedEventData };
    let existedEventsonTime = {};
    let updatedData;
    if (eventsData) {
      updatedData = [...eventsData];
    } else {
      updatedData = [];
    }

    if (props.existedEvent.edited) {
      updatedData = eventsData.filter(
        (eventsOnSameTime) => eventsOnSameTime.title !== previousData.title
      );
    }
    if (props.existedEvent.delete) {
      existedEventsonTime[`${sTime}`] = [...updatedData];
    } else {
      if (eventsData) {
        existedEventsonTime[`${sTime}`] = [...updatedData, newEventObject];
      } else {
        existedEventsonTime[`${sTime}`] = [newEventObject];
      }
    }

    updateDB(
      existedEventsonTime,
      navigatedDate,
      year,
      month,
      date,
      props.getEvents
    );
    setTimeout(() => {
      formReset();
    }, 200);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.sTime) {
      errors.sTime = "Required!";
    } else {
      if (endTimeRef.current) endTimeRef.current.min = values.sTime;
    }
    if (!values.eTime) {
      errors.eTime = "Required!";
    }
    if (!values.sDate) {
      errors.email = "Required!";
    } else {
      if (endDateRef.current) {
        endDateRef.current.min = values.sDate;
      }
    }
    if (!values.eDate) {
      errors.email = "Required!";
    }
    return errors;
  };
  const setCorrectTime = (values) => {
    if (values.eTime < values.sTime) {
      endTimeRef.current.value = endTimeRef.current.min;
    }
  };
  const setCorrectDate = (values) => {
    if (values.eDate < values.sDate) {
      endDateRef.current.value = endDateRef.current.min;
    }
  };
  return (
    <div
      className={renderClassName()}
      onClick={(e) => {
        e.stopPropagation();
        if (props.eventDelete.status) {
          props.cancelEventDelete();
        }
      }}
    >
      <h5 className="popup-header m-0 p-2 pr-3  text-left rounded-top position-relative">
        <div
          className="ml-auto cancelEventBtn d-flex"
          onClick={() => {
            props.closeNewEvent();
          }}
        >
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 512.001 512.001"
            style={{ enableBackground: "new 0 0 512.001 512.001" }}
          >
            <g>
              <g>
                <path
                  id="cross-cancel"
                  d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z"
                />
              </g>
            </g>
          </svg>
        </div>
      </h5>
      <div className="popup-body p-2 pb-3 mt-3">
        <div className="form-container row no-gutters px-1 px-md-3">
          <div className="col-12 col-md-8">
            <Form
              initialValues={() => {
                return props.existedEvent.status_open
                  ? props.existedEventData
                  : {
                      sDate: minDateProvide(),
                      eDate: minDateProvide(),
                      sTime: "08:00",
                      eTime: "08:30",
                      description: "",
                      title: "",
                    };
              }}
              onSubmit={onSubmit}
              validate={validate}
              render={({
                handleSubmit,
                pristine,
                submitting,
                form,
                values,
              }) => {
                formHandle = form.submit;
                formReset = form.reset;
                formPristine = pristine;
                formSubmitting = submitting;
                return (
                  <form
                    ref={formref}
                    name="newEventForm"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <fieldset
                      disabled={
                        props.existedEvent.status_open &&
                        !props.existedEvent.edited
                      }
                    >
                      <div className="d-flex align-items-center">
                        <div className="title-indicator rounded-circle text-primary" />
                        <Field name="title">
                          {({ input, meta }) => {
                            return (
                              <input
                                ref={inputTitleRef}
                                {...input}
                                className="overflow-hidden ml-2 ml-md-3 flex-grow-1 form-input input-title px-2 py-1"
                                type="text"
                                placeholder="Add a title"
                                autoComplete="off"
                              />
                            );
                          }}
                        </Field>
                      </div>
                      <div className="d-flex align-items-end">
                        <div className="time-icon">
                          <i className="fas fa-clock mb-2"></i>
                        </div>
                        <div className="flex-grow-1 ml-2 ml-md-3">
                          <label className="px-2 d-block text-left mb-0 mt-3">
                            From
                          </label>
                          <div className="row no-gutters">
                            <div className="col-6 pr-2">
                              <Field name="sDate">
                                {({ input, meta }) => {
                                  return (
                                    <input
                                      {...input}
                                      onBlur={() => {
                                        setCorrectDate(values);
                                      }}
                                      className="w-100 form-input px-1"
                                      type="date"
                                      min={minDateProvide()}
                                    />
                                  );
                                }}
                              </Field>
                            </div>
                            <div className="col-6 d-flex">
                              <Field name="sTime">
                                {({ input, meta }) => {
                                  return (
                                    <input
                                      {...input}
                                      className="w-100 form-input px-1"
                                      type="time"
                                      onBlur={() => {
                                        setCorrectTime(values);
                                      }}
                                      placeholder="Start time"
                                    />
                                  );
                                }}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-end">
                        <div className="time-icon">
                          <i className="fas fa-clock mb-2"></i>
                        </div>
                        <div className="flex-grow-1 ml-2 ml-md-3">
                          <label className="px-2 d-block text-left mb-0 mt-3">
                            To
                          </label>
                          <div className="row no-gutters">
                            <div className="col-6 pr-2">
                              <Field name="eDate">
                                {({ input, meta }) => {
                                  return (
                                    <input
                                      {...input}
                                      className="w-100 form-input px-1"
                                      onBlur={() => {
                                        setCorrectDate(values);
                                      }}
                                      type="date"
                                      min={minDateProvide()}
                                      ref={endDateRef}
                                    />
                                  );
                                }}
                              </Field>
                            </div>
                            <div className="col-6 d-flex">
                              <Field name="eTime">
                                {({ input, meta }) => {
                                  return (
                                    <input
                                      {...input}
                                      className="w-100 form-input px-1"
                                      type="time"
                                      ref={endTimeRef}
                                      onBlur={() => {
                                        setCorrectTime(values);
                                      }}
                                      placeholder="End time"
                                    />
                                  );
                                }}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 d-flex">
                        <div className="list-icon mt-2">
                          <i className="fas fa-list"></i>
                        </div>

                        <Field name="description">
                          {({ input, meta }) => {
                            return (
                              <textarea
                                {...input}
                                className="flex-grow-1 ml-2 ml-md-3 px-2 py-2 textarea-input border-lightgray"
                                placeholder="Add a description"
                                cols="30"
                                rows="8"
                              />
                            );
                          }}
                        </Field>
                      </div>
                    </fieldset>
                  </form>
                );
              }}
            />
          </div>
          <div className="col-md-4  mt-3 people-holder pl-5">
            <input
              className="w-100 form-input px-2"
              type="text"
              name="addPerson"
              placeholder="Invite attendees"
            />
            <ol className="mt-3"></ol>
          </div>
        </div>
      </div>
      {renderFooter()}
      <DeleteEventUI
        formHandle={() => {
          formHandle();
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    newEvent: state.newEventUI,
    existedEvent: state.existedEventUI,
    navigatedDate: state.navigatedDate,
    events: state.events,
    existedEventData: state.existedEventData,
    systemDate: state.systemDate,
    eventDelete: state.eventDeleteStatus,
  };
};

const mapDispatchToProps = { closeNewEvent, getEvents, cancelEventDelete };

export default connect(mapStateToProps, mapDispatchToProps)(EventPopUp);
