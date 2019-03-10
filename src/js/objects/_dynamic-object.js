/**
 * @module dynamicObject
 */

import { GameObject } from './_game-object';
import { Vector2 } from '../math/_vector2';

class DynamicObject extends GameObject {
  constructor({
    sprite,
    spriteFrameRate,
    spriteFrameCount,
    spriteFrameWidth,
    spriteFrameHeight,
    spriteOrigin,
    width,
    height,
    position,
    rotation,
    type = 'dynamic'
  }) {
    super({ 
      width,
      height,
      position,
      rotation,
      sprite,
      spriteFrameRate,
      spriteFrameCount,
      spriteFrameWidth,
      spriteFrameHeight,
      spriteOrigin,
      type, 
    });

    this.velocity = new Vector2(0);
    this.acceleration = new Vector2(0);
  }
}

export { DynamicObject };
