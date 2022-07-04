const express = require('express');
const cors = require('cors');
const events = require('events');
const bp = require('body-parser')

const port = 5000;

const emitter = new events.EventEmitter(); 

const app = express();
app.use(bp.json());

app.use(cors())

app.get('/get-messages', (req, res) => {
    console.log("Getted")
    emitter.once('newMessage', (message) => {
        console.log(message)
        res.json(message);
        res.send()
    })
})

app.post('/new-messages', ((req, res) => {
    console.log("Posted")

    const message = req.body;

    emitter.emit('newMessage', message);
    res.status(200);
    res.send()
}) )

app.listen(port, () => console.log(`server started, port: ${port}`))