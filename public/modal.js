//define variables for modal
const modal = document.getElementById('modal')
const saveButton = document.getElementById('save')
const cancelButton = document.getElementById('modal-cancel')
const submitSave = document.getElementById('submit-save')
const responseText = document.getElementById('saved-response')

//modal functions
function runModal() {
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
}

//view saved timers


//post current timer
submitSave.addEventListener('click', () => {
    const timerName = document.getElementById('timer-name').value;
    const sets = document.getElementById('sets').value
    const actionMinutes = document.getElementById('actionMinutes').value
    const actionSeconds = document.getElementById('actionSeconds').value
    const breakMinutes = document.getElementById('breakMinutes').value
    const breakSeconds = document.getElementById('breakSeconds').value

    console.log(timerName)

    if (timerName === 'Timer Name' || timerName === undefined) {
        alert('Enter a new name for this timer')
    } else {
        fetch('/timer/savedtimer',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    timer: {
                    timerName: timerName,
                    sets: sets,
                    actionMinutes: actionMinutes,
                    actionSeconds: actionSeconds,
                    breakMinutes: breakMinutes,
                    breakSeconds: breakSeconds
                    }
                })
            })
            .then(response => {
               return response = response.text()
            })
            .then(response => {
                responseText.innerHTML = response;
            })
    }
})

export { runModal }