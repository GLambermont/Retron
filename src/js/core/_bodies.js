/**
 * @module bodies
 */

import { forces } from './_constants';

// Bodies inside the engine
const bodies = {
  static: [],
  dynamic: [],
  physics: [],
  particle: []
}  

/**
 * Default acc > vel > pos update
 * @function updateForces
 */
const updateForces = (body) => {
  // Apply forces to body
  body.velocity.add(body.acceleration);
  body.position.add(body.velocity);
  body.acceleration.set(0, 0);
}

/**
 * Add a function to a task array
 * @function updateBodies
 */
const updateBodies = () => {
  let i = 0; // Iterator for body update loops
  
  // Dynamic bodies
  i = bodies.dynamic.length;
  while(i--) {
    updateForces(bodies.dynamic[i]);
  }

  // Physics bodies
  i = bodies.physics.length
  while(i--) {
    bodies.physics[i].acceleration.add(0, forces.g * bodies.physics[i].mass);
    updateForces(bodies.physics[i]);
  }

  // Particle bodies
  i = bodies.particle.length
  while(i--) {
    bodies.particle[i].acceleration.add(0, forces.g * bodies[i].mass);
    updateForces(bodies.particle[i]);
    bodies.particle[i].mass -= bodies[i].massReduction;
    bodies.particle[i].width -= bodies[i].scaleReduction;
    bodies.particle[i].height -= bodies[i].scaleReduction;
    bodies.particle[i].lifeTime -= 1;
    bodies.particle[i].updateBounds();

    if (bodies.particle[i].lifeTime <= 0 || bodies.particle[i].width <= 0 || bodies.particle[i].height <= 0) {
      bodies.particle.splice(i, 1);
    }
  }
}

export {
  bodies,
  updateBodies
};
