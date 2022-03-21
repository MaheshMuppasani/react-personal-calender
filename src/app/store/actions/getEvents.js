import {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
} from "./fetchEventsRequest";
import dbKey from "../../main/services";

import { months } from "../../main/constants";

export const getEvents = (navigatedDate) => {
  return function (dispatch, getState) {
    dispatch(fetchEventsRequest());
    let url = `${dbKey}${navigatedDate.year}/${
      months[navigatedDate.month]
    }.json`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const updateState = { ...getState().events.data };
        const previousMonths = updateState[`${navigatedDate.year}`]
          ? { ...updateState[`${navigatedDate.year}`] }
          : {};

        if (data) {
          if (previousMonths[months[navigatedDate.month]]) {
            previousMonths[months[navigatedDate.month]] = {
              ...data,
            };
          } else {
            previousMonths[months[navigatedDate.month]] = {};
            previousMonths[months[navigatedDate.month]] = {
              ...data,
            };
          }
        } else {
          if (previousMonths[months[navigatedDate.month]]) {
            delete previousMonths[months[navigatedDate.month]];
          }
        }
        updateState[`${navigatedDate.year}`] = { ...previousMonths };
        if (Object.keys(updateState[`${navigatedDate.year}`]).length === 0) {
          delete updateState[`${navigatedDate.year}`];
        }
        dispatch(
          fetchEventsSuccess(
            updateState,
            navigatedDate.year,
            months[navigatedDate.month]
          )
        );
      })
      .catch((error) => {
        dispatch(fetchEventsFailure(error.message));
      });
  };
};
