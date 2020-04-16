
//define variables for time

let currentSet = 0
let totalSets;
let seconds = 0
let minutes = 0

const timerSeconds = document.getElementById("timerSeconds")
const timerMinutes = document.getElementById("timerMinutes")

let displaySeconds;
let displayMinutes;
let displaySet = document.getElementById('set-display')

//define variables for status

let started = false;
let paused = false
let breakStatus = false;
let displayStatus = document.getElementById('status')

//define variable to hold interval
let interval;

//define variables to hold inputs
const actionSeconds = document.getElementById('actionSeconds')
const actionMinutes = document.getElementById('actionMinutes')
const breakSeconds = document.getElementById('breakSeconds')
const breakMinutes = document.getElementById('breakMinutes')
const setsInput = document.getElementById('sets')


//define variables to hold buttons
const startButton = document.getElementById('start')
const pauseContinueButton = document.getElementById('pause-continue')
const resetButton = document.getElementById('reset')
const useSaved = document.getElementById('use-saved')

//import and run dropdown function for select elements
import { populateDropdowns } from '/populateDropdowns.js'

populateDropdowns()

//import and run modal functions
import { runModal } from '/modal.js'

runModal()


//setter function puts user input values into variables for use by timer
function setter() {
    if (!breakStatus) {
        displayStatus.classList.add('animation')
        currentSet++
        displaySet.innerHTML = currentSet;
        //animation
        displayStatus.innerHTML = 'Action'
        displayStatus.classList.remove('hide')
        displayStatus.classList.add('animation')
        setTimeout(function () {
            displayStatus.classList.remove('animation')
            displayStatus.classList.add('hide')
        }, 1000)
        //change timer display
        seconds = actionSeconds.value
        minutes = actionMinutes.value
    } else if (currentSet < totalSets) {
        //animation
        displayStatus.innerHTML = 'Break'
        displayStatus.classList.remove('hide')
        displayStatus.classList.add('animation')
        setTimeout(function () {
            displayStatus.classList.remove('animation')
            displayStatus.classList.add('hide')
        }, 1000)
        //change timer display
        seconds = breakSeconds.value
        minutes = breakMinutes.value
    }
    if (currentSet > totalSets) {
        clearInterval(interval)
        //animation
        displayStatus.innerHTML = 'BEEFCAKE'
        displayStatus.classList.remove('hide')
        displayStatus.classList.add('BEEFCAKE')
        setTimeout(function () {
            displayStatus.classList.remove('BEEFCAKE')
            displayStatus.classList.add('hide')
        }, 2000)
        displaySet.innerHTML = 'Finished all sets'
        started = false;
    }
}


//timer function counts down in iterations and displays current time

function timer() {
    seconds--
    if (seconds <= 0 && minutes > 0) {
        seconds = 59
        minutes--
    }
    if (seconds <= 0 && minutes <= 0) {
        breakStatus = !breakStatus;
        setter()
    }

    //add a 0 to display if either value is a single digit


    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    timerMinutes.innerHTML = displayMinutes
    timerSeconds.innerHTML = displaySeconds
}

//Start timer and populate display
function startTimer() {
    console.log(started)
    if (!started) {
        started = true;
        startButton.innerHTML = 'Restart'
        currentSet = 0
        totalSets = setsInput.value
        setter()
        interval = setInterval(timer, 1000)
    } else if (started) {
        clearInterval(interval)
        currentSet = 0
        totalSets = setsInput.value
        setter()
        interval = setInterval(timer, 1000)
    }
}

//Pause or continue timer
function pauseContinue() {
    if (!paused && started) {
        clearInterval(interval)
        paused = true
        pauseContinueButton.innerHTML = 'Continue'
    } else if (started) {
        interval = setInterval(timer, 1000)
        paused = false
        pauseContinueButton.innerHTML = 'Pause'

    }
}

//Reset display and inputs

function reset() {
    clearInterval(interval)
    started = false;
    startButton.innerHTML = 'Start';
    pauseContinueButton.innerHTML = 'Pause';
    displayStatus.innerHTML = 'Ready?'
    displaySet.innerHTML = '0'
    timerMinutes.innerHTML = "00"
    timerSeconds.innerHTML = "00"
    setsInput.value = 1
    actionMinutes.value = 0
    actionSeconds.value = 1
    breakMinutes.value = 0
    breakSeconds.value = 1
}

startButton.addEventListener('click', startTimer)

pauseContinueButton.addEventListener('click', pauseContinue)

resetButton.addEventListener('click', reset)