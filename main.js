const start = document.getElementById("start")
const pause = document.getElementById("pause")
const reset = document.getElementById("reset")
const timer = document.getElementById("timercontainer");
const lapTimer = document.getElementById("lapTime");
const laps = {};
//const lapsSet =[];

const disableElement = (arg) =>{
    arg.disabled = true;
    arg.style.opacity  = 0.2;
    arg.pointerEvents = 'none'

}

const enableElement = (arg) =>{
    arg.disabled = false;
    arg.style.opacity = 1;
    arg.style.pointerEvents = 'auto'

}


disableElement(pause);
disableElement(reset);

var hr = 0;
var x = new Date();
var Y = new Date();
var z =0;
var min = 0;
var sec = 0;
var ms=0;
var counter = 1000;
var clock;
laps.starTime = 0;
var initialSec = 0;
var finishSec = 0;

const startTimer = () => {
    disableElement(start);
    timerCycle()
    x = new Date();
    enableElement(pause);
}

const stopTimer = () => {
    
    if (pause.value == "Pause") {
        y = new Date();
        z = y-x;
        clearInterval(clock)
        finishSec = sec - initialSec;
        pause.value = "Resume"
        enableElement(reset);
        laps.stopTime = hr + ':' + min + ':' + sec;
        var li = document.createElement('li')
        li.innerHTML = `<span class="text1">Start Time:</span><span class="values"> ${laps.starTime}</span>-
        <span class="text1">Stop time:</span><span class="values"> ${laps.stopTime}</span>
        <span class="text1"> Total seconds taken:</span><span class="values"> ${timeConversion(z)} </span>`
        lapTimer.appendChild(li);

    }

    else {
        disableElement(reset);
        clearInterval(clock)
        pause.value = "Pause"
        timerCycle();
        laps.starTime = hr + ':' + min + ':' + sec;
        initialSec = sec;
        x = new Date();
    }
    
}

const resetTimer = () => {
    location.reload();
}


function timerCycle() {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    ms = ms + 100;

    if (ms == 1000) {
        sec = sec + 1;
        ms = 0;
    }

    if (sec == 60) {
        min = min + 1;
        sec = 0;
        ms = 0;
    }
    if (min == 60) {
        hr = hr + 1;
        min = 0;
        sec = 0;
        ms = 0;
    }

    if (sec < 10 || sec == 0) {
        sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
        min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
        hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    clock = setTimeout("timerCycle()", 100);
}


const timeConversion = (millisec) => {

    var seconds = (millisec / 1000).toFixed(1);

    var minutes = (millisec / (1000 * 60)).toFixed(1);

    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        return seconds + " Sec";
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days"
    }
};