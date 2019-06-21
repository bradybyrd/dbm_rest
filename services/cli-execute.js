// CLI exexute - takes a command line and executes it
const config = require('../config/cli-config.json');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const child = null;

async function initialize() {
  // no idea what to do
}

async function abort() {
  console.log(`Killing proc: ${child}`)
  child.stdin.pause();
	await child.kill();
}

async function cliExecute(args = [], opts = {}) {
  var exitCode = 0;
  var cmd =  args.join(" ");
  var restResult = {"action" : "cliExecute", "command" : cmd, "status" : "ERROR", "stdout" : ""};
  console.log("CMD: ", cmd);
  try{
    // Run the command line
	   const {stdout, stderr } = await exec(cmd, {shell: true });
     if (stderr) {
       restResult.stderr = stderr;
       console.error(`error: ${stderr}`);
     }else{
       restResult.status = "SUCCESS";
     }
     restResult.stdout = stdout;
     console.log(`#=> CLIExecute Result: ${util.inspect(restResult, {showHidden: false, depth: null}) }`)
     return restResult;
  }catch(err){
    console.error(err);
    restResult.stderr = err;
    return restResult;
  }

}

function filterValue(obj, value) {
  return obj["privileges"].filter((object) => {
   return object["resource"] == value
  })
}

module.exports.abort = abort;
module.exports.initialize = initialize;
module.exports.cliExecute = cliExecute;
