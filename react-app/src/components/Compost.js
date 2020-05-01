import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

function Compost(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";
  let sheet = loader.resources[spriteAtlas];
  const compost = sheet.textures["CompostBin.png"];
  // const trash = sheet.textures["TrashBin.png"];
  // const recycle = sheet.textures["RecycleBin.png"];

  return (
    <Sprite texture={compost} scale={0.38} x={30} y={20} {...props} />
    // <Sprite texture={trash} scale={0.39} x={650} y={20} {...props}/>
    // <Sprite texture={recycle} scale={0.4} x={330} y={20} {...props}/>
  );
}

export default Compost;
