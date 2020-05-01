import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

function Trash(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";
  let sheet = loader.resources[spriteAtlas];
  const centerAnchor = new PIXI.Point(0.5, 0.5);
  const fijiBottle = sheet.textures["fiji-water-bottle.png"];

  return (
    <Sprite
      texture={fijiBottle}
      anchor={centerAnchor}
      scale={0.4}
      y={500}
      x={330}
      {...props}
    />
  );
}

export default Trash;
