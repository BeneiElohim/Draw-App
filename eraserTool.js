function EraserTool() {
  //set an icon and a name for the object
  this.icon = "assets/eraser.png";
  this.name = "eraser";
  this.eraserMode = "square";
  this.eraserRadius = 3; // Default radius

  this.draw = function () {
    if (mouseIsPressed) {
      if (this.eraserMode === "square") {
        // Square eraser
        fill(255);
        noStroke();
        rect(mouseX, mouseY, this.eraserRadius, this.eraserRadius);
      } else if (this.eraserMode === "round") {
        // Round eraser
        fill(255);
        noStroke();
        ellipse(mouseX, mouseY, this.eraserRadius, this.eraserRadius);
      }
    }
  };

  this.populateOptions = function () {
    select(".options").html(
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

    select("#squareEraserButton").mousePressed(() => {
      this.eraserMode = "square";
    });

    select("#roundEraserButton").mousePressed(() => {
      this.eraserMode = "round";
    });

    // Handle eraser radius selection
    select("#eraserRadiusSelect").changed(() => {
      this.eraserRadius = select("#eraserRadiusSelect").value();
    });
  };
  this.unselectTool = function () {
    console.log("eraser tool unselected");
  };
}
