import * as actions from "../action-types";

export const syncToPinnedDate = () => {
  return {
    type: actions.SYNC_MAP_TO_PICKED,
  };
};

export const unsyncFromPinned = () => {
  return {
    type: actions.UNSYNC_TO_PICKED,
  };
};

export const syncUnsyncPinned = () => {
  return {
    type: actions.SYNC_UNSYNC_PICKED,
  };
};
