const express = require("express")
const http = require("http")
const app = express()
const path = require('path');

app.use(express.static("public"));


const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "https://ek-reactapp.netlify.app",
		methods: [ "GET", "POST" ]
	}
})

app.get('/', (req,res)=>{
	res.sendFile(path.join(__dirname+'/irida/public/index.html'));
});


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