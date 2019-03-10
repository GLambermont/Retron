/**
 * @module imageLoader
 */

const loadFromPath = Symbol('Load images from path');
const loadFromArray = Symbol('Load images from array');
const loadFromObject = Symbol('Load images from object');

/**
 * Class representing a loader to to convert image urls to images and return them using a promise.
 */
class ImageLoader {
  /**
   * Load images from one or multiple sources
   * @param {Object} options Options to be used when loading the image.
   * @param {String} options.path Image path.
   * @param {String} [options.paths = options.paths] Image paths.
   * @param {Object.<string, string>} options.attributes Attributes to set on the loaded image(s).
   */
  load(options) {
    // Set the options.paths to the options.path value if not defined
    if (typeof options.paths === 'undefined') options.paths = options.path;

    // Check the type of path(s) given and initiate the correct loader
    if (typeof options.paths == 'string') {
      return this[loadFromPath](options);
    } else if (Array.isArray(options.paths)) {
      return this[loadFromArray](options);
    } else if (typeof options.paths == 'object') {
      return this[loadFromObject](options);
    } else {
      throw new Error('The type for the path or paths property is invalid');
    }
  }

  /**
   * Load images from a path to the image source.
   * @param {Object} options Options to be used when loading the image.
   * @param {String} options.path Image path.
   * @param {Object.<string, string>} options.attributes Attributes to set on the loaded image.
   * @returns {Promise.<string>} Promise object containing an image element.
   */
  [loadFromPath]({
    path, 
    attributes = {}
  }) {
    const imageEl = new Image;

    return new Promise((resolve, reject) => {
      // Resolve when image is loaded
      imageEl.onload = () => {
        resolve(imageEl);
      
        imageEl.onload = null; // Remove event listener
      }

      // Reject if image could not be loaded
      imageEl.onerror = () => {
        reject(`Image could not be found and loaded from specified path: ${path}`)
      }      

      // Set image attributes if specified
      Object.keys(attributes).map(attributeName => {
        imageEl.setAttribute(attributeName, attributes[attributeName]);
      });
      
      // Set the source of the image to the specified path
      imageEl.src = path;
    });
  }
  
  /**
   * Loads images from an array containing image paths.
   * @param {Object} options Options to be used when loading the images.
   * @param {String[]} options.paths Array of image paths.
   * @param {Object.<string, string>} options.attributes Attributes to set on each loaded image.
   * @param {function} options.forEach Function to execute for each image. Gets parsed the image as a parameter
   * @returns {Promise.<Array>} Promise containing array of image elements in order of given paths.
  */
  [loadFromArray]({
    paths, 
    attributes,
    forEach = () => {}
  }) {
    // Execute load and forEach function for all paths and store the resulting array of promises 
    const loadPromises = paths.map(path => {      
      return this.load({ path, attributes }).then(image => { 
        forEach(image);

        return image;
      });
    });
    
    // Resolve all promises in the loadPromises array
    return Promise.all(loadPromises);
  }

  /**
   * Loads images from an object containing image names and paths.
   * @param {Object} options Options to be used when loading the images.
   * @param {Object.<string, string>} options.paths Object containing the names and paths images.
   * @param {Object.<string, string>} options.attributes Attributes to set on each loaded image.
   * @param {function} options.forEach Function to execute for each image. Gets parsed the image as a parameter
   * @returns {Promise.<Object>} Promise containing image names and corresponding image elements.
   */
  [loadFromObject]({
    paths, 
    attributes,
    forEach = () => {}
  }) {
    // Execute loadFromPath function for all paths and store the resulting array of promises 
    const imageNames = Object.keys(paths);
    const loadPromises = imageNames.map(imageName => {
      return this.load({ path: paths[imageName], attributes }).then(image => {
        forEach(image);

        return image;
      });
    });
    
    // Object to return all images in
    let returnObject = {};

    // Resolve all promises in the loadPromises array and add each returned image to returnObject
    return Promise.all(loadPromises).then(imageElements => {
      imageElements.forEach((imageEl, i) => {
        // Use the original name from the paths object as the key for each image
        returnObject[imageNames[i]] = imageEl;
      });

      return returnObject;
    });
  }
}

export { ImageLoader }