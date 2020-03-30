//populate dropdowns

const populateDropdowns = () => {
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('actionMinutes').appendChild(option)
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('actionSeconds').appendChild(option)
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('breakMinutes').appendChild(option)
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('breakSeconds').appendChild(option)
    }
}

populateDropdowns()

//define variables for time

let currentSet = 0
let totalSets;
let seconds = 0
let minutes = 0

let displaySeconds;
let displayMinutes;
let displaySet = document.getElementById('set-display')

//define variables for status

let paused = false
let breakStatus = false;
let displayStatus = document.getElementById('status')

//define variable to hold interval
let interval;

//define variables to hold buttons
const startButton = document.getElementById('start')
const pauseContinueButton = document.getElementById('pause-continue')
const resetButton = document.getElementById('reset')

//setter function puts user input values into variables for use by timer
function setter() {
    if (!breakStatus) {
        currentSet ++
        displaySet.innerHTML = currentSet;
        displayStatus.innerHTML = 'Action'
        seconds = document.getElementById('actionSeconds').value
        minutes = document.getElementById('actionMinutes').value
    } else if (currentSet < totalSets){
        seconds = document.getElementById('breakSeconds').value
        minutes = document.getElementById('breakMinutes').value
        displayStatus.innerHTML = 'Break'
    }
    if (currentSet > totalSets) {
        clearInterval(interval)
        displaySet.innerHTML = 'Finished all sets'
        displayStatus.innerHTML = ''
        startButton.innerHTML = 'Restart'
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

    document.getElementById("timerMinutes").innerHTML =
        displayMinutes
    document.getElementById("timerSeconds").innerHTML =
        displaySeconds
}

//Start timer and populate display
function startTimer() {
    currentSet = 0
    totalSets = document.getElementById('sets').value
    setter()
    interval = setInterval(timer, 1000)
}

//Pause or continue timer
function pauseContinue () {
    if (!paused) {
        clearInterval(interval)
        paused = true
        pauseContinueButton.innerHTML = 'Continue'
    } else {
        interval = setInterval(timer, 1000)
        paused = false
        pauseContinueButton.innerHTML = 'Pause'

    }
}

//Reset display and inputs

function reset () {
    clearInterval(interval)
    startButton.innerHTML = 'Start';
    pauseContinueButton.innerHTML = 'Pause';
    displayStatus.innerHTML = ''
    displaySet.innerHTML = 'Set'
    document.getElementById('timerMinutes').innerHTML = "00"
    document.getElementById('timerSeconds').innerHTML = "00"
    document.getElementById('sets').value = 1
    document.getElementById('actionMinutes').value = 0
    document.getElementById('actionSeconds').value = 1
    document.getElementById('breakMinutes').value = 0
    document.getElementById('breakSeconds').value = 1
}

startButton.addEventListener('click', startTimer)

pauseContinueButton.addEventListener('click', pauseContinue)

resetButton.addEventListener('click', reset)