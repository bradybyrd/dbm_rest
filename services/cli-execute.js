// CLI exexute - takes a command line and executes it
const config = require('../config/cli-config.js');
const child = null;

async function initialize() {
  // no idea what to do
}
module.exports.initialize = initialize;

async function abort() {
  console.log(`Killing proc: ${child}`)
  child.stdin.pause();
	await child.kill();
}
module.exports.abort = abort;

function cliExecute(cmd, args = [], opts = {}) {
	return new Promise(async (resolve, reject) => {
    var spawn=require('child_process').spawn
    , child=null;

    child = spawn(cmd, args); // function(){console.log('end');}, {timeout:6000});
    /*console.log('Timeout');
    setTimeout(function(){
        console.log('killing proc (timeout)');
        child.stdin.pause();
        child.kill();
    }, 12000);
    */
    child.stdout.on('data', function(data){
        console.log('stdout:'+data);
    });

    child.stderr.on('data', function(data){
        console.log('stderr:'+data);
    });

    child.stdin.on('data', function(data){
        console.log('stdin:'+data);
    });
    
    child.on('exit', function (code, signal) {
      console.log('child process exited with ' +
                  `code ${code} and signal ${signal}`);
      if( code > 0 ) {
        reject();
      }
      resolve();
    });
  });
}

module.exports.cliExecute = cliExecute;

function filterValue(obj, value) {
  return obj["privileges"].filter((object) => {
   return object["resource"] == value
  })
}