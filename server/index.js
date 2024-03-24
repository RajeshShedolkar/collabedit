const express = require("express")
const http = require("http")

const app = express()
port = 3001
const server = http.createServer(app)

app.get("/", (req, res) => {
    res.json({abc: "123"})
})

server.listen(port, () => {
    console.log("server has started at ", `${port}`)
})