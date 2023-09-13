//global variables that will store the toolbox colour palette
//amnd the helper functions
let toolbox = null;
let colourP = null;
let helpers = null;
let c;
let currentColor = "black";
let currentAlpha = 150;
let brushSize = 10;
let brushControllers = true;

function setup() {
  //create a canvas to fill the content div from index.html
  canvasContainer = select("#content");
  c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
  c.parent("content");
  pixelDensity(1);

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
  toolbox.addTool(new ScissorTool());
  toolbox.addTool(new BucketTool());
  toolbox.addTool(new EraserTool());
  background(255);
}

function draw() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("draw")) {
    toolbox.selectedTool.draw();
    if (brushControllers) {
      brushSize = select("#sizeSlider").value();
      currentAlpha = select("#opacitySlider").value();
    }
  } else {
    alert("it doesn't look like your tool has a draw method!");
  }
}
function mouseDragged() {
  //call the draw function from the selected tool.
  //hasOwnProperty is a javascript function that tests
  //if an object contains a particular method or property
  //if there isn't a draw method the app will alert the user
  if (toolbox.selectedTool.hasOwnProperty("mouseDragged")) {
    toolbox.selectedTool.mouseDragged();
  }
}
