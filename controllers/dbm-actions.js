const cliConfig = require('../config/cli-config.js');
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
