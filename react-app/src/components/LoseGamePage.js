import * as PIXI from "pixi.js";
import splashPage from "./images/monster.png";

const centerAnchor = new PIXI.Point(0, 0);

class SplashPage extends Component {
  render() {
    return (
      <Sprite
        interactive
        texture={PIXI.Texture.from(splashPage)}
        anchor={centerAnchor}
        scale={0.3}
        pointerdown={this.props.pointerdown}
        x={150}
        y={100}
      />
    );
    //<Button></Button>
  }
}

export default SplashPage;
