function HelperFunctions() {
  //Jquery click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  //event handler for the clear button event. Clears the screen
  select('#clearButton').mouseClicked(function () {
    background(255, 255, 255);
    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  });

  //event handler for the save image button. saves the canvsa to the
  //local file system.
  select('#saveImageButton').mouseClicked(function () {
    saveCanvas('myPicture', 'json');
  });
  select('#setBackgroundColorButton').mouseClicked(function () {
    background(currentColor);
    backgroundColor = currentColor;
  });
}
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
function createBrushSliders() {
  select('.options').html(`<label for="sizeSlider">Brush Size</label>
  <input type="range" id="sizeSlider" min="1" max="50" value="10" />

  <label for="opacitySlider">Brush Opacity</label>
  <input type="range" id="opacitySlider" min="0" max="255" value="255" />`);
}
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
function mouseCloseToObject(objectPositionX, objectPositionY, mouseX, mouseY) {
  let d = dist(objectPositionX, objectPositionY, mouseX, mouseY);
  return d < 10; // If the distance is less than 10 pixels, return true
}
