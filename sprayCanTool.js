function SprayCanTool() {
  this.name = "sprayCanTool";
  this.icon = "assets/sprayCan.jpg";

  this.points = 13;
  this.spread = 10;

  let self = this;

  this.draw = function () {
    select("#pointSlider").input(function () {
      self.points = this.value(); // Update the brush points variable
    });
    select("#spreadSlider").input(function () {
      self.spread = this.value(); // Update the brush spread variable
    });

    var r = random(5, 10);
    if (mouseIsPressed) {
      for (var i = 0; i < self.points; i++) {
        point(
          random(mouseX - self.spread, mouseX + self.spread),
          random(mouseY - self.spread, mouseY + self.spread)
        );
      }
    }
  };
  this.populateOptions = function () {
    populateSpraySliders();
  };
  this.unselectTool = function () {
    createBrushSliders();
  };
}
