//Displays and handles the colour palette.
function ColourPalette() {
  //a list of web colour strings
  this.colours = [
    "black",
    "silver",
    "gray",
    "white",
    "maroon",
    "red",
    "purple",
    "orange",
    "pink",
    "fuchsia",
    "green",
    "lime",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
  ];
  //make the start colour be black
  this.selectedColour = "black";
  this.opacity = 255;
  this.size = 10;

  var self = this;

  select("#sizeSlider").input(function () {
    self.size = this.value(); // Update the brush size variable
  });

  // Event listener for the brush opacity slider
  select("#opacitySlider").input(function () {
    self.opacity = this.value(); // Update the brush opacity variable
  });

  var colourClick = function () {
    //remove the old border
    self.opacity = select("#opacitySlider").value();
    self.size = select("#sizeSlider").value();
    // Event listener for the brush size slider

    var current = select("#" + self.selectedColour + "Swatch");
    current.style("border", "0");

    //get the new colour from the id of the clicked element
    var c = this.id().split("Swatch")[0];

    //set the selected colour and fill and stroke
    self.selectedColour = c;
    currentColor = c;
    console.log(c);
    console.log(self.opacity);
    console.log(self.size);
    fill(c, c, c, self.opacity);
    stroke(c);
    strokeWeight(self.size);

    //add a new border to the selected colour
    this.style("border", "2px solid blue");
  };

  //load in the colours
  this.loadColours = function () {
    //set the fill and stroke properties to be black at the start of the programme
    //running
    fill(this.colours[0]);
    stroke(this.colours[0]);

    //for each colour create a new div in the html for the colourSwatches
    for (var i = 0; i < this.colours.length; i++) {
      var colourID = this.colours[i] + "Swatch";

      //using JQuery add the swatch to the palette and set its background colour
      //to be the colour value.
      var colourSwatch = createDiv();
      colourSwatch.class("colourSwatches");
      colourSwatch.id(colourID);

      select(".colourPalette").child(colourSwatch);
      select("#" + colourID).style("background-color", this.colours[i]);
      colourSwatch.mouseClicked(colourClick);
    }

    select(".colourSwatches").style("border", "2px solid blue");
  };
  //call the loadColours function now it is declared
  this.loadColours();
}
//Currently, the values of the brush size and opacity are stored in the ColourPalette object. They are getting updated, but adding them to stroke and strokeweight had no effect on any drawings.
