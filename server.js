const express = require('express')

const app = express();

//const {savedTimers} = reqire('./data.js')

const PORT = process.env.PORT || 4002;

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log('listening on port 4002')
})