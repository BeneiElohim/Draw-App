/**
 * EraserTool Constructor
 * This constructor creates an EraserTool object for a drawing application.
 * The tool allows users to erase parts of the canvas with either a square or round eraser.
 * @constructor
 */
function EraserTool() {
  // Set an icon and a name for the object
  this.icon = 'assets/eraser.png';
  this.name = 'eraser';
  this.eraserMode = 'square'; // Default eraser mode
  this.eraserRadius = 3; // Default eraser radius

  /**
   * Draw method
   * Handles the drawing logic for the EraserTool.
   * Erases parts of the canvas when the mouse is pressed, based on the selected eraser mode.
   */
  this.draw = function () {
    if (mouseIsPressed) {
      if (this.eraserMode === 'square') {
        // Square eraser
        fill(backgroundColor); // Fill with the background color to erase
        noStroke();
        rect(mouseX, mouseY, this.eraserRadius, this.eraserRadius);
      } else if (this.eraserMode === 'round') {
        // Round eraser
        fill(backgroundColor); // Fill with the background color to erase
        noStroke();
        ellipse(mouseX, mouseY, this.eraserRadius, this.eraserRadius);
      }
    }
  };

  /**
   * Populate Options method
   * Populates the options panel with buttons for selecting eraser mode and adjusting eraser radius.
   */
  this.populateOptions = function () {
    select('.options').html(
      `<button id='squareEraserButton'>Square Eraser</button> <button id='roundEraserButton'>Round Eraser</button>
       <label for='eraserRadiusSelect' style='font-size:20px '>Eraser Radius:</label>
       <select id='eraserRadiusSelect'>
         <option value='10'>10</option>
         <option value='20'>20</option>
         <option value='50'>50</option>
         <option value='75'>75</option>
         <option value='100'>100</option>
         <option value='125'>125</option>
       </select>`
    );
    brushControllers = false;

    // Event listeners for selecting eraser mode
    select('#squareEraserButton').mousePressed(() => {
      this.eraserMode = 'square';
    });

    select('#roundEraserButton').mousePressed(() => {
      this.eraserMode = 'round';
    });

    // Event listener for adjusting eraser radius
    select('#eraserRadiusSelect').changed(() => {
      this.eraserRadius = select('#eraserRadiusSelect').value();
    });
  };

  /**
   * Unselect Tool method
   * Performs any necessary cleanup or UI adjustments when switching tools.
   */
  this.unselectTool = function () {
    createBrushSliders(); // Create brush sliders or perform cleanup specific to your application
  };
}
