/**
 * @module vector2
 */

/** Class representing a 2d vector */
class Vector2 {
  /**
   * Create a 2d vector
   * @param {number} x X component of the vector.
   * @param {number} y Y component of the vector.
   * @throws Will throw an error if the x or y parameter is infinite or not numeric.
   */
  constructor(x, y) {
    // If value is not numeric or finite throw an error
    if (typeof x !== 'undefined' && typeof x !== 'object' && (isNaN(parseFloat(x)) || !isFinite(x))) {
      throw `${x} is not a valid x value for Vector2`;
    } else if (typeof y !== 'undefined' && (isNaN(parseFloat(y)) || !isFinite(y))) {
      throw `${y} is not a valid y value for Vector2`;
    }

    this.set(x, y);
  }

  /**
   * Convert paramater values to an object with an x and y component.
   * @param {Vector2|number[]|number} x A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] number representing the y component.
   * @returns {object} Object with an x and y component.
   */
  convertVectorInput(x, y) {
    let convertedInput = {
      x: 0,
      y: 0,
    }

    if (Array.isArray(x)) {
      convertedInput.x = x[0] || 0;
      convertedInput.y = x[1] || 0;
    } else if (x instanceof Vector2 || typeof x == 'object') {
      convertedInput.x = x.x || 0;
      convertedInput.y = x.y || 0;
    } else if (typeof y === 'undefined') {
      convertedInput.x = x;
      convertedInput.y = x;
    } else {
      convertedInput.x = x;
      convertedInput.y = y;
    }

    return convertedInput;
  }

  /**
   * Set value of vector.
   * @param {Vector2|number[]|number} x A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] number representing the y component.
   */
  set(x, y) {
    let v = this.convertVectorInput(x, y);

    this.x = v.x;
    this.y = v.y;

    return this;
  }

  /**
   * Add a value to the x and/or y component of the vector.
   * @param {Vector2|number[]|number} x A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] number representing the y component.
   */
  add(x, y) {
    let v = this.convertVectorInput(x, y);

    this.x += v.x;
    this.y += v.y;

    return this;
  }

  /**
   * Add a value to the x and/or y component of the vector and return the resulting vector.
   * @param {Vector2|number[]|number} x A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] Number representing the y component.
   * @returns {Vector2}
   */
  returnAdd(x, y) {
    let v = this.convertVectorInput(x, y);

    return new Vector2(this.x + v.x, this.y + v.y);
  }

  /**
   * Subtract a value from the x and/or y component of the vector.
   * @param {Vector2|number[]|number} x A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] Number representing the y component.
   */
  subtract(x, y) {
    let v = this.convertVectorInput(x, y);

    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  /**
   * Subtract a value from the x and/or y component of the vector and return the resulting vector.
   * @param {Vector2|number[]|number} x A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] Number representing the y component.
   * @returns {Vector2}
   */
  returnSubtract(x, y) {
    let v = this.convertVectorInput(x, y);

    return new Vector2(this.x - v.x, this.y - v.y);
  }

  /**
   * Scalar multiplication of the vector.
   * @param {number} v An number with which both the x and y component of the vector will be multiplied.
   */
  scale(v) {
    this.x *= v;
    this.y *= v;
    
    return this;
  }

  /**
   * Scalar multiplication of the vector where the resulting vector will be returned.
   * @param {number} v A number with which both the x and y component of the vector will be multiplied.
   * @returns {Vector2}
   */
  returnScale(v) {
    return new Vector2(this.x * v, this.y * v);
  }

  /**
   * Dot product of the vector
   * @param {Vector2|number[]|number} x - A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] Number representing the y component.
   * @returns {number} Scalar of the dot product
   */
  dot(x, y) {
    let v = this.convertVectorInput(x, y);

    return (this.x * v.x) + (this.y * v.y);
  }

  /**
   * Get the distance from the vector to a location represented by an x and y value.
   * @param {Vector2|number[]|number} x - A Vector2(x, y), array[x, y] or number representing the x and y component or an number only representing the x component.
   * @param {number} [y] number representing the y component.
   * @returns {number} The distance from te vector to the set location (x, y) as an number.
   */
  distance(x, y) {
    let v = this.convertVectorInput(x, y);

    return Math.hypot(v.x - this.x, v.y - this.y);
  }

  /**
   * Get the distance from the vector to a location represented by an x and y value.
   * @param {boolean} [rad = true] Set to false to get the angle in degrees.
   * @returns {number} Numeric value between -π and π representing the angle theta of the set (x, y).
   */
  direction(rad = true) {
    if (rad) {
      return Math.atan2(this.y, this.x);
    } else {
      return Math.atan2(this.y, this.x) * 180 / Math.PI;
    }
  }

  /**
   * Get the magnitude of the vector.
   * @returns {Number} Magnitude of the vector.
   */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Get the squared magnitude of the vector for faster calculations.
   * @returns {Number} Squared magnitude of the vector.
   */
  sqrMagnitude() {
    return (this.x * this.x) + (this.y * this.y);
  }

  /**
   * Set direction of the vector to an angle in degrees.
   * @param {number} angle Angle in which to rotate the vector.
   * @param {boolean} [rad=true] Set to false to set the angle in degrees.
   */
  setDirection(angle, rad = true) {
    let magnitude = this.magnitude();

    // Convert to radians to degrees if rad = false
    if (!rad) angle *= Math.PI / 180;

    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;

    return this;
  }

  /**
   * Set the magnitude of the vector.
   * @param {number} magnitude Magnitude of the vector.
   */
  setMagnitude(magnitude) {
    this.x = Math.cos(this.direction()) * magnitude;
    this.y = Math.sin(this.direction()) * magnitude;

    return this;
  }

  /**
   * Clamp the magnitude of the vector.
   * @param {number} magnitude Magnitude above which the vector will be clamped.
   */
  clampMagnitude(magnitude) {
    if (this.magnitude() >= magnitude) {
      this.setMagnitude(magnitude);
    }

    return this;
  }

  /**
   * Clamp the x component of the vector.
   * @param {number} v Value above which the x component will be clamped.
   */
  clampX(v) {
    if (this.x >= v) {
      this.x = v;
    }

    return this;
  }

  /**
   * Clamp the y component of the vector.
   * @param {number} v Value above which the y component will be clamped.
   */
  clampY(v) {
    if (this.y >= v) {
      this.y = v;
    }

    return this;
  }

  /**
   * Draw the vector as a line on a canvas element.
   * @param {context} ctx Context of the canvas to draw on.
   * @param {context} posX X position of the start of the line representing the vector.
   * @param {context} posY Y position of the start of the line representing the vector.
   * @param {string} [color='#00ff00'] Color of the line to draw.
   */
  draw(ctx, posX, posY, multiplier = 1, color = '#00ff00') {
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(posX + (this.x * multiplier), posY + (this.y * multiplier));
    ctx.strokeStyle = color;
    ctx.stroke();

    return this;
  }
}

export { Vector2 }
