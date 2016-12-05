'use strict';


window.onload = function() {
	
	var app = new Application();
	var inputer = new Inputer();

	

// Design elements and adding to page
	app.initElems(app.input, app.startBtn, app.stopBtn, app.img);

	app.stopBtn.setAttribute('disabled','disabled');
	app.input.setAttribute('disabled','disabled');

// Event listener for Start button
	app.startBtn.addEventListener('click', function() {
		
		app.start();

		if (app.inputValue !== ''){

		// Event listener for pressing key
			window.addEventListener('keydown', function() {
				if (event.shiftKey) {
					var newValue = parseInt(inputer.getInputValue(app.input));
					if (app.deg !== undefined) {
					app.deg = app.deg + newValue;
					}
					else {
						app.deg = newValue;
					}
					app.keyShiftHandler(event.keyCode);
				}
				else {
					app.inputValue = inputer.getInputValue(app.input);
					app.keyHandler(event.keyCode);
				}
				
			});
		}
	});

// Event listener for Stop button
	app.stopBtn.addEventListener('click', function(event) {
		
		app.stop();

		// window.removeEventListener('keydown', function() {
		// 	app.inputValue = inputer.getInputValue(app.input);
		// 	app.keyHandler(event.keyCode);
		// });

		// window.removeEventListener('keydown', function() {
		// 	app.deg = inputer.getInputValue(app.input);
		// 	app.keyShiftHandler(event.keyCode);
		// });
	});	
}

// class Application
function Application(input, startBtn, stopBtn, img, imgPosition, inputValue, deg) {
	this.input = input;
	this.startBtn = startBtn;
	this.stopBtn = stopBtn;
	this.img = img;
	this.imgPosition = imgPosition;
	this.inputValue = inputValue;
	this.deg = deg;
}

// Start application function
Application.prototype.start = function () {
	
	this.startBtn.setAttribute('disabled','disabled');
	this.stopBtn.removeAttribute('disabled');
	this.input.removeAttribute('disabled');
	console.log('Application started');
}

// Creating and changing design of elements
Application.prototype.initElems = function(input, startBtn, stopBtn, img) {

	this.input = document.createElement('input');
	this.startBtn = document.createElement('button');
	this.stopBtn = document.createElement('button');
	this.img = document.createElement('img');

	this.input.className = 'input';
	this.input.setAttribute('type','text');
	this.input.setAttribute('placeholder','Введите число от 10 до 50');

	this.startBtn.className = 'btn btn__start';
	this.startBtn.innerHTML = 'Start';

	this.stopBtn.className = 'btn btn__stop';
	this.stopBtn.innerHTML = 'Stop';

	this.img.className = 'image';
	
	this.img.setAttribute('src','css/img/mrRobot.jpg');
	this.img.setAttribute('title','fSociety image');

	document.body.appendChild(this.input);
	document.body.appendChild(this.startBtn);
	document.body.appendChild(this.stopBtn);
	document.body.appendChild(this.img);
}

// Handler for navigate keys
Application.prototype.keyHandler = function(key) {


	this.imgPosition = this.img.getBoundingClientRect();

	console.log('-- COMMON MODE --');

	switch (key) {
		case 37: // left arrow
			console.log('left');
			var x = parseFloat(this.imgPosition.left) - parseFloat(this.inputValue);
			this.img.style.left = x + 'px';
			console.log(this.imgPosition);
			break;
		
		case 38: // up arrow
			console.log('up');
			var y = parseFloat(this.imgPosition.top) - parseFloat(this.inputValue);
			this.img.style.top = y + 'px';
			console.log(this.imgPosition);
			break;
		
		case 39: // right arrow
			console.log('right');
			var x = parseFloat(this.imgPosition.left) + parseFloat(this.inputValue);
			this.img.style.left = x + 'px';
			console.log(this.imgPosition);
			break;
		
		case 40: // down arrow
			console.log('down');
			var y = parseFloat(this.imgPosition.top) + parseFloat(this.inputValue);
			this.img.style.top = y + 'px';
			console.log(this.imgPosition);
			break;
		
		default:
			console.log('Pressed wrong key');
	}

	// console.log(this.imgPosition);
}

// Handler for navigate keys with shift key
Application.prototype.keyShiftHandler = function(key) {
	console.log('-- SHIFT MODE --');

	if (event.shiftKey && key === 37) {
		this.img.style.transform = 'rotate(-' + this.deg + 'deg)';
		console.log('Rotate left');
	}
	else if (event.shiftKey && key === 39) {
		this.img.style.transform = 'rotate(' + this.deg + 'deg)';
		console.log('Rotate right');
	}
	else {
		console.log('Pressed wrong key');
	}
}

// Stop application function
Application.prototype.stop = function () {
	this.stopBtn.setAttribute('disabled','disabled');
	this.startBtn.removeAttribute('disabled');
	this.input.setAttribute('disabled','disabled');
	console.log('Application stoped');
}

// Class Inputer
function Inputer(value) {
	this.value = value;
}

// Getting user value from input and checking correct value
Inputer.prototype.getInputValue = function(input) {
	
	const valueMin = 10;
	const valueMax = 50;
	
	this.value = input.value;
	// console.log('You type value = ' + this.value);
	
	if (this.value !== '') {
		if (this.value < valueMin) {
			this.value = valueMin;
			// console.log('Its too little. Set value = ' + this.value);
		}
		else if (this.value > valueMax) {
			this.value = valueMax;
			// console.log('Its too much. Set value = ' + this.value);
		}
	}
	else {
		this.value = 0;
	}
	return this.value;
}