//////////////////////////////////////////////////
// ATTENTION: This is a work in progress.       //
// This tool does not work in its current state //
// and is commented out of the main sketch.js   //
//////////////////////////////////////////////////
function ScissorTool() {
  // Set an icon and a name for the object
  this.icon = 'assets/scissors.jpg';
  this.name = 'scissors';

  // Select mode: 0 for idle, 1 for drawing selection, 2 for paste
  this.selectMode = 0;

  // Defines the currently selected area (x, y, width, height)
  this.selectedArea = { x: 0, y: 0, w: 100, h: 100 };

  // Stores the selected pixels for cut and paste operations
  this.selectedPixels = null;

  // Reference to the ScissorTool object (for scoping within functions)
  let self = this;

  /**
   * Draw method
   * Handles the drawing logic for the ScissorTool.
   * Draws the selection rectangle when in drawing mode.
   */
  this.draw = function () {
    // If the mouse is pressed and in selection mode
    if (mouseIsPressed && self.selectMode == 1) {
      // Update the canvas pixels
      updatePixels();

      // Draw the selection rectangle
      strokeWeight(1);
      stroke(0);
      noFill();
      rect(
        self.selectedArea.x,
        self.selectedArea.y,
        self.selectedArea.w,
        self.selectedArea.h
      );
    }
  };

  /**
   * Populate Options method
   * Adds a "Select Area" button to the UI and manages its functionality.
   * Allows users to switch between selection, cut, and paste modes.
   */
  this.populateOptions = function () {
    select('.options').html("<button id='selectButton'>Select Area</button>");
    brushControllers = false;

    let selectButton = select('#selectButton');
    selectButton.mousePressed(() => {
      if (this.selectMode == 0) {
        this.selectMode = 1;
        selectButton.html('Cut');
      } else if (this.selectMode == 1) {
        this.selectMode = 2;
        updatePixels();
        self.selectedPixels = get(
          self.selectedArea.x,
          self.selectedArea.y,
          self.selectedArea.w,
          self.selectedArea.h
        );

        selectButton.html('Paste');
      } else if (this.selectMode == 2) {
        this.selectMode = 0;
        selectButton.html('Select Area');
      }
    });
  };

  /**
   * Mouse Dragged method
   * Handles mouse dragging behavior when in selection mode.
   * Updates the selected area's dimensions as the user drags the mouse.
   */
  this.mouseDragged = function () {
    if (self.selectMode == 1) {
      self.selectedArea.w = mouseX - self.selectedArea.x;
      self.selectedArea.h = mouseY - self.selectedArea.y;
    }
  };

  /**
   * Mouse Pressed method
   * Handles mouse click behavior when in selection or paste mode.
   * In selection mode, it starts the selection process.
   * In paste mode, it pastes the selected pixels at the current mouse position.
   */
  this.mousePressed = function () {
    if (self.selectMode == 1) {
      // Start the selection process
      self.selectedArea.x = mouseX;
      self.selectedArea.y = mouseY;
    } else if (self.selectMode == 2) {
      // Paste the selected pixels
      image(self.selectedPixels, mouseX, mouseY);
    }
  };

  /**
   * Unselect Tool method
   * Performs any necessary cleanup or UI adjustments when switching tools.
   */
  this.unselectTool = function () {
    // Create brush sliders or perform any cleanup specific to your application
    createBrushSliders();
  };
}
