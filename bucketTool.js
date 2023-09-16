function BucketTool() {
  //set an icon and a name for the object
  this.icon = "assets/bucket.png";
  this.name = "bucket";

  let self = this;

  this.draw = function () {
    if (mouseIsPressed) {
      if (mousePressonCanvas(c)) {
        loadPixels();
        self.floodFill( mouseX, mouseY, get(mouseX, mouseY), mapColorToRGB(currentColor));
        updatePixels();
      }
    }
  };
  this.floodFill = function (x, y, targetColor, replacementColor) {
    if (targetColor != replacementColor) {
      if (get(x + 1, y).toString() === targetColor.toString()) {
        /* self.floodFill(x + 1, y, targetColor, replacementColor); */
        console.log("conditional 1 reached");
      }
      if (get(x - 1, y).toString() === targetColor.toString()) {
        /* self.floodFill(x - 1, y, targetColor, replacementColor); */
        console.log("conditional 2 reached");
      }
      if (get(x, y + 1).toString() === targetColor.toString()) {
        /* self.floodFill(x, y + 1, targetColor, replacementColor); */
        console.log("conditional 3 reached");
      }
      if (get(x, y - 1).toString() === targetColor.toString()) {
        /* self.floodFill(x, y - 1, targetColor, replacementColor); */
        console.log("conditional 4 reached");
      }
      set(x, y, replacementColor);
    }
    if (targetColor == replacementColor) {
      console.log("targetColor == replacementColor")
      return;
    }
  };

  this.populateOptions = function () {
    brushControllers = false;
    select(".options").html("");
  };
  this.unselectTool = function () {
    createBrushSliders();
  };

  
}
