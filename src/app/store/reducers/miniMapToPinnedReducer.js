import * as actions from "../action-types";

const miniMapToPinnedReducer = (state = { syncStatus: true }, action) => {
  switch (action.type) {
    case actions.SYNC_MAP_TO_PICKED: {
      return {
        ...state,
        syncStatus: true,
      };
    }
    case actions.UNSYNC_TO_PICKED: {
      return {
        ...state,
        syncStatus: false,
      };
    }
    case actions.SYNC_UNSYNC_PICKED: {
      return {
        ...state,
        syncStatus: !state.syncStatus,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default miniMapToPinnedReducer;
