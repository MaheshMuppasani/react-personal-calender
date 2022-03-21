import React from "react";
import { connect } from "react-redux";

const LoadingIndicator = (props) => {
  const renderLoader = () => {
    return props.events.loading ? (
      <React.Fragment>
        <div className="spinner-border loading-indicator" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div>Loading your events ...</div>
      </React.Fragment>
    ) : null;
  };

  return <div className="loader-container ml-2">{renderLoader()}</div>;
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
  };
};

export default connect(mapStateToProps, null)(LoadingIndicator);
