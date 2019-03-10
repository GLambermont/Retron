/**
 * @module time
 */

/**
 * @property {number}  timeScale The scale at which the time is passing.
 * @property {number}  fixedTimeStep Fixed update frame duration in ms.
 * @property {number}  time Time at the beginning of the current core update frame.
 * @property {number}  fixedTime Time at the beginning of the current fixed update frame.
 * @property {number}  deltaTime Time between the last two core update frames.
 * @property {number}  fixedDeltaTime Time between the last two fixed update frames.
 */
const time = {
  timeScale: 1,
  fixedTimeStep: 1000 / 30,
  time: 0,
  fixedTime: 0,
  deltaTime: 0,
  fixedDeltaTime: 0,
}

export { time };
