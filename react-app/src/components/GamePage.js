import React from "react";
import Monster from "./Monster";
import splashPage from "./images/monster.png";
import { Sprite, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

function Game(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";

  if (Object.keys(loader.resources).length === 0) {
    loader.add(spriteAtlas).load(() => undefined);
  }

  if (loader.loading === false && loader.progress === 100) {
    let sheet = loader.resources[spriteAtlas];

    const earth = sheet.textures["Earth_01.png"];
    const compost = sheet.textures["CompostBin.png"];
    const trash = sheet.textures["TrashBin.png"];
    const recycle = sheet.textures["RecycleBin.png"];
    return (
      <Container>
        <Sprite texture={earth} scale={0.33} />
        <Sprite texture={compost} scale={0.5} x={30} y={30} />
        <Sprite texture={trash} scale={0.5} x={180} y={30} />
        <Sprite texture={recycle} scale={0.5} x={330} y={30} />
        <Monster {...props.monstate} />
      </Container>
    );
  } else {
    return <Sprite texture={PIXI.Texture.from(splashPage)} scale={0.5} />;
  }
}

export default Game;
