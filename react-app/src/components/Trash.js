import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import trash from "./monster.png";

const centerAnchor = new PIXI.Point(0.5, 0.5);

function Trash(props) {
  return (
    <Sprite
      anchor={centerAnchor}
      texture={PIXI.Texture.from(monster)}
      {...props}
    />
  );
}

export default Trash;
