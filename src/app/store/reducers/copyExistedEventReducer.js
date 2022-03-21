import * as actions from "../action-types";

const initialState = {};

const copyExistedEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COPY_EXISTED_EVENT: {
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

export default copyExistedEventReducer;
