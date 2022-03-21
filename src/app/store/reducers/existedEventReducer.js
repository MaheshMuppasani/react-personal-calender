import * as actions from "../action-types";

const intialState = {
  status_open: false,
  edited: false,
  delete: false,
};

const existedEventReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.CLOSE_EVENT_POPUP: {
      return {
        ...state,
        status_open: false,
        edited: false,
        delete: false,
      };
    }
    case actions.DELETE_EVENT_CONFIRM: {
      return {
        ...state,
        delete: true,
      };
    }
    case actions.EXISTING_EVENT_OPEN: {
      return {
        ...state,
        status_open: true,
      };
    }
    case actions.EXISTING_EVENT_EDIT: {
      return {
        ...state,
        edited: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default existedEventReducer;
