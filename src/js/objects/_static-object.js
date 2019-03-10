/**
 * @module staticObject
 */

import { GameObject } from './_game-object';
import { Vector2 } from '../math/_vector2';

class StaticObject extends GameObject {
  constructor({
    sprite,
    spriteFrameRate = 16,
    spriteFrameCount = 1,
    spriteFrameWidth = sprite.width,
    spriteFrameHeight = sprite.height,
    width,
    height,
    position = new Vector2(0),
  }) {   
    super({ 
      sprite,
      spriteFrameRate,
      spriteFrameCount,
      spriteFrameWidth,
      spriteFrameHeight,
      width,
      height,
      position,
      type: 'static', 
    });
  }
}

export { StaticObject };
