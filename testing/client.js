var prompt = require('prompt');

const io = require('socket.io-client');
var socket = io.connect('http://localhost:8889');

socket.on('connected', (socket) => {
  console.log("I'm in");
});

//socket.emit('okay', 'boop');

//socket.emit('ban', 'ban');

function testing(){
  setTimeout(function (){
    //socket.emit('ban', 'ban');
    prompt.start();
    prompt.get('test', (err, results) => {
      if(err){ console.log(err);}
      //banned();
      socket.emit(results.test, results.test);
      console.log(results.test);
      console.log("We're through.");
    });
  }, 550);
}

function banned(){
  socket.emit('ban', 'ban');
}

testing();
