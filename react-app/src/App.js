import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Game from "./components/GamePage";

// This will be wrapped with withApp,
// and imported, probably as App
class WrappedApp extends Component {
  margin = 115;

  render() {
    return (
      <Game app={this.props.app}
      ></Game>
    );
  }
}

WrappedApp.propTypes = {
  app: PropTypes.object,
};

console.log("WrappedApp=", WrappedApp);
export default withApp(WrappedApp);
