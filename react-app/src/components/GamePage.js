import React from "react";
import Monster from "./Monster";
import Trash from "./Trash";
import Compost from "./Compost";
import DraggableContainer from "./DraggableContainer";
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
    const trashBin = sheet.textures["TrashBin.png"];
    const recycleBin = sheet.textures["RecycleBin.png"];

    function doSomething() {
      console.log("something has been done! ;)");
    }
    return (
      <Container>
        <Sprite texture={earth} scale={0.33} />
        <Monster {...props.monstate} />
        <Trash {...props.trashState} />
        <Sprite texture={trashBin} scale={0.39} x={650} y={20} {...props} />
        <Sprite texture={recycleBin} scale={0.4} x={330} y={20} {...props} />
        <Compost {...props} />
      </Container>
    );
  } else {
    return <Sprite texture={PIXI.Texture.from(splashPage)} scale={0.5} />;
  }
}

// <Trash state={props.trashState} />
// {/* if props is: {key1: 1, key2: "value 2"}} */}
// <Compost key1='1' key2='value 2' />
// <Compost combined={props} action={doSomething} />
// <Compost action={doSomething} {...props} />
/* inside Compost's constructor(props), props will be:
    {combined: {key1:1, key2: "value 2"}}

    versus, for the spread version or its equivalent:

    {key1: 1, key2: "value 2"}

    line 34 version, props is:
    {combined: {key1:1, key2: "value 2"}, action: [function]}

    line 35:
    {key1: 1, key2: "value 2", action: [function]}

    
*/
/*
    
    if we had:
    props = {
      foo: { baz: 1 }
      bar: 2
    }
    
    Then:
    
    <Trash {...props.foo}/>
    
    is exactly equivalent to:
    
    <Trash baz=1 />
    
    
    */
export default Game;
