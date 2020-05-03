import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Game from "./components/GamePage";

// TODO: make this DRY with index.js
const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

// This will be wrapped with withApp,
// and imported, probably as App
class WrappedApp extends Component {
  margin = 115;
  state = {
    trash: {
      velocity: { x: 200, y: 10, rotation: 0 },
      x : 0,
      y : 0,
      rotation : 0,
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
    let newX = middle + (spread / 2) * Math.sin(now / 2);

    monsterState.x = Math.max(
      monsterState.minX,
      Math.min(monsterState.maxX, newX)
    );

    monsterState.rotation = 0.25 * Math.sin(Math.PI * now);

    this.setState((state) => ({
      ...state,
      monster: { ...monsterState },
    }));
  };

  // The current time (in seconds since 1970)
  now() {
    return new Date().getTime() / 1000.0;
  }

  signedRandom() {
    return 2.0*(Math.random()-0.5);
  }

  makeTrashAnimation() {
    let then = this.now();

    return (delta) => {
      // t is the time since the start of the animation.
      let now = this.now();
      let deltaT = now - then;
      then = now;

      let trashState = { ...this.state.trash };

      // Move the object according to its velocity
      // and the amount of time since the last frame of animation
      trashState.x += deltaT * trashState.velocity.x;
      trashState.y += deltaT * trashState.velocity.y;
      trashState.rotation += deltaT * trashState.velocity.rotation;

      trashState.velocity.y += 10; // gravity

      let floor = trashState.maxY;

      // When the object is hitting the floor...
      if (trashState.y > floor) {
        // Make sure it doesn't go any farther down
        trashState.y = Math.min(trashState.y, floor);

        // Friction slows down the object's velocity
        trashState.velocity.x *= 0.5;
        trashState.velocity.y *= 0.5;
        trashState.velocity.rotation *= 0.5;

        // When the object is pressing into the floor...
        if (trashState.velocity.y > 0) {
          trashState.velocity.y *= -1; // Negate the y-velocity to bounce it back up.

          // Add a random change to rotation and x-velocity.  This makes the bounce a bit chaotic
          let mag = trashState.velocity.y * trashState.velocity.y / 10000;
          trashState.velocity.x += this.signedRandom() * mag;
          trashState.velocity.rotation += this.signedRandom() * mag;
        }
      }

      this.setState((state) => ({
        ...state,
        trash: { ...trashState },
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
