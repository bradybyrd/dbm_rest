const cliConfig = require('../config/cli-config.json');
const cli = require('../services/cli-execute.js');
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

module.exports.post = post;

function dbmApi(action, params, opts = {}){
  console.log(`Starting DBm API command - ${action}`);
  console.log(`Params: ${params}`);  
  args = assembleArgs(action, params, opts);
  cmd = cliConfig["general"]["java_cmd"];
  cli.cliExecute(cmd, args);
}

module.exports.dbmApi = dbmApi;

function checkSyntax (action, params, opts = {}) {
  cmdSyntax = config["commands"]
  var fullSet = [];
  fullSet = cmdSyntax["base"].concat(cmdSyntax[action]);
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
  return success;
}
module.exports.checkSyntax = checkSyntax;

function assembleArgs(action, params, opts){
  if(!checkSyntax(action, params)){
    console.log(`Invalid params: ${params}`);
    return false;
  }
  credential = `-AuthType DBmaestroAccount -UserName ${params.username} -Password \"${params.token}\"`;
  args = [ 
    `-${action}`,
    `-ProjectID ${opts.projectId}`,
    `-Server ${config.general.server}`
  ]
  // Get specific command syntax
  switch (action) {
    case "Upgrade":
      args.push(`-EnvName ${params.env_name}`);
      args.push(`-PackageID ${opts.packageId}`);
      break;
    case "Package":
      break;
  }
  return args;
}