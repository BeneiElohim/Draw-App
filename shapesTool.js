/**
 * ShapesTool Constructor
 * This constructor creates a ShapesTool object for a drawing application.
 * The tool allows users to draw and edit shapes by defining vertices.
 * @constructor
 */
function ShapesTool() {
  // Set an icon and a name for the object
  this.icon = 'assets/shapes.jpg';
  this.name = 'shapes';
  this.editMode = false; // Indicates whether the user is in edit mode
  this.currentShape = []; // Stores the vertices of the current shape being drawn or edited

  /**
   * Draw method
   * Handles the drawing logic for the ShapesTool.
   * Allows users to define vertices for shapes and edit them when in edit mode.
   */
  this.draw = function () {
    // Check if the mouse is pressed and if it's on the canvas
    updatePixels();
    if (mousePressonCanvas(c) && mouseIsPressed) {
      if (!this.editMode) {
        this.currentShape.push([mouseX, mouseY]); // Add a vertex to the current shape
      }
    } else if (this.editMode) {
      // Edit mode: move vertices when clicking and dragging
      for (let i = 0; i < this.currentShape.length; i++) {
        if (
          dist(
            mouseX,
            mouseY,
            this.currentShape[i][0],
            this.currentShape[i][1]
          ) < 10
        ) {
          this.currentShape[i][0] = mouseX;
          this.currentShape[i][1] = mouseY;
        }
      }
    }
    noFill();
    beginShape();
    for (let i = 0; i < this.currentShape.length; i++) {
      vertex(this.currentShape[i][0], this.currentShape[i][1]);
      if (this.editMode) {
        fill(255, 0, 0);
        ellipse(this.currentShape[i][0], this.currentShape[i][1], 10, 10);
        noFill();
      }
    }
    endShape();
  };

  /**
   * Populate Options method
   * Populates the options panel with buttons for editing and finishing shapes.
   */
  this.populateOptions = function () {
    select('.options').html(
      "<button id='edit-button'>Edit Vertices</button> <button id='finish-button'>Finish Editing</button>"
    );
    let finishButton = select('#finish-button');
    let editButton = select('#edit-button');

    // Event listener for finishing shape editing
    finishButton.mousePressed(() => {
      this.editMode = false;
      loadPixels();
      this.currentShape = [];
    });

    // Event listener for toggling edit mode
    editButton.mousePressed(() => {
      if (this.editMode) {
        this.editMode = false;
        editButton.html('Edit Vertices');
      } else {
        this.editMode = true;
        editButton.html('Stop Editing');
      }
    });

    brushControllers = false;
  };
}
