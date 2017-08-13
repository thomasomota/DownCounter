'use strict';

var buttonsContainer = document.querySelector('.buttons');
var output = document.querySelector('#output');
var start = document.querySelector('#start');
var reset = document.querySelector('#reset');
var timediff = document.querySelector('#timediff')

function buttonsClickHandler(event) {

  var element = event.target;
  if(element.nodeName !== 'BUTTON') { return; }
  
  var number = element.dataset.number;
  var currentNumber = output.textContent;
  
  if(currentNumber.length < 5){
	  output.textContent = currentNumber === '0' ? number : currentNumber += number;
  }
}

function startClickHandler(event) {

  var startDate = Date.now();
  var endDate = new Date();

  var interval = setInterval(function() {
	  
    var currentNumber = output.textContent;

    if(currentNumber === '0') {
      clearInterval(interval);
	  resetAll();
	  endDate = Date.now();
	  return;

    }
    output.textContent = Number(currentNumber) - 1;
  }, 100);


  timediff.textContent = Math.abs(startDate.getTime() - endDate.getTime());


}

function resetAll(){
	resetClickHandler('click');
}

function resetClickHandler(event){
	output.textContent = '0';
	output.style.color = "#ffffff";
}



buttonsContainer.addEventListener('click', buttonsClickHandler);
start.addEventListener('click', startClickHandler);
reset.addEventListener('click', resetClickHandler);