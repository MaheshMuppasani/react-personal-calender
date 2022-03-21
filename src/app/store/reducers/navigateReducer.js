import * as actions from "../action-types";
import { currentDate } from "../actions/currentDate";

const navigateDateReducer = (state = currentDate().payload, action) => {
  switch (action.type) {
    case actions.NAVIGATE_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actions.NAVIGATE_DATE_EXACT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actions.SYNC_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default navigateDateReducer;
