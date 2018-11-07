var spawn = require("child_process").spawn;
var process = spawn('python3',['main.py', 'testing']);

function pythonTest(){
 process.stdout.on('data', function(data){
   data = data.toString();
  });
}

pythonTest.end(function(err){
 if(err) throw err;
 console.log(data);
});
