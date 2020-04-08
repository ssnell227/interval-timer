//populate dropdowns
function populateDropdowns() {
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('actionMinutes').appendChild(option);
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('modal-actionMinutes').appendChild(option);
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('actionSeconds').appendChild(option);
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('modal-actionSeconds').appendChild(option);
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('breakMinutes').appendChild(option);
    }
    for (let i = 0; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('modal-breakMinutes').appendChild(option);
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('breakSeconds').appendChild(option);
    }
    for (let i = 1; i < 60; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        document.getElementById('modal-breakSeconds').appendChild(option);
    }
}

export {populateDropdowns}