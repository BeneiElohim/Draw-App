//////////////////////////////////////////////////
// ATTENTION: This is a work in progress.       //
// This tool does not work in its current state //
// and is commented out of the main sketch.js   //
//////////////////////////////////////////////////

function BucketTool() {
  // Set an icon and a name for the object
  this.icon = 'assets/bucket.png';
  this.name = 'bucket';

  // Reference to the BucketTool object (for scoping within functions)
  let self = this;

  /**
   * Draw method
   * Handles the drawing logic for the BucketTool.
   * Checks if the mouse is pressed on the canvas and performs a flood fill.
   */
  this.draw = function () {
    if (mouseIsPressed) {
      if (mousePressonCanvas(c)) {
        // Load and update canvas pixels after performing flood fill
        loadPixels();
        self.floodFill(
          mouseX,
          mouseY,
          get(mouseX, mouseY),
          mapColorToRGB(currentColor)
        );
        updatePixels();
      }
    }
  };

  /**
   * Flood Fill method
   * Recursively fills an area with the replacement color.
   * @param {number} x - X-coordinate of the starting point.
   * @param {number} y - Y-coordinate of the starting point.
   * @param {p5.Color} targetColor - Color to replace.
   * @param {p5.Color} replacementColor - Color to fill with.
   */
  this.floodFill = function (x, y, targetColor, replacementColor) {
    if (targetColor != replacementColor) {
      if (get(x + 1, y).toString() === targetColor.toString()) {
        self.floodFill(x + 1, y, targetColor, replacementColor);
      }
      if (get(x - 1, y).toString() === targetColor.toString()) {
        self.floodFill(x - 1, y, targetColor, replacementColor);
      }
      if (get(x, y + 1).toString() === targetColor.toString()) {
        self.floodFill(x, y + 1, targetColor, replacementColor);
      }
      if (get(x, y - 1).toString() === targetColor.toString()) {
        self.floodFill(x, y - 1, targetColor, replacementColor);
      }
      set(x, y, replacementColor);
    }
    if (targetColor == replacementColor) {
      return;
    }
  };

  /**
   * Populate Options method
   * Disables brush controllers and clears the options panel.
   */
  this.populateOptions = function () {
    brushControllers = false;
    select('.options').html('');
  };

  /**
   * Unselect Tool method
   * Restores brush sliders when switching tools.
   */
  this.unselectTool = function () {
    createBrushSliders();
  };
}
