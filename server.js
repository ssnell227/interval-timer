const express = require('express')

const app = express();

const { savedTimers } = require('./data.js')

const squlite3 = require('sqlite3')

const PORT = process.env.PORT || 4002;

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log('listening on port 4002')
})


//Get router w/ querys. sends response as object, not sure if right or not!
app.get('/timer/savedTimer', (req, res, next) => {
    const timerName = req.query.name;
    const timerIndex = savedTimers.indexOf(timer => {
        timer.name === timerName
    })
    savedTimers.forEach(timer => {
        if (timerIndex !== -1) {
            res.send(savedTimers[timerIndex])
        } else {
            res.status(404).send('No timer by that name')
        }
    })
})

//post router w querys
app.post('/timer/savedtimer', (req, res, next) => {
    const timerName = req.query.name;
    const timerIndex = savedTimers.indexOf(timer => {
        timer.name === timerName
    })
    if (timerName && timerIndex === -1) {
        savedTimers.push({
            name: timerName,
        })
    } else {
        res.status(400).send()
    }
    console.log(savedTimers)
})

