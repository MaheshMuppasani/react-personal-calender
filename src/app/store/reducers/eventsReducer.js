import * as actions from "../action-types";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_EVENTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: { ...action.payload.tree },
        error: "",
      };
    }
    case actions.FETCH_EVENTS_SUCCESS_NO_DATA: {
      return {
        ...state,
        loading: false,
      };
    }
    case actions.FETCH_EVENTS_FAILURE: {
      return {
        ...state,
        loading: false,
        data: { ...state.data },
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default eventsReducer;
