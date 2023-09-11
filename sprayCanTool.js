function SprayCanTool() {
  this.name = "sprayCanTool";
  this.icon = "assets/sprayCan.jpg";
  this.sprayMode = "square";

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
    if (self.sprayMode === "square") {
      self.squareSpray();
    }
    if (self.sprayMode === "round") {
      self.roundSpray();
    }
    let squareSprayButton = select("#squareSprayButton");
    if (squareSprayButton) {
      squareSprayButton.mousePressed(() => {
        self.sprayMode = "square";
      });
    }

    let roundSprayButton = select("#roundSprayButton");
    if (roundSprayButton) {
      roundSprayButton.mousePressed(() => {
        self.sprayMode = "round";
      });
    }
  };
  this.populateOptions = function () {
    populateSpraySliders();
  };
  this.unselectTool = function () {
    createBrushSliders();
  };
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
