import React, { Component } from "react";
import { Sprite, Stage } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

import comp from '../comp.png';

const HEIGHT = 200;
const WIDTH = 200;
const CENTER = new PIXI.Point(0.5, 1);

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const OPTIONS = {
    backgroundColor: 0x151515
  };

export default class PixiComponent extends React.Component {
    render() {
        return (
          <Stage height={HEIGHT} width={WIDTH} options={OPTIONS}>
            <Sprite
                anchor={CENTER}
                cursor="pointer"
                interactive
                pointerdown={this.props.onClick}
                position={new PIXI.Point(WIDTH / 2, HEIGHT)}
                scale={1}
                texture={PIXI.Texture.fromImage(comp)}
            />
          </Stage>
        );
      }
}