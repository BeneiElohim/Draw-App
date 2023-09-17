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
      console.log(self.isTyping);
      let textInput = createInput();
      let inputX = mouseX;
      let inputY = mouseY;

      textInput.position(inputX, inputY);
      textInput.size(200, 20);
      textInput.style('background-color', 'white');
      textInput.elt.focus();
      let writeButton = select('#finishWriting');
      let textCurrentColor = currentColor;
      let selectedTextSizeInp = this.selectedTextSize;
      writeButton.mousePressed(() => {
        if (textInput != '') {
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
      function removeTextInput() {
        if (textInput && self.isTyping) {
          textInput.remove();
          self.isTyping = false;
        }
      }

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
function TextBox(size, x, y, inputText, textColor) {
  this.size = Number(size);
  this.x = x;
  this.y = y;
  this.text = inputText;
  this.color = textColor;
  let self = this;

  this.draw = function () {
    if (
      toolbox.selectedTool.name == 'eraser' &&
      mouseIsPressed &&
      mouseCloseToObject(self.x, self.y, mouseX, mouseY)
    ) {
      console.log('erase');
      self.erase();
    }
    textSize(self.size);
    fill(mapColorToRGB(self.color));
    strokeWeight(0);
    text(self.text, self.x, self.y);
  };
  this.erase = function () {
    self.text = '';
  };
}
