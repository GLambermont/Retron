/**
 * @module object
 */

import { bodies } from '../core/_bodies';
import { Vector2 } from '../math/_vector2';

class GameObject {
  constructor({
    width,
    height,
    position = new Vector2(0),
    rotation = 0,
    sprite,
    spriteFrameRate = 16,
    spriteFrameCount = 1,
    spriteFrameWidth = sprite.width,
    spriteFrameHeight = sprite.height,
    spriteOrigin = {
      x: 0, 
      y: 0
    },
    type
  }) {   
    this.sprite = sprite;
    this.spriteFrameWidth = spriteFrameWidth;
    this.spriteFrameHeight = spriteFrameHeight;
    this.spriteFrameIndex = 0;
    this.spriteFrameRate = spriteFrameRate;
    this.spriteFrameSkip = Math.round(60 / this.spriteFrameRate);
    this.spriteUpdateCount = 0;
    this.spriteFrameCount = spriteFrameCount;
    this.spriteFramesPerRow = Math.floor(sprite.width / spriteFrameWidth);
    this.spriteRow = 0;
    this.spriteCol = 0;
    this.spriteOrigin = spriteOrigin;
    this.width = width ? width : this.spriteFrameWidth;
    this.height = height ? height : this.spriteFrameHeight;
    this.halfWidth = this.width / 2; // Store half of the width for faster calculations
    this.halfHeight = this.height / 2; // Store half of the height for faster calculations
    this.position = position;
    this.rotation = rotation;

    bodies[type].push(this);
  }

  // Get mid point
  mid() {
    return {
      x: this.position.x + this.halfWidth,
      y: this.position.y + this.halfHeight,
    }
  }

  // Get sides of the bounding box
  sides() {
    return {
      top: this.position.y,
      bottom: this.position.y + this.width,
      left: this.position.x,
      right: this.position.x + this.height
    }
  }

  // Update bounding box
  updateBounds() {
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
  }

  changeSprite(sprite, spriteFrameCount) {
    if (sprite != this.sprite) {
      this.sprite = sprite;
      this.spriteFrameIndex = 0;
      this.spriteUpdateCount = 0;
      this.spriteFramesPerRow = Math.floor(sprite.width / this.width);
    }
  }

  updateSprite() {
    // Update spriteFrameIndex if the spriteUpdateCount = the amount of frames to skip - 1
    if (this.spriteUpdateCount === (Math.round(60 / this.spriteFrameRate)) - 1) {
      this.spriteFrameIndex = (this.spriteFrameIndex + 1) % (this.spriteFrameCount - 1);
    }

    // Update spriteUpdateCount (modulo the rounded amount of frames so it's always an integer)
    this.spriteUpdateCount = (this.spriteUpdateCount + 1) % (Math.round(60 / this.spriteFrameRate));

    this.spriteRow = (this.spriteFrameIndex / this.spriteFramesPerRow) >>> 0;
    this.spriteCol = (this.spriteFrameIndex % this.spriteFramesPerRow) >>> 0;
  }

  // Draw object
  draw(ctx) {
    this.updateSprite();

    // Set sprite rotation
    ctx.translate(this.position.x + this.spriteOrigin.x, this.position.y + this.spriteOrigin.y);
    ctx.rotate(this.rotation);
    ctx.translate(-(this.position.x + this.spriteOrigin.x), -(this.position.y + this.spriteOrigin.y));
    
    // Draw sprite
    ctx.drawImage(
      this.sprite, // Source image
      this.spriteCol * this.spriteFrameWidth, // Source position X
      this.spriteRow * this.spriteFrameHeight, // Source position Y
      this.spriteFrameWidth, // Width of the object itself
      this.spriteFrameHeight, // Height of the object itself
      this.position.x, // Destination X
      this.position.y, // Destination Y
      this.width, // Source width
      this.height, // Source height
    );
      
    // Reset canvas rotation
    ctx.resetTransform();
  }
}

export { GameObject };
