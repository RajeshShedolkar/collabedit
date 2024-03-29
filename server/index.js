const express = require("express")
const http = require("http")
const {Server} = require("socket.io");

const app = express()
const port = 3001
const httpServer = http.createServer(app);
const PageUserMapping = new Map()
const UserPageMapping = new Map()
const SocketToClientName = new Map()
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
    // socket.on("message", (data) => {
    //     console.log("data from client", data)
    //     socket.emit("test", {"msg": "Hi I am from server"});
    // })
    socket.on("openNewDoc", (data) => {
        const {clientName, pageId} = data;
        console.log(`${clientName} and ${pageId} has joined...`)
        PageUserMapping.set(pageId, socket.id);
        UserPageMapping.set(socket.id, pageId);
        SocketToClientName.set(socket.id, clientName)
        socket.join(pageId);
        socket.broadcast.to(pageId).emit("NewUserJoined", {clientName, pageId});
    })

    socket.on("NewUserConnectedAck", (data) => {
        console.log("post user join ack:", data)
        const {clientName, pageId} = data;
        socket.broadcast.to(pageId).emit("NewUserJoinedAckRes", {clientName, pageId});
    })

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