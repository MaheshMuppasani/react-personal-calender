import React from "react";
import { enableEdit } from "../../../store/actions/openNewEvent";
import { connect } from "react-redux";
import { checkEventDelete } from "../../../store/actions/eventDeleteActions";

const PopupFooter2 = (props) => {
  return (
    <div className="py-2 text-right pr-3 popup-footer mt-4 position-absolute w-100 rounded-bottom">
      <button
        className="btn btn-sm discard-button border-0 delete-button mr-2"
        onClick={() => {
          props.checkEventDelete();
        }}
      >
        <i className="fas fa-trash"></i>
        <span className="ml-1">Delete</span>
      </button>
      <button
        className="btn btn-sm discard-button border-0 delete-button"
        onClick={() => {
          props.enableEdit();
        }}
      >
        <i className="fas fa-edit"></i>
        <span className="ml-1">Edit</span>
      </button>
    </div>
  );
};

const mapDispatchToProps = { enableEdit, checkEventDelete };

export default connect(null, mapDispatchToProps)(PopupFooter2);
