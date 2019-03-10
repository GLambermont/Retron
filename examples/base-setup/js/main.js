const renderLayers = {
  background: new retron.RenderLayer({ className: 'background' }),
  midground: new retron.RenderLayer({ className: 'midground' }),
  foreground: new retron.RenderLayer({ className: 'foreground' })
}
const renderer = new retron.Renderer({ 
  layers: renderLayers,
  className: 'game-renderer'
});
const imageLoader = new retron.ImageLoader;
const inputManager = new retron.InputManager;

let playerSprite;
let playerObj;
let playerSpeed = 2;

// Load game assets and return the promise
const loadAssets = () => {
  return imageLoader.load({ 
    path: './images/astronaut_run.png' 
  }).then(image => playerSprite = image);
};

// Create game objects
const createObjects = () => {
  playerObj = new retron.DynamicObject({
    sprite: playerSprite,
    width: 80,
    height: 80,
    spriteFrameWidth: 128,
    spriteFrameHeight: 128,
    spriteFrameCount: 64,
    spriteFrameRate: 30
  });
};

// Check controls for input
const keyBoardControls = () => {
  if (inputManager.keyPressed('arrowUp')) {
    playerObj.acceleration.add(0, -playerSpeed);
  }

  if (inputManager.keyPressed('arrowDown')) {
    playerObj.acceleration.add(0, playerSpeed);
  }

  if (inputManager.keyPressed('arrowLeft')) {
    playerObj.acceleration.add(-playerSpeed, 0);
  }

  if (inputManager.keyPressed('arrowRight')) {
    playerObj.acceleration.add(playerSpeed, 0);
  }
};

// Update function to run in retron update loop
const update = () => {
  keyBoardControls();

  playerObj.velocity.clampMagnitude(20);
  playerObj.velocity.scale(0.8);

  renderLayers.foreground.render(ctx => {
    playerObj.draw(ctx);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadAssets().then(() => {
    createObjects();

    // Append and scale renderer  
    document.body.append(renderer.element);  

    // Assign update tasks and start core update loop
    retron.updateTasks.add(update);
    retron.startCoreUpdate();
  });
});
