////////////////////////////////////////
//  ITP-2 FINAL PROJECT SUBMISSION    //
//  Name:   İsmail Mert Tarihç        //
////////////////////////////////////////
// This is the main file of the project, that sets up the canvas and the tools.

//global variables that will store the toolbox colour palette
let toolbox = null;
let colourP = null;
let helpers = null;
let c;
let currentColor = 'black';
let currentAlpha = 255;
let brushSize = 5;
let brushControllers = true;
let backgroundColor = 'white';
function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select('#content');
  c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
  c.parent('content');

  //create helper functions and the colour palette
  helpers = new HelperFunctions();
  colourP = new ColourPalette();

  //create a toolbox for storing the tools
  toolbox = new Toolbox();
  //add the tools to the toolbox.
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineToTool());
  toolbox.addTool(new SprayCanTool());
  toolbox.addTool(new mirrorDrawTool());
  toolbox.addTool(new ShapesTool());
  /*   toolbox.addTool(new ScissorTool()); */ // not working, commented out for now
  /* toolbox.addTool(new BucketTool()); */ // not working, commented out for now
  toolbox.addTool(new EraserTool());
  toolbox.addTool(new TextTool());
  background(backgroundColor);
}
////////////////////////////////////////
//  DRAW FUNCTION                     //
////////////////////////////////////////
// We basically have 3 parts to this draw function:
// 1. Draw method of the selected tool
// 2. Draw method of the objects class, which holds the text objects but can be expanded to hold other objects created by other tools such as shapes, if the project is expanded.
// 3. Fill, stroke and strokeWeight settings for the brush which needs to work outside the colorPalette class.
function draw() {
  // if the mouse is pressed call the draw function from the selected tool.
  if (toolbox.selectedTool.hasOwnProperty('draw') && mousePressonCanvas(c)) {
    toolbox.selectedTool.draw();
    if (brushControllers) {
      // if the brush controllers are on, make sure to pick up the values from the sliders
      brushSize = select('#sizeSlider').value();
      currentAlpha = select('#opacitySlider').value();
      //update the brush size and opacity at runtime
    }
    toolbox.objects.forEach((object) => {
      if (object.value != '') {
        object.draw();
      }
    });
    fill(mapColorToRGB(currentColor));
    stroke(mapColorToRGB(currentColor));
    strokeWeight(brushSize);
  }
}
