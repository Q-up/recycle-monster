import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import splashPage from "./images/monster.png";

const centerAnchor = new PIXI.Point(0.5, 0.5);

class SplashPage extends Component {
  render() {
    return (
      <Sprite
        texture={PIXI.Texture.from(splashPage)}
        anchor={centerAnchor}
        scale={0.8}
      />
    );
    //<Button></Button>
  }
}

export default SplashPage;
