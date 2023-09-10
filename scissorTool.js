function ScissorTool() {
  //set an icon and a name for the object
  this.icon = "assets/scissors.jpg";
  this.name = "scissors";
  this.selectMode = 0;
  this.selectedArea = { x: 0, y: 0, w: 100, h: 100 };
  this.draw = function () {
    //if the mouse is pressed
    if (mouseIsPressed && this.selectMode == 1) {
      this.selectedArea.x = mouseX;
      this.selectedArea.y = mouseY;
    }
  };
  this.populateOptions = function () {
    select(".options").html("<button id='selectButton'>Select Area</button>");

    let selectButton = select("#selectButton");
    selectButton.mousePressed(() => {
      if (this.selectMode == 0) {
        this.selectMode = 1;
        selectButton.html("Cut");
      } else if (this.selectMode == 1) {
        this.selectMode = 2;
        selectButton.html("Paste");
      } else if (this.selectMode == 2) {
        this.selectMode = 0;
        selectButton.html("Select Area");
      }
    });
  };
  this.mouseDragged = function () {
    console.log("mouse dragged");
    console.log(this.selectedArea);
    if (this.selectMode == 1) {
      console.log(this.selectMode, mouseX, mouseY);
      this.selectedArea.w = mouseX - this.selectedArea.x;
      this.selectedArea.h = mouseY - this.selectedArea.y;

      if (this.selectedArea.w < 0) {
        this.selectedArea.x = mouseX;
        this.selectedArea.w *= -1;
      }
      if (this.selectedArea.h < 0) {
        this.selectedArea.y = mouseY;
        this.selectedArea.h *= -1;
      }
    }
  };
  this.unselectTool = function () {
    select(".options").html(`<label for="sizeSlider">Brush Size</label>
    <input type="range" id="sizeSlider" min="1" max="50" value="10" />

    <label for="opacitySlider">Brush Opacity</label>
    <input type="range" id="opacitySlider" min="0" max="255" value="255" />`);
  };
}
