//populate dropdowns

const populateDropdowns = () => {
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('actionMinutes').appendChild(option)
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('modal-actionMinutes').appendChild(option)
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('actionSeconds').appendChild(option)
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('modal-actionSeconds').appendChild(option)
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('breakMinutes').appendChild(option)
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('modal-breakMinutes').appendChild(option)
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('breakSeconds').appendChild(option)
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option')
        option.innerHTML = i
        document.getElementById('modal-breakSeconds').appendChild(option)
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

let started = false;
let paused = false
let breakStatus = false;
let displayStatus = document.getElementById('status')

//define variable to hold interval
let interval;

//define variables to hold buttons
const startButton = document.getElementById('start')
const pauseContinueButton = document.getElementById('pause-continue')
const resetButton = document.getElementById('reset')

//define variables for modal
const modal = document.getElementById('modal')
const saveButton = document.getElementById('save')
const cancelButton = document.getElementById('modal-cancel')

//modal functions
saveButton.onclick = function () {
    modal.style.display = 'block'
    document.getElementById('modal-sets').value = document.getElementById('sets').value
    document.getElementById('modal-actionMinutes').value = document.getElementById('actionMinutes').value
    document.getElementById('modal-actionSeconds').value = document.getElementById('actionSeconds').value
    document.getElementById('modal-breakMinutes').value = document.getElementById('breakMinutes').value
    document.getElementById('modal-breakSeconds').value = document.getElementById('breakSeconds').value
}

cancelButton.onclick = function () {
    modal.style.display = 'none'
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
}

//setter function puts user input values into variables for use by timer
function setter() {
    if (!breakStatus) {
        displayStatus.classList.add('animation')
        currentSet ++
        displaySet.innerHTML = currentSet;
        //animation
        displayStatus.innerHTML = 'Action'
        displayStatus.classList.remove('hide')
        displayStatus.classList.add('animation')
        setTimeout(function () {
            displayStatus.classList.remove('animation')
            displayStatus.classList.add('hide')
        },1000)
        //change timer display
        seconds = document.getElementById('actionSeconds').value
        minutes = document.getElementById('actionMinutes').value
    } else if (currentSet < totalSets){
        //animation
        displayStatus.innerHTML = 'Break'
        displayStatus.classList.remove('hide')
        displayStatus.classList.add('animation')
        setTimeout(function () {
            displayStatus.classList.remove('animation')
            displayStatus.classList.add('hide')
        },1000)
        //change timer display
        seconds = document.getElementById('breakSeconds').value
        minutes = document.getElementById('breakMinutes').value
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
        startButton.innerHTML = 'Restart'
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

    document.getElementById("timerMinutes").innerHTML =
        displayMinutes
    document.getElementById("timerSeconds").innerHTML =
        displaySeconds
}

//Start timer and populate display
function startTimer() {
    console.log(started)
    if (!started) {
    started = true;
    currentSet = 0
    totalSets = document.getElementById('sets').value
    setter()
    interval = setInterval(timer, 1000)
    }
}

//Pause or continue timer
function pauseContinue () {
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

function reset () {
    clearInterval(interval)
    started = false;
    startButton.innerHTML = 'Start';
    pauseContinueButton.innerHTML = 'Pause';
    displayStatus.innerHTML = 'Ready?'
    displaySet.innerHTML = '0'
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