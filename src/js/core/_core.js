/**
 * @module core
 */

import { time } from './_time.js';
import { updateBodies } from './_bodies.js';

// Arrays of update tasks to execute in the core update loop
const updateTasks = new Set;
const fixedUpdateTasks = new Set;
const lateUpdateTasks = new Set;

// Core update vars
let coreUpdateRequestId;
let lastTime = 0; // Time at beginning of last core update frame.
let fixedTimeElapsed = 0; // Time elapsed since last fixedUpdate.

/**
 * Runs all functions inside a tasks array.
 * @function runUpdateTasks
 * @param {Array.<function>} tasks - Array of update tasks
 */
const runUpdateTasks = tasks => tasks.forEach(task => task());

/**
 * Core update function
 * @function coreUpdate
 */
const coreUpdate = () => {
  time.time = Date.now();
  time.deltaTime = time.time - lastTime;
  lastTime = time.time;
  fixedTimeElapsed = time.time - time.fixedTime;

  // Update
  runUpdateTasks(updateTasks);

  // Fixed update
  if (fixedTimeElapsed >= time.fixedTimeStep) {
    time.fixedTime = time.time - (time.fixedDeltaTime % time.fixedTimeStep);
    time.fixedDeltaTime = fixedTimeElapsed;

    updateBodies();
    runUpdateTasks(fixedUpdateTasks);
  }

  // Late update
  runUpdateTasks(lateUpdateTasks);

  coreUpdateRequestId = requestAnimationFrame(coreUpdate);
};

/**
 * Stop the core update loop.
 * @function stopCoreUpdate
 */
const stopCoreUpdate = () => {
  window.cancelAnimationFrame(coreUpdateRequestId);
};

export {
  updateTasks,
  fixedUpdateTasks,
  lateUpdateTasks,
  coreUpdate as startCoreUpdate,
  stopCoreUpdate
};
