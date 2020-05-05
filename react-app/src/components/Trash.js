import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import DraggableContainer from "./DraggableContainer";

function Trash(props) {
  const loader = PIXI.Loader.shared;
  const spriteAtlas = "/images/GameBackGround.json";
  let sheet = loader.resources[spriteAtlas];
  const centerAnchor = new PIXI.Point(0.5, 0.5);
  const fijiBottle = sheet.textures["fiji-water-bottle.png"];
  const plasticBag = sheet.textures["plasticbag.png"];
  const burger = sheet.textures["burger.png"];
  const trashTextures = [fijiBottle, plasticBag, burger];
  // const onDragStart = () => {
  //   console.log("On drag start", this);
  // };
  function getItems(array) {
    return array.map((item) => (
      <DraggableContainer>
        <Sprite
          texture={item}
          anchor={centerAnchor}
          scale={0.4}
          y={500}
          x={330}
          {...props}
        />
      </DraggableContainer>
    ));
  }

  return getItems(trashTextures);
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
