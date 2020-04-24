import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { Stage } from "react-pixi-fiber";

const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;
console.log("rootDiv dimensions:", width, height);

const OPTIONS = {
  transparent: true,
  width: width,
  height: height
};

// const background = new PIXI.Texture.from(cleanearth).load;

ReactDOM.render(
  <Stage options={OPTIONS}>
    <App />
  </Stage>,
  document.getElementById("root")
);
