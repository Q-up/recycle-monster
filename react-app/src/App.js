import React, { Component } from "react";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Monster from "./components/Monster";

// TODO: make this DRY with index.js
const rootDiv = document.getElementById("root");
const height = rootDiv.height || 600;
const width = rootDiv.width || 800;

class App extends Component {
  margin = 115;
  state = {
    rotation: 0,
    // scale: 0.16,
    monster: {
      x: width / 2,
      y: height / 1.3,
      minY: height / 1.3,
      minX: this.margin,
      maxX: width - this.margin,
      scale: 0.16
    }
    // <Monster x={width / 2} y={height / 1.3} />,
  };

  componentDidMount() {
    this.props.app.ticker.add(this.animate);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }

  animate = delta => {
    // current time in seconds with fractional milliseconds:
    let now = new Date().getTime() / 1000.0;
    let monsterState = { ...this.state.monster };
    let spread = monsterState.maxX - monsterState.minX; // total distance, left to right
    let middle = monsterState.minX + spread / 2;
    let newX = middle + (spread / 2) * Math.sin(now);
    monsterState.x = Math.max(
      monsterState.minX,
      Math.min(monsterState.maxX, newX)
    );
    monsterState.rotation = 0.5 * Math.sin(Math.PI * now);
    // monsterState.y = monsterState.minY - Math.random() * 10;
    this.setState(state => ({
      ...state,
      monster: { ...monsterState }
    }));
  };

  /*
  render() {
    return <Monster {...this.props} scale={this.state.scale} />;
  }
  */
  render() {
    return <Monster {...this.state.monster} />;
    // trash.map(item => <Trash rotation={this.state.rotation}>);
  }
}
App.propTypes = {
  app: PropTypes.object
};

export default withApp(App);
