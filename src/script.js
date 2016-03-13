'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');
var color_box = document.querySelectorAll('.color_box');

var rainbow_rgb = "#000000";
var frequency = 0;
var sin_constant = 0.05;

function buttonsClickHandler(event) {
  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }
  
  var number = element.dataset.number;
  var currentNumber = output.textContent;
  
  if(currentNumber.length < 9){
	  output.textContent = currentNumber === '0' ? number : currentNumber += number;
  }
}

function startClickHandler(event) {
	frequency = 0;
	
  var interval = setInterval(function() {
	  
    var currentNumber = output.textContent;

    if(currentNumber === '0') {
      clearInterval(interval);
	  resetAll();
      return;
    }
    output.textContent = Number(currentNumber) - 1;
	ChangeTextColor();
  }, 100);
}

function resetAll(){
	resetClickHandler('click');
}

function resetClickHandler(event){
	output.textContent = '0';
	output.style.color = "#ffffff";
	for(var i = 0; i < color_box.length; i++){
		color_box[i].style.backgroundColor = "#262626"
	}
}

function ChangeTextColor(){
	updateRainbowRgbNum();
	output.style.color = rainbow_rgb;
	
	for( var i = 0; i < color_box.length; i++){
		color_box[i].style.backgroundColor = rainbow_rgb;		
	}
}

function updateRainbowRgbNum(){
	
	var red   = Math.sin(frequency*sin_constant + 0) * 127 + 128;
	var green = Math.sin(frequency*sin_constant + 2) * 127 + 128;
	var blue  = Math.sin(frequency*sin_constant + 4) * 127 + 128;
	
	rainbow_rgb = rgbToHex(red,green,blue);
	
	if(frequency<120){
		frequency += 1;
	}
	else{
		frequency = 0;
	}	
}

 function rgbToHex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
  }


buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
reset.addEventListener('click', resetClickHandler);