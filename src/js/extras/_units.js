/**
 * @module units
 */

/**
 * Convert viewport width value to pixel value. 1vw = 1/10 of the viewport width.
 * vw(0) = 0% viewport width.
 * vw(100) = 100% viewport width.
 * @function vw
 * @param {number} width Width in viewport units (0 - 100).
 * @returns {number} Width in pixels.
 */
const vw = (width) => { return window.innerWidth * width / 100 };

/**
 * Convert viewport height value to pixel value. 1vh = 1/10 of the viewport height.
 * vh(0) = 0% viewport height.
 * vh(100) = 100% viewport height.
 * @function vh
 * @param {number} height Height in viewport units (0 - 100).
 * @returns {number} Height in pixels.
 */
const vh = (height) => { return window.innerHeight * height / 100 };

/**
 * Convert canvas width value to pixel value. 1cw = 1/10 of the canvas width.
 * cw(0) = 0% canvas width.
 * cw(100) = 100% canvas width.
 * @function cw
 * @param {HTMLElement} canvas Canvas element with which to calculate pixel width;
 * @param {number} width Height in canvas units (0 - 100).
 * @returns {number} Width in pixels.
 */
const cw = (canvas, width) => { return canvas.width * width / 100 };

/**
 * Convert canvas height value to pixel value. 1cw = 1/10 of the canvas height.
 * ch(0) = 0% canvas width.
 * ch(100) = 100% canvas height.
 * @function ch
 * @param {HTMLElementt} canvas Canvas element with which to calculate pixel height;
 * @param {number} height Height in canvas units (0 - 100).
 * @returns {number} Height in pixels.
 */
const ch = (canvas, height) => { return canvas.height * height / 100 };

export {
  vw,
  vh,
  cw,
  ch
};
