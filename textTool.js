//////////////////////////////////////////////
//////////////////////////////////////////////
//                 TEXT TOOL                //
//////////////////////////////////////////////

function TextTool() {
  this.icon = 'assets/text.png';
  this.name = 'TextTool';
  this.isTyping = false;
  let self = this;
  this.selectedTextSize = 10;

  // Event listener to remove textInput when clicking outside

  this.draw = function () {
    if (mouseIsPressed && mousePressonCanvas(c) && !this.isTyping) {
      self.isTyping = true;

      // Create a text input element for typing
      let textInput = createInput();
      let inputX = mouseX;
      let inputY = mouseY;

      textInput.position(inputX, inputY);
      textInput.size(200, 20);
      textInput.elt.focus();
      let writeButton = select('#finishWriting');
      let textCurrentColor = currentColor;
      let selectedTextSizeInp = this.selectedTextSize;
      writeButton.mousePressed(() => {
        if (textInput != '') {
          // Create a TextBox object and add it to the toolbox objects array
          toolbox.objects.push(
            new TextBox(
              selectedTextSizeInp,
              inputX,
              inputY,
              textInput.value(),
              textCurrentColor
            )
          );
          textInput.remove();
          self.isTyping = false;
        }
      });
      // Add event listener to remove textInput when clicking outside
      select('#textSizeSelect').changed(() => {
        this.selectedTextSize = select('#textSizeSelect').value();
      });
    }
  };

  this.populateOptions = function () {
    select('.options').html(
      `<button id='finishWriting'>Finish Writing</button> <label for='textSizeSelect' style='font-size:20px '>Text Size</label>
      <select id='textSizeSelect'>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
        <option value='75'>75</option>
        <option value='100'>100</option>
        <option value='125'>125</option>
      </select>
    `
    );
    brushControllers = false;
  };

  this.unselectTool = function () {
    createBrushSliders();
    brushControllers = true;
  };
}

/**
 * TextBox Constructor
 * This constructor creates a TextBox object to display text on the canvas.
 * @param {number} size - The font size of the text.
 * @param {number} x - The x-coordinate of the text.
 * @param {number} y - The y-coordinate of the text.
 * @param {string} inputText - The text content.
 * @param {p5.Color} textColor - The color of the text.
 * @constructor
 */
function TextBox(size, x, y, inputText, textColor) {
  this.size = Number(size);
  this.x = x;
  this.y = y;
  this.text = inputText;
  this.color = textColor;
  let self = this;

  /**
   * Draw method
   * Handles the drawing logic for the TextBox.
   * Checks if the eraser tool is selected and erases the TextBox if it is and is close to the mouse.
   */
  this.draw = function () {
    if (
      toolbox.selectedTool.name == 'eraser' &&
      mouseIsPressed &&
      mouseCloseToObject(self.x, self.y, mouseX, mouseY)
    ) {
      self.erase();
    }
    textSize(self.size);
    fill(mapColorToRGB(self.color));
    strokeWeight(0);
    text(self.text, self.x, self.y);
  };

  /**
   * Erase method
   * Clears the text content of the TextBox.
   */
  this.erase = function () {
    self.text = '';
  };
}
