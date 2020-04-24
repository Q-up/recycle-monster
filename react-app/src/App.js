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
    let monsterState = { ...this.state.monster };
    let newX = monsterState.x + 0.0 + 10 * (0.51 - Math.random());
    monsterState.x = Math.max(
      monsterState.minX,
      Math.min(monsterState.maxX, newX)
    );
    monsterState.rotation = 0.2 * (0.5 - Math.random());
    // monsterState.y = monsterState.minY - Math.random() * 10;
    this.setState(state => ({
      ...state,
      monster: { ...monsterState },
      rotation: state.rotation + 0.001 * delta
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
