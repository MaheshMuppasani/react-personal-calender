import * as actions from "../action-types";
import { currentDate } from "../actions/currentDate";

const pinnedDateReducer = (state = currentDate().payload, action) => {
  switch (action.type) {
    case actions.PIN_EXACT_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actions.SYNC_NAVIGATED_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default pinnedDateReducer;
