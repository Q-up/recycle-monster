import React from "react";
import { render } from "react-dom";
import "./App.css";
import MyPixiApp from "./App";
import { Stage } from "react-pixi-fiber";

const rootDiv = document.getElementById("root");

const OPTIONS = {
  transparent: true,
  width: rootDiv.width || 800,
  height: rootDiv.height || 600,
};

render(
  <Stage options={OPTIONS}>
    <MyPixiApp x={200} y={200} minX={0}  />
  </Stage>,
  document.getElementById("root")
);
