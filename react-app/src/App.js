import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApp } from "react-pixi-fiber";
import Monster from "./components/Monster";

class RotatingMonster extends Component {
  state = {
    rotation: 0
  };

  componentDidMount() {
    this.props.app.ticker.add(this.animate);
  }

  componentWillUnmount() {
    this.props.app.ticker.remove(this.animate);
  }

  animate = delta => {
    this.setState(state => ({
      ...state,
      rotation: state.rotation + 1 * delta
    }));
  };

  render() {
    return <Monster {...this.props} rotation={this.state.rotation} />;
  }
}

export default withApp(RotatingMonster);
