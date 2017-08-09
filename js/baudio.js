"use strict";

// player and controls
var playB = document.getElementById("play");
var pauseB = document.getElementById("pause");
var player = document.getElementById("player");
var seekbar = document.getElementById("seekbar");

// dom elements for times updates
var timeDurationCon = document.getElementById("time-duration");
var timeRemainingCon = document.getElementById("time-remaining");

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function convertTime(currentTR){
  var minutesR = pad(Math.floor(currentTR / 60));
  var secondsR = pad(Math.round(currentTR - minutesR * 60));
  return minutesR + ":" + secondsR;
}

playB.addEventListener("click", function(){
  player.play();
});

pauseB.addEventListener("click", function(){
  player.pause();
});

player.addEventListener("timeupdate", function(){
  var currentTimePos = this.currentTime;
  seekbar.setAttribute("value", currentTimePos / this.duration);
  timeDurationCon.innerHTML = convertTime(currentTimePos);
  timeRemainingCon.innerHTML = "-" + convertTime(player.duration - currentTimePos);
});

player.addEventListener("canplaythrough", function(){
  timeRemainingCon.innerHTML = "-" + convertTime(player.duration);
})

document.getElementById('seekbar').addEventListener('click', function (e) {
    var x = e.pageX - this.offsetLeft;
    var clickedValue = x * this.max / this.offsetWidth;
    var position = player.duration * clickedValue;
    player.currentTime = position;
});
