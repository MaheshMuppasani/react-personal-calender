import * as actions from "../action-types";

const intialState = {
  status: false,
};

const eventDeleteReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.CHECK_EVENT_DELETE: {
      return {
        ...state,
        status: true,
      };
    }
    case actions.DELETE_EVENT_CONFIRM: {
      return {
        ...state,
        status: false,
      };
    }
    case actions.CANCEL_EVENT_DELETE: {
      return {
        ...state,
        status: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default eventDeleteReducer;
