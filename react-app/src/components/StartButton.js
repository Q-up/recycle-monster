import React, { Component } from "react";
import { Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const centerAnchor = new PIXI.Point(0, 0);
class StartButton extends Component {
  render() {
    return (
        <Text
          interactive = {true}
          pointerdown={this.props.pointerdown}
          mouseover = {this.props.hoverOver}
          mouseout = {this.props.hoverOff}
          style={this.props.style}
          scale={0.5} 
          y={200} 
          anchor = {centerAnchor}
          text = 'Start Game'/>
    );
  }
}

export default StartButton;
