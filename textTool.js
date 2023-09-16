function TextTool() {
  this.icon = 'assets/text.png';
  this.name = 'TextTool';
  this.isTyping = false;

  this.draw = function () {
    if (mouseIsPressed && mousePressonCanvas(c)) {
      console.log('text');
    }
  };
}
