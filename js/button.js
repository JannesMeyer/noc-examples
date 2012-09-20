(function(window, undefined) {
	window.Button = function(label, color) {
		this.initialize(label, color);
	}

	// inherit from container
	Button.prototype = new createjs.Container();
	
	// extend prototype
	Button.prototype.label;
	Button.prototype.background;
	Button.prototype.count = 0;
	Button.prototype.Container_initialize = Button.prototype.initialize;
	Button.prototype.initialize = function(label, color) {
		this.Container_initialize();
		// save parameters
		this.label = label;
		if (typeof color === "undefined") {
			color = "#ccc";
		}

		// Create text label
		var text = new createjs.Text(label, "20px sans-serif", "#000");
		text.textBaseline = "top";
		text.textAlign = "center";
		
		var width = text.getMeasuredWidth() + 30;
		var height = text.getMeasuredHeight() + 20;
		text.x = width / 2;
		text.y = 10;

		// Create background shape
		var background = new createjs.Shape();
		background.graphics.beginFill(color).drawRoundRect(0, 0, width, height, 10);

		// Plant the elements
		this.addChild(background, text);
	};

	Button.prototype.onClick = function() {
		alert("You clicked a button: " + this.label);
	};

	Button.prototype.onTick = function() {
		this.alpha = Math.cos(this.count * 0.1) * 0.4 + 0.6;
		this.count++;
	};

})(window);