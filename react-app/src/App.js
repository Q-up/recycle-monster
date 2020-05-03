import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Game from "./components/GamePage";

// TODO: make this DRY with index.js
const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

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
