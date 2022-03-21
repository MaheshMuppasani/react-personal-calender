import * as actions from "../action-types";

const monthPickerReducer = (state = { openStatus: false }, action) => {
  switch (action.type) {
    case actions.TOGGLE_MONTH_PICKER: {
      return {
        ...state,
        openStatus: !state.openStatus,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default monthPickerReducer;
