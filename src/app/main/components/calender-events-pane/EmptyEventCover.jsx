import React from "react";

const EmptyEventCover = () => {
  return (
    <div className="Events-cover w-100 position-absolute">
      <img src="https://outlook-1.cdn.office.net/owamail/20210215002.04/scripts/../resources/images/balloon-20a6216dba02a69c389fbaaaea3f6f1f.svg"></img>
      <h6 className="noEventstitle">Nothing planned for the day</h6>
      <small>Enjoy!</small>
    </div>
  );
};

export default EmptyEventCover;
