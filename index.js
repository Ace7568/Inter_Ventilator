const express = require('express');

const cors = require('cors');

const {port} = require("./config");



const messageRoute = require('./Routes/messageRoute')

const app = express();

const db = require("./database");

app.use(cors());

app.use(express.json());

app.use('/message',messageRoute);

app.use('/health',(req, res) => {
    res.send({ status: "OK"})
})

app.listen(port,() => console.log("service started on port: ", process.env.PORT || port));