const { Server } = require('socket.io');

const soketio = () => {
  const io = new Server({
    cors: {
      origin: "http://localhost:3000"
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.emit("welcome", 'Wellcome to frutaibale..')
    socket.broadcast.emit("hello", "hello all...")

    socket.on("message", (data) => {
      console.log(data);
      io.to(data.reciver).emit("res-message", data.message)
    })

    socket.on("groupmessage", (joined_group) => {
      console.log(joined_group);

      socket.join(joined_group)
    })
  });

  io.listen(8080);
}


module.exports = soketio;