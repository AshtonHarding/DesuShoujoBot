const Server = require('socket.io');
const io = new Server();

io.on("connection", (socket) => {
  console.log("Connected.");

  socket.on('okay', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} "disconnect"`);
  });

})

io.listen(8889);
