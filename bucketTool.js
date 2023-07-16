function BucketTool(){
	//set an icon and a name for the object
	this.icon = "assets/bucket.png";
	this.name = "bucket";

	this.draw = function(){
		if(mouseIsPressed){
			this.floodFill(mouseX, mouseY, get(mouseX, mouseY), selectedColor);
		}
	
	};
	this.floodFill = function(x, y, targetColor, replacementColor) {
		if (targetColor === replacementColor) {
			return;
		}
		if (get(x, y) === targetColor) {
			set(x, y, replacementColor);
			this.floodFill(x + 1, y, targetColor, replacementColor);
			this.floodFill(x - 1, y, targetColor, replacementColor);
			this.floodFill(x, y + 1, targetColor, replacementColor);
			this.floodFill(x, y - 1, targetColor, replacementColor);
		}
	}
	//TODO Add a tolarence option
	//TODO Add a fill color option
}