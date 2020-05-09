import React, { Component } from "react";
// import { Button } from "react-bootstrap";
import Monster from "./Monster";
import Trash from "./Trash";

import splashPage from "./images/monster.png";
import { Sprite, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

function signedRandom() {
  return 2.0 * (Math.random() - 0.5);
}

// The current time (in seconds since 1970)
function currentTime() {
  return new Date().getTime() / 1000.0;
}

class Game extends Component {
  margin = 115;
  state = {
    trashList: [
      this.generateTrashState(),
      this.generateTrashState(),
      this.generateTrashState(),
    ],
    compostBin: {
      active: false,
    },
    recycleBin: {
      active: false,
    },
    trashBin: {
      active: false,
    },
    monster: {
      minY: height / 1.3,
      minX: this.margin,
      maxX: width - this.margin,
    },
  };

  generateTrashState() {
    return {
      velocity: {
        x: signedRandom() * 200,
        y: signedRandom() * 200,
        rotation: signedRandom() * 1,
      },
      x: signedRandom() * 200 + 0.5 * width,
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
      //...state,
      monster: { ...monster },
    }));
  };

  doPhysics(previousTrash, deltaT) {
    let trash = { ...previousTrash };
    if (trash.fixed) return trash;

    // Move the object according to its velocity
    // and the amount of time since the last frame of animation
    trash.x += deltaT * trash.velocity.x;
    trash.y += deltaT * trash.velocity.y;
    trash.rotation += deltaT * trash.velocity.rotation;

    trash.velocity.y += 10; // gravity

    if (trash.x > trash.maxX || trash.x < trash.minX) {
      trash.x = Math.min(trash.x, trash.maxX);
      trash.x = Math.max(trash.x, trash.minX);

      if (trash.velocity.x > 0) {
        trash.velocity.x *= -1;
      }
    }

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

    return trash;
  }

  makeTrashAnimation() {
    let then = currentTime();

    return (delta) => {
      let now = currentTime();
      let deltaT = now - then;
      then = now;

      this.setState((state) => ({
        //...state,
        trashList: this.state.trashList.map((trash) =>
          this.doPhysics(trash, deltaT)
        ),
      }));
    };
  }

  dragHappening = false;
  dragTarget = null;
  dragStartScreenX = 0;
  dragStartScreenY = 0;
  dragStartObjectX = 0;
  dragStartObjectY = 0;

  pointerDown(e) {
    if (e.target != null)
    {
      this.selectedIndex = e.target.trashItemIndex;
      this.selectedSprite = e.target;
      this.dragStartScreenX = e.data.global.x;
      this.dragStartScreenY = e.data.global.y;

      this.dragStartObjectX = this.state.trashList[this.selectedIndex].x;
      this.dragStartObjectY = this.state.trashList[this.selectedIndex].y;

      this.dragHappening = true;
    }
  }

  moveToDrag(e) {
    let x = e.data.global.x;
    let y = e.data.global.y;

    let hitRecycling = this.makeBinBounds(
      this.selectedSprite.getBounds(), this.recycleBin.props.x, this.recycleBin.props.y);

    this.setState(() => ({
      recycleBin: {
        active: hitRecycling
      },
      trashList: this.state.trashList.map((item, i) =>
        i !== this.selectedIndex
          ? item
          : {
              ...item,
              velocity: { x: 0, y: 0, rotation: 0 },
              fixed: true,
              x: x - this.dragStartScreenX + this.dragStartObjectX,
              y: y - this.dragStartScreenY + this.dragStartObjectY,
            }
      ),
    }));
  }

  pointerMove(e) {
    if (this.dragHappening) {
      this.moveToDrag(e);
    }
  }

  pointerUp(e) {
    if (this.dragHappening) {
      this.dragHappening = false;

      let hitRecycling = this.makeBinBounds(
        this.selectedSprite.getBounds(), this.recycleBin.props.x, this.recycleBin.props.y);

      this.moveToDrag(e);

      if (hitRecycling) {
        this.setState({
          ...this.state,
          recycleBin: {
            active: false
          },
          trashList: this.state.trashList.filter(
            (item, i) => i !== this.selectedIndex
          ),
        });
      } else {
        this.setState({
          trashList: this.state.trashList.map((item) => ({
            ...item,
            fixed: false,
          })),
        });
      }

      this.dragTarget = null;
    }
  }

  getTrashItems(array) {
    return array.map((item, i) => (
      <Trash
        textureIndex={item.textureIndex}
        pointerDown={this.pointerDown}
        pointerMove={this.pointerMove}
        pointerUp={this.pointerUp}
        trashItemIndex={i}
        key={i}
        {...item}
      />
    ));
  }

  makeBinBounds(bounds, x, y) {
    return (
      x > bounds.left - 50 &&
      x < bounds.right + 50 &&
      y > bounds.top - 50 &&
      y < bounds.bottom + 50
    );
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
      const compost = sheet.textures["CompostBin.png"];
      const recycle = sheet.textures["RecycleBin.png"];
      const trash = sheet.textures["TrashBin.png"];
      const centerAnchor = new PIXI.Point(0.5, 0.5);

      this.compostBin = (
        <Sprite
          interactive
          anchor={centerAnchor}
          texture={compost}
          scale={0.38}
          x={85}
          y={75}
          {...this.props}
        />
      );
      this.recycleBin = (
        <Sprite
          interactive
          anchor={centerAnchor}
          texture={recycle}
          scale={0.4 * (this.state.recycleBin.active ? 1.2 : 1.0)}
          x={width / 2}
          y={75}
          {...this.props}
        />
      );
      this.trashBin = (
        <Sprite
          interactive
          anchor={centerAnchor}
          texture={trash}
          scale={0.39}
          x={705}
          y={75}
          {...this.props}
        />
      );
      this.rootContainer = (
        <Container>
          <Sprite texture={earth} scale={0.33} />
          {this.compostBin}
          {this.recycleBin}
          {this.trashBin}
          <Monster {...this.state.monster} />
          <Container>{this.getTrashItems(this.state.trashList)}</Container>
        </Container>
      );
      return this.rootContainer;
    } else {
      return <Sprite texture={PIXI.Texture.from(splashPage)} scale={0.2} />;
    }
  }
}

export default Game;
