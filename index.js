const express = require('express');

const cors = require('cors');

const {port} = require("./config");

const fs = require('fs');

const messageRoute = require('./Routes/messageRoute')

const app = express();

const db = require("./database");

app.use(cors());

app.use(express.json());

app.use('/message',messageRoute);

app.use('/health',(req, res) => {
    res.send({ status: "OK"})
})

app.use('/log', (req, res) => {
    const logFilePath = './messages-debug.log';
  
    fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading log file');
      } else {
        res.send(data);
      }
    });
});

app.listen(port,() => console.log("service started on port: ", process.env.PORT || port));