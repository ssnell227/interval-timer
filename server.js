const express = require('express')

const app = express();

const { savedTimers } = require('./data.js')

const squlite3 = require('sqlite3')

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4002;

app.use(express.static('public'))

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('listening on port 4002')
})

const db = new squlite3.Database('./saved-timers.db')

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

//post router
app.post('/timer/savedtimer', (req, res, next) => {
    db.run(`INSERT INTO userTimers 
    (name, sets, actionMinutes, actionSeconds, breakMinutes, breakSeconds) 
        VALUES ($name, $sets, $actionMinutes, $actionSeconds, $breakMinutes, $breakSeconds )`,
        {
            $name: req.body.timer.timerName,
            $sets: req.body.timer.sets,
            $actionMinutes: req.body.timer.actionMiniutes,
            $actionSeconds: req.body.timer.actionSeconds,
            $breakMinutes: req.body.timer.breakMinutes,
            $breakSeconds: req.body.timer.breakSeconds
        })
})

//delete router
app.delete('/timer/savedtimer:id', (req, res, next) => {
    
})
