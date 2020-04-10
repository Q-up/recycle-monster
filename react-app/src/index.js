import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import RotatingBunny from "./App";

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x000000,
  height: height,
  width: width
};

class App extends Component {
  render() {
    return (
      <Stage options={OPTIONS}>
        <RotatingBunny x={width / 2} y={height / 2} />
      </Stage>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
