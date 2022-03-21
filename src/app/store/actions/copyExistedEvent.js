import * as actions from "../action-types";

export const copyExistedEvent = (eventDetails) => {
  return {
    type: actions.COPY_EXISTED_EVENT,
    payload: { ...eventDetails },
  };
};
