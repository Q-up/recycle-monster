import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

function Compost(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";
  let sheet = loader.resources[spriteAtlas];
  const compost = sheet.textures["CompostBin.png"];
  const centerAnchor = new PIXI.Point(0.5, 0.5);
  // const trash = sheet.textures["TrashBin.png"];
  // const recycle = sheet.textures["RecycleBin.png"];

  return (
    <Sprite
      anchor={centerAnchor}
      texture={compost}
      scale={0.38}
      x={85}
      y={75}
      {...props}
    />
    // <Sprite texture={trash} scale={0.39} x={650} y={20} {...props}/>
    // <Sprite texture={recycle} scale={0.4} x={330} y={20} {...props}/>
  );
}

export default Compost;
