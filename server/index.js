const express = require("express")
const http = require("http")
const {Server} = require("socket.io");

const app = express()
const port = 3001
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: true
});
// const io = require("socket.io")(httpServer, {});


app.get("/", (req, res) => {
    console.log("inside home");
    res.json({abc: "1234"})
})

app.get("/home", (req, res) => {
    res.json({home: "success"});
});

io.on("connection", socket => {
    console.log(`user connected:  ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`user disconnected: ${socket.id}, reason: ${reason}`);
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});

httpServer.listen(port, () => {
    console.log(`server has started at ${port}`)
})