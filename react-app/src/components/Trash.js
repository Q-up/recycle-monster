import React, { Component } from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import trashTextures from "./TrashSprites";

const centerAnchor = new PIXI.Point(0.5, 0.5);

class Trash extends Component {
  render() {
    const loader = PIXI.Loader.shared;
    const sheet = loader.resources["/images/TrashAtlas.json"];

    return (
      <Sprite
        interactive
        pointerdown={this.props.pointerDown}
        pointermove={this.props.pointerMove}
        pointerup={this.props.pointerUp}
        texture={sheet.textures[trashTextures[this.props.textureIndex].image]}
        category={trashTextures[this.props.textureIndex].category}
        anchor={centerAnchor}
        scale={1}
        y={0}
        x={0}
        {...this.props}
        curser='grab'
      />
    );
  }
}

export default Trash;
