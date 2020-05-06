import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
//import monster from "./images/monster.png";

function Monster(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";
  let sheet = loader.resources[spriteAtlas];
  const centerAnchor = new PIXI.Point(0.5, 0.5);
  const monsterFrames =
    sheet.textures[
      ("Monster_01.png", "Monster_02.png", "Monster_03.png", "Monster_04.png")
    ];

  return (
    <Sprite
      texture={monsterFrames}
      anchor={centerAnchor}
      scale={0.4}
      y={500}
      x={330}
      {...props}
    />
  );
}

export default Monster;
