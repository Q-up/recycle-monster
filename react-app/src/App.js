import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Game from "./components/GamePage";

// TODO: make this DRY with index.js
const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

// this will be wrapped with withApp,
// and imported, probably as App
class WrappedApp extends Component {
  margin = 115;
  state = {
    rotation: 0,
    trash: {
      minY: height / 1.3,
      maxY: height - 75,
      minX: this.margin,
      maxX: width - this.margin,
    },
    monster: {
      minY: height / 1.3,
      minX: this.margin,
      maxX: width - this.margin,
    },
  };

  // this.props.app is given to us by withApp().
  componentDidMount() {
    this.props.app.ticker.add(this.animate);
    this.trashAnimate = this.makeTrashAnimation();
    this.props.app.ticker.add(this.trashAnimate);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
    this.props.app.ticker.remove(this.trashAnimate);
  }

  animate = (delta) => {
    // current time in seconds with fractional milliseconds:
    let now = new Date().getTime() / 1000.0;
    let monsterState = { ...this.state.monster };
    let spread = monsterState.maxX - monsterState.minX; // total distance, left to right
    let middle = monsterState.minX + spread / 2;
    // let newX = monsterState.x + 0.0 + 10 * (0.51 - Math.random());
    let newX = middle + (spread / 2) * Math.sin(now / 2);
    monsterState.x = Math.max(
      monsterState.minX,
      Math.min(monsterState.maxX, newX)
    );
    // monsterState.rotation = 0.2 * (0.5 - Math.random());
    monsterState.rotation = 0.25 * Math.sin(Math.PI * now);
    // monsterState.y = monsterState.minY - Math.random() * 10;
    this.setState((state) => ({
      ...state,
      monster: { ...monsterState },
      // rotation: state.rotation + 0.001 * delta
    }));
  };

  makeTrashAnimation() {
    let firstNow = new Date().getTime() / 1000.0;
    return (delta) => {
      // current time in seconds with fractional milliseconds:
      let now = new Date().getTime() / 1000.0 - firstNow;
      const gravity = now * now * 20;
      // instance.interactive = true;
      // instance.cursor = "pointer";
      let trashState = { ...this.state.trash };
      // let spread = trashState.maxY - trashState.minY; // total distance, left to right
      // let middle = trashState.minY + spread / 2;
      //let newX = trashState.x + 0.0 + 10 * (0.51 - Math.random());
      //let newY = middle + (spread / 2) * Math.sin(now);
      // trashState.x = Math.max(trashState.minY, Math.min(trashState.maxY, ));
      //trashState.x = Math.random() * 800;
      trashState.y = gravity;
      trashState.rotation = now / 2;
      let floor = trashState.maxY;
      trashState.y = Math.min(trashState.y, floor);
      //trashState.rotation = 0.5 * Math.sin(Math.PI * now);
      // trashState.y = trashState.minY - Math.random() * 10;
      this.setState((state) => ({
        ...state,
        trash: { ...trashState },
        // rotation: state.rotation + 0.001 * delta
      }));
    };
  }

  render() {
    return (
      <Game
        app={this.props.app}
        monstate={this.state.monster}
        trashState={this.state.trash}
      ></Game>
    );

    // trash.map(item => <Trash rotation={this.state.rotation}>);
  }
}
WrappedApp.propTypes = {
  app: PropTypes.object,
};

console.log("WrappedApp=", WrappedApp);
export default withApp(WrappedApp);
