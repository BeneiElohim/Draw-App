function TextTool() {
  this.icon = 'assets/text.png';
  this.name = 'TextTool';
  this.isTyping = false;
  let textInput;
  let self = this;

  this.draw = function () {
    if (mouseIsPressed && mousePressonCanvas(c) && !this.isTyping) {
      this.isTyping = true;
      textInput = createInput();
      let inputX = mouseX;
      let inputY = mouseY;
      textInput.position(inputX, inputY);
      textInput.size(200, 20);
      textInput.style('background-color', 'white');
      let writeButton = select('#finishWriting');
      writeButton.mousePressed(() => {
        console.log(textInput.value());
        let newTextBox = new TextBox(
          brushSize,
          inputX,
          inputY,
          textInput.value(),
          currentColor
        );
        toolbox.objects.push(newTextBox);
        textInput.remove();
        self.isTyping = false;
      });
    }
  };
  this.populateOptions = function () {
    select('.options').html(
      "<button id='finishWriting'>Finish Writing</button>"
    );
    brushControllers = false;
  };

  this.unselectTool = function () {
    brushControllers = true;
  };
}

function TextBox(size, x, y, inputText, textColor) {
  this.size = size;
  this.x = x;
  this.y = y;
  this.text = inputText;
  this.color = textColor;
  let self = this;

  this.draw = function () {
    textSize(this.size);
    fill(mapColorToRGB(this.color));
    text(this.text, this.x, this.y);
  };
}
