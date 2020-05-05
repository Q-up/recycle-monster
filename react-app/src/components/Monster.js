import React from "react";
import PropTypes from "prop-types";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
//import monster from "./images/monster.png";

function Monster(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";
  let sheet = loader.resources[spriteAtlas];
  const centerAnchor = new PIXI.Point(0.5, 0.5);
  const monster = sheet.animation["Monster_01.png"];

  return (
    <Sprite
      animation={monster}
      anchor={centerAnchor}
      scale={0.4}
      y={500}
      x={330}
      {...props}
    />
  );
}

export default Monster;
