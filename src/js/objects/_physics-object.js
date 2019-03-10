/**
 * @module physicsObject
 */

import { DynamicObject } from './_dynamic-object';

class PhysicsObject extends DynamicObject {
  constructor({
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
    mass = 1,
    type = 'physics'
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
      type
    });

    this.mass = mass;
  }
}

export { PhysicsObject };
