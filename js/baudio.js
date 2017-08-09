"use strict";

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function convertTime(currentTR){
  var minutesR = pad(Math.floor(currentTR / 60));
  var secondsR = pad(Math.round(currentTR - minutesR * 60));
  return minutesR + ":" + secondsR;
}

// player and controls

var playB = document.querySelectorAll(".play-button");
var pauseB = document.querySelectorAll(".pause-button")
var player = document.querySelectorAll(".player");
var seekbar = document.querySelectorAll(".seekbar");

for (var i=0;i<playB.length;i++){
  playB[i].addEventListener("click", function(){
    player[this.id.split("-")[1]-1].play();
  });
}

for (var j=0;j<pauseB.length;j++){
  pauseB[j].addEventListener("click", function(){
    player[this.id.split("-")[1]-1].pause();
  });
}

for (var k=0;k<seekbar.length;k++){
  seekbar[k].addEventListener("click", function(e){
    var x = e.pageX - this.offsetLeft;
    var clickedValue = x * this.max / this.offsetWidth;
    var position = player[this.id.split("-")[1]-1].duration * clickedValue;
    player[this.id.split("-")[1]-1].currentTime = position;
  });
}

var timeDurationCon = document.querySelectorAll(".time-duration");
var timeRemainingCon = document.querySelectorAll(".time-remaining");

for (var l=0;l<player.length;l++){
  player[l].addEventListener("canplaythrough", function(){
    timeRemainingCon[this.id.split("-")[1]-1].innerHTML = convertTime(player[this.id.split("-")[1]-1].duration);
  });

  player[l].addEventListener("timeupdate", function(){
    var currentTimePos = this.currentTime;
    seekbar[this.id.split("-")[1]-1].setAttribute("value", currentTimePos / this.duration);
    timeDurationCon[this.id.split("-")[1]-1].innerHTML = convertTime(currentTimePos);
    timeRemainingCon[this.id.split("-")[1]-1].innerHTML = convertTime(player[this.id.split("-")[1]-1].duration - currentTimePos);
  });
}
