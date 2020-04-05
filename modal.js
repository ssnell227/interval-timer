//define variables for modal
const modal = document.getElementById('modal')
const saveButton = document.getElementById('save')
const cancelButton = document.getElementById('modal-cancel')

//modal functions
function runModal () {
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

export {runModal}