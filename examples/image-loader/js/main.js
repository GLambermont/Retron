const imageLoader = new retron.ImageLoader;
const progressbarEl = document.getElementsByClassName('js-loader-progress')[0];
const imageContainerEl = document.getElementsByClassName('js-image-container')[0]; // Container in which to put the loaded images
const assetCount = 9; // Total amount of assets to load

let assetLoadCount = 0; // Amount of assets that are loaded

// Update progressbar width based on amount of loaded assets
const updateProgressBar = image => {
  // Log image which is loaded
  console.log(image);

  // Update bar element
  assetLoadCount++;
  progressbarEl.style.transform = `scale3d(${assetLoadCount / assetCount}, 1, 1)`;
};

// Load a single image file
const loadSingleImage = () => { 
  imageLoader.load({ path: 'https://picsum.photos/400/400/?random' }).then(image => {
    // Append the image to the DOM
    imageContainerEl.append(image);

    // Update the progressbar
    updateProgressBar(image);
  });      
};

// Load images from an array of paths
const loadImageArray = () => {
  imageLoader.load({ 
    paths: [
      'https://picsum.photos/200/300/?random',
      'https://picsum.photos/200/200/?random',
      'https://picsum.photos/200/100/?random',
      'https://picsum.photos/200/50/?random'
    ],
    forEach: image => updateProgressBar(image)
  }).then(images => {
      // Append the images to the DOM
    images.map(image => imageContainerEl.append(image));
  });
}

// Load images from an object containing the paths
const loadImageObject = () => {
  imageLoader.load({
    paths: {
      img1: 'https://picsum.photos/200/300/?random',
      img2: 'https://picsum.photos/200/200/?random',
      img3: 'https://picsum.photos/200/100/?random',
      img4: 'https://picsum.photos/200/50/?random'
    },
    attributes: { 'crossorigin': 'anonymous' },
    forEach: image => updateProgressBar(image)
  }).then(images => {        
    // Append the images to the DOM
    for(let imageName in images) {
      imageContainerEl.append(images[imageName]);
    }
  });
}

// Execute load functions after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadSingleImage();
  loadImageArray();
  loadImageObject();
});