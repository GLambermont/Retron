const renderLayers = {
  foreground: new retron.RenderLayer({ className: 'foreground' })
}
const renderer = new retron.Renderer({ 
  layers: renderLayers,
  className: 'game-renderer',
  width: 320,
  height: 180
});
const imageLoader = new retron.ImageLoader;
const inputManager = new retron.InputManager;

let carSprite;
let carDirection = new retron.Vector2(1, 0);
let carTurnSpeed = 3;
let carAcceleration = 1;
let carMaxSpeed = 20;

// Load game assets and return the promise
const loadAssets = () => {
  return imageLoader.load({ 
    path: './images/car.png' 
  }).then(image => carSprite = image);
};

// Create game objects
const createObjects = () => {
  carObj = new retron.DynamicObject({
    sprite: carSprite,
    spriteOrigin: {
      x: 16,
      y: 32
    },
    width: 64,
    height: 64,
  });
};

// Check controls for input
const keyBoardControls = () => {
  // Accelerate with up and down arrow keys
  if (inputManager.keyPressed('arrowUp')) {
    carObj.acceleration.add(carDirection.scale(carAcceleration));
  }
  
  if (inputManager.keyPressed('arrowDown')) {
    carObj.acceleration.subtract(carDirection.scale(carAcceleration));
  }

  // Check if accelerating with up and down arrow keys
  if(!inputManager.keyPressed('arrowUp') && !inputManager.keyPressed('arrowDown')) {
    carObj.velocity.scale(0.95); // Add drag
  } else {
    // Steer car if accelerating
    if (inputManager.keyPressed('arrowLeft')) {
      carObj.rotation -= Math.PI / 180 * carTurnSpeed;
    }
    
    if (inputManager.keyPressed('arrowRight')) {
      carObj.rotation += Math.PI / 180 * carTurnSpeed;
    }

    carDirection.setDirection(carObj.rotation);
  }
};

// Update function to run in retron update loop
const update = () => {
  keyBoardControls();
  
  // Steer in direction of car rotation
  carObj.velocity.setDirection(carObj.rotation);

  // Limit car speed to max speed
  carObj.velocity.clampMagnitude(carMaxSpeed);
  
  renderer.layers.foreground.render(ctx => {
    carObj.draw(ctx);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadAssets().then(() => {
    createObjects();

    // Disable anti aliasing
    renderLayers.foreground.ctx.imageSmoothingEnabled = false;

    // Append and scale renderer  
    document.body.append(renderer.element);  

    // Assign update tasks and start core update loop
    retron.updateTasks.add(update);
    retron.startCoreUpdate();
  });
});