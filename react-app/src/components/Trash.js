import React, { Component } from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

class Trash extends Component {
  render() {
    const loader = PIXI.Loader.shared;
    const sheet = loader.resources["/images/GameBackGround.json"];
    const fijiBottle = sheet.textures["fiji-water-bottle.png"];
    const centerAnchor = new PIXI.Point(0.5, 0.5);

    return (
      <Sprite
        interactive
        pointerdown={this.props.pointerDown}
        pointermove={this.props.pointerMove}
        pointerup={this.props.pointerUp}
        texture={fijiBottle}
        anchor={centerAnchor}
        scale={0.4}
        y={500}
        x={330}
        {...this.props}
      />
    );
  }
}

export default Trash;
