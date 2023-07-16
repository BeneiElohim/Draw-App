function ShapesTool(){
	//set an icon and a name for the object
	this.icon = "assets/shapes.jpg";
	this.name = "shapes";
	this.editMode = false;
	this.currentShape = [];

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	
	this.draw = function(){
		//if the mouse is pressed
		updatePixels();
		if(mousePressonCanvas(c) && mouseIsPressed){
			if(!this.editMode) {
			this.currentShape.push([mouseX, mouseY]);
		}
	}  else if (this.editMode) {
		for (let i = 0; i < this.currentShape.length; i++) {
			if (dist(mouseX, mouseY, this.currentShape[i][0], this.currentShape[i][1]) < 10) {
				this.currentShape[i][0] = mouseX;
				this.currentShape[i][1] = mouseY;
			}
		}
	}
		noFill();
		beginShape();
		for (let i = 0; i < this.currentShape.length; i++) {
			vertex(this.currentShape[i][0], this.currentShape[i][1]);
			if (this.editMode) {
				fill(255, 0, 0);
				ellipse(this.currentShape[i][0], this.currentShape[i][1], 10, 10);
				noFill();
			}
		}
		endShape();
	};
	this.populateOptions = function() {
		select(".options").html(
			"<button id='edit-button'>Edit Vertices</button> <button id='finish-button'>Finish Editing</button>");
		let finishButton = select("#finish-button");
		let editButton = select("#edit-button");	
		finishButton.mousePressed(() => {
			this.editMode = false;
			loadPixels();
			this.currentShape = [];
		})
		editButton.mousePressed(() => {
			if (this.editMode) {
				this.editMode = false;
				editButton.html("Edit Vertices");
			}
			else {
				this.editMode = true;
				editButton.html("Stop Editing");
			}
		})
	};
}