import React, { Component } from "react";
import { Sprite, render } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
const centerAnchor = new PIXI.Point(0.5, 0.5);

class Monster extends Component {
  constructor(props) {
    super(props);
    const loader = PIXI.Loader.shared;
    const spriteAtlas = "/images/GameBackGround.json";
    let sheet = loader.resources[spriteAtlas];
    const monster01 = sheet.textures["Monster_01.png"];
    const monster02 = sheet.textures["Monster_02.png"];
    const monster03 = sheet.textures["Monster_03.png"];
    const monster04 = sheet.textures["Monster_04.png"];
    this.monsterTextures = [monster01, monster02, monster03, monster04];
    this.state = { animationStep: 0 };
    setInterval(() => {
      let step = this.state.animationStep;
      let nextStep = (step + 1) % this.monsterTextures.length;
      this.setState({ animationStep: nextStep });
    }, 200);
  }
  //   dude.on('pointertap', () => {
  //     bol = !bol;
  //     if (bol) {
  //         dude.texture = secondTexture;
  //     } else {
  //         dude.texture = texture;
  //     }
  // });

  //setTimeout(function, 1000)
  render() {
    return (
      <Sprite
        texture={this.monsterTextures[this.state.animationStep]}
        anchor={centerAnchor}
        scale={0.4}
        y={500}
        x={330}
        {...this.props}
      />
    );
  }
}

export default Monster;
