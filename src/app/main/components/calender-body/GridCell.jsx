import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { months } from "../../constants";
import { openEditableEvent } from "../../../store/actions/openNewEvent";
import { copyExistedEvent } from "../../../store/actions/copyExistedEvent";
import { setPinnedDate } from "../../../store/actions/pinnedDate";
import { renderEvents } from "../../../utilities/renderEvents";
import { toggleSideBar } from "../../../store/actions/toggleSideBar";
import { syncUnsyncPinned } from "../../../store/actions/syncMiniMapTopickedDate";
import { returnElaboratedDate } from "../../../store/actions/navigateDate";

const GridCell = React.forwardRef((props, ref) => {
  const currentDate = useSelector((state) => state.navigatedDate);
  const eventsPane = useSelector((state) => state.eventsPaneStatus);
  const dispatch = useDispatch();
  const getMonth = (selectedDate) => {
    switch (props.tense) {
      case "past": {
        if (selectedDate.month === 0) {
          return { month: 11, year: selectedDate.year - 1 };
        }
        return { month: selectedDate.month - 1, year: selectedDate.year };
      }
      case "present": {
        return { month: selectedDate.month, year: selectedDate.year };
      }
      case "future": {
        if (selectedDate.month === 11) {
          return { month: 0, year: selectedDate.year + 1 };
        }
        return { month: selectedDate.month + 1, year: selectedDate.year };
      }
      default: {
        return { month: selectedDate.month, year: selectedDate.year };
      }
    }
  };

  let { month, year } = getMonth(currentDate);
  const openEditableEventDispatcher = () => {
    dispatch(openEditableEvent());
  };

  const copyExistedEventDispatcher = (tobeCopied) => {
    dispatch(copyExistedEvent({ ...tobeCopied }));
  };
  const toggleSideBarDispatcher = () => {
    dispatch(toggleSideBar());
  };

  const getMaxCount = (height = window.innerHeight) => {
    if (578 <= height && height <= 721) {
      return 1;
    } else if (722 <= height && height <= 803) {
      return 2;
    } else if (804 <= height && height <= 903) {
      return 3;
    } else if (904 <= height && height <= 1083) {
      return 5;
    } else if (1084 <= height && height <= 1444) {
      return 7;
    } else if (1445 <= height && height <= 2167) {
      return 14;
    } else if (2168 <= height) {
      return 20;
    } else {
      return 0;
    }
  };

  const localRenderEvents = (day) => {
    return renderEvents(
      year,
      props.events,
      months[month],
      day,
      getMaxCount(),
      copyExistedEventDispatcher,
      openEditableEventDispatcher,
      "secondaryWrapper",
      toggleSideBarDispatcher,
      eventsPane.openflag
    );
  };

  return (
    <span
      ref={ref}
      style={props.style}
      className={
        `calender-cell col flex-shrink-1 d-flex flex-column` + props.className
      }
      tabIndex="0"
      onClick={() => {
        const { month, year } = getMonth(currentDate);
        const exactPinned = returnElaboratedDate(
          new Date(year, month, props.value)
        );
        const selectedDate = { ...exactPinned.payload };
        dispatch(setPinnedDate(selectedDate));
        dispatch(syncUnsyncPinned());
      }}
    >
      <div>
        {props.month} {props.value}
      </div>
      {localRenderEvents(props.value)}
    </span>
  );
});

export default GridCell;
