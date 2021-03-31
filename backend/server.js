const express = require("express")
const http = require("http")
const app = express()
// const path = require('path');

const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
<<<<<<< HEAD:backend/server.js
		origin: "https://ek-reactapp.netlify.app",
=======
		origin: "https://hacko-ek.herokuapp.com:3000",
>>>>>>> effa392ce29c3e311bf009cb3835badb001ffd22:server.js
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(process.env.PORT || 5000, () => console.log("server is running on port 5000"))