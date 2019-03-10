/**
 * @module renderer
 */

/**
 * Class representing a renderer containing render layers
 */
class Renderer {
  /**
   * Create a render group for an array of layers.
   * @param {object} properties
   * @param {number} properties.width Width of the render group element.
   * @param {number} properties.height Height of the render group element.
   * @param {RenderLayer[]} properties.layers = Array of RenderLayer instances to append to the render group.
   * @param {string} properties.className Class name of the render group element.
   */
  constructor({ width = 640, height = 360, layers = {}, className = '' } = {}) {
    this.width = width;
    this.height = height;
    this.element = document.createElement('div');
    this.element.className = `retron-renderer ${className}`;
    this.layers = layers;

    // Append render layers    
    Object.values(this.layers).forEach((layer, i) => {
      layer.canvas.style.zIndex = i; // Set the z-index to stack layers
      this.element.appendChild(layer.canvas);
    });

    // Set the initial scale of the renderer
    this.setSize(width, height);
  }

  /**
   * Set the size of the renderer element and it's children.
   * @param {number} width Width of the renderer.
   * @param {number} height Height of the renderer.
   */
  setSize(width, height) {
    // Store new width and height
    this.width = width;
    this.height = height;

    // Scale group element
    this.element.style.width = `${Math.floor(width)}px`;
    this.element.style.height = `${Math.floor(height)}px`;

    // Scale layers to size of render group
    Object.values(this.layers).forEach((layer, i) => {
      layer.setSize(width, height);
    });
  }
};

export { Renderer };
