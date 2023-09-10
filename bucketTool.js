function BucketTool() {
  //set an icon and a name for the object
  this.icon = "assets/bucket.png";
  this.name = "bucket";
  this.targetColor = "black";

  let self = this;

  this.draw = function () {
    if (mouseIsPressed) {
      console.log("mouse pressed");
      self.targetColor = currentColor;
      self.floodFill(mouseX, mouseY, get(mouseX, mouseY), self.targetColor);
      console.log(mouseX, mouseY, get(mouseX, mouseY), self.targetColor);
    }
  };
  this.floodFill = function (x, y, targetColor, replacementColor) {
    if (targetColor === replacementColor) {
      console.log("same color");
      return;
    }
    if (get(x, y) === targetColor) {
      console.log("not same color");
      set(x, y, replacementColor);
      self.floodFill(x + 1, y, targetColor, replacementColor);
      self.floodFill(x - 1, y, targetColor, replacementColor);
      self.floodFill(x, y + 1, targetColor, replacementColor);
      self.floodFill(x, y - 1, targetColor, replacementColor);
    }
  };
  //TODO Add a tolarence option
  //TODO Add a fill color option
}
this.populateOptions = function () {
  select(".options").html("");
};
this.unselectTool = function () {
  createBrushSliders();
};
