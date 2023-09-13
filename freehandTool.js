function FreehandTool() {
  // Set an icon and a name for the object
  this.icon = "assets/freehand.jpg";
  this.name = "freehand";

  // To smoothly draw, we'll draw a line from the previous mouse location
  // to the current mouse location. The following values store
  // the locations from the last frame. They are -1 to start with because
  // we haven't started drawing yet.
  var previousMouseX = -1;
  var previousMouseY = -1;
  let self = this;

  this.draw = function () {
    // Set brush properties
    // If the mouse is pressed
    if (mouseIsPressed) {
      // Check if the previousX and Y are -1. Set them to the current
      // mouse X and Y if they are.
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
      // If we already have values for previousX and Y, draw a line from
      // there to the current mouse location
      else {
        strokeWeight(brushSize);
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    }
    // If the user has released the mouse, set the previousMouse values
    // back to -1.
    else {
      previousMouseX = -1;
      previousMouseY = -1;
    }
  };
}
