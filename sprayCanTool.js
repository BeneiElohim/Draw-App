/**
 * SprayCanTool Constructor
 * This constructor creates a SprayCanTool object for a drawing application.
 * The tool simulates a spray can brush for creating point patterns on the canvas.
 * @constructor
 */
function SprayCanTool() {
  this.name = 'sprayCanTool';
  this.icon = 'assets/sprayCan.jpg';
  this.sprayMode = 'square'; // Default spray mode

  // Initial values for the number of points and spread of the spray
  this.points = 13;
  this.spread = 10;

  let self = this;

  /**
   * Draw method
   * Handles the drawing logic for the SprayCanTool.
   * Detects changes in the point and spread sliders and updates the brush settings.
   * Calls the appropriate spray function based on the selected spray mode.
   */
  this.draw = function () {
    select('#pointSlider').input(function () {
      self.points = this.value(); // Update the brush points variable
    });
    select('#spreadSlider').input(function () {
      self.spread = this.value(); // Update the brush spread variable
    });

    // Choose the spray function based on the selected spray mode
    if (self.sprayMode === 'square') {
      self.squareSpray(); // Call the squareSpray function
    }
    if (self.sprayMode === 'round') {
      self.roundSpray(); // Call the roundSpray function
    }

    // Add event listeners to switch between square and round spray modes
    let squareSprayButton = select('#squareSprayButton');
    if (squareSprayButton) {
      squareSprayButton.mousePressed(() => {
        self.sprayMode = 'square';
      });
    }

    let roundSprayButton = select('#roundSprayButton');
    if (roundSprayButton) {
      roundSprayButton.mousePressed(() => {
        self.sprayMode = 'round';
      });
    }
  };

  /**
   * Populate Options method
   * Populates the options panel with sliders for controlling the spray brush.
   */
  this.populateOptions = function () {
    populateSpraySliders(); // Call a function to populate spray-related sliders
  };

  /**
   * Unselect Tool method
   * Performs any necessary cleanup or UI adjustments when switching tools.
   */
  this.unselectTool = function () {
    createBrushSliders(); // Create brush sliders or perform cleanup specific to your application
  };

  /**
   * Square Spray method
   * Simulates a square-shaped spray pattern when the mouse is pressed.
   */
  this.squareSpray = function () {
    if (mouseIsPressed) {
      for (var i = 0; i < self.points; i++) {
        point(
          random(mouseX - self.spread, mouseX + self.spread),
          random(mouseY - self.spread, mouseY + self.spread)
        );
      }
    }
  };

  /**
   * Round Spray method
   * Simulates a round-shaped spray pattern when the mouse is pressed.
   */
  this.roundSpray = function () {
    if (mouseIsPressed) {
      for (var i = 0; i < self.points; i++) {
        let angle = random(TWO_PI);
        let radius = random(self.spread);
        let x = mouseX + radius * cos(angle);
        let y = mouseY + radius * sin(angle);
        point(x, y);
      }
    }
  };
}
