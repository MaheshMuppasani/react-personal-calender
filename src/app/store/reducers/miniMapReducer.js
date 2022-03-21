import * as actions from "../action-types";

const intialState = {
  openStatus: window.innerWidth >= 1080 ? true : false,
};
const miniMapReducer = (state = intialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_MINI_MAP: {
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
export default miniMapReducer;
