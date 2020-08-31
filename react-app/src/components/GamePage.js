import React, { Component } from "react";
import Monster from "./Monster";
import Trash from "./Trash";
import Star from "./Star";

import { Sprite, Container, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

import trashTextures from "./TrashSprites";

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

/*  Extracts the item in the list at a given index.
    Returns a list of two things:

    - the extracted item
    - a new list with the item removed
*/
function extract(list, index) {
  let item = list[index];
  let newList = list.slice(0, index).concat(list.slice(index+1, list.length));
  return [item, newList];
}

class Game extends Component {
  margin = 115;
  state = {
    score: 0,
    pollution: 0,
    startGame: false,
    starList: [],
    trashList: [this.generateTrashState()],
    selectedTrash: [],
    bins: [
      {
        category: "compost",
        hover: false,
        shakeLife: 0,
        offsetX: 0,
        scale: 0.38,
        x: 85,
        y: 75,
      },
      {
        category: "recycle",
        hover: false,
        shakeLife: 0,
        offsetX: 0,
        scale: 0.4,
        x: width / 2,
        y: 75,
      },
      {
        category: "garbage",
        hover: false,
        shakeLife: 0,
        offsetX: 0,
        scale: 0.39,
        x: 705,
        y: 75,
      },
    ],
    monster: {
      velocity: { x: 50, y: 0, rotation: 0 },
      currentFrame: 0,
      minY: height / 1.3,
      minX: this.margin,
      maxX: width - this.margin,
      x: -200,
      y: 0,
      eatingTimer: 0,
      belly: 0.0,
      extraScale: 1.0,
    },
  };

  generateStarState(x, y, vx, vy) {
    return {
      velocity: {
        x: vx,
        y: vy,
        rotation: signedRandom(),
      },
      x: x,
      y: y,
      rotation: 0,
      life: 0.5,
    };
  }

  generatePop(x, y) {
    let n = 20;
    let popList = [];
    for (var i = 0; i < n; i++) {
      let theta = (Math.PI * 2 * i) / n;
      popList.push(
        this.generateStarState(
          x,
          y,
          400 * Math.cos(theta),
          400 * Math.sin(theta)
        )
      );
    }

    return popList;
  }

  generateTrashState() {
    return {
      velocity: {
        x: signedRandom() * 300,
        y: signedRandom() * 300,
        rotation: signedRandom() * 1,
      },
      x: signedRandom() * 200 + 0.5 * width,
      y: -40,
      rotation: 0,
      fixed: false,
      minY: height / 1.3,
      maxY: height - 75,
      minX: this.margin,
      maxX: width - this.margin,
      textureIndex: Math.floor(Math.random() * trashTextures.length),
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
    this.props.app.ticker.add(this.makeAnimation());
    this.trashAnimate = this.makeTrashAnimation();
    this.props.app.ticker.add(this.trashAnimate);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
    this.props.app.ticker.remove(this.trashAnimate);
  }

  makeAnimation() {
    let then = currentTime();
    return (delta) => {
      let now = currentTime();
      let deltaT = now - then;
      then = now;

      let monster = { ...this.state.monster };

      monster.y = 520;

      if (monster.belly > 0) {
        this.setState((state) => ({
          ...this.state,
          pollution: state.pollution + 0.1 * deltaT,
        }));
        monster.extraScale += 0.1 * deltaT;
        monster.belly -= deltaT;
      }

      if (monster.eatingTimer > 0) {
        monster.rotation = 0;
      } else {
        monster.x += deltaT * monster.velocity.x;
        if (monster.x > monster.maxX && monster.velocity.x > 0) {
          monster.velocity.x *= -1;
        }

        if (monster.x < monster.minX && monster.velocity.x < 0) {
          monster.velocity.x *= -1;
        }
        monster.rotation = 0.25 * Math.sin(Math.PI * now);
      }

      let chomping = monster.eatingTimer > 0 && monster.eatingTimer < 1;

      let trashInFrontOfMonster = this.state.trashList.filter(
        // when monster.x is close to trash.x filter trash...
        (trash) =>
          !trash.fixed &&
          trash.x < monster.x + 10 &&
          trash.x > monster.x - 10 &&
          trash.y < monster.y + 300 &&
          trash.y > monster.y - 100
      );

      if (trashInFrontOfMonster.length > 0) {
        if (monster.eatingTimer > 0) {
          monster.eatingTimer -= deltaT;
        } else {
          monster.eatingTimer = 3.0;
        }
      } else {
        if (monster.eatingTimer > 1) {
          monster.eatingTimer = 0;
        } else {
          monster.eatingTimer -= deltaT;
        }
      }

      if (chomping && trashInFrontOfMonster.length > 0) {
        monster.belly += 1;
      }

      let trashList = this.state.trashList;
      //filtering out trash that's infront of monster// function findTrashCloseTo (trashList, MonsterPosition) {
      // is the monster close enought to the trash. Two levels of thinking:
      //1: which trash is close enough to chomp?
      //2: What defines close enough to chomp?
      //refactor to keep each idea at one level of abstraction.
      //google search ladder of abstraction. Worrydream.com
      //
      if (chomping) {
        trashList = this.state.trashList.filter(
          // when monster.x is close to trash.x filter trash...
          (trash) =>
            trash.fixed ||
            !(
              trash.x < monster.x + 30 &&
              trash.x > monster.x - 30 &&
              trash.y < monster.y + 300 &&
              trash.y > monster.y - 100
            )
        );
      }
      let eatenCount = this.state.trashList.length - trashList.length;
      this.setState((state) => ({
        ...state,
        monster: { ...monster },
        trashList: trashList,
        score: this.state.score - (chomping ? 10 * eatenCount : 0),
        bins: this.state.bins.map((bin) => {
          if (bin.shakeLife > 0) {
            return {
              ...bin,
              shakeLife: bin.shakeLife - deltaT,
              offsetX: bin.shakeLife * 50 * Math.sin(bin.shakeLife * 50),
            };
          } else {
            return bin;
          }
        }),
      }));
    };
  }
  //

  doTrashPhysics(previousTrash, deltaT) {
    let trash = { ...previousTrash };
    if (trash.fixed) return trash;
    // Move the object according to its velocity
    // and the amount of time since the last frame of animation
    trash.x += deltaT * trash.velocity.x;
    trash.y += deltaT * trash.velocity.y;
    trash.rotation += deltaT * trash.velocity.rotation;

    trash.velocity.y += 10; // gravity

    // Clamp to the invisible side-walls, and bounce off them
    if (trash.x > trash.maxX) {
      if (trash.velocity.x > 0) {
        trash.velocity.x *= -1;
      }
    }

    if (trash.x < trash.minX) {
      if (trash.velocity.x < 0) {
        trash.velocity.x *= -1;
      }
    }

    trash.x = Math.min(trash.x, trash.maxX);
    trash.x = Math.max(trash.x, trash.minX);

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

  doStarPhysics(previousStar, deltaT) {
    let star = { ...previousStar };

    star.x += deltaT * star.velocity.x;
    star.y += deltaT * star.velocity.y;
    star.rotation += deltaT * star.velocity.rotation;
    star.life -= deltaT;
    return star;
  }

  makeTrashAnimation() {
    let then = currentTime();
    setInterval(() => {
      this.state.trashList.push(this.generateTrashState());
    }, 3000);

    return (delta) => {
      let now = currentTime();
      let deltaT = now - then;
      then = now;

      this.setState((state) => ({
        ...state,
        trashList: this.state.trashList.map((trash) =>
          this.doTrashPhysics(trash, deltaT)
        ),
        starList: this.state.starList
          .map((star) => this.doStarPhysics(star, deltaT))
          .filter((star) => star.life > 0),
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
    if (e.target != null) {
      let [tempTrash, newTrashList] = extract(this.state.trashList, e.target.trashItemIndex);

      this.dragStartScreenX = e.data.global.x;
      this.dragStartScreenY = e.data.global.y;
      this.dragStartObjectX = tempTrash.x;
      this.dragStartObjectY = tempTrash.y;
      this.dragHappening = true;

      this.setState((state) => ({
        ...state,
        trashList: newTrashList,
        selectedTrash: [{...tempTrash}],
      }));
    }
  }

  moveToDrag(e) {
    let x = e.data.global.x;
    let y = e.data.global.y;

    this.setState(() => ({
      ...this.state,
      bins: this.state.bins.map((bin) => ({
        ...bin,
        hover: this.isSpriteInBin(x, y, bin.x, bin.y),
        shakeLife: 0,
        offsetX: 0,
      })),
      selectedTrash: this.state.selectedTrash.map((item) => ({
          ...item,
          velocity: { x: 0, y: 0, rotation: 0 },
          fixed: true,
          x: x - this.dragStartScreenX + this.dragStartObjectX,
          y: y - this.dragStartScreenY + this.dragStartObjectY,
        })
      ),
    }));
  }

  pointerMove(e) {
    if (this.dragHappening) {
      this.moveToDrag(e);
    }
  }

  pointerUp(e) {
    let x = e.data.global.x;
    let y = e.data.global.y;

    if (this.dragHappening) {
      this.dragHappening = false;
      let selectedBin = this.state.bins.filter((bin) =>
        this.isSpriteInBin(x, y, bin.x, bin.y)
      );

      this.moveToDrag(e);
      if (selectedBin.length === 1) {
        if (e.target.category === selectedBin[0].category) {
          this.setState({
            ...this.state,
            bins: this.state.bins.map((bin) => ({
              ...bin,
              hover: false,
            })),
            trashList: this.state.trashList.map((item) => ({
              ...item,
              fixed: false,
            })),
            selectedTrash: [],
            starList: this.state.starList.concat(
              this.generatePop(e.data.global.x, e.data.global.y)
            ),
            score: this.state.score + 10,
          });
        } else {
          this.setState({
            ...this.state,
            bins: this.state.bins.map((bin) => ({
              ...bin,
              hover: false,
              shakeLife: bin.category === selectedBin[0].category ? 0.5 : 0, // this is actually for when the bin rejects
              offsetX: 0,
            })),
            trashList: this.state.trashList.concat(this.state.selectedTrash).map((item) => ({
              ...item,
              fixed: false,
            })),
            selectedTrash: [],
          });
        }
      } else {
        this.setState({
          ...this.state,
          trashList: this.state.trashList.concat(this.state.selectedTrash).map((item) => ({
            ...item,
            fixed: false,
          })),
          selectedTrash: [],
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

  getStarItems(array) {
    return array.map((item, i) => <Star alpha={item.life} key={i} {...item} />);
  }

  isSpriteInBin(x, y, binx, biny) {
    return binx > x - 50 && binx < x + 50 && biny > y - 50 && biny < y + 50;
  }

  render() {
    const loader = PIXI.Loader.shared;
    const backgroundAtlasPath = "/images/GameBackGround.json";
    let sheet = loader.resources[backgroundAtlasPath];

    const earth1 = sheet.textures["Earth_01.png"];
    const earth2 = sheet.textures["Earth_02.png"];
    const compost = sheet.textures["CompostBin.png"];
    const recycle = sheet.textures["RecycleBin.png"];
    const trash = sheet.textures["TrashBin.png"];
    const centerAnchor = new PIXI.Point(0.5, 0.5);

    this.compostBin = (
      <Sprite
        interactive
        anchor={centerAnchor}
        texture={compost}
        binIndex={0}
        scale={0.38 * (this.state.bins[0].hover ? 1.2 : 1.0)}
        x={85 + this.state.bins[0].offsetX}
        y={75}
        {...this.props}
      />
    );
    this.recycleBin = (
      <Sprite
        interactive
        anchor={centerAnchor}
        texture={recycle}
        binIndex={1}
        scale={0.4 * (this.state.bins[1].hover ? 1.2 : 1.0)}
        x={width / 2 + this.state.bins[1].offsetX}
        y={75}
        {...this.props}
      />
    );
    this.trashBin = (
      <Sprite
        interactive
        anchor={centerAnchor}
        texture={trash}
        binIndex={2}
        scale={0.39 * (this.state.bins[2].hover ? 1.2 : 1.0)}
        x={705 + this.state.bins[2].offsetX}
        y={75}
        {...this.props}
      />
    );
    this.rootContainer = (
      <Container>
        <Sprite texture={earth1} scale={1 / 3} />
        <Sprite alpha={this.state.pollution} texture={earth2} scale={1 / 3} />
        {this.compostBin}
        {this.recycleBin}
        {this.trashBin}
        <Monster {...this.state.monster} />
        <Container>{this.getTrashItems(this.state.trashList)}</Container>
        <Container>{this.getTrashItems(this.state.selectedTrash)}</Container>
        <Container>{this.getStarItems(this.state.starList)}</Container>
        <Text
          text={"  Score: " + this.state.score}
          style={this.props.style}
          scale={0.35}
          y={535}
        ></Text>
      </Container>
    );
    return this.rootContainer;
  }
}

export default Game;
