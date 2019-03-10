/**
 * @module renderLayer
 */

/**
 * Class representing a render layer to be used inside a renderGroup.
 */
class RenderLayer {
  /**z
   * Create a render layer.
   * @param {object} properties
   * @param {string} properties.className Class name of the render layer canvas.
   * @param {bool} properties.clearFullFrame Clear entire canvas every draw call.
   * @param {string} [properties.ctx = '2d'] Context used for rendering
   */
  constructor({ className = '', clearFullFrame = true, ctx = '2d' } = {}) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = `retron-render-layer ${className}`; // Set class for DOM element
    this.ctx = this.canvas.getContext(ctx);
    this.clearFullFrame = clearFullFrame;
  }

  /**
   * Set the size of the layer.
   * @param {number} width Width of the layer.
   * @param {number} height Height of the layer.
   */
  setSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Execute the tasks function and parse it the render layer it's context.
   * @param {function} tasks Tasks to execute when the function is called.
   */
  render(tasks) {
    // Clear the whole canvas is clearFulFrame is set to true
    if (this.clearFullFrame) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    tasks(this.ctx);
  }
};

export { RenderLayer };
