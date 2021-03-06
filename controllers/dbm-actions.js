const cliConfig = require('../config/cli-config.json');
const cli = require('../services/cli-execute.js');
const util = require('util');

const cliParams = {
  "action" : "validate",
  "project" : "hrm",
  "environment" : "DEV_RS",
  "package_name" : "V1.0.1",
  "server" : "localhost:8017",
  "auth_type" : "DBmaestroAccount",
  "user_name" : "bradyb@dbmaestro.com",
  "token" : "sjkfhlskhguti6kjnl2ljn6"
};

async function post(req, res, next) {
	try {
		const context = {};
		context.action = req.params.action;
		context.project = req.params.project;
		context.environment = req.params.environment;
		context.server = req.params.server;
		context.authType = req.params.auth_type;
		context.userName = req.params.username;
		context.token = req.params.token;

		context.id = parseInt(req.params.id, 10);
		const rows = await employees.find(context);

		if (req.params.id) {
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function dbmApi(action, params, opts = {}){
  console.log(`Starting DBm API command - ${action}`);
  console.log(`Params: ${util.inspect(params, {showHidden: false, depth: null}) }`, opts);
  var result = {"status" : "ERROR"};
  args = await assembleArgs(action, params, opts);
  result = await cli.cliExecute(args);
  console.log(`#=> DBMApi-Result: `, result.stdout);
  if(result.stderr){
    console.log(`stderr: ${result.stderr}`);
  }
  return(result);
}

function checkSyntax (action, params, opts = {}) {
  cmdSyntax = cliConfig["commands"]
  var fullSet = [];
  fullSet = cmdSyntax[action]; //.concat(opts);
  params["action"] = action;
  Object.keys(opts).forEach( function(item){
    params[item] = opts[item];
  });
  var success = true;
  var resultMsg = "Syntax check: ";
  fullSet.forEach( function(item) {
    var hasIt = Object.keys(params).includes(item)
    if( hasIt ) {
      resultMsg += item + ", ";
    }else{
      resultMsg += item + "(missing), ";
      success = false;
    }
  });
  //console.log("ValidationInput: ", fullSet);
  //console.log("Params Validation: ",resultMsg);
  return success;
}

function assembleArgs(action, params, opts){
  if(!checkSyntax(action, params, opts)){
    console.log(`Invalid params: ${util.inspect(params, {showHidden: false, depth: null}) }`);
    //return false;
  }
  args = [
	// '/c',
	'java',
	'-jar',
	cliConfig["general"]["jar_path"],
    `-${action}`,
    "-ProjectId",
    opts.projectId
  ]
  // Get specific command syntax
  switch (action.toLowerCase()) {
    case "upgrade":
      args.push("-EnvName");
      args.push(params.environment);
      args.push("-PackageID");
      args.push(opts.packageId);
      break;
    case "package":
      break;
  }
  args.push("-Server");
  args.push(cliConfig.general.server)
  args.push("-AuthType");
  args.push("DBmaestroAccount");
  args.push("-Username");
  if(params.username){
    args.push(params.username);
  }else{
    args.push(cliConfig.general.username);
  }
  args.push("-Password");
  if(params.token){
    args.push(`"${params.token}"`);
  }else{
    args.push(`"${cliConfig.general.token}"`);
  }
  // TESTING
  //args = ["dir","/w","C:\\Automation\\BADMP"]
  return args;
}


module.exports.post = post;
module.exports.dbmApi = dbmApi;
module.exports.checkSyntax = checkSyntax;
