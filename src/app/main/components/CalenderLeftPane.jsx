import React from "react";
import { toggleMiniMap } from "../../store/actions/toggleMiniMap";
import MiniMap from "../components/LiveCalendarNavigation/MiniMap";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const CalenderLeftPane = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    if (
      window.innerWidth < 1080 &&
      props.miniMap.openStatus &&
      windowWidth > 1080
    ) {
      props.toggleMiniMap();
    }
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  });
  const renderMiniMapClass = () => {
    let className = "mini-map text-dark bg-light p-2";
    return props.miniMap.openStatus ? className + " active" : className;
  };
  const renderMinMapOverlay = () => {
    let className = "mini-map-overlay";
    return props.miniMap.openStatus ? className + " active" : className;
  };
  return (
    <div className="calender-left-pane position-relative">
      <div
        className="menu-container text-dark py-2 px-2 px-md-3 text-left"
        onClick={() => {
          props.toggleMiniMap();
        }}
      >
        <i className="fas fa-bars"></i>
      </div>
      <div
        className={renderMinMapOverlay()}
        onClick={() => {
          props.toggleMiniMap();
        }}
      >
        <div
          className="mini-map-support h-100"
          onClick={(e) => {
            if (!props.miniMap.openStatus) e.stopPropagation();
          }}
        >
          <div
            className={renderMiniMapClass()}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MiniMap />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    miniMap: state.miniMapStatus,
  };
};

const mapDispatchToProps = { toggleMiniMap };
export default connect(mapStateToProps, mapDispatchToProps)(CalenderLeftPane);
