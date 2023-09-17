function HelperFunctions() {
  //Jquery click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  /**
   * Event handler for the clear button event. Clears the canvas.
   */
  select('#clearButton').mouseClicked(function () {
    background(255, 255, 255);
    backgroundColor = color(255, 255, 255);
    toolbox.objects = [];
    // Call loadPixels to update the drawing state,
    // needed for tools like the mirror tool
    loadPixels();
  });

  /**
   * Event handler for the save image button. Saves the canvas to the
   * local file system as a JPEG.
   */
  select('#saveImageButton').mouseClicked(function () {
    saveCanvas('myPicture', 'jpeg');
  });

  /**
   * Event handler for setting the background color button.
   * Sets the canvas background color to the current drawing color.
   */
  select('#setBackgroundColorButton').mouseClicked(function () {
    background(currentColor);
    backgroundColor = currentColor;
  });
}

/**
 * Function to check if the mouse press is within the canvas boundaries.
 * @param {p5.Element} canvas - The canvas element to check.
 * @returns {boolean} True if the mouse press is on the canvas, false otherwise.
 */
function mousePressonCanvas(canvas) {
  if (
    mouseX > canvas.elt.offsetLeft &&
    mouseX < canvas.elt.offsetLeft + canvas.width &&
    mouseY > canvas.elt.offsetTop &&
    mouseY < canvas.elt.offsetTop + canvas.height
  ) {
    return true;
  }
  return false;
}

/**
 * Function to create brush sliders in the options panel.
 */
function createBrushSliders() {
  select('.options').html(`<label for="sizeSlider">Brush Size</label>
  <input type="range" id="sizeSlider" min="1" max="50" value="10" />

  <label for="opacitySlider">Brush Opacity</label>
  <input type="range" id="opacitySlider" min="0" max="255" value="255" />`);
}

/**
 * Function to populate spray tool sliders in the options panel.
 */
function populateSpraySliders() {
  select('.options').html(`<label for="sizeSlider">Spread</label>
    <input type="range" id="spreadSlider" min="1" max="50" value="10" />
  
    <label for="Point Slider">Points</label>
    <input type="range" id="pointSlider" min="0" max="30" value="13" />
    <label for="sizeSlider">Brush Size</label>
    <input type="range" id="sizeSlider" min="1" max="50" value="10" />

    <label for="opacitySlider">Brush Opacity</label>
    <input type="range" id="opacitySlider" min="0" max="255" value="255" />
    <button id='squareSprayButton'>Square</button>
    <button id='roundSprayButton'>Round</button>`);
}

/**
 * Function to map color names to RGB color objects.
 * @param {string} colorName - The name of the color.
 * @returns {p5.Color} The corresponding RGB color object.
 */
function mapColorToRGB(colorName) {
  const colorMappings = {
    black: color(0, 0, 0, currentAlpha),
    silver: color(192, 192, 192, currentAlpha),
    gray: color(128, 128, 128, currentAlpha),
    white: color(255, 255, 255, currentAlpha),
    maroon: color(128, 0, 0, currentAlpha),
    red: color(255, 0, 0, currentAlpha),
    purple: color(128, 0, 128, currentAlpha),
    orange: color(255, 165, 0, currentAlpha),
    pink: color(255, 192, 203, currentAlpha),
    fuchsia: color(255, 0, 255, currentAlpha),
    green: color(0, 128, 0, currentAlpha),
    lime: color(0, 255, 0, currentAlpha),
    olive: color(128, 128, 0, currentAlpha),
    yellow: color(255, 255, 0, currentAlpha),
    navy: color(0, 0, 128, currentAlpha),
    blue: color(0, 0, 255, currentAlpha),
    teal: color(0, 128, 128, currentAlpha),
    aqua: color(0, 255, 255, currentAlpha),
  };

  if (colorMappings.hasOwnProperty(colorName)) {
    return colorMappings[colorName];
  } else {
    return color(0, 0, 0); // Return a default RGB color for unknown color names
  }
}
/**
 * Function to check if the mouse is close to an object.
 * @param {number} objectPositionX - X-coordinate of the object.
 * @param {number} objectPositionY - Y-coordinate of the object.
 * @param {number} mouseX - Current mouse X-coordinate.
 * @param {number} mouseY - Current mouse Y-coordinate.
 * @returns {boolean} True if the mouse is close to the object, false otherwise.
 */
function mouseCloseToObject(objectPositionX, objectPositionY, mouseX, mouseY) {
  let d = dist(objectPositionX, objectPositionY, mouseX, mouseY);
  return d < 10; // If the distance is less than 10 pixels, return true
}
/**
 * Mouse Pressed event handler.
 * Calls the mousePressed method of the selected tool when appropriate.
 */
function mousePressed() {
  if (
    mousePressonCanvas(c) &&
    toolbox.selectedTool.hasOwnProperty('mousePressed')
  ) {
    toolbox.selectedTool.mousePressed();
  }
}
function mouseDragged() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty('mouseDragged')) {
    toolbox.selectedTool.mouseDragged();
  }
}
