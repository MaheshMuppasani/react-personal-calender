import * as actions from "../action-types";

export const fetchEventsRequest = () => {
  return {
    type: actions.FETCH_EVENTS_REQUEST,
  };
};

export const fetchEventsSuccess = (eventTree, currentYear, currentMonth) => {
  return {
    type: actions.FETCH_EVENTS_SUCCESS,
    payload: {
      tree: eventTree,
      year: currentYear,
      month: currentMonth,
    },
  };
};

export const fetchEventsFailure = (error) => {
  return {
    type: actions.FETCH_EVENTS_FAILURE,
    payload: error,
  };
};

export const fetchEventsSuccessNoData = () => {
  return {
    type: actions.FETCH_EVENTS_SUCCESS_NO_DATA,
  };
};
