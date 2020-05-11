import React, { Component } from "react";

import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import splashPage from "./images/monster.png";

const centerAnchor = new PIXI.Point(0, 0);

class SplashPage extends Component {
  render() {
    return (
      <Sprite
        interactive
        texture={PIXI.Texture.from(splashPage)}
        anchor={centerAnchor}
        scale={0.4}
        pointerdown={this.props.pointerdown}
      />
    );
    //<Button></Button>
  }
}

export default SplashPage;
