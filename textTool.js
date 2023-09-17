function TextTool() {
  this.icon = 'assets/text.png';
  this.name = 'TextTool';
  this.isTyping = false;
  let self = this;

  // Event listener to remove textInput when clicking outside

  this.draw = function () {
    if (mouseIsPressed && mousePressonCanvas(c) && !this.isTyping) {
      this.isTyping = true;
      let textInput = createInput();
      let inputX = mouseX;
      let inputY = mouseY;
      textInput.position(inputX, inputY);
      textInput.size(200, 20);
      textInput.style('background-color', 'white');
      textInput.elt.focus();
      let writeButton = select('#finishWriting');
      let textCurrentColor = currentColor;
      writeButton.mousePressed(() => {
        if (textInput != '') {
          toolbox.objects.push(
            new TextBox(
              brushSize,
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
        if (textInput && !self.isTyping) {
          textInput.remove();
          self.isTyping = false;
        }
      }

      // Add event listener to remove textInput when clicking outside
      window.addEventListener('mousedown', removeTextInput);
    }
  };

  this.populateOptions = function () {
    select('.options').html(
      "<button id='finishWriting'>Finish Writing</button>"
    );
    brushControllers = false;
  };

  this.unselectTool = function () {
    createBrushSliders();
    brushControllers = true;
  };
}
function TextBox(size, x, y, inputText, textColor) {
  this.size = size + 40;
  this.x = x;
  this.y = y;
  this.text = inputText;
  this.color = textColor;
  let self = this;

  this.draw = function () {
    textSize(self.size);
    fill(mapColorToRGB(self.color));
    strokeWeight(0);
    text(self.text, self.x, self.y);
  };
}
