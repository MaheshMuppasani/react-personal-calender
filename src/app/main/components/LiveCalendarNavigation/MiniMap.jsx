import React, { useState, useEffect } from "react";
import MiniMapGrid from "./MiniMapGrid";
import { connect } from "react-redux";
import { months } from "../../constants";
import { setPinnedDate } from "../../../store/actions/pinnedDate";
import { returnElaboratedDate } from "../../../store/actions/navigateDate";
import { navigateDateExact } from "../../../store/actions/navigateDate";
import { toggleMiniMap } from "../../../store/actions/toggleMiniMap";
import {
  syncToPinnedDate,
  unsyncFromPinned,
  syncUnsyncPinned,
} from "../../../store/actions/syncMiniMapTopickedDate";

const MiniMap = (props) => {
  const [localDate, setLocalDate] = useState({ ...props.pickedDate });
  const [adjustMonth, setAdjustMonth] = useState({ value: 0 });
  const [systemDate, setSystemDate] = useState({ ...props.systemDate });

  useEffect(() => {
    setLocalDate({ ...props.pickedDate });
    setSystemDate({ ...props.systemDate });
    setAdjustMonth({ value: 0 });
  }, [props.miniMap.syncStatus]);

  const moveToPrev = (prevValue) => {
    const localdate = new Date(
      localDate.year,
      localDate.month - 1,
      prevValue ? prevValue.day : 1
    );
    const payload = returnElaboratedDate(localdate);
    setAdjustMonth({ ...adjustMonth, value: adjustMonth.value - 1 });
    setLocalDate({ ...payload.payload });
  };

  const moveToNext = (prevValue) => {
    const localdate = new Date(
      localDate.year,
      localDate.month + 1,
      prevValue ? prevValue.day : 1
    );
    const payload = returnElaboratedDate(localdate);
    setAdjustMonth({ ...adjustMonth, value: adjustMonth.value + 1 });
    setLocalDate({ ...payload.payload });
  };
  const moveToCurrent = (currentValue) => {
    const localdate = new Date(
      localDate.year,
      localDate.month,
      currentValue.day
    );
    const payload = returnElaboratedDate(localdate);
    setLocalDate({ ...payload.payload });
  };
  return (
    <div className="user-select-none d-flex flex-column align-items-center">
      <div className="w-100 minimap-header d-flex align-items-center mb-1">
        <div className="d-flex w-100 justify-content-between p-2">
          <button className="btn btn-sm month-year flex-grow-1 text-left">
            {months[localDate.month]} {localDate.year}
          </button>
          <div className="map-navigators mr-1">
            <button
              className="btn btn-sm mr-2 mini-grid-piece"
              onClick={(e) => {
                e.stopPropagation();
                if (props.miniMap.syncStatus) {
                  props.unsyncFromPinned();
                }
                setTimeout(() => {
                  moveToPrev();
                }, 0);
              }}
            >
              <i
                className="prev-month fas fa-arrow-up"
                title="Go to previous month"
              ></i>
            </button>
            <button
              className="btn btn-sm mini-grid-piece"
              onClick={(e) => {
                e.stopPropagation();
                if (props.miniMap.syncStatus) {
                  props.unsyncFromPinned();
                }
                setTimeout(() => {
                  moveToNext();
                }, 0);
              }}
            >
              <i
                className="next-month fas fa-arrow-down"
                title="Go to Next month"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <div className="minimap-body d-flex flex-column w-100 align-items-center">
        <div className="weeks-grid-container px-2">
          <div className="mini-weeks">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
        </div>

        <div className="mini-grid-container p-2">
          <MiniMapGrid
            pickedDate={{ ...localDate }}
            setPinnedDate={(value, tense) => {
              if (tense === "past") {
                moveToPrev(value);
              } else if (tense === "future") {
                moveToNext(value);
              } else {
                moveToCurrent(value);
              }
              props.setPinnedDate(value);
              props.navigateDateExact(value);
            }}
            closeMiniMap={() => {
              props.toggleMiniMap();
            }}
            systemDate={{ ...systemDate }}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    pickedDate: state.pickedDate,
    systemDate: state.systemDate,
    miniMap: state.miniMapSyncStatus,
    navigatedDate: state.navigatedDate,
  };
};
const mapDispatchToProps = {
  setPinnedDate,
  navigateDateExact,
  syncToPinnedDate,
  unsyncFromPinned,
  syncUnsyncPinned,
  toggleMiniMap,
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap);
