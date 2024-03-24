const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
app = express()
port = 3001

const server = http.createServer(app)
app.get("/", (req, res) => {
    res.json({"key": "value"})
})

server.listen(port, () => {
    console.log("server has started at port: ", port);
})