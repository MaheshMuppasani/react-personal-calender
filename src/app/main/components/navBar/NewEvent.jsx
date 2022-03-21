import React from "react";
import { openNewEvent } from "../../../store/actions/openNewEvent";
import { connect } from "react-redux";

const NavInterface2 = (props) => {
  return (
    <div>
      <button
        className="newEvent-creator btn btn-sm nav-button"
        onClick={() => {
          props.openNewEvent();
        }}
      >
        New Event
      </button>
    </div>
  );
};

const mapDispatchToProps = { openNewEvent };

export default connect(null, mapDispatchToProps)(NavInterface2);
