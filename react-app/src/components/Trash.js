import React, { Component } from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";


const centerAnchor = new PIXI.Point(0.5, 0.5);

class Trash extends Component {

  getItems(array) {
    return array.map((item) => (
      <Sprite
        interactive
        pointerdown={this.props.pointerDown}
        pointermove={this.props.pointerMove}
        pointerup={this.props.pointerUp}
        texture={item}
        anchor={centerAnchor}
        scale={0.4}
        y={-1}
        x={330}
        {...this.props}
      />
    ));
  }

  render() {
    const loader = PIXI.Loader.shared;
    const spriteAtlas = "/images/GameBackGround.json";
    let sheet = loader.resources[spriteAtlas];
    const fijiBottle = sheet.textures["fiji-water-bottle.png"];
    const plasticBag = sheet.textures["plasticbag.png"];
    const burger = sheet.textures["burger.png"];
    const trashTextures = [fijiBottle, plasticBag, burger];
    // const onDragStart = () => {
    //   console.log("On drag start", this);
    // };

    return this.getItems(trashTextures);
  }
}

export default Trash;

// class Trash extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loader: PIXI.Loader.shared,
//       spriteAtlas: "/images/GameBackGround.json",
//       sheet: loader.resources[spriteAtlas],
//       centerAnchor: new PIXI.Point(0.5, 0.5),
//       fijiBottle: sheet.textures["fiji-water-bottle.png"],
//       trashState: props.state,
//     };
//   }
//   // const onDragStart = () => {
//   //   console.log("On drag start", this);
//   // };
//   render() {
//     return (
//       <Sprite
//         texture={fijiBottle}
//         anchor={centerAnchor}
//         scale={0.4}
//         y={500}
//         x={330}
//         {...this.state.trashState}
//       />
//     );
//   }
// }
// export default Trash;
