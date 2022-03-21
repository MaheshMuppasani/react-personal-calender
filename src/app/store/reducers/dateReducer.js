import * as actions from "../action-types";
import { currentDate } from "../actions/currentDate";

const systemDateReducer = (state = currentDate().payload, action) => {
  switch (action.type) {
    case actions.SET_DATE: {
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

export default systemDateReducer;
