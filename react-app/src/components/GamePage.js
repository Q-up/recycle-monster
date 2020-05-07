import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Monster from "./Monster";
import Trash from "./Trash";
import Compost from "./Compost";
import splashPage from "./images/monster.png";
import { Sprite, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

function signedRandom() {
  return 2.0 * (Math.random() - 0.5);
}

class Game extends Component {
  margin = 115;
  state = {
    trashList: [this.generateTrashState()],
    monster: {
      minY: height / 1.3,
      minX: this.margin,
      maxX: width - this.margin,
    },
  };

  generateTrashState() {
    return {
      velocity: { x: Math.random() * 200 - 100, y: 10, rotation: 0 },
      x: Math.random() * 800,
      y: 0,
      rotation: 0,
      fixed: false,
      minY: height / 1.3,
      maxY: height - 75,
      minX: this.margin,
      maxX: width - this.margin,
      textureIndex: Math.floor(Math.random() * 3),
    };
  }

  constructor(props) {
    super(props);
    this.pointerDown = this.pointerDown.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerUp = this.pointerUp.bind(this);
  }

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

    let monster = { ...this.state.monster };
    let spread = monster.maxX - monster.minX; // total distance, left to right
    let middle = monster.minX + spread / 2;
    let newX = middle + (spread / 2) * Math.sin(now / 2);

    monster.x = Math.max(monster.minX, Math.min(monster.maxX, newX));

    monster.rotation = 0.25 * Math.sin(Math.PI * now);

    this.setState((state) => ({
      ...state,
      monster: { ...monster },
    }));
  };

  // The current time (in seconds since 1970)
  now() {
    return new Date().getTime() / 1000.0;
  }

  doPhysics(trash, deltaT) {
    if (trash.fixed) return;

    // Move the object according to its velocity
    // and the amount of time since the last frame of animation
    trash.x += deltaT * trash.velocity.x;
    trash.y += deltaT * trash.velocity.y;
    trash.rotation += deltaT * trash.velocity.rotation;

    trash.velocity.y += 10; // gravity

    let floor = trash.maxY;

    // When the object is hitting the floor...
    if (trash.y > floor) {
      // Make sure it doesn't go any farther down
      trash.y = Math.min(trash.y, floor);

      // Friction slows down the object's velocity
      trash.velocity.x *= 0.5;
      trash.velocity.y *= 0.5;
      trash.velocity.rotation *= 0.5;

      // When the object is pressing into the floor...
      if (trash.velocity.y > 0) {
        trash.velocity.y *= -1; // Negate the y-velocity to bounce it back up.

        // Add a random change to rotation and x-velocity.  This makes the bounce a bit chaotic
        let mag = (trash.velocity.y * trash.velocity.y) / 10000;
        trash.velocity.x += signedRandom() * mag;
        trash.velocity.rotation += signedRandom() * mag;
      }
    }
  }

  makeTrashAnimation() {
    let then = this.now();

    return (delta) => {
      let now = this.now();
      let deltaT = now - then;
      then = now;

      let previousTrash = this.state.trashList[0];

      let trash = { ...previousTrash };
      this.doPhysics(trash, deltaT);

      this.setState((state) => ({
        ...state,
        trashList: [trash],
      }));
    };
  }

  dragHappening = false;
  dragStartScreenX = 0;
  dragStartScreenY = 0;
  dragStartObjectX = 0;
  dragStartObjectY = 0;

  pointerDown(e) {
    this.dragStartScreenX = e.data.global.x;
    this.dragStartScreenY = e.data.global.y;

    this.dragStartObjectX = this.state.trashList[0].x;
    this.dragStartObjectY = this.state.trashList[0].y;

    this.dragHappening = true;
  }

  moveToDrag(e) {
    let x = e.data.global.x;
    let y = e.data.global.y;

    this.setState((state) => ({
      ...state,
      trashList: [
        {
          ...state.trashList[0],
          velocity: { x: 0, y: 0, rotation: 0 },
          fixed: true,
          x: x - this.dragStartScreenX + this.dragStartObjectX,
          y: y - this.dragStartScreenY + this.dragStartObjectY,
        },
      ],
    }));
  }

  pointerMove(e) {
    if (this.dragHappening) {
      this.moveToDrag(e);
    }
  }

  pointerUp(e) {
    this.moveToDrag(e);
    this.setState((state) => ({
      ...state,
      trashList: [
        {
          ...state.trashList[0],
          fixed: false,
        },
      ],
    }));
    this.dragHappening = false;
  }

  getTrashItems(array) {
    return array.map((item) => (
      <Trash
        textureIndex={item.textureIndex}
        pointerDown={this.pointerDown}
        pointerMove={this.pointerMove}
        pointerUp={this.pointerUp}
        {...this.state.trashList[0]}
      />
    ));
  }
  render() {
    const loader = PIXI.Loader.shared;
    const spriteAtlas = "/images/GameBackGround.json";

    if (Object.keys(loader.resources).length === 0) {
      loader.add(spriteAtlas).load(() => undefined);
    }

    if (loader.loading === false && loader.progress === 100) {
      let sheet = loader.resources[spriteAtlas];

      const earth = sheet.textures["Earth_01.png"];
      const trash = sheet.textures["TrashBin.png"];
      const recycle = sheet.textures["RecycleBin.png"];

      return (
        <Container>
          <Sprite texture={earth} scale={0.33} />
          <Sprite texture={trash} scale={0.39} x={650} y={20} {...this.props} />
          <Sprite
            texture={recycle}
            scale={0.4}
            x={330}
            y={20}
            {...this.props}
          />
          <Compost {...this.props} />
          <Monster {...this.state.monster} />
          <Container>{this.getTrashItems(this.state.trashList)}</Container>
        </Container>
      );
    } else {
      return <Sprite texture={PIXI.Texture.from(splashPage)} scale={0.2} />;
    }
  }
}

export default Game;
