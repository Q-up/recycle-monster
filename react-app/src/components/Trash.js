import React, { Component } from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const centerAnchor = new PIXI.Point(0.5, 0.5);

class Trash extends Component {
  trashGenerate;

  getItems(array) {
    const trashItems = [];
    return array.map((item) => (
      <Sprite
        interactive
        pointerdown={this.props.pointerDown}
        pointermove={this.props.pointerMove}
        pointerup={this.props.pointerUp}
        texture={item}
        anchor={centerAnchor}
        scale={0.4}
        y={0}
        x={0}
        {...this.props}
      />
    ));
  }

  render() {
    const loader = PIXI.Loader.shared;
    const spriteAtlas = "/images/GameBackGround.json";
    const sheet = loader.resources[spriteAtlas];
    const fijiBottle = sheet.textures["fiji-water-bottle.png"];
    const plasticBag = sheet.textures["plasticbag.png"];
    const burger = sheet.textures["burger.png"];
    const trashTextures = [fijiBottle, plasticBag, burger];

    return this.getItems(trashTextures);
  }
}

export default Trash;
