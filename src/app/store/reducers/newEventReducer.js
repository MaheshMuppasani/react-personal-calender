import * as actions from "../action-types";

const intialState = {
  status_open: false,
};

const newEventReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.OPEN_EVENT_POPUP: {
      return {
        ...state,
        status_open: true,
      };
    }
    case actions.CLOSE_EVENT_POPUP: {
      return {
        ...state,
        status_open: false,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default newEventReducer;
