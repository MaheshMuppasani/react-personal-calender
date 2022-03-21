import systemDateReducer from "./dateReducer";
import navigateDateReducer from "./navigateReducer";
import eventsReducer from "./eventsReducer";
import newEventReducer from "./newEventReducer";
import existedEventReducer from "./existedEventReducer";
import copyExistedEventReducer from "./copyExistedEventReducer";
import eventDeleteReducer from "./eventDeleteReducer";
import { combineReducers } from "redux";
import pinnedDateReducer from "./pinnedDateReducer";
import eventsPaneReducer from "./eventsPaneReducer";
import miniMapReducer from "./miniMapReducer";
import miniMapToPinnedReducer from "./miniMapToPinnedReducer";
import monthPickerReducer from "./monthPickerReducer";

const allReducers = combineReducers({
  systemDate: systemDateReducer,
  navigatedDate: navigateDateReducer,
  events: eventsReducer,
  newEventUI: newEventReducer,
  existedEventUI: existedEventReducer,
  existedEventData: copyExistedEventReducer,
  eventDeleteStatus: eventDeleteReducer,
  pickedDate: pinnedDateReducer,
  eventsPaneStatus: eventsPaneReducer,
  miniMapStatus: miniMapReducer,
  miniMapSyncStatus: miniMapToPinnedReducer,
  monthPicker: monthPickerReducer,
});

export default allReducers;
