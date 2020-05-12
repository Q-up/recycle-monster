import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Game from "./components/GamePage";
import SplashPage from "./components/SplashPage";
import { Container, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

// This will be wrapped with withApp,
// and imported, probably as App
class WrappedApp extends Component {
  margin = 115;

  state = {
    startGame: false,
  };

  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({
      ...this.state,
      startGame: true,
    });
  }

  render() {
    const loader = PIXI.Loader.shared;
    const backgroundAtlasPath = "/images/GameBackGround.json";
    const trashAtlasPath = "/images/TrashAtlas.json";
    const monsterAtlasPath = "/images/MonsterAtlas.json";

    if (Object.keys(loader.resources).length === 0) {
      loader
        .add([backgroundAtlasPath, trashAtlasPath, monsterAtlasPath])
        .load(() => undefined);
    }
    const style = {
      dropShadow: true,
      fill: ["#f9970a", "#8b166c"],
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      fontSize: 72,
      fontVariant: "small-caps",
      fontWeight: "bolder",
      letterSpacing: 10,
      strokeThickness: 12,
    };

    if (this.state.startGame) {
      return <Game app={this.props.app} style={style}></Game>;
    } else {
      return (
        <Container>
          <Text text='Recycle Monster' style={style} />
          <Text text='click to play' style={style} scale={0.5} y={200} />
          <SplashPage
            interactive
            buttonMode
            pointerdown={this.startGame}
          ></SplashPage>
        </Container>
      );
    }
  }
}

WrappedApp.propTypes = {
  app: PropTypes.object,
};

export default withApp(WrappedApp);
