import React, { Component } from "react";
import { Sprite, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import splashPage from "./images/monster.png";
import StartButton from "./StartButton";

const centerAnchor = new PIXI.Point(0, 0);

class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.hoverOver = this.hoverOver.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
    this.state = { hoverOverStyle: this.props.style };
  }

  hoverOver() {
    this.setState({
      hoverOverStyle: {
        dropShadow: true,
        fill: ["#03fcf0", "#039dfc"],
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        fontSize: 72,
        fontVariant: "small-caps",
        fontWeight: "bolder",
        letterSpacing: 10,
        strokeThickness: 12,
      },
    });
  }

  hoverOff() {
    this.setState({
      hoverOverStyle: this.props.style,
    });
  }

  render() {
    return (
      <Container>
        <Sprite
          interactive
          texture={PIXI.Texture.from(splashPage)}
          anchor={centerAnchor}
          scale={0.3}
          x={150}
          y={100}
        />
        <StartButton
          pointerdown={this.props.pointerdown}
          hoverOver={this.hoverOver}
          hoverOff={this.hoverOff}
          style={this.state.hoverOverStyle}
        />
      </Container>
    );
  }
}

export default SplashPage;
