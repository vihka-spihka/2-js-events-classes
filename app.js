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
	
			// Event listener for pressing key
			window.addEventListener('keydown', function() {
				if (event.shiftKey) {
					app.degDelta = parseInt(inputer.getInputValue(app.input));
					app.keyShiftHandler(event.keyCode);
				}
				else {
					app.inputValue = inputer.getInputValue(app.input);
					app.keyHandler(event.keyCode);
				}
			});
	});

// Event listener for Stop button
	app.stopBtn.addEventListener('click', function(event) {
		
		app.stop();

		window.removeEventListener('keydown', function() {
			if (event.shiftKey) {
				app.degDelta = parseInt(inputer.getInputValue(app.input));
				app.keyShiftHandler(event.keyCode);
			}
			else {
				app.inputValue = inputer.getInputValue(app.input);
				app.keyHandler(event.keyCode);
			}
		});
	});	
}

// class Application
function Application(input, startBtn, stopBtn, img, imgPosition, inputValue, deg, degDelta) {
	this.input = input;
	this.startBtn = startBtn;
	this.stopBtn = stopBtn;
	this.img = img;
	this.imgPosition = imgPosition;
	this.inputValue = inputValue;
	this.deg = deg;
	this.degDelta = degDelta;
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

	var value = parseFloat(this.inputValue);

	this.imgPosition = this.img.getBoundingClientRect();

	console.log('-- COMMON MODE --');

	switch (key) {
		case 37: // left arrow
			console.log('left');
			var x = this.imgPosition.left - value;
			this.img.style.left = x + 'px';
			break;
		
		case 38: // up arrow
			console.log('up');
			var y = this.imgPosition.top - value;
			this.img.style.top = y + 'px';
			break;
		
		case 39: // right arrow
			console.log('right');
			var x = this.imgPosition.left + value;
			this.img.style.left = x + 'px';
			break;
		
		case 40: // down arrow
			console.log('down');
			var y = this.imgPosition.top + value;
			this.img.style.top = y + 'px';
			break;
		
		default:
			console.log('Pressed wrong key');
	}
}

// Handler for navigate keys with shift key
Application.prototype.keyShiftHandler = function(key) {
	console.log('-- SHIFT MODE --');
	
	if (this.deg === undefined) {
		this.deg = this.degDelta;
	}
	else {
		console.log('app.deg is exist')
		this.deg = parseInt(this.deg);
		this.deg += this.degDelta;
	}

	if (event.shiftKey && key === 37) {
		this.img.style.transform = 'rotate(-' + this.deg/2 + 'deg)';
		console.log('Rotate left for ' + this.deg/2);
	}
	else if (event.shiftKey && key === 39) {
		this.img.style.transform = 'rotate(' + this.deg/2 + 'deg)';
		console.log('Rotate right for ' + this.deg/2);
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
	
	if (this.value !== '') {
		if (this.value < valueMin) {
			this.value = valueMin;
			console.log('Its too little. Set value = ' + this.value);
		}
		else if (this.value > valueMax) {
			this.value = valueMax;
			console.log('Its too much. Set value = ' + this.value);
		}
	}
	else {
		this.value = 0;
	}
	return this.value;
}