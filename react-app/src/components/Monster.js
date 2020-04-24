import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import monster from "./monsternobackground.jpg";

const centerAnchor = new PIXI.Point(0.5, 0.5);

function Monster(props) {
  return (
    <Sprite
      anchor={centerAnchor}
      texture={PIXI.Texture.from(monster)}
      {...props}
    />
  );
}

export default Monster;
