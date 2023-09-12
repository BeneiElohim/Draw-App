function BucketTool() {
  //set an icon and a name for the object
  this.icon = "assets/bucket.png";
  this.name = "bucket";
  this.targetColor = "black";

  let self = this;
  this.floodFill = function (seed, fillColor) {
    loadPixels();

    index = 4 * (width * seed.y + seed.x);
    seedColor = [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];
    let queue = [];
    queue.push(seed);

    while (queue.length) {
      let current = queue.shift();
      index = 4 * (width * current.y + current.x);
      let color = [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3],
      ];

      if (!self.arrayEquals(color, seedColor)) {
        continue;
      }

      for (let i = 0; i < 4; i++) {
        pixels[index + i] = fillColor[0 + i];
      }

      queue = self.expandToNeighbours(queue, current);
    }
    console.log("done");
    updatePixels();
  };

  this.populateOptions = function () {
    select(".options").html("");
  };
  this.unselectTool = function () {
    createBrushSliders();
  };
  this.arrayEquals = function (a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  this.expandToNeighbours = function (queue, current) {
    x = current.x;
    y = current.y;

    if (x - 1 > 0) {
      queue.push(createVector(x - 1, y));
    }
    if (x + 1 < width) {
      queue.push(createVector(x + 1, y));
    }
    if (y - 1 > 0) {
      queue.push(createVector(x, y - 1));
    }
    if (y + 1 < height) {
      queue.push(createVector(x, y + 1));
    }

    return queue;
  };
  this.draw = function () {
    if (mouseIsPressed) {
      if (mousePressonCanvas(c)) {
        self.floodFill(createVector(mouseX, mouseY), currentColor);
      }
    }
  };
}
