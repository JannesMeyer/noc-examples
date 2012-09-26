var stage;

addEventListener("DOMContentLoaded", function() {
	// onload
	var person = new Person("Jannes", "Meyer", 22, "brown");
	console.log(person.getFullName());

	// setup stage
	stage = new createjs.Stage("canvas");
	var circle = new createjs.Shape();
	circle.graphics.beginFill("blue").drawCircle(50, 50, 50);
	stage.addChild(circle);

	// ticker
	createjs.Ticker.addListener(window);

}, false);

function Person(firstname, lastname, age, eyecolor) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.age = age;
	this.eyecolor = eyecolor;
	this.getFullName = function() {
		return this.firstname + " " + this.lastname;
	}
	this.newLastname = function(newLastname) {
		this.lastname = newLastname;
	};
}

function tick() {
	stage.update();
}