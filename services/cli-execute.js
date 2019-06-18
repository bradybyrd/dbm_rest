// CLI exexute - takes a command line and executes it
const config = require('../config/cli-config.json');
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

function cliExecute(args = [], opts = {}) {
  var exitCode = 0;
  var restResult = {"action" : "cliExecute", "command" : args.join(" ")};
	const cliResult = new Promise(function (resolve, reject) {
    var spawn=require('child_process').spawn, child=null;
	  console.log("CLI: ",args, opts);
    var child = spawn(process.env.comspec, args); // function(){console.log('end');}, {timeout:6000});
    /*console.log('Timeout');
    setTimeout(function(){
        console.log('killing proc (timeout)');
        child.stdin.pause();
        child.kill();
    }, 12000);
    */
    child.stdout.on('data', function(data){
        console.log('stdout:'+data);
        restResult["stdout"] = data;
    });

    child.stderr.on('data', function(data){
        console.log('stderr:'+data);
        restResult["stderr"] = data;
    });

    child.stdin.on('data', function(data){
        console.log('stdin:'+data);
    });

    child.on('exit', function (code, signal) {
      console.log('child process exited with ' +
                  `code ${code} and signal ${signal}`);
      restResult["exit_code"] = code;
      exitCode = code;
      if( code > 0 ) {
        console.log("Running into problems...");
        reject(restResult);
      }else{
        console.log("Success");
        resolve(restResult);
      }
    });
  }); // end Promise

 (async function(){
   try {
     await cliResult;
   }catch(err){
     console.log(err);
   }
 });

}

module.exports.cliExecute = cliExecute;

function filterValue(obj, value) {
  return obj["privileges"].filter((object) => {
   return object["resource"] == value
  })
}
