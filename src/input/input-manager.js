import keyMap from './key-map';

/**
 * Class representing a manager for user input.
 */
class InputManager {
  /**
   * Create a new input manager.
   * @param {bool} [preventDefault = false] Prevents default behaviour on keydown and keyup events if set to true.
   */
  constructor(preventDefault = false) {
    this.preventDefault = preventDefault;
    
    /** 
     * Set containing pressed keys and their current state
     * @property {Set.<number>} pressedKeys 
     * */
    this.pressedKeys = new Set;

    // Add key to pressedKeys Set on keydown event
    document.addEventListener('keydown', e => {
      if (this.preventDefault) e.preventDefault();
      this.pressedKeys.add(e.keyCode); 
    }, false);

    // Remove key from pressedKeys Set on keyup event
    document.addEventListener('keyup', e => {
      if (this.preventDefault) e.preventDefault();
      this.pressedKeys.delete(e.keyCode);
    }, false);
  }

  /**
   * Check if a key is currently pressed.
   * @param {String|number} key The name or key code of the key for which to check if it is pressed.
   * @throws Will throw an error if the key does not exist in retron.inputManager.keycodes.
   */
  keyPressed(key) {
    let keyCode;

    // Get the key code for the given key
    if (typeof key === 'number') {
      keyCode = key;
    } else if (typeof key === 'string') {
      keyCode = keyMap[key];
    }
    
    // Check for valid key value
    if (typeof keyCode === 'undefined') {
      throw new Error(`${key} is not a valid key value.\nAll valid key values and corresponding key codes can be accessed from the keyMap object instance.`);
    }

    // Return true if key is pressed
    return (this.pressedKeys.has(keyCode));
  }
}

export default InputManager;