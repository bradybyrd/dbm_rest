const packages = require('../models/packages.js');
const dbmApi = require('./dbm-actions.js');

async function get(req, res, next) {
	// api/projects/:id/packages
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		if (req.params.id) {
			context.id = parseInt(req.params.id, 10);
			const rows = await packages.finder("by_id", context);		
			if ( rows.length === 1) {
				res.status(200).json(rows[0]);
			} else {
				res.status(404).end();
			}
		} else {
			const rows = await packages.finder("by_project", context);		
			res.status(200).json(rows);
		}
	} catch(err) {
		next(err);
	}
}

async function put(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
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

async function post(req, res, next) {
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
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

async function deploy(req, res, next) {
  //  POST: projects/:project_id/packages/:id/deploy {env_name: DEV, username: brady, token: blahfkgj4386jh4}
	try {
		const context = {};
		context.project_id = parseInt(req.params.project_id, 10);
		context.id = parseInt(req.params.id, 10);
		const rows = await packages.find(context);
		if (req.params.id) {
			if ( rows.length === 1) {
        dbmApi.dbmApi("upgrade", req.params, {"projectId" : context.project_id, "packageId" : context.id})
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

module.exports.deploy = deploy;
module.exports.get = get;
module.exports.put = put;
module.exports.post = post;
