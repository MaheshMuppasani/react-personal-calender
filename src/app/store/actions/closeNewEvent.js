import * as actions from "../action-types";

export const closeNewEvent = () => {
  return {
    type: actions.CLOSE_EVENT_POPUP,
  };
};
