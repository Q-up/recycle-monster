import React, { Component } from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const centerAnchor = new PIXI.Point(0.5, 0.5);

class Star extends Component {
  render() {
    const loader = PIXI.Loader.shared;
    const spriteAtlas = "/images/GameBackGround.json";
    const sheet = loader.resources[spriteAtlas];

    return (
      <Sprite
        interactive
        texture={sheet.textures["Star.png"]}
        anchor={centerAnchor}
        scale={0.25}
        y={0}
        x={0}
        alpha={1}
        {...this.props}
      />
    );
  }
}

export default Star;
