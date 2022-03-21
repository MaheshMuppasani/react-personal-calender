import * as actions from "../action-types";

export const openNewEvent = () => {
  return {
    type: actions.OPEN_EVENT_POPUP,
  };
};

export const openEditableEvent = () => {
  return {
    type: actions.EXISTING_EVENT_OPEN,
  };
};

export const enableEdit = () => {
  return {
    type: actions.EXISTING_EVENT_EDIT,
  };
};
