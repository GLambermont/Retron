/**
 * @module spriteParticle
 */

import { PhysicsObject } from '../objects/_physics-object';

class SpriteParticle extends PhysicsObject {
  constructor({
    sprite,
    lifeTime = 100,
    massReduction = 0.1,
    scaleReduction = 0.1,
    type = 'particle'
  }) {
    super({ sprite, type });
    this.lifeTime = lifeTime;
    this.massReduction = massReduction;
    this.scaleReduction = scaleReduction;
  }

  // Draw particle from center
  draw(ctx) {
    ctx.drawImage(this.sprite, this.position.x - this.halfWidth, this.position.y - this.halfHeight, this.width, this.height);
  }
}

export { SpriteParticle };
