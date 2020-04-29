import React from "react";
import { render } from "react-dom";
import "./App.css";
import MyPixiApp from "./App";
import { Stage } from "react-pixi-fiber";

const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

const OPTIONS = {
  transparent: true,
  width: width,
  height: height
};

render(
  <Stage options={OPTIONS}>
    <MyPixiApp x={200} y={200} />
  </Stage>,
  document.getElementById("root")
);
