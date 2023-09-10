function HelperFunctions() {
  //Jquery click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  //event handler for the clear button event. Clears the screen
  select("#clearButton").mouseClicked(function () {
    background(255, 255, 255);
    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  });

  //event handler for the save image button. saves the canvsa to the
  //local file system.
  select("#saveImageButton").mouseClicked(function () {
    saveCanvas("myPicture", "jpg");
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
  select(".options").html(`<label for="sizeSlider">Brush Size</label>
  <input type="range" id="sizeSlider" min="1" max="50" value="10" />

  <label for="opacitySlider">Brush Opacity</label>
  <input type="range" id="opacitySlider" min="0" max="255" value="255" />`);
}
function populateSpraySliders() {
  select(".options").html(`<label for="sizeSlider">Spread</label>
    <input type="range" id="spreadSlider" min="1" max="50" value="10" />
  
    <label for="Point Slider">Points</label>
    <input type="range" id="pointSlider" min="0" max="30" value="13" />`);
}
