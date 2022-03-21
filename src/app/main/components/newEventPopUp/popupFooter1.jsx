import React from "react";

const PopupFooter = (props) => {
  return (
    <div className="py-2 text-right pr-3 popup-footer mt-4 position-absolute w-100 rounded-bottom">
      <button
        className="btn btn-sm discard-button border-dark mr-3 px-3"
        onClick={() => {
          props.formReset();
          props.closeNewEvent();
        }}
      >
        <span>Discard</span>
      </button>
      <button
        className="btn btn-sm save-button px-3"
        onClick={() => {
          props.formHandle();
        }}
      >
        <i className="fas fa-save"></i>
        <span className="ml-1">Save</span>
      </button>
    </div>
  );
};

export default PopupFooter;
