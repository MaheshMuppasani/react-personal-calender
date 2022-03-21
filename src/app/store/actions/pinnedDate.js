import * as actions from "../action-types";

export const setPinnedDate = (pinnedDate) => {
  return {
    type: actions.PIN_EXACT_DATE,
    payload: { ...pinnedDate },
  };
};

export const syncToNavigatedDate = (toDate) => {
  return function (dispatch, getState) {
    dispatch({
      type: actions.SYNC_NAVIGATED_DATE,
      payload:
        toDate === "navigatedDate"
          ? { ...getState().navigatedDate }
          : { ...getState().systemDate },
    });
  };
};

export const reInitPickedDate = (systemDate) => {
  return {
    type: actions.SYNC_NAVIGATED_DATE,
    payload: { ...systemDate },
  };
};
