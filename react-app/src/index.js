import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stage } from "react-pixi-fiber";
import RotatingMonster from "./App";

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0xffffff,
  height: height,
  width: width
};

class App extends Component {
  render() {
    return (
      <Stage options={OPTIONS}>
        <RotatingMonster x={width / 2} y={height / 2} />
      </Stage>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
