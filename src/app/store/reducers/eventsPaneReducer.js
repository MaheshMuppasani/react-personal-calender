import * as actions from "../action-types";

const intialState = {
  openflag: window.innerWidth >= 1200 ? true : false,
};
const eventsPaneReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_EVENTS_PANE: {
      return {
        ...state,
        openflag: !state.openflag,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default eventsPaneReducer;
