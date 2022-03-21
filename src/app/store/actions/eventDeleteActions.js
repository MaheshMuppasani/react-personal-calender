import * as actions from "../action-types";

export const checkEventDelete = () => {
  return {
    type: actions.CHECK_EVENT_DELETE,
  };
};

export const cancelEventDelete = () => {
  return {
    type: actions.CANCEL_EVENT_DELETE,
  };
};

export const eventDeleteConfirmed = () => {
  return {
    type: actions.DELETE_EVENT_CONFIRM,
  };
};
