const express = require('express')

const app = express();

const squlite3 = require('sqlite3')

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 4002;

app.use(express.static('public'))

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('listening on port 4002')
})

const db = new squlite3.Database('./saved-timers.db')

//get all names of timers
app.get('/timer/savedTimer', (req, res, next) => {
    if (req.query.name) {
        db.get('SELECT * FROM userTimers WHERE name = $name', {
            $name: req.query.name,
        }, (err, row) =>{
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(row)
            }
        })
    } else {
        db.all('SELECT name FROM userTimers;', function (err, row) {
            if (err) {
                res.sendStatus(404)
            } else {
                res.status(200).send(row)
            }
        })
    }
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
        }, function (err) {
            if (err) {
                res.sendStatus(500)
            } else {
                res.status(201).send(`Saved timer: '${req.body.timer.timerName}'`)
            }
        })
})

//delete router
app.delete('/timer/savedtimer:id', (req, res, next) => {

})
